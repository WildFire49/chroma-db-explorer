"use client";
import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  InputAdornment,
  Alert,
  Fade,
  Zoom,
  useTheme,
  alpha,
} from "@mui/material";
import {
  Computer as ComputerIcon,
  Cable as CableIcon,
  CheckCircle as CheckCircleIcon,
  Rocket as RocketIcon,
  SwapHoriz as SwapHorizIcon,
} from "@mui/icons-material";

interface ConnectionSectionProps {
  onConnect: (host: string, port: string) => Promise<void>;
  onDisconnect?: () => void;
  isConnected: boolean;
  error: string | null;
}

const ConnectionSection = ({
  onConnect,
  onDisconnect,
  isConnected,
  error,
}: ConnectionSectionProps) => {
  const [host, setHost] = useState("");
  const [port, setPort] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectedHost, setConnectedHost] = useState("");
  const [connectedPort, setConnectedPort] = useState("");
  const theme = useTheme();

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      // Store the values before attempting connection
      setConnectedHost(host);
      setConnectedPort(port);
      await onConnect(host, port);
    } finally {
      setIsConnecting(false);
    }
  };

  // Update connected values when connection state changes
  useEffect(() => {
    if (!isConnected) {
      setConnectedHost("");
      setConnectedPort("");
    }
  }, [isConnected]);

  if (isConnected) {
    return (
      <Box
        sx={{
          py: 8,
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
        }}
      >
        <Container maxWidth="md">
          <Zoom in={isConnected} timeout={800}>
            <Card
              sx={{
                background: "rgba(15, 23, 42, 0.95)",
                backdropFilter: "blur(20px)",
                border: `2px solid ${alpha("#10b981", 0.4)}`,
                borderRadius: 4,
                boxShadow: `0 20px 60px ${alpha("#10b981", 0.3)}`,
                overflow: "hidden",
              }}
            >
              <CardContent sx={{ p: 6, textAlign: "center" }}>
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${theme.palette.success.main} 0%, ${theme.palette.success.dark} 100%)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
                    mb: 3,
                    animation: "pulse 2s ease-in-out infinite",
                  }}
                >
                  <CheckCircleIcon
                    sx={{ color: "white", fontSize: "2.5rem" }}
                  />
                </Box>

                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    mb: 2,
                    background:
                      "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Connection Successful!
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    color: "rgba(255, 255, 255, 0.9)",
                    mb: 4,
                    fontSize: "1.1rem",
                    fontWeight: 500,
                  }}
                >
                  Your ChromaDB instance is ready. Start exploring your
                  collections and data below.
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 3,
                  }}
                >
                  <Box
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 1,
                      px: 3,
                      py: 1,
                      borderRadius: "50px",
                      background: "rgba(16, 185, 129, 0.2)",
                      border: "1px solid rgba(16, 185, 129, 0.4)",
                    }}
                  >
                    <ComputerIcon sx={{ color: "#10b981" }} />
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 600, color: "white" }}
                    >
                      Connected to: {connectedHost || host || "ChromaDB"}
                    </Typography>
                  </Box>

                  {onDisconnect && (
                    <Button
                      variant="outlined"
                      startIcon={<SwapHorizIcon />}
                      onClick={onDisconnect}
                      sx={{
                        color: "rgba(255, 255, 255, 0.8)",
                        borderColor: "rgba(255, 255, 255, 0.3)",
                        "&:hover": {
                          borderColor: "rgba(255, 255, 255, 0.6)",
                          background: "rgba(255, 255, 255, 0.1)",
                        },
                      }}
                    >
                      Switch Database
                    </Button>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Zoom>
        </Container>

        <style jsx global>{`
          @keyframes pulse {
            0% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.05);
            }
            100% {
              transform: scale(1);
            }
          }
        `}</style>
      </Box>
    );
  }

  return (
    <Box
      id="connect"
      sx={{
        py: { xs: 8, md: 12 },
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
        position: "relative",
      }}
    >
      <Container maxWidth="md">
        <Fade in timeout={1000}>
          <Box>
            {/* Section Header */}
            <Box sx={{ textAlign: "center", mb: 6 }}>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                  mb: 2,
                  background:
                    "linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Connect Your Database
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: "rgba(255, 255, 255, 0.7)",
                  maxWidth: "500px",
                  mx: "auto",
                }}
              >
                Enter your ChromaDB connection details to get started
              </Typography>
            </Box>

            {/* Connection Form */}
            <Card
              sx={{
                background: "rgba(15, 23, 42, 0.9)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: 4,
                boxShadow: "0 20px 60px rgba(0,0,0,0.1)",
                overflow: "hidden",
              }}
            >
              <CardContent sx={{ p: { xs: 4, md: 6 } }}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                      gap: 4,
                    }}
                  >
                    <TextField
                      fullWidth
                      label="Host Address"
                      value={host}
                      onChange={(e) => setHost(e.target.value)}
                      placeholder="e.g., your-domain.com, 192.168.1.100"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <ComputerIcon
                              sx={{ color: "rgba(255, 255, 255, 0.7)" }}
                            />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        "& .MuiInputLabel-root": {
                          color: "rgba(255, 255, 255, 0.7)",
                          "&.Mui-focused": {
                            color: "#3b82f6",
                          },
                        },
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 3,
                          background: "rgba(30, 41, 59, 0.8)",
                          color: "white",
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "rgba(255, 255, 255, 0.2)",
                          },
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "rgba(59, 130, 246, 0.6)",
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#3b82f6",
                            borderWidth: 2,
                          },
                        },
                        "& .MuiInputBase-input::placeholder": {
                          color: "rgba(255, 255, 255, 0.5)",
                          opacity: 1,
                        },
                      }}
                    />

                    <TextField
                      fullWidth
                      label="Port Number"
                      value={port}
                      onChange={(e) => setPort(e.target.value)}
                      placeholder="e.g., 8000, 8080, 3000"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <CableIcon
                              sx={{ color: "rgba(255, 255, 255, 0.7)" }}
                            />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        "& .MuiInputLabel-root": {
                          color: "rgba(255, 255, 255, 0.7)",
                          "&.Mui-focused": {
                            color: "#3b82f6",
                          },
                        },
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 3,
                          background: "rgba(30, 41, 59, 0.8)",
                          color: "white",
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "rgba(255, 255, 255, 0.2)",
                          },
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "rgba(59, 130, 246, 0.6)",
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#3b82f6",
                            borderWidth: 2,
                          },
                        },
                        "& .MuiInputBase-input::placeholder": {
                          color: "rgba(255, 255, 255, 0.5)",
                          opacity: 1,
                        },
                      }}
                    />
                  </Box>

                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    onClick={handleConnect}
                    disabled={isConnecting || !host || !port}
                    startIcon={<RocketIcon />}
                    sx={{
                      py: 2,
                      fontSize: "1.1rem",
                      fontWeight: 600,
                      borderRadius: 3,
                      background:
                        "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
                      boxShadow: "0 8px 32px rgba(59, 130, 246, 0.4)",
                      "&:hover": {
                        background:
                          "linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)",
                        boxShadow: "0 12px 40px rgba(59, 130, 246, 0.6)",
                        transform: "translateY(-2px)",
                      },
                      "&:disabled": {
                        background: "rgba(0,0,0,0.12)",
                        boxShadow: "none",
                        color: "rgba(255, 255, 255, 0.3)",
                      },
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  >
                    {isConnecting ? "Connecting..." : "Connect to Database"}
                  </Button>
                </Box>

                {/* Error Display */}
                {error && (
                  <Fade in={!!error}>
                    <Box sx={{ mt: 3 }}>
                      <Alert
                        severity="error"
                        sx={{
                          borderRadius: 3,
                          "& .MuiAlert-icon": {
                            fontSize: "1.5rem",
                          },
                        }}
                      >
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          Connection Failed: {error}
                        </Typography>
                      </Alert>
                    </Box>
                  </Fade>
                )}

                {/* Helper Text */}
                <Box
                  sx={{
                    mt: 4,
                    p: 3,
                    borderRadius: 3,
                    background: "rgba(59, 130, 246, 0.1)",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: "rgba(255, 255, 255, 0.7)",
                      textAlign: "center",
                    }}
                  >
                    <strong>Need help?</strong> Enter your ChromaDB server
                    details. for hosted: use your Domain/IP and port to connect
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
};

export default ConnectionSection;
