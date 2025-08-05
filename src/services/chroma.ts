import axios from 'axios';
import { QueryClient } from '@tanstack/react-query';

export interface ChromaConfig {
  host: string;
  port: string;
}

export interface Collection {
  id: string;
  name: string;
  count?: number;
  metadata?: Record<string, unknown>;
  dimension?: number | null;
  tenant?: string;
  database?: string;
  configuration_json?: {
    hnsw?: {
      space?: string;
      ef_construction?: number;
      ef_search?: number;
      max_neighbors?: number;
      resize_factor?: number;
      sync_threshold?: number;
    };
    spann?: unknown;
    embedding_function?: {
      type?: string;
      name?: string;
      config?: Record<string, unknown>;
    } | null;
  };
}

export interface Document {
  id: string;
  embedding: number[];
  metadata: Record<string, unknown>;
  document: string;
  distance?: number; // For similarity search results
}

export class ChromaService {
  private config: ChromaConfig;
  private client: QueryClient;

  constructor(config: ChromaConfig) {
    this.config = config;
    this.client = new QueryClient();
  }

  updateConfig(config: ChromaConfig) {
    this.config = config;
  }

  private getProxyUrl(path: string): string {
    return `/api/chroma/${path}?host=${this.config.host}&port=${this.config.port}`;
  }

  async testConnection(): Promise<boolean> {
    try {
      // Use the v2 heartbeat endpoint through proxy
      const url = this.getProxyUrl('api/v2/heartbeat');
      await axios.get(url);
      return true;
    } catch (error) {
      console.error('Connection test failed:', error);
      return false;
    }
  }

  async getCollections(): Promise<Collection[]> {
    try {
      // Use the correct v2 endpoint with tenant/database structure through proxy
      const endpoint = 'api/v2/tenants/default_tenant/databases/default_database/collections';
      const url = this.getProxyUrl(endpoint);
      console.log(`Fetching collections from proxy: ${url}`);
      
      const response = await axios.get(url);
      console.log('Collections response:', response.data);
      
      // Transform the response to match our Collection interface
      if (Array.isArray(response.data)) {
        return response.data.map((collection: {
          id: string;
          name: string;
          count?: number;
          metadata?: Record<string, unknown>;
          dimension?: number | null;
          tenant?: string;
          database?: string;
          configuration_json?: any;
          [key: string]: unknown;
        }) => ({
          id: collection.id,
          name: collection.name,
          count: collection.count || 0,
          metadata: collection.metadata || {},
          dimension: collection.dimension,
          tenant: collection.tenant,
          database: collection.database,
          configuration_json: collection.configuration_json
        }));
      }
      
      return [];
    } catch (error) {
      console.error('Failed to fetch collections:', error);
      throw new Error('Failed to fetch collections from Chroma DB');
    }
  }

  async getCollectionDocuments(collectionId: string): Promise<Document[]> {
    try {
      // Use the correct v2 endpoint with tenant/database structure through proxy
      const endpoint = `api/v2/tenants/default_tenant/databases/default_database/collections/${collectionId}/get`;
      const url = this.getProxyUrl(endpoint);
      console.log(`Fetching documents from proxy: ${url}`);
      
      const response = await axios.post(url, {
        include: ['metadatas', 'documents']
      });
      
      const { ids, metadatas, documents } = response.data;
      
      console.log('Document fetch response:', {
        ids: ids?.length || 0,
        metadatas: metadatas?.length || 0,
        documents: documents?.length || 0,
        sampleData: {
          firstId: ids?.[0],
          firstMetadata: metadatas?.[0],
          firstDocument: documents?.[0]?.substring(0, 100) + '...'
        }
      });
      
      // Transform the response to match our Document interface
      if (ids && Array.isArray(ids) && ids.length > 0) {
        return ids.map((id: string, index: number) => {
          const metadata = metadatas?.[index];
          const document = documents?.[index];
          
          return {
            id: id || `doc_${index}`,
            metadata: metadata && typeof metadata === 'object' ? metadata : {},
            document: typeof document === 'string' ? document : String(document || ''),
            embedding: [] // Embeddings not included by default
          };
        });
      }
      
      console.warn('No valid document data found in response');
      return [];
    } catch (error) {
      console.error('Failed to fetch documents:', error);
      throw new Error('Failed to fetch documents from collection');
    }
  }

