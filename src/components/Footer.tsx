import {
  Box,
  Container,
  Typography,
  IconButton,
  Tooltip,
  Divider,
  Link,
} from "@mui/material";
import {
  GitHub,
  X,
  LinkedIn,
  Copyright,
  Favorite,
  Code,
} from "@mui/icons-material";

export default function Footer() {
  const handleGitHub = () => {
    window.open("https://github.com/WildFire49", "_blank");
  };

  const handleTwitter = () => {
    window.open("https://x.com/Vai2052", "_blank");
  };

  return (
    <Box
      component="footer"
      sx={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
        borderTop: "1px solid rgba(255, 255, 255, 0.1)",
        mt: "auto",
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "radial-gradient(circle at 50% 0%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
          pointerEvents: "none",
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Box sx={{ py: 6 }}>
          {/* Main Footer Content */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "2fr 1fr 1fr" },
              gap: 4,
              mb: 4,
            }}
          >
            {/* Brand Section */}
            <Box>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}
              >
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: 2,
                    background:
                      "linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Code sx={{ fontSize: 18, color: "white" }} />
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    background:
                      "linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  ChromaDB UI
                </Typography>
              </Box>
              <Typography
                variant="body2"
                sx={{
                  color: "rgba(255, 255, 255, 0.7)",
                  mb: 3,
                  maxWidth: "300px",
                  lineHeight: 1.6,
                }}
              >
                The ultimate vector database management interface. Built with
                passion for developers who need powerful, intuitive tools.
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography
                  variant="caption"
                  sx={{ color: "rgba(255, 255, 255, 0.6)" }}
                >
                  Made with
                </Typography>
                <Favorite sx={{ fontSize: 16, color: "#ef4444" }} />
                <Typography
                  variant="caption"
                  sx={{ color: "rgba(255, 255, 255, 0.6)" }}
                >
                  by Vaishakh Krishnan
                </Typography>
              </Box>
            </Box>

            {/* Quick Links */}
            <Box>
              <Typography
                variant="subtitle2"
                sx={{
                  color: "white",
                  fontWeight: 600,
                  mb: 2,
                }}
              >
                Quick Links
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Link
                  target="_blank"
                  href="https://github.com/WildFire49/chroma-db-explorer/blob/main/README.md"
                  sx={{
                    color: "rgba(255, 255, 255, 0.7)",
                    textDecoration: "none",
                    fontSize: "0.875rem",
                    "&:hover": {
                      color: "#3b82f6",
                      transform: "translateX(4px)",
                    },
                    transition: "all 0.2s ease",
                  }}
                >
                  Documentation
                </Link>
                <Link
                  href="https://github.com/WildFire49/chroma-db-explorer"
                  target="_blank"
                  sx={{
                    color: "rgba(255, 255, 255, 0.7)",
                    textDecoration: "none",
                    fontSize: "0.875rem",
                    "&:hover": {
                      color: "#3b82f6",
                      transform: "translateX(4px)",
                    },
                    transition: "all 0.2s ease",
                  }}
                >
                  GitHub Repository
                </Link>
                {/* <Link
                  href="#"
                  sx={{
                    color: "rgba(255, 255, 255, 0.7)",
                    textDecoration: "none",
                    fontSize: "0.875rem",
                    "&:hover": {
                      color: "#3b82f6",
                      transform: "translateX(4px)",
                    },
                    transition: "all 0.2s ease",
                  }}
                >
                  API Reference
                </Link> */}
              </Box>
            </Box>

            {/* Social Links */}
            <Box>
              <Typography
                variant="subtitle2"
                sx={{
                  color: "white",
                  fontWeight: 600,
                  mb: 2,
                }}
              >
                Connect
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Tooltip title="GitHub">
                    <IconButton
                      onClick={handleGitHub}
                      sx={{
                        color: "rgba(255, 255, 255, 0.7)",
                        background: "rgba(255, 255, 255, 0.1)",
                        "&:hover": {
                          color: "#3b82f6",
                          background: "rgba(59, 130, 246, 0.1)",
                          transform: "translateY(-2px)",
                        },
                        transition: "all 0.2s ease",
                      }}
                    >
                      <GitHub fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="LinkedIn">
                    <IconButton
                      onClick={() =>
                        window.open(
                          "https://www.linkedin.com/in/vaishakh-krishnan/",
                          "_blank"
                        )
                      }
                      sx={{
                        color: "rgba(255, 255, 255, 0.7)",
                        background: "rgba(255, 255, 255, 0.1)",
                        "&:hover": {
                          color: "#06b6d4",
                          background: "rgba(6, 182, 212, 0.1)",
                          transform: "translateY(-2px)",
                        },
                        transition: "all 0.2s ease",
                      }}
                    >
                      <LinkedIn fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Twitter/X">
                    <IconButton
                      onClick={handleTwitter}
                      sx={{
                        color: "rgba(255, 255, 255, 0.7)",
                        background: "rgba(255, 255, 255, 0.1)",
                        "&:hover": {
                          color: "#10b981",
                          background: "rgba(16, 185, 129, 0.1)",
                          transform: "translateY(-2px)",
                        },
                        transition: "all 0.2s ease",
                      }}
                    >
                      <X fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Divider */}
          <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.1)", mb: 3 }} />

          {/* Bottom Footer */}
          <Box
            sx={{
              display: "flex",
              justifyContent: { xs: "center", md: "space-between" },
              alignItems: "center",
              flexDirection: { xs: "column", md: "row" },
              gap: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Copyright
                sx={{ fontSize: 16, color: "rgba(255, 255, 255, 0.6)" }}
              />
              <Typography
                variant="body2"
                sx={{ color: "rgba(255, 255, 255, 0.6)" }}
              >
                {new Date().getFullYear()} ChromaDB UI. All rights reserved.
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography
                variant="caption"
                sx={{ color: "rgba(255, 255, 255, 0.5)" }}
              >
                Built with Next.js & Material-UI
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
