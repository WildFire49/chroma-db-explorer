"use client";
import { useState, useRef } from "react";
import { Box } from "@mui/material";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import ConnectionSection from "@/components/ConnectionSection";
import CollectionsView from "@/components/CollectionsView";
import DocumentsView from "@/components/DocumentsView";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { chromaService } from "@/services/chroma";

export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const connectSectionRef = useRef<HTMLDivElement>(null);

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
        throw new Error("Connection failed");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Connection failed");
      setIsConnected(false);
    }
  };

  const handleCollectionSelect = (
    collectionId: string,
    collectionName: string
  ) => {
    setSelectedCollection({ id: collectionId, name: collectionName });
  };

  const handleGetStarted = () => {
    connectSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setSelectedCollection(null);
    setError(null);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "background.default",
      }}
    >
      <Navigation />

      {!isConnected ? (
        // Landing Page Flow
        <>
          <HeroSection onGetStarted={handleGetStarted} />
          <FeaturesSection />
          <Box ref={connectSectionRef}>
            <ConnectionSection
              onConnect={handleConnect}
              isConnected={isConnected}
              error={error}
            />
          </Box>
        </>
      ) : (
        // Connected Dashboard
        <>
          <ConnectionSection
            onConnect={handleConnect}
            onDisconnect={handleDisconnect}
            isConnected={isConnected}
            error={error}
          />

          {/* Main Dashboard Content */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              py: 4,
              background:
                "linear-gradient(135deg, rgba(102, 126, 234, 0.02) 0%, rgba(118, 75, 162, 0.02) 100%)",
            }}
          >
            <Box
              sx={{
                maxWidth: "1400px",
                width: "100%",
                mx: "auto",
                px: { xs: 2, sm: 3, md: 4 },
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  lg: selectedCollection ? "400px 1fr" : "1fr",
                },
                gap: 4,
                minHeight: "600px",
              }}
            >
              {/* Collections Panel */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CollectionsView
                  onCollectionSelect={handleCollectionSelect}
                  isConnected={isConnected}
                />
              </Box>

              {/* Documents Panel */}
              {selectedCollection && (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <DocumentsView
                    collectionId={selectedCollection.id}
                    collectionName={selectedCollection.name}
                  />
                </Box>
              )}
            </Box>
          </Box>
        </>
      )}

      <Footer />
    </Box>
  );
}
