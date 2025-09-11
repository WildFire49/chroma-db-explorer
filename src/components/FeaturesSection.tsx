"use client";
import { useState, useEffect } from "react";
import { Box, Container, Typography, Card, CardContent } from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Search as SearchIcon,
  Speed as SpeedIcon,
  Security as SecurityIcon,
  Code as CodeIcon,
  CloudSync as CloudSyncIcon,
  Analytics as AnalyticsIcon,
  Memory as MemoryIcon,
  AutoAwesome as AutoAwesomeIcon,
} from "@mui/icons-material";

const FeaturesSection = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const features = [
    {
      icon: DashboardIcon,
      title: "Intuitive Dashboard",
      description:
        "Modern, clean interface designed for productivity with real-time data visualization.",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      delay: 0,
    },
    {
      icon: SearchIcon,
      title: "Semantic Search",
      description:
        "Powerful vector search capabilities with advanced filtering and similarity matching.",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      delay: 100,
    },
    // {
    //   icon: SpeedIcon,
    //   title: "Lightning Performance",
    //   description:
    //     "Optimized queries and caching for blazing-fast database operations.",
    //   gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    //   delay: 200,
    // },
    // {
    //   icon: SecurityIcon,
    //   title: "Enterprise Security",
    //   description:
    //     "Bank-level security with encrypted connections and role-based access control.",
    //   gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    //   delay: 300,
    // },
    {
      icon: CodeIcon,
      title: "Developer Friendly",
      description: "Easy to Connect and View your collections and metadata.",
      gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      delay: 200,
    },
    // {
    //   icon: CloudSyncIcon,
    //   title: 'Cloud Native',
    //   description: 'Deploy anywhere with Docker support and cloud-first architecture.',
    //   gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    //   delay: 500
    // },
    // {
    //   icon: AnalyticsIcon,
    //   title: "Advanced Analytics",
    //   description:
    //     "Built-in analytics and monitoring with detailed performance insights.",
    //   gradient: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
    //   delay: 600,
    // },
    // {
    //   icon: MemoryIcon,
    //   title: "Smart Indexing",
    //   description:
    //     "Intelligent vector indexing algorithms for optimal search performance.",
    //   gradient: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
    //   delay: 700,
    // },
    // {
    //   icon: AutoAwesomeIcon,
    //   title: "AI-Powered",
    //   description:
    //     "Leverage cutting-edge AI capabilities for smarter data management.",
    //   gradient: "linear-gradient(135deg, #fad0c4 0%, #ffd1ff 100%)",
    //   delay: 800,
    // },
  ];

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "radial-gradient(circle at 30% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)",
          pointerEvents: "none",
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        {/* Section Header */}
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "2.5rem", sm: "3rem", md: "3.5rem" },
              fontWeight: 800,
              mb: 2,
              background: "linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Why Choose ChromaDB UI?
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: "rgba(255, 255, 255, 0.7)",
              maxWidth: "600px",
              mx: "auto",
              fontSize: { xs: "1.1rem", sm: "1.3rem" },
              lineHeight: 1.6,
            }}
          >
            Experience the perfect blend of power, simplicity, and performance
            in vector database management.
          </Typography>
        </Box>

        {/* Features Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            },
            gap: 4,
          }}
        >
          {features.map((feature) => (
            <Box key={feature.title}>
              <Card
                sx={{
                  height: "100%",
                  background: "rgba(15, 23, 42, 0.8)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: 4,
                  overflow: "hidden",
                  position: "relative",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  transform: mounted ? "translateY(0)" : "translateY(50px)",
                  opacity: mounted ? 1 : 0,
                  transitionDelay: `${feature.delay}ms`,
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                    "& .feature-icon": {
                      transform: "scale(1.1) rotate(5deg)",
                    },
                    "& .feature-gradient": {
                      opacity: 1,
                    },
                  },
                }}
              >
                {/* Gradient overlay */}
                <Box
                  className="feature-gradient"
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: feature.gradient,
                    opacity: 0,
                    transition: "opacity 0.3s ease",
                  }}
                />

                <CardContent sx={{ p: 4, position: "relative", zIndex: 1 }}>
                  <Box
                    className="feature-icon"
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: 3,
                      background: feature.gradient,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 3,
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                    }}
                  >
                    <feature.icon sx={{ color: "white", fontSize: "1.8rem" }} />
                  </Box>

                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      mb: 2,
                      color: "white",
                    }}
                  >
                    {feature.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: "rgba(255, 255, 255, 0.7)",
                      lineHeight: 1.6,
                    }}
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>

        {/* Call to Action */}
        <Box sx={{ textAlign: "center", mt: 10 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 2,
              color: "white",
            }}
          >
            Easy to Use
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "rgba(255, 255, 255, 0.7)",
              mb: 4,
              fontSize: "1.1rem",
            }}
          >
            First GUI for ChromaDB.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default FeaturesSection;
