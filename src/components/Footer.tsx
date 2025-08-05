import { Box, Container, Typography, IconButton, Tooltip } from "@mui/material";
import { GitHub, X, Copyright } from "@mui/icons-material";

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
        py: 1.5,
        px: 2,
        mt: "auto",
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[800],
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          {/* Copyright */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Copyright
              sx={{ fontSize: 14, color: "text.secondary", opacity: 0.7 }}
            />
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ opacity: 0.8 }}
            >
              2024 Vaishakh Krishnan
            </Typography>
          </Box>

          {/* Social Links */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Tooltip title="Follow on X">
              <IconButton
                onClick={handleTwitter}
                size="small"
                sx={{
                  color: "text.secondary",
                  opacity: 0.7,
                  "&:hover": {
                    opacity: 1,
                    backgroundColor: "rgba(0, 0, 0, 0.05)",
                  },
                }}
              >
                <X fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Follow on GitHub">
              <IconButton
                onClick={handleGitHub}
                size="small"
                sx={{
                  color: "text.secondary",
                  opacity: 0.7,
                  "&:hover": {
                    opacity: 1,
                    backgroundColor: "rgba(0, 0, 0, 0.05)",
                  },
                }}
              >
                <GitHub fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
