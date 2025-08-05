import { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  CircularProgress,
  IconButton,
  Tooltip,
} from '@mui/material';
import { HelpOutline } from '@mui/icons-material';

interface ConnectionFormProps {
  onConnect: (host: string, port: string) => void;
}

export default function ConnectionForm({ onConnect }: ConnectionFormProps) {
  const [host, setHost] = useState('localhost');
  const [port, setPort] = useState('8000');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConnect = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await onConnect(host, port);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Connection failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>
        Connect to Chroma DB
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          fullWidth
          label="Host"
          value={host}
          onChange={(e) => setHost(e.target.value)}
          helperText={
            <Tooltip title="The hostname or IP address of your Chroma DB instance">
              <IconButton size="small">
                <HelpOutline />
              </IconButton>
            </Tooltip>
          }
        />
        <TextField
          fullWidth
          label="Port"
          value={port}
          onChange={(e) => setPort(e.target.value)}
          helperText={
            <Tooltip title="The port number where Chroma DB is running">
              <IconButton size="small">
                <HelpOutline />
              </IconButton>
            </Tooltip>
          }
        />
      </Box>

      <Button
        variant="contained"
        onClick={handleConnect}
        disabled={isLoading}
        fullWidth
        sx={{ mt: 2 }}
      >
        {isLoading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          'Connect'
        )}
      </Button>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
    </Box>
  );
}
