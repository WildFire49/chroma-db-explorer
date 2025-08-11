'use client';

export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Chroma DB UI",
    "alternateName": ["ChromaDB GUI", "Chroma Database UI", "Vector Database GUI"],
    "description": "The best ChromaDB GUI and vector database explorer. Intuitive interface for managing ChromaDB collections, performing semantic searches, and visualizing vector embeddings.",
    "url": "https://chroma-db-explorer.vercel.app",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "author": {
      "@type": "Person",
      "name": "Vaishakh Krishnan",
      "url": "https://github.com/WildFire49"
    },
    "keywords": "chroma db ui, chroma db gui, chromadb ui, chromadb gui, vector database ui, vector database gui, chromadb explorer",
    "screenshot": "https://chroma-db-explorer.vercel.app/Chroma.png",
    "featureList": [
      "ChromaDB Collection Management",
      "Vector Database Explorer",
      "Semantic Search Interface",
      "Embedding Visualization",
      "Real-time Database Operations",
      "Material UI Design",
      "Responsive Mobile Interface"
    ],
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "softwareVersion": "1.0.0",
    "datePublished": "2024-01-01",
    "dateModified": new Date().toISOString().split('T')[0],
    "inLanguage": "en-US",
    "isAccessibleForFree": true,
    "license": "https://opensource.org/licenses/MIT"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
