import React, { useState, useCallback, useEffect, useRef } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Alert,
  Paper,
  InputAdornment,
  Chip,
  Fade,
  Card,
  CardContent,
} from "@mui/material";
import { Search, Clear, AutoAwesome, TrendingUp } from "@mui/icons-material";
import { chromaService } from "@/services/chroma";
import { Document } from "@/services/chroma";

interface SearchBarProps {
  collectionId: string;
  collectionName: string;
  onSearchResults: (results: Document[]) => void;
}

export default function SearchBar({
  collectionId,
  collectionName,
  onSearchResults,
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<Document[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const prevQueryRef = useRef<string>("");

  const handleSearch = useCallback(async () => {
    if (!query.trim()) return;

    try {
      setLoading(true);
      setError(null);
      setHasSearched(true);
      const searchResults = await chromaService.searchDocuments(
        collectionId,
        query
      );
      setResults(searchResults);
      onSearchResults(searchResults);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Search failed");
    } finally {
      setLoading(false);
    }
  }, [collectionId, query, onSearchResults]);

  const handleClear = () => {
    setQuery("");
    setResults([]);
    setError(null);
    setHasSearched(false);
    onSearchResults([]);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    // Only process if query actually changed
    if (prevQueryRef.current !== query) {
      prevQueryRef.current = query;

      if (!query.trim()) {
        setResults([]);
        setError(null);
        setHasSearched(false);
        onSearchResults([]);
      }
    }
  }, [query, onSearchResults]);

  return (
    <Card
      elevation={0}
      sx={{
        border: "1px solid",
        borderColor: "divider",
        backgroundColor: "background.paper",
      }}
    >
      <CardContent sx={{ pb: "16px !important" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 3,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <AutoAwesome sx={{ color: "primary.main", fontSize: "1.5rem" }} />
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                Semantic Search
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Find similar documents using AI-powered search
              </Typography>
            </Box>
          </Box>
          {hasSearched && results.length > 0 && (
            <Chip
              icon={<TrendingUp />}
              label={`${results.length} result${
                results.length !== 1 ? "s" : ""
              }`}
              color="success"
              variant="outlined"
              sx={{
                fontWeight: 600,
                "& .MuiChip-icon": { fontSize: "1rem" },
              }}
            />
          )}
        </Box>
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder={`Search documents in "${collectionName}"...`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={loading}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: "white" }} />
                </InputAdornment>
              ),
              endAdornment: query && (
                <InputAdornment position="end">
                  <Button
                    size="small"
                    onClick={handleClear}
                    sx={{
                      minWidth: "auto",
                      p: 0.5,
                      color: "text.secondary",
                      "&:hover": { backgroundColor: "action.hover" },
                    }}
                  >
                    <Clear fontSize="small" />
                  </Button>
                </InputAdornment>
              ),
              sx: {
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "background.default",
                  transition: "all 0.2s ease-in-out",
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "primary.main",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "primary.main",
                    borderWidth: 2,
                  },
                },
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "background.default",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  backgroundColor: "background.paper",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "primary.main",
                  },
                },
                "&.Mui-focused": {
                  backgroundColor: "background.paper",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "primary.main",
                    borderWidth: 2,
                  },
                },
              },
            }}
          />
          <Button
            variant="contained"
            onClick={handleSearch}
            disabled={loading || !query.trim()}
            sx={{
              minWidth: "120px",
              fontWeight: 600,
              textTransform: "none",
              borderRadius: 2,
              boxShadow: "none",
              "&:hover": {
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                transform: "translateY(-1px)",
              },
              "&:disabled": {
                backgroundColor: "action.disabledBackground",
                color: "action.disabled",
              },
              transition: "all 0.2s ease-in-out",
            }}
          >
            {loading ? (
              <>
                <CircularProgress size={16} sx={{ mr: 1, color: "inherit" }} />
                Searching...
              </>
            ) : (
              "Search"
            )}
          </Button>
        </Box>
        <Fade in={!!error}>
          <Box>
            {error && (
              <Alert
                severity="error"
                sx={{
                  borderRadius: 2,
                  "& .MuiAlert-icon": { fontSize: "1.25rem" },
                  backgroundColor: "#fef2f2",
                  borderColor: "#fecaca",
                  color: "#dc2626",
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Search Error
                </Typography>
                <Typography variant="body2" sx={{ mt: 0.5, opacity: 0.9 }}>
                  {error}
                </Typography>
              </Alert>
            )}
          </Box>
        </Fade>
        {!hasSearched && !loading && (
          <Paper
            elevation={0}
            sx={{
              mt: 2,
              p: 2,
              backgroundColor: "#f8fafc",
              border: "1px solid",
              borderColor: "#e2e8f0",
              borderRadius: 2,
            }}
          >
            <Typography
              variant="body2"
              sx={{ color: "text.secondary", mb: 1, fontWeight: 500 }}
            >
              💡 Search Tips:
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                fontSize: "0.875rem",
                lineHeight: 1.5,
              }}
            >
              • Use natural language queries for best results
              <br />
              • Try concepts and themes rather than exact keywords
              <br />• Search works on semantic similarity, not just text
              matching
            </Typography>
          </Paper>
        )}
      </CardContent>
    </Card>
  );
}
