import React, { useState } from "react";
import {
  Container,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Grid,
  Box,
  Snackbar,
  Alert,
  Paper,
  Input,
  FormControl,
  InputLabel,
  styled,
} from "@mui/material";
import { CloudUpload, Login, Logout } from "@mui/icons-material";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function AdminDocumentUpload() {
  // Authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    tenantId: "",
  });

  // Form state for upload page
  const [formData, setFormData] = useState({
    title: "FAQ Upload",
    file: null,
  });

  // UI state
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Login form handlers
  const handleLoginChange = (field) => (event) => {
    setLoginData({
      ...loginData,
      [field]: event.target.value,
    });
  };

  const handleLogin = (event) => {
    event.preventDefault();
    if (loginData.email && loginData.tenantId) {
      setIsLoggedIn(true);
      setSnackbar({
        open: true,
        message: "Login successful!",
        severity: "success",
      });
    } else {
      setSnackbar({
        open: true,
        message: "Please fill in all login fields",
        severity: "error",
      });
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginData({ email: "", tenantId: "" });
    setFormData({ title: "FAQ Upload", file: null });
    setSnackbar({
      open: true,
      message: "Logged out successfully",
      severity: "info",
    });
  };

  // Upload form handlers
  const handleFormChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setFormData({
        ...formData,
        file: file,
      });
    } else if (file) {
      setSnackbar({
        open: true,
        message: "Please select a PDF file only",
        severity: "error",
      });
      event.target.value = "";
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.file) {
      setSnackbar({
        open: true,
        message: "Please select a PDF file",
        severity: "error",
      });
      return;
    }

    // Create FormData object
    const submitData = new FormData();
    submitData.append("tenantId", loginData.tenantId);
    submitData.append("email", loginData.email);
    submitData.append("title", formData.title);
    submitData.append("file", formData.file);

    // Log FormData entries for debugging
    console.log("Form submission data:");
    for (let [key, value] of submitData.entries()) {
      console.log(`${key}:`, value);
    }

    // Show success notification
    setSnackbar({
      open: true,
      message: "PDF uploaded!",
      severity: "success",
    });

    // Reset form
    setFormData({ title: "FAQ Upload", file: null });
    // Reset file input
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) fileInput.value = "";
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Login Page
  if (!isLoggedIn) {
    return (
      <Container maxWidth="sm">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
          <Card elevation={3} sx={{ width: "100%", maxWidth: 400 }}>
            <CardContent sx={{ p: 4 }}>
              <Box textAlign="center" mb={3}>
                <Login sx={{ fontSize: 48, color: "primary.main", mb: 2 }} />
                <Typography variant="h4" component="h1" gutterBottom>
                  Admin Login
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Enter your credentials to access the document upload system
                </Typography>
              </Box>

              <Box component="form" onSubmit={handleLogin}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Email"
                      type="email"
                      value={loginData.email}
                      onChange={handleLoginChange("email")}
                      required
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Tenant ID"
                      value={loginData.tenantId}
                      onChange={handleLoginChange("tenantId")}
                      required
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      size="large"
                      startIcon={<Login />}
                      sx={{ py: 1.5 }}
                    >
                      Login
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Box>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={handleSnackbarClose} severity={snackbar.severity}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    );
  }

  // Admin Upload Page
  return (
    <Container maxWidth="md">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        py={4}
      >
        <Card elevation={3} sx={{ width: "100%", maxWidth: 600 }}>
          <CardContent sx={{ p: 4 }}>
            {/* Header with logout */}
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={3}
            >
              <Typography variant="h5" component="h1">
                Admin Document Upload
              </Typography>
              <Button
                variant="outlined"
                color="secondary"
                startIcon={<Logout />}
                onClick={handleLogout}
                size="small"
              >
                Logout
              </Button>
            </Box>

            <Box component="form" onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                {/* Tenant ID (read-only) */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Tenant ID"
                    value={loginData.tenantId}
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="outlined"
                    sx={{ backgroundColor: "grey.50" }}
                  />
                </Grid>

                {/* Admin Email (read-only) */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Admin Email"
                    value={loginData.email}
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="outlined"
                    sx={{ backgroundColor: "grey.50" }}
                  />
                </Grid>

                {/* Document Title */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Document Title"
                    value={formData.title}
                    onChange={handleFormChange("title")}
                    variant="outlined"
                    helperText="Optional - defaults to 'FAQ Upload'"
                  />
                </Grid>

                {/* File Upload */}
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <Box>
                      <Button
                        component="label"
                        variant="outlined"
                        startIcon={<CloudUpload />}
                        sx={{
                          mb: 1,
                          height: "56px",
                          justifyContent: "flex-start",
                          textTransform: "none",
                        }}
                        fullWidth
                      >
                        {formData.file ? formData.file.name : "Choose PDF File"}
                        <VisuallyHiddenInput
                          type="file"
                          accept=".pdf,application/pdf"
                          onChange={handleFileChange}
                        />
                      </Button>
                      <Typography variant="caption" color="text.secondary">
                        Only PDF files are accepted
                      </Typography>
                    </Box>
                  </FormControl>
                </Grid>

                {/* Selected file info */}
                {formData.file && (
                  <Grid item xs={12}>
                    <Paper
                      elevation={1}
                      sx={{
                        p: 2,
                        backgroundColor: "success.light",
                        color: "success.contrastText",
                      }}
                    >
                      <Typography variant="body2">
                        <strong>Selected file:</strong> {formData.file.name}
                      </Typography>
                      <Typography variant="caption">
                        Size: {(formData.file.size / 1024 / 1024).toFixed(2)} MB
                      </Typography>
                    </Paper>
                  </Grid>
                )}

                {/* Submit Button */}
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    startIcon={<CloudUpload />}
                    sx={{ py: 1.5 }}
                    disabled={!formData.file}
                  >
                    Upload Document
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default AdminDocumentUpload;
