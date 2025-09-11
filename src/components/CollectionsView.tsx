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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Snackbar,
  Card,
  CardContent,
} from "@mui/material";
import {
  Storage,
  Hub as Vector,
  DataObject,
  Info,
  PlayArrow,
  Folder,
  Delete as DeleteIcon,
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
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [collectionToDelete, setCollectionToDelete] =
    useState<Collection | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "success" });

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

  const handleDeleteClick = (
    event: React.MouseEvent,
    collection: Collection
  ) => {
    event.stopPropagation(); // Prevent row click
    setCollectionToDelete(collection);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!collectionToDelete) return;

    setDeleting(true);
    try {
      await chromaService.deleteCollection(collectionToDelete.id);
      setSnackbar({
        open: true,
        message: `Collection "${collectionToDelete.name}" deleted successfully`,
        severity: "success",
      });
      // Refresh collections list
      await fetchCollections();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to delete collection";
      setSnackbar({ open: true, message: errorMessage, severity: "error" });
    } finally {
      setDeleting(false);
      setDeleteDialogOpen(false);
      setCollectionToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setCollectionToDelete(null);
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
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
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background:
          "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: 3,
        overflow: "hidden",
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)",
          pointerEvents: "none",
          zIndex: 0,
        },
      }}
    >
      <CardContent
        sx={{
          p: 0,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          "&:last-child": { pb: 0 },
          position: "relative",
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            p: 3,
          }}
        >
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
                  bgcolor: "linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)",
                  width: 40,
                  height: 40,
                }}
              >
                <Storage />
              </Avatar>
              <Box>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, mb: 0.5, color: "white" }}
                >
                  Collections
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "rgba(255, 255, 255, 0.7)" }}
                >
                  {collections.length} collection
                  {collections.length !== 1 ? "s" : ""} available
                </Typography>
              </Box>
            </Box>

            <Badge
              badgeContent={collections.length}
              sx={{
                "& .MuiBadge-badge": {
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  background:
                    "linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)",
                  color: "white",
                },
              }}
            >
              <Box
                sx={{
                  p: 1.5,
                  borderRadius: 2,
                  backgroundColor: "rgba(59, 130, 246, 0.1)",
                  border: "1px solid rgba(59, 130, 246, 0.3)",
                }}
              >
                <Folder sx={{ color: "#3b82f6" }} />
              </Box>
            </Badge>
          </Box>

          {/* Collections Table */}
          <TableContainer
            component={Paper}
            sx={{
              flex: 1,
              maxHeight: "600px",
              overflow: "auto",
              background: "rgba(15, 23, 42, 0.8)",
              "& .MuiTable-root": {
                minWidth: 650,
              },
              "&::-webkit-scrollbar": {
                width: "8px",
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderRadius: "4px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "rgba(255, 255, 255, 0.3)",
                borderRadius: "4px",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.5)",
                },
              },
            }}
          >
            <Table stickyHeader>
              <TableHead>
                <TableRow sx={{ overflow: "auto" }}>
                  <TableCell
                    sx={{
                      width: "50px",
                      backgroundColor: "rgba(15, 23, 42, 0.98)",
                      borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                    }}
                  ></TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 600,
                      color: "white",
                      backgroundColor: "rgba(15, 23, 42, 0.98)",
                      borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                    }}
                  >
                    Collection Name
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontWeight: 600,
                      color: "white",
                      backgroundColor: "rgba(15, 23, 42, 0.98)",
                      borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                    }}
                  >
                    Documents
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontWeight: 600,
                      color: "white",
                      backgroundColor: "rgba(15, 23, 42, 0.98)",
                      borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                    }}
                  >
                    Dimension
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontWeight: 600,
                      color: "white",
                      backgroundColor: "rgba(15, 23, 42, 0.98)",
                      borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                    }}
                  >
                    Vector Space
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontWeight: 600,
                      color: "white",
                      backgroundColor: "rgba(15, 23, 42, 0.98)",
                      borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                    }}
                  >
                    Embedding
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontWeight: 600,
                      width: "120px",
                      color: "white",
                      backgroundColor: "rgba(15, 23, 42, 0.98)",
                      borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                    }}
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
                      backgroundColor: "rgba(15, 23, 42, 0.3)",
                      "&:hover": {
                        backgroundColor: "rgba(59, 130, 246, 0.2)",
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
                          bgcolor:
                            "linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)",
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
                            color: "white",
                          }}
                        >
                          {collection.name}
                        </Typography>
                        {collection.metadata &&
                          Object.keys(collection.metadata).length > 0 && (
                            <Typography
                              variant="body2"
                              sx={{ color: "rgba(255, 255, 255, 0.7)" }}
                            >
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
                            collection.configuration_json.embedding_function
                              .type || "Custom"
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
                        <Typography
                          variant="body2"
                          sx={{ color: "rgba(255, 255, 255, 0.5)" }}
                        >
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
                        <Tooltip title="Delete Collection">
                          <IconButton
                            size="small"
                            onClick={(e) => handleDeleteClick(e, collection)}
                            sx={{
                              backgroundColor: "error.50",
                              color: "error.main",
                              "&:hover": {
                                backgroundColor: "error.100",
                              },
                            }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Delete Confirmation Dialog */}
          <Dialog
            open={deleteDialogOpen}
            onClose={handleDeleteCancel}
            aria-labelledby="delete-dialog-title"
            aria-describedby="delete-dialog-description"
            maxWidth="sm"
            fullWidth
          >
            <DialogTitle
              id="delete-dialog-title"
              sx={{
                color: "error.main",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <DeleteIcon />
              Delete Collection
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="delete-dialog-description">
                Are you sure you want to delete the collection{" "}
                <strong>&quot;{collectionToDelete?.name}&quot;</strong>?
                <br />
                <br />
                This action cannot be undone and will permanently remove:
                <br />• All {collectionToDelete?.count || 0} documents in this
                collection
                <br />• All embeddings and metadata
                <br />• Collection configuration and settings
              </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ p: 3, pt: 1 }}>
              <Button
                onClick={handleDeleteCancel}
                variant="outlined"
                sx={{ mr: 1 }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleDeleteConfirm}
                variant="contained"
                color="error"
                disabled={deleting}
                startIcon={
                  deleting ? <CircularProgress size={16} /> : <DeleteIcon />
                }
              >
                {deleting ? "Deleting..." : "Delete Collection"}
              </Button>
            </DialogActions>
          </Dialog>

          {/* Success/Error Snackbar */}
          <Snackbar
            open={snackbar.open}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          >
            <Alert
              onClose={handleSnackbarClose}
              severity={snackbar.severity}
              sx={{ width: "100%" }}
            >
              {snackbar.message}
            </Alert>
          </Snackbar>
        </Box>
      </CardContent>
    </Card>
  );
}
