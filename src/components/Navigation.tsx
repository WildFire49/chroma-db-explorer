import { AppBar, Toolbar, Typography, Box, Chip, IconButton, Avatar } from "@mui/material";
import { Storage, GitHub, LinkedIn } from "@mui/icons-material";

export default function Navigation() {
  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        background: 'rgba(15, 23, 42, 0.9)',
        backdropFilter: 'blur(20px)',
        border: 'none',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
      }}
    >
      <Toolbar sx={{ px: { xs: 2, md: 4 }, py: 1 }}>
        <Box
          sx={{ display: "flex", alignItems: "center", gap: 2, flexGrow: 1 }}
        >
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 2,
              background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 20px rgba(59, 130, 246, 0.4)'
            }}
          >
            <Storage sx={{ fontSize: 22, color: 'white' }} />
          </Box>
          <Box>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ 
                fontWeight: 700, 
                background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: '1.2rem'
              }}
            >
              ChromaDB UI
            </Typography>
            <Typography
              variant="caption"
              sx={{ 
                color: 'rgba(255, 255, 255, 0.7)', 
                fontSize: "0.75rem",
                fontWeight: 500
              }}
            >
              Vector Database Explorer
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
            <IconButton
              component="a"
              href="https://github.com/WildFire49"
              target="_blank"
              sx={{
                color: 'rgba(255, 255, 255, 0.7)',
                '&:hover': { color: '#3b82f6', transform: 'translateY(-2px)' },
                transition: 'all 0.2s ease'
              }}
            >
              <GitHub fontSize="small" />
            </IconButton>
            <IconButton
              component="a"
              href="https://linkedin.com/in/vaishakh-krishnan"
              target="_blank"
              sx={{
                color: 'rgba(255, 255, 255, 0.7)',
                '&:hover': { color: '#06b6d4', transform: 'translateY(-2px)' },
                transition: 'all 0.2s ease'
              }}
            >
              <LinkedIn fontSize="small" />
            </IconButton>
          </Box>
          
          <Chip
            avatar={
              <Avatar
                sx={{
                  bgcolor: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%) !important',
                  width: 24,
                  height: 24,
                  fontSize: '0.75rem',
                  fontWeight: 600
                }}
              >
                V
              </Avatar>
            }
            label="Vaishakh"
            size="small"
            sx={{
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
              color: "white",
              fontWeight: 600,
              fontSize: "0.8rem",
              border: '1px solid rgba(255,255,255,0.2)',
              "&:hover": {
                background: 'rgba(255,255,255,0.2)',
                transform: 'translateY(-1px)'
              },
              transition: 'all 0.2s ease'
            }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
