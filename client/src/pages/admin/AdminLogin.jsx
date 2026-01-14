import {useState} from "react";
import {
  Container,
  Paper,
  TextField,
  Typography,
  Button,
  Box,
  InputAdornment,
  IconButton,
  Alert,
  Fade,
  keyframes,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  LockOutlined,
  ShieldOutlined,
  AdminPanelSettingsOutlined,
  AttachEmail,
} from "@mui/icons-material";
import {useForm} from "react-hook-form";
import {Navigate} from "react-router-dom";

const isAdmin = true;

// Keyframe animations
const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
`;

const pulse = keyframes`
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.15);
  }
  50% {
    box-shadow: 0 0 0 18px rgba(0, 0, 0, 0);
  }
`;

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);

  const {
    register,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = (data) => {
    console.log("Admin Secret Key:", data,"\nloginattempts",loginAttempts);
    setLoginAttempts(loginAttempts + 1);
    // Add your authentication logic here
  };

  if (isAdmin) return <Navigate to="/admin/dashboard" />;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // background: "linear-gradient(135deg, #000 0%, #0a0a0a 50%, #000 100%)",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)",
          top: "-250px",
          right: "-250px",
          borderRadius: "50%",
        },
        "&::after": {
          content: '""',
          position: "absolute",
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)",
          bottom: "-200px",
          left: "-200px",
          borderRadius: "50%",
        },
      }}
    >
      <Container component="main" maxWidth="sm">
        <Fade in={true} timeout={800}>
          <Paper
            elevation={24}
            sx={{
              position: "relative",
              padding: {xs: 3, sm: 5},
              borderRadius: 4,
              background: "#ffffff",
              border: "1px solid rgba(0,0,0,0.08)",
              boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.25)",
              overflow: "hidden",
            }}
          >
            {/* Decorative top border */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "4px",
                background: "linear-gradient(90deg, #000 0%, #000 100%)",
              }}
            />

            {/* Admin Icon with animation */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mb: 3,
              }}
            >
              <Box
                sx={{
                  width: 100,
                  height: 100,
                  borderRadius: "50%",
                  background: "#000",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  animation: `${float} 3s ease-in-out infinite`,
                  position: "relative",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    inset: 0,
                    borderRadius: "50%",
                    padding: "3px",
                    background: "#000",
                    WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                  },
                }}
              >
                <AdminPanelSettingsOutlined
                  sx={{
                    fontSize: 50,
                    color: "#fff",
                    filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
                  }}
                />
              </Box>
            </Box>

            {/* Title */}
            <Typography
              variant="h4"
              sx={{
                textAlign: "center",
                mb: 1,
                fontWeight: 700,
                color: "#000",
                letterSpacing: "0.5px",
              }}
            >
              Admin Access
            </Typography>

            <Typography
              variant="body2"
              sx={{
                textAlign: "center",
                color: "rgba(0, 0, 0, 0.7)",
                mb: 4,
                fontSize: "0.95rem",
              }}
            >
              Enter your secret key to access the admin dashboard
            </Typography>

            {/* Error Alert */}
            {loginAttempts > 0 && (
              <Fade in={true}>
                <Alert
                  severity="error"
                  sx={{
                    mb: 3,
                    backgroundColor: "error.light",
                    color: "error.contrastText",
                    border: "1px solid rgba(0,0,0,0.06)",
                    "& .MuiAlert-icon": {
                      color: "error.contrastText",
                    },
                  }}
                  onClose={() => setLoginAttempts(0)}
                >
                  Invalid secret key. Please try again.
                </Alert>
              </Fade>
            )}

            {/* Form */}
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
              <TextField
                fullWidth
                label="Secret Key"
                type={showPassword ? "text" : "password"}
                autoComplete="off"
                variant="outlined"
                error={!!errors.secretKey}
                helperText={errors.secretKey ? "Secret Key is required" : ""}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlined sx={{color: "rgba(0,0,0,0.6)"}} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={togglePasswordVisibility}
                        edge="end"
                        sx={{color: "rgba(0,0,0,0.6)"}}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: 3,
                  "& .MuiOutlinedInput-root": {
                    color: "rgba(0,0,0,0.87)",
                    backgroundColor: "#fff",
                    borderRadius: 2,
                    "& fieldset": {
                      borderColor: "rgba(0,0,0,0.12)",
                    },
                    "&:hover fieldset": {
                      borderColor: "rgba(0,0,0,0.2)",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "rgba(0,0,0,0.9)",
                      borderWidth: "2px",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "rgba(0,0,0,0.6)",
                    "&.Mui-focused": {
                      color: "rgba(0,0,0,0.9)",
                    },
                  },
                  "& .MuiFormHelperText-root": {
                    color: "rgba(0,0,0,0.6)",
                  },
                }}
                {...register("secretKey", {required: true})}
              />

              <Button
                variant="contained"
                type="submit"
                fullWidth
                sx={{
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: "none",
                  fontSize: 16,
                  fontWeight: 600,
                  background: "#000",
                  color: "#fff",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.25)",
                  transition: "all 0.25s ease",
                  "&:hover": {
                    background: "#fff",
                    color: "#000",
                    border: "1px solid rgba(0,0,0,0.08)",
                    boxShadow: "0 6px 18px rgba(0, 0, 0, 0.12)",
                    transform: "translateY(-2px)",
                  },
                  "&:active": {
                    transform: "translateY(0)",
                  },
                }}
              >
                Access Dashboard
              </Button>
            </Box>

            {/* Security Notice */}
            <Box
              sx={{
                mt: 4,
                p: 2,
                borderRadius: 2,
                backgroundColor: "rgba(0,0,0,0.03)",
                border: "1px solid rgba(0,0,0,0.06)",
              }}
            >
              <Box sx={{display: "flex", alignItems: "center", mb: 1}}>
                <ShieldOutlined
                  sx={{
                    fontSize: 20,
                    color: "rgba(0,0,0,0.7)",
                    mr: 1,
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    color: "rgba(0,0,0,0.87)",
                    fontWeight: 600,
                    fontSize: "0.85rem",
                  }}
                >
                  🔒 This is a secure admin-only area
                </Typography>
              </Box>
              <Typography
                variant="caption"
                sx={{
                  color: "rgba(0,0,0,0.7)",
                  display: "block",
                  fontSize: "0.75rem",
                  lineHeight: 1.5,
                }}
              >
                Keep your secret key confidential. Unauthorized access is prohibited and monitored.
              </Typography>
            </Box>

            {/* Footer Text */}
            <Typography
              variant="caption"
              sx={{
                display: "block",
                textAlign: "center",
                mt: 3,
                color: "rgba(0,0,0,0.6)",
                fontSize: "0.75rem",
              }}
            >
              Unauthorized access is prohibited and monitored.
            </Typography>
          </Paper>
        </Fade>
      </Container>
    </Box>
  );
};

export default AdminLogin;