  async searchDocuments(collectionId: string, query: string, limit: number = 5): Promise<Document[]> {
    try {
      // Use the correct v2 endpoint with tenant/database structure through proxy
      const endpoint = `api/v2/tenants/default_tenant/databases/default_database/collections/${collectionId}/query`;
      const url = this.getProxyUrl(endpoint);
      console.log(`Searching documents at proxy: ${url}`);
      
      // Try different payload formats based on Chroma DB version
      let requestPayload;
      
      // First try with query_texts (newer versions)
      try {
        requestPayload = {
          query_texts: [query],
          n_results: limit,
          include: ['metadatas', 'documents', 'distances']
        };
        
        console.log('Attempting search with query_texts:', requestPayload);
        const response = await axios.post(url, requestPayload);
        
        const { ids, metadatas, documents, distances } = response.data;
        
        console.log('Search response:', {
          ids: ids?.[0]?.length || 0,
          metadatas: metadatas?.[0]?.length || 0,
          documents: documents?.[0]?.length || 0,
          distances: distances?.[0]?.length || 0
        });
        
        // Transform the response to match our Document interface
        if (ids && Array.isArray(ids) && ids[0] && Array.isArray(ids[0]) && ids[0].length > 0) {
          return ids[0].map((id: string, index: number) => {
            const metadata = metadatas?.[0]?.[index];
            const document = documents?.[0]?.[index];
            const distance = distances?.[0]?.[index];
            
            return {
              id: id || `search_${index}`,
              metadata: metadata && typeof metadata === 'object' ? metadata : {},
              document: typeof document === 'string' ? document : String(document || ''),
              embedding: [],
              distance: typeof distance === 'number' ? distance : undefined
            };
          });
        }
        
        console.warn('No valid search results found in response');
        return [];
        
      } catch (firstError: unknown) {
        const errorMessage = firstError instanceof Error ? firstError.message : 'Unknown error';
        console.log('query_texts failed, trying alternative approach:', errorMessage);
        
        // If query_texts fails, try with where clause for text matching
        try {
          requestPayload = {
            where_document: { "$contains": query },
            n_results: limit,
            include: ['metadatas', 'documents']
          };
          
          console.log('Attempting search with where_document:', requestPayload);
          const response = await axios.post(url, requestPayload);
          
          const { ids, metadatas, documents } = response.data;
          return this.transformDocumentResponse(ids, metadatas, documents);
          
        } catch (secondError: unknown) {
          const secondErrorMessage = secondError instanceof Error ? secondError.message : 'Unknown error';
          console.log('where_document also failed, trying get all and filter:', secondErrorMessage);
          
          // Fallback: get all documents and filter client-side
          try {
            const getAllUrl = this.getProxyUrl(`api/v2/tenants/default_tenant/databases/default_database/collections/${collectionId}/get`);
            const response = await axios.post(getAllUrl, {
              include: ['metadatas', 'documents']
            });
            
            const { ids, metadatas, documents } = response.data;
            
            if (ids && Array.isArray(ids) && ids.length > 0) {
              // Client-side filtering
              const filteredResults: Document[] = [];
              const queryLower = query.toLowerCase();
              
              for (let i = 0; i < ids.length && filteredResults.length < limit; i++) {
                const document = documents?.[i];
                if (document && typeof document === 'string' && 
                    document.toLowerCase().includes(queryLower)) {
                  const metadata = metadatas?.[i];
                  filteredResults.push({
                    id: ids[i] || `filtered_${i}`,
                    metadata: metadata && typeof metadata === 'object' ? metadata : {},
                    document: document,
                    embedding: [],
                    distance: undefined // No similarity score for text matching
                  });
                }
              }
              
              console.log(`Client-side filtering found ${filteredResults.length} results`);
              return filteredResults;
            }
            
            return [];
            
          } catch (thirdError: unknown) {
            const thirdErrorMessage = thirdError instanceof Error ? thirdError.message : 'Unknown error';
            console.error('All search methods failed:', thirdErrorMessage);
            throw new Error(`Search failed: ${errorMessage}`);
          }
        }
      }
      

    } catch (error) {
      console.error('Failed to search documents:', error);
      throw new Error('Failed to search documents in collection');
    }
  }

  private transformDocumentResponse(ids: string[], metadatas: unknown[], documents: string[]): Document[] {
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return [];
    }

    return ids.map((id: string, index: number) => {
      const metadata = metadatas?.[index];
      const document = documents?.[index];
      
      return {
        id: id || `doc_${index}`,
        metadata: metadata && typeof metadata === 'object' ? metadata as Record<string, unknown> : {},
        document: typeof document === 'string' ? document : String(document || ''),
        embedding: []
      };
    });
  }
}

export const chromaService = new ChromaService({ host: 'localhost', port: '8000' });
