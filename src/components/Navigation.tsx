import { AppBar, Toolbar, Typography, Box, Chip } from "@mui/material";
import { Storage } from "@mui/icons-material";

export default function Navigation() {
  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      <Toolbar>
        <Box
          sx={{ display: "flex", alignItems: "center", gap: 1.5, flexGrow: 1 }}
        >
          <Storage sx={{ fontSize: 28 }} />
          <Box>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ fontWeight: 600 }}
            >
              Chroma DB Explorer
            </Typography>
            <Typography
              variant="caption"
              sx={{ opacity: 0.8, fontSize: "0.7rem" }}
            >
              Collection Viewer
            </Typography>
          </Box>
        </Box>

        <Chip
          label="WildFire49"
          size="small"
          sx={{
            backgroundColor: "rgba(255,255,255,0.15)",
            color: "white",
            fontWeight: 500,
            fontSize: "0.75rem",
            "&:hover": {
              backgroundColor: "rgba(255,255,255,0.25)",
            },
          }}
        />
      </Toolbar>
    </AppBar>
  );
}
