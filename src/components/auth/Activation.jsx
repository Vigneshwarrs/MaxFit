import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Button, CircularProgress, Alert } from "@mui/material";
import {activate} from '../../services/auth';

const Activation = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const activateAccount = async () => {
      try {
        setLoading(true);
        await activate(token);
        setStatus("success");
      } catch (err) {
        if (!err.response) {
          setStatus("network");
        } else {
          setStatus("error");
        }
      } finally {
        setLoading(false);
      }
    };

    activateAccount();
  }, [token]);

  const handleRedirect = () => {
    navigate("/auth/login");
  };

  return (
    <Box sx={{ mt: 4, textAlign: "center" }}>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          {status === "success" ? (
            <Alert severity="success" sx={{ mb: 2 }}>
              Your account has been successfully activated!
            </Alert>
          ) : status === "error" ? (
            <Alert severity="error" sx={{ mb: 2 }}>
              Activation failed. The token may be invalid or expired.
            </Alert>
          ) : (
            <Alert severity="error" sx={{ mb: 2 }}>
              Network error. Please check your connection and try again.
            </Alert>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={handleRedirect}
            sx={{ mt: 2 }}
          >
            Go to Login
          </Button>
        </>
      )}
    </Box>
  );
};

export default Activation;