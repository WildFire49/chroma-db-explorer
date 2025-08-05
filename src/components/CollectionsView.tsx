import { useState, useEffect } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  Tooltip,
  CircularProgress,
  Alert,
  Chip,
  Avatar,
  Badge,
} from "@mui/material";
import {
  Storage,
  Hub as Vector,
  DataObject,
  Info,
  PlayArrow,
  Folder,
} from "@mui/icons-material";
import { chromaService } from "@/services/chroma";
import { Collection } from "@/services/chroma";

interface CollectionsViewProps {
  onCollectionSelect: (collectionId: string, collectionName: string) => void;
  isConnected: boolean;
}

export default function CollectionsView({
  onCollectionSelect,
  isConnected,
}: CollectionsViewProps) {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isConnected) {
      fetchCollections();
    } else {
      // Reset state when disconnected
      setCollections([]);
      setError(null);
      setLoading(false);
    }
  }, [isConnected]);

  const fetchCollections = async () => {
    try {
      setLoading(true);
      const collections = await chromaService.getCollections();
      setCollections(collections);
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch collections"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCollectionClick = (collection: Collection) => {
    onCollectionSelect(collection.id, collection.name);
  };

  const getCollectionIcon = (collection: Collection) => {
    if (collection.name.toLowerCase().includes("schema")) return <DataObject />;
    if (collection.name.toLowerCase().includes("embedding")) return <Vector />;
    if (collection.name.toLowerCase().includes("doc")) return <Folder />;
    return <Storage />;
  };

  const getVectorSpaceColor = (space?: string) => {
    switch (space) {
      case "cosine":
        return "#10b981";
      case "l2":
        return "#3b82f6";
      case "ip":
        return "#f59e0b";
      default:
        return "#6b7280";
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          py: 8,
          backgroundColor: "background.paper",
          borderRadius: 3,
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <CircularProgress size={48} thickness={4} />
        <Typography variant="body1" sx={{ mt: 2, color: "text.secondary" }}>
          Loading collections...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert
        severity="error"
        sx={{
          borderRadius: 2,
          "& .MuiAlert-icon": { fontSize: "1.5rem" },
        }}
      >
        <Typography variant="body1" sx={{ fontWeight: 500 }}>
          Failed to Load Collections
        </Typography>
        <Typography variant="body2" sx={{ mt: 0.5 }}>
          {error}
        </Typography>
      </Alert>
    );
  }

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <Box
        sx={{
          mb: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar
            sx={{
              bgcolor: "primary.main",
              width: 40,
              height: 40,
            }}
          >
            <Storage />
          </Avatar>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
              Collections
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {collections.length} collection
              {collections.length !== 1 ? "s" : ""} available
            </Typography>
          </Box>
        </Box>

        <Badge
          badgeContent={collections.length}
          color="primary"
          sx={{
            "& .MuiBadge-badge": {
              fontSize: "0.75rem",
              fontWeight: 600,
            },
          }}
        >
          <Box
            sx={{
              p: 1.5,
              borderRadius: 2,
              backgroundColor: "primary.50",
              border: "1px solid",
              borderColor: "primary.200",
            }}
          >
            <Folder sx={{ color: "primary.main" }} />
          </Box>
        </Badge>
      </Box>

      {/* Collections Table */}
      <TableContainer
        component={Paper}
        sx={{
          flex: 1,
          maxHeight: "500px",
          overflow: "auto",
          "& .MuiTable-root": {
            minWidth: 650,
          },
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#f1f1f1",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#c1c1c1",
            borderRadius: "4px",
            "&:hover": {
              backgroundColor: "#a8a8a8",
            },
          },
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow sx={{ overflow: "auto" }}>
              <TableCell sx={{ width: "50px" }}></TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Collection Name</TableCell>
              <TableCell align="center" sx={{ fontWeight: 600 }}>
                Documents
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 600 }}>
                Dimension
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 600 }}>
                Vector Space
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 600 }}>
                Embedding
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: 600, width: "120px" }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {collections.map((collection) => (
              <TableRow
                key={collection.id}
                hover
                onClick={() => handleCollectionClick(collection)}
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "action.hover",
                  },
                  "&:hover .action-buttons": {
                    opacity: 1,
                  },
                }}
              >
                <TableCell>
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      bgcolor: "primary.main",
                      fontSize: "0.875rem",
                    }}
                  >
                    {getCollectionIcon(collection)}
                  </Avatar>
                </TableCell>

                <TableCell>
                  <Box>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 500,
                        mb: 0.5,
                        color: "text.primary",
                      }}
                    >
                      {collection.name}
                    </Typography>
                    {collection.metadata &&
                      Object.keys(collection.metadata).length > 0 && (
                        <Typography variant="body2" color="text.secondary">
                          {Object.keys(collection.metadata).length} metadata
                          field
                          {Object.keys(collection.metadata).length !== 1
                            ? "s"
                            : ""}
                        </Typography>
                      )}
                  </Box>
                </TableCell>

                <TableCell align="center">
                  <Chip
                    label={collection.count?.toLocaleString() || "0"}
                    size="small"
                    sx={{
                      backgroundColor:
                        collection.count && collection.count > 0
                          ? "#f0f9ff"
                          : "#f9fafb",
                      color:
                        collection.count && collection.count > 0
                          ? "#0369a1"
                          : "#6b7280",
                      fontWeight: 500,
                      border: "1px solid",
                      borderColor:
                        collection.count && collection.count > 0
                          ? "#bae6fd"
                          : "#e5e7eb",
                    }}
                  />
                </TableCell>

                <TableCell align="center">
                  {collection.dimension ? (
                    <Chip
                      label={collection.dimension}
                      size="small"
                      sx={{
                        backgroundColor: "#fef3c7",
                        color: "#92400e",
                        fontWeight: 500,
                        border: "1px solid #fde68a",
                      }}
                    />
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      —
                    </Typography>
                  )}
                </TableCell>

                <TableCell align="center">
                  {collection.configuration_json?.hnsw?.space ? (
                    <Chip
                      label={collection.configuration_json.hnsw.space.toUpperCase()}
                      size="small"
                      sx={{
                        backgroundColor: `${getVectorSpaceColor(
                          collection.configuration_json.hnsw.space
                        )}20`,
                        color: getVectorSpaceColor(
                          collection.configuration_json.hnsw.space
                        ),
                        fontWeight: 600,
                        border: `1px solid ${getVectorSpaceColor(
                          collection.configuration_json.hnsw.space
                        )}40`,
                      }}
                    />
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      —
                    </Typography>
                  )}
                </TableCell>

                <TableCell align="center">
                  {collection.configuration_json?.embedding_function ? (
                    <Chip
                      label={
                        collection.configuration_json.embedding_function.type ||
                        "Custom"
                      }
                      size="small"
                      sx={{
                        backgroundColor: "#f3e8ff",
                        color: "#7c3aed",
                        fontWeight: 500,
                        border: "1px solid #ddd6fe",
                      }}
                    />
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      None
                    </Typography>
                  )}
                </TableCell>

                <TableCell align="center">
                  <Box
                    className="action-buttons"
                    sx={{
                      display: "flex",
                      gap: 0.5,
                      opacity: 0,
                      transition: "opacity 0.2s",
                    }}
                  >
                    <Tooltip title="Explore Collection">
                      <IconButton
                        size="small"
                        sx={{
                          backgroundColor: "primary.50",
                          color: "primary.main",
                          "&:hover": {
                            backgroundColor: "primary.100",
                          },
                        }}
                      >
                        <PlayArrow fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Collection Details">
                      <IconButton
                        size="small"
                        sx={{
                          backgroundColor: "grey.50",
                          color: "grey.600",
                          "&:hover": {
                            backgroundColor: "grey.100",
                          },
                        }}
                      >
                        <Info fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
