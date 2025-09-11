"use client";
import { useState, useEffect } from "react";
import { Box, Typography, Button, Container, Fade, Zoom } from "@mui/material";
import {
  Memory as MemoryIcon,
  Speed as SpeedIcon,
  Security as SecurityIcon,
  Code as CodeIcon,
  Rocket as RocketIcon,
  ArrowForward as ArrowForwardIcon,
} from "@mui/icons-material";

interface HeroSectionProps {
  onGetStarted: () => void;
}

const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const features = [
    { icon: MemoryIcon, label: "Vector Search", color: "#3b82f6" },
    { icon: SpeedIcon, label: "Lightning Fast", color: "#06b6d4" },
    // { icon: SecurityIcon, label: "Secure", color: "#10b981" },
    { icon: CodeIcon, label: "Developer First", color: "#f59e0b" },
  ];

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        background:
          "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)",
          pointerEvents: "none",
        },
      }}
    >
      {/* Floating particles effect */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          "&::after": {
            content: '""',
            position: "absolute",
            width: "100%",
            height: "100%",
            background: `
              radial-gradient(2px 2px at 20px 30px, rgba(255,255,255,0.3), transparent),
              radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.2), transparent),
              radial-gradient(1px 1px at 90px 40px, rgba(255,255,255,0.4), transparent),
              radial-gradient(1px 1px at 130px 80px, rgba(255,255,255,0.2), transparent),
              radial-gradient(2px 2px at 160px 30px, rgba(255,255,255,0.3), transparent)
            `,
            backgroundRepeat: "repeat",
            backgroundSize: "200px 100px",
            animation: "float 20s linear infinite",
            opacity: 0.6,
          },
          "@keyframes float": {
            "0%": { transform: "translateY(0px) translateX(0px)" },
            "33%": { transform: "translateY(-10px) translateX(5px)" },
            "66%": { transform: "translateY(5px) translateX(-5px)" },
            "100%": { transform: "translateY(0px) translateX(0px)" },
          },
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
            gap: 6,
            alignItems: "center",
          }}
        >
          <Box>
            <Fade in={mounted} timeout={1000}>
              <Box>
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.5rem" },
                    fontWeight: 800,
                    lineHeight: 1.1,
                    color: "white",
                    mb: 3,
                    textShadow: "0 4px 20px rgba(0,0,0,0.3)",
                  }}
                >
                  The Ultimate
                  <Box
                    component="span"
                    sx={{
                      display: "block",
                      background:
                        "linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      animation: "glow 2s ease-in-out infinite alternate",
                    }}
                  >
                    ChromaDB
                  </Box>
                  Experience
                </Typography>

                <Typography
                  variant="h5"
                  sx={{
                    color: "rgba(255,255,255,0.9)",
                    mb: 4,
                    fontSize: { xs: "1.1rem", sm: "1.3rem" },
                    fontWeight: 400,
                    lineHeight: 1.6,
                    textShadow: "0 2px 10px rgba(0,0,0,0.2)",
                  }}
                >
                  Effortlessly manage, explore, and visualize your vector
                  databases with our intuitive interface designed for the modern
                  AI era.
                </Typography>

                <Box sx={{ display: "flex", gap: 2, mb: 4, flexWrap: "wrap" }}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={onGetStarted}
                    endIcon={<RocketIcon />}
                    sx={{
                      px: 4,
                      py: 1.5,
                      fontSize: "1.1rem",
                      fontWeight: 600,
                      background:
                        "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
                      boxShadow: "0 8px 32px rgba(59, 130, 246, 0.4)",
                      border: "none",
                      "&:hover": {
                        background:
                          "linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)",
                        boxShadow: "0 12px 40px rgba(59, 130, 246, 0.6)",
                        transform: "translateY(-2px)",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    Get Started Now
                  </Button>

                  <Button
                    variant="outlined"
                    size="large"
                    href="https://github.com/WildFire49/chroma-db-explorer"
                    target="_blank"
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                      px: 4,
                      py: 1.5,
                      fontSize: "1.1rem",
                      fontWeight: 600,
                      color: "white",
                      borderColor: "rgba(255,255,255,0.5)",
                      backdropFilter: "blur(10px)",
                      background: "rgba(255,255,255,0.1)",
                      "&:hover": {
                        borderColor: "white",
                        background: "rgba(255,255,255,0.2)",
                        transform: "translateY(-2px)",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    View Source
                  </Button>
                </Box>

                {/* Feature badges */}
                <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
                  {features.map((feature, index) => (
                    <Zoom
                      key={feature.label}
                      in={mounted}
                      timeout={1000 + index * 200}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          px: 2,
                          py: 1,
                          borderRadius: "50px",
                          background: "rgba(255,255,255,0.15)",
                          backdropFilter: "blur(10px)",
                          border: "1px solid rgba(255,255,255,0.2)",
                          color: "white",
                        }}
                      >
                        <feature.icon
                          sx={{
                            fontSize: "1.2rem",
                            color: feature.color,
                          }}
                        />
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {feature.label}
                        </Typography>
                      </Box>
                    </Zoom>
                  ))}
                </Box>
              </Box>
            </Fade>
          </Box>

          <Box>
            <Fade in={mounted} timeout={1500}>
              <Box
                sx={{
                  position: "relative",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {/* Main dashboard mockup */}
                <Box
                  sx={{
                    width: "100%",
                    maxWidth: 500,
                    height: 350,
                    background: "rgba(255,255,255,0.1)",
                    backdropFilter: "blur(20px)",
                    borderRadius: 4,
                    border: "1px solid rgba(255,255,255,0.2)",
                    p: 3,
                    position: "relative",
                    overflow: "hidden",
                    boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: "40px",
                      background: "rgba(255,255,255,0.1)",
                      borderBottom: "1px solid rgba(255,255,255,0.2)",
                    },
                  }}
                >
                  {/* Window controls */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: 12,
                      left: 16,
                      display: "flex",
                      gap: 1,
                    }}
                  >
                    {["#ff5f56", "#ffbd2e", "#27ca3f"].map((color) => (
                      <Box
                        key={color}
                        sx={{
                          width: 12,
                          height: 12,
                          borderRadius: "50%",
                          background: color,
                        }}
                      />
                    ))}
                  </Box>

                  {/* Content area */}
                  <Box sx={{ mt: 5, color: "white" }}>
                    <Typography variant="h6" sx={{ mb: 2, opacity: 0.9 }}>
                      Collections Overview
                    </Typography>

                    {/* Mock collection items */}
                    {[1, 2, 3].map((item) => (
                      <Box
                        key={item}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                          p: 2,
                          mb: 1,
                          background: "rgba(255,255,255,0.1)",
                          borderRadius: 2,
                          animation: `pulse ${
                            2 + item * 0.5
                          }s ease-in-out infinite alternate`,
                        }}
                      >
                        <MemoryIcon sx={{ color: "#3b82f6" }} />
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            Collection {item}
                          </Typography>
                          <Typography variant="caption" sx={{ opacity: 0.7 }}>
                            {Math.floor(Math.random() * 10000)} documents
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Box>
            </Fade>
          </Box>
        </Box>
      </Container>

      <style jsx global>{`
        @keyframes glow {
          from {
            text-shadow: 0 0 20px rgba(251, 191, 36, 0.5);
          }
          to {
            text-shadow: 0 0 30px rgba(251, 191, 36, 0.8),
              0 0 40px rgba(251, 191, 36, 0.3);
          }
        }
        @keyframes pulse {
          from {
            opacity: 0.6;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </Box>
  );
};

export default HeroSection;
