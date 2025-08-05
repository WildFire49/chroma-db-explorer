import React, { useState, useEffect, useCallback } from "react";
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
  CircularProgress,
  Alert,
  Chip,
  Avatar,
  IconButton,
  Tooltip,
  Collapse,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import {
  Description,
  ExpandMore,
  ContentCopy,
  Visibility,
  DataObject,
} from "@mui/icons-material";
import SearchBar from "./SearchBar";
import { chromaService } from "@/services/chroma";
import { Document } from "@/services/chroma";

interface DocumentsViewProps {
  collectionId: string;
  collectionName: string;
}

export default function DocumentsView({
  collectionId,
  collectionName,
}: DocumentsViewProps) {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [isSearchMode, setIsSearchMode] = useState(false);

  const fetchDocuments = useCallback(async () => {
    try {
      setLoading(true);
      const docs = await chromaService.getCollectionDocuments(collectionId);
      setDocuments(docs);
      setError(null);
      setIsSearchMode(false);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch documents"
      );
    } finally {
      setLoading(false);
    }
  }, [collectionId]);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  const handleSearchResults = (results: Document[]) => {
    setDocuments(results);
    setIsSearchMode(true);
  };

  const toggleRowExpansion = (docId: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(docId)) {
      newExpanded.delete(docId);
    } else {
      newExpanded.add(docId);
    }
    setExpandedRows(newExpanded);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const truncateText = (text: string, maxLength: number = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
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
          Loading documents from {collectionName}...
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
          Failed to Load Documents
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
              bgcolor: "secondary.main",
              width: 40,
              height: 40,
            }}
          >
            <Description />
          </Avatar>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
              Documents
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {isSearchMode
                ? "Search results"
                : `${documents.length} document${
                    documents.length !== 1 ? "s" : ""
                  }`}{" "}
              in {collectionName}
            </Typography>
          </Box>
        </Box>

        {!isSearchMode && (
          <Chip
            label={`${documents.length} Total`}
            color="secondary"
            variant="outlined"
            sx={{
              fontWeight: 600,
              "& .MuiChip-label": {
                px: 2,
              },
            }}
          />
        )}
      </Box>

      {/* Search Bar */}
      <Box sx={{ mb: 3 }}>
        <SearchBar
          collectionId={collectionId}
          collectionName={collectionName}
          onSearchResults={handleSearchResults}
        />
      </Box>

      {/* Documents Table */}
      {documents.length === 0 ? (
        <Card
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            py: 8,
            backgroundColor: "grey.50",
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            <DataObject sx={{ fontSize: 64, color: "grey.400", mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No Documents Found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {isSearchMode
                ? "Try adjusting your search query"
                : "This collection appears to be empty"}
            </Typography>
          </Box>
        </Card>
      ) : (
        <TableContainer
          component={Paper}
          sx={{
            flex: 1,
            maxHeight: "600px",
            "& .MuiTable-root": {
              minWidth: 800,
            },
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: "50px" }}></TableCell>
                <TableCell sx={{ fontWeight: 600, minWidth: "200px" }}>
                  Document ID
                </TableCell>
                <TableCell sx={{ fontWeight: 600, minWidth: "300px" }}>
                  Content
                </TableCell>
                <TableCell sx={{ fontWeight: 600, minWidth: "150px" }}>
                  Metadata
                </TableCell>
                {isSearchMode && (
                  <TableCell
                    align="center"
                    sx={{ fontWeight: 600, width: "100px" }}
                  >
                    Similarity
                  </TableCell>
                )}
                <TableCell
                  align="center"
                  sx={{ fontWeight: 600, width: "120px" }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {documents.map((doc, index) => (
                <React.Fragment key={doc.id}>
                  <TableRow
                    hover
                    sx={{
                      "&:hover": {
                        backgroundColor: "action.hover",
                      },
                      "&:hover .action-buttons": {
                        opacity: 1,
                      },
                    }}
                  >
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={() => toggleRowExpansion(doc.id)}
                        sx={{
                          transition: "transform 0.2s",
                          transform: expandedRows.has(doc.id)
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                        }}
                      >
                        <ExpandMore />
                      </IconButton>
                    </TableCell>

                    <TableCell>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Avatar
                          sx={{
                            width: 24,
                            height: 24,
                            bgcolor: "primary.main",
                            fontSize: "0.75rem",
                          }}
                        >
                          {index + 1}
                        </Avatar>
                        <Typography
                          variant="body2"
                          sx={{
                            fontFamily: "monospace",
                            fontSize: "0.75rem",
                            color: "text.secondary",
                          }}
                        >
                          {truncateText(doc.id, 20)}
                        </Typography>
                      </Box>
                    </TableCell>

                    <TableCell>
                      <Typography
                        variant="body2"
                        sx={{
                          lineHeight: 1.5,
                          color: "text.primary",
                        }}
                      >
                        {truncateText(doc.document, 150)}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      {doc.metadata && Object.keys(doc.metadata).length > 0 ? (
                        <Chip
                          label={`${Object.keys(doc.metadata).length} field${
                            Object.keys(doc.metadata).length !== 1 ? "s" : ""
                          }`}
                          size="small"
                          sx={{
                            backgroundColor: "#f3e8ff",
                            color: "#7c3aed",
                            fontWeight: 500,
                          }}
                        />
                      ) : (
                        <Typography variant="body2" color="text.secondary">
                          No metadata
                        </Typography>
                      )}
                    </TableCell>

                    {isSearchMode && (
                      <TableCell align="center">
                        {doc.distance !== undefined ? (
                          <Chip
                            label={doc.distance.toFixed(3)}
                            size="small"
                            sx={{
                              backgroundColor: "#f0f9ff",
                              color: "#0369a1",
                              fontWeight: 600,
                              fontFamily: "monospace",
                            }}
                          />
                        ) : (
                          <Typography variant="body2" color="text.secondary">
                            —
                          </Typography>
                        )}
                      </TableCell>
                    )}

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
                        <Tooltip title="View Full Content">
                          <IconButton
                            size="small"
                            onClick={() => toggleRowExpansion(doc.id)}
                            sx={{
                              backgroundColor: "primary.50",
                              color: "primary.main",
                              "&:hover": {
                                backgroundColor: "primary.100",
                              },
                            }}
                          >
                            <Visibility fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Copy Document ID">
                          <IconButton
                            size="small"
                            onClick={() => copyToClipboard(doc.id)}
                            sx={{
                              backgroundColor: "grey.50",
                              color: "grey.600",
                              "&:hover": {
                                backgroundColor: "grey.100",
                              },
                            }}
                          >
                            <ContentCopy fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>

                  {/* Expanded Row Content */}
                  <TableRow>
                    <TableCell
                      colSpan={isSearchMode ? 6 : 5}
                      sx={{
                        py: 0,
                        borderBottom: expandedRows.has(doc.id)
                          ? "1px solid"
                          : "none",
                        borderColor: "divider",
                      }}
                    >
                      <Collapse
                        in={expandedRows.has(doc.id)}
                        timeout="auto"
                        unmountOnExit
                        sx={{ overflow: "scroll" }}
                      >
                        <Box sx={{ py: 3, overflow: "auto" }}>
                          <Card
                            variant="outlined"
                            sx={{
                              backgroundColor: "grey.50",
                              overflow: "auto",
                            }}
                          >
                            <CardContent sx={{ overflow: "auto" }}>
                              <Typography
                                variant="subtitle2"
                                sx={{ mb: 2, fontWeight: 600 }}
                              >
                                Full Document Content
                              </Typography>
                              <Box
                                sx={{
                                  mb: 3,
                                  maxHeight: "400px",
                                  overflow: "auto",
                                  backgroundColor: "background.paper",
                                  borderRadius: 1,
                                  border: "1px solid",
                                  borderColor: "divider",
                                  "&::-webkit-scrollbar": {
                                    width: "8px",
                                  },
                                  "&::-webkit-scrollbar-track": {
                                    backgroundColor: "rgba(0,0,0,0.1)",
                                    borderRadius: "4px",
                                  },
                                  "&::-webkit-scrollbar-thumb": {
                                    backgroundColor: "rgba(0,0,0,0.3)",
                                    borderRadius: "4px",
                                    "&:hover": {
                                      backgroundColor: "rgba(0,0,0,0.5)",
                                    },
                                  },
                                }}
                              >
                                <Typography
                                  variant="body2"
                                  sx={{
                                    lineHeight: 1.6,
                                    whiteSpace: "pre-wrap",
                                    fontFamily: "monospace",
                                    fontSize: "0.8rem",
                                    p: 2,
                                  }}
                                >
                                  {doc.document || "No content available"}
                                </Typography>
                              </Box>

                              {doc.metadata &&
                                Object.keys(doc.metadata).length > 0 && (
                                  <>
                                    <Divider sx={{ my: 2 }} />
                                    <Typography
                                      variant="subtitle2"
                                      sx={{ mb: 2, fontWeight: 600 }}
                                    >
                                      Metadata
                                    </Typography>
                                    <Box
                                      sx={{
                                        backgroundColor: "background.paper",
                                        borderRadius: 1,
                                        border: "1px solid",
                                        borderColor: "divider",
                                        maxHeight: "300px",
                                        overflow: "auto",
                                        "&::-webkit-scrollbar": {
                                          width: "8px",
                                        },
                                        "&::-webkit-scrollbar-track": {
                                          backgroundColor: "rgba(0,0,0,0.1)",
                                          borderRadius: "4px",
                                        },
                                        "&::-webkit-scrollbar-thumb": {
                                          backgroundColor: "rgba(0,0,0,0.3)",
                                          borderRadius: "4px",
                                          "&:hover": {
                                            backgroundColor: "rgba(0,0,0,0.5)",
                                          },
                                        },
                                      }}
                                    >
                                      <pre
                                        style={{
                                          margin: 0,
                                          fontSize: "0.75rem",
                                          fontFamily: "monospace",
                                          whiteSpace: "pre-wrap",
                                          color: "#374151",
                                          padding: "16px",
                                        }}
                                      >
                                        {JSON.stringify(doc.metadata, null, 2)}
                                      </pre>
                                    </Box>
                                  </>
                                )}

                              <Divider sx={{ my: 2 }} />
                              <Typography
                                variant="subtitle2"
                                sx={{ mb: 1, fontWeight: 600 }}
                              >
                                Document ID
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{
                                  fontFamily: "monospace",
                                  fontSize: "0.75rem",
                                  color: "text.secondary",
                                  backgroundColor: "background.paper",
                                  p: 1,
                                  borderRadius: 1,
                                  border: "1px solid",
                                  borderColor: "divider",
                                }}
                              >
                                {doc.id}
                              </Typography>
                            </CardContent>
                          </Card>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
