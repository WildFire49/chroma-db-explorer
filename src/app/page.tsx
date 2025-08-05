'use client';
import { useState } from 'react';
import { Box, Container, Typography, Alert } from '@mui/material';
import ConnectionForm from '@/components/ConnectionForm';
import CollectionsView from '@/components/CollectionsView';
import DocumentsView from '@/components/DocumentsView';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { chromaService } from '@/services/chroma';



export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState<{id: string, name: string} | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleConnect = async (host: string, port: string) => {
    try {
      // Update the service with new connection details
      chromaService.updateConfig({ host, port });
      const success = await chromaService.testConnection();
      if (success) {
        setIsConnected(true);
        setSelectedCollection(null);
        setError(null);
      } else {
        throw new Error('Connection failed');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Connection failed');
      setIsConnected(false);
    }
  };

  const handleCollectionSelect = (collectionId: string, collectionName: string) => {
    setSelectedCollection({ id: collectionId, name: collectionName });
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      backgroundColor: 'background.default'
    }}>
        <Navigation />
        
        {/* Main Content Area */}
        <Box sx={{ 
          flex: 1, 
          display: 'flex', 
          flexDirection: 'column',
          pt: 10,
          pb: 4
        }}>
          <Container maxWidth="xl" sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            {/* Header Section */}
            <Box sx={{ mb: 4 }}>
              <Typography 
                variant="h4" 
                sx={{ 
                  mb: 2, 
                  background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textAlign: 'center'
                }}
              >
                Chroma Database Management
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  textAlign: 'center', 
                  color: 'text.secondary',
                  maxWidth: '600px',
                  mx: 'auto'
                }}
              >
                Connect, explore, and manage your Chroma vector database with an intuitive, 
                professional interface designed for modern AI applications.
              </Typography>
            </Box>

            {/* Connection Form */}
            <Box sx={{ mb: 4 }}>
              <ConnectionForm onConnect={handleConnect} />
            </Box>
            
            {/* Connected State */}
            {isConnected && (
              <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                {/* Success Banner */}
                <Box sx={{ 
                  mb: 4,
                  p: 3,
                  backgroundColor: '#f0f9ff',
                  border: '1px solid #0ea5e9',
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2
                }}>
                  <Box sx={{ 
                    width: 40, 
                    height: 40, 
                    borderRadius: '50%', 
                    backgroundColor: '#0ea5e9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white'
                  }}>
                    ✓
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ color: '#0c4a6e', mb: 0.5 }}>
                      Successfully Connected
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#0369a1' }}>
                      Your Chroma database is ready. Select a collection to explore your data.
                    </Typography>
                  </Box>
                </Box>
                
                {/* Main Content Grid */}
                <Box sx={{ 
                  flex: 1,
                  display: 'grid',
                  gridTemplateColumns: { 
                    xs: '1fr', 
                    lg: selectedCollection ? '400px 1fr' : '1fr'
                  },
                  gap: 3,
                  minHeight: '600px'
                }}>
                  {/* Collections Panel */}
                  <Box sx={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: { lg: '600px' }
                  }}>
                    <CollectionsView 
                      onCollectionSelect={handleCollectionSelect} 
                      isConnected={isConnected}
                    />
                  </Box>
                  
                  {/* Documents Panel */}
                  {selectedCollection && (
                    <Box sx={{ 
                      display: 'flex',
                      flexDirection: 'column',
                      minHeight: { lg: '600px' }
                    }}>
                      <DocumentsView 
                        collectionId={selectedCollection.id} 
                        collectionName={selectedCollection.name} 
                      />
                    </Box>
                  )}
                </Box>
              </Box>
            )}

            {/* Error Display */}
            {error && (
              <Alert 
                severity="error" 
                sx={{ 
                  mt: 3,
                  borderRadius: 2,
                  '& .MuiAlert-icon': {
                    fontSize: '1.5rem'
                  }
                }}
              >
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  Connection Failed
                </Typography>
                <Typography variant="body2" sx={{ mt: 0.5 }}>
                  {error}
                </Typography>
              </Alert>
            )}
          </Container>
        </Box>
        
        <Footer />
      </Box>
  );
}
