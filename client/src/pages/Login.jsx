import {CameraAlt} from "@mui/icons-material";
import {
  Avatar,
  Button,
  Container,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import {Stack} from "@mui/system";
import axios from "axios";
import {useState} from "react";
import {useForm} from "react-hook-form";
import toast from "react-hot-toast";
import {useDispatch} from "react-redux";
import Oauth from "../components/auth/Oauth";
import {VisuallyHiddenInput} from "../components/StyledComponent";
import {server} from "../constants/config";
import {userExists} from "../redux/reducers/auth";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);

  const toggleForm = () => {
    setIsLogin(!isLogin);
    reset();
  };

  function scorePassword(p = "") {
    let score = 0;
    if (p.length >= 8) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;
    return score;
  }

  const {
    register,
    handleSubmit,
    formState: {errors,isSubmitting },
    reset,
    
  } = useForm();

  const dispatch = useDispatch();

  // Handle avatar file selection
  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setAvatarPreview(event.target?.result || "");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogin = async (data) => {
    console.log(data);
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(`${server}/api/v1/user/login`, data, config);
      dispatch(userExists(true));
      const message = res.data?.message || "Login successful";
      toast.success(String(message));
      reset();
      console.log(res.data);
    } catch (error) {
      console.error("Login error:", error);
      const errorMsg =
        error?.response?.data?.message || error?.message || "Login failed";
      toast.error(String(errorMsg));
    }
  };

  const handleSignUp = async (data) => {
    console.log("Signup data:", data);
    const config = {
      withCredentials: true,
    };

    try {
      // Build FormData to include avatar file
      const formDataObj = new FormData();
      formDataObj.append("name", data.name);
      formDataObj.append("bio", data.bio);
      formDataObj.append("username", data.username);
      formDataObj.append("email", data.email);
      formDataObj.append("password", data.password);

      if (avatarFile) {
        formDataObj.append("avatar", avatarFile);
        console.log("Avatar appended:", avatarFile.name);
      } else {
        console.warn("No avatar file selected");
      }

      const res = await axios.post(
        `${server}/api/v1/user/register`,
        formDataObj,
        config,
      );
      console.log("Signup response:", res.data);
      dispatch(userExists(true));
      toast.success(res.data.message); // Extract message from response
      reset();
      setAvatarFile(null);
      setAvatarPreview("");
    } catch (error) {
      console.log("signup error:", error);
      const errorMessage =
        error?.response?.data?.message || error?.message || "Signup failed";
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <Container
        component={"main"}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Paper
          elevation={5}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: {xs: "95%", sm: "80%", md: "50%"},
            marginLeft: "auto",
            marginRight: "auto",
            p: {xs: 2, md: 4},
          }}
        >
          {isLogin ? (
            <>
              {/* login form */}
              <Typography variant="h5">Login</Typography>

              <form onSubmit={handleSubmit(handleLogin)}>
                <TextField
                  required
                  fullWidth
                  label="username"
                  autoComplete="username"
                  type="text"
                  margin="normal"
                  variant="outlined"
                  error={!!errors.username}
                  helperText={
                    errors.username
                      ? errors.username.type === "required"
                        ? "This is required"
                        : errors.username.message
                      : ""
                  }
                  {...register("username", {
                    required: true,
                    minLength: {value: 4, message: "Min 4"},
                    validate: (v) =>
                      !v.includes("-") ||
                      "no hyphens should be present in username",
                  })}
                />

                <TextField
                  required
                  fullWidth
                  label="password"
                  type="password"
                  autoComplete="current-password"
                  margin="normal"
                  variant="outlined"
                  error={!!errors.password}
                  helperText={
                    errors.password
                      ? errors.password.type === "required"
                        ? "This is required"
                        : errors.password.message
                      : ""
                  }
                  {...register("password", {
                    required: "This is required",
                    validate: (v) =>
                      scorePassword(v) >= 4 ||
                      "Password too weak (minimum 8 chars, include uppercase, number, and symbol)",
                  })}
                />

                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  sx={{mt: 2, width: "100%"}}
                >
                  login
                </Button>

                <Typography textAlign={"center"} m={"1rem"}>
                  {" "}
                  or
                </Typography>
                <Button onClick={toggleForm} fullWidth variant="text">
                  sign up{" "}
                </Button>
              </form>
            </>
          ) : (
            <>
              {/* register or signup form */}
              <Typography variant="h5">sign up</Typography>

              {/* camera icon */}
              <Stack
                position="relative"
                width="100%"
                marginBottom={"auto"}
                sx={{
                  position: "relative",
                }}
              >
                <Avatar
                  sx={{
                    width: "10rem",
                    height: "10rem",
                    objectFit: "contain",
                  }}
                  src={avatarPreview}
                />

                <IconButton
                  sx={{
                    position: "absolute",
                    bottom: 10,
                    left: 110,
                    bgcolor: "gray",
                    color: "white",
                  }}
                  component="label"
                >
                  <CameraAlt />
                  <VisuallyHiddenInput
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                  />
                </IconButton>
              </Stack>
              {/* camera  end icon */}

              <form onSubmit={handleSubmit(handleSignUp)}>
                <TextField
                  required
                  fullWidth
                  label="name"
                  type="text"
                  margin="normal"
                  variant="outlined"
                  error={!!errors.name}
                  helperText={
                    errors.name
                      ? errors.name.type === "required"
                        ? "This is required"
                        : errors.name.message
                      : ""
                  }
                  {...register("name", {
                    required: true,
                    minLength: {
                      value: 4,
                      message: "Min 4",
                    },
                    validate: (v) =>
                      !v.includes("-") ||
                      "no hyphens should be present in username",
                  })}
                />
                <TextField
                  required
                  fullWidth
                  label="bio"
                  type="text"
                  margin="normal"
                  variant="outlined"
                  error={!!errors.bio}
                  helperText={
                    errors.bio
                      ? errors.bio.type === "required"
                        ? "This is required"
                        : errors.bio.message
                      : ""
                  }
                  {...register("bio", {
                    required: "Bio is required",
                    minLength: {
                      value: 10,
                      message: "Tell us a bit more (min 10 chars)",
                    },
                    maxLength: {value: 200, message: "Bio max 200 chars"},
                    validate: (v) =>
                      !/https?:\/\//i.test(v) || "Remove links from bio",
                  })}
                />
                <TextField
                  required
                  fullWidth
                  label="username"
                  autoComplete="username"
                  type="text"
                  margin="normal"
                  variant="outlined"
                  error={!!errors.username}
                  helperText={
                    errors.username
                      ? errors.username.type === "required"
                        ? "This is required"
                        : errors.username.message
                      : ""
                  }
                  {...register("username", {
                    required: true,
                    minLength: {value: 4, message: "Min 4"},
                  })}
                />
                <TextField
                  required
                  fullWidth
                  label="email"
                  autoComplete="email"
                  type="text"
                  margin="normal"
                  variant="outlined"
                  error={!!errors.email}
                  helperText={
                    errors.email
                      ? errors.email.type === "required"
                        ? "This is required"
                        : errors.email.message
                      : ""
                  }
                  {...register("email", {
                    required: true,
                    minLength: {value: 4, message: "Min 4"},
                  })}
                />

                <TextField
                  required
                  fullWidth
                  label="password"
                  type="password"
                  autoComplete="new-password"
                  margin="normal"
                  variant="outlined"
                  error={!!errors.password}
                  helperText={
                    errors.password
                      ? errors.password.type === "required"
                        ? "This is required"
                        : errors.password.message
                      : ""
                  }
                  {...register("password", {
                    required: true,
                    validate: (v) =>
                      scorePassword(v) >= 4 ||
                      "Password too weak (passward length > 8 chars , upper, number, symbol)",
                  })}
                />

                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  sx={{mt: 2, width: "100%"}}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "submitting...." : "sign up"}
                </Button>
                <Typography textAlign={"center"} m={"1rem"}>
                  or
                </Typography>
                <Button onClick={toggleForm} fullWidth variant="text">
                  login
                </Button>
              </form>
              <Oauth />
            </>
          )}
        </Paper>
      </Container>
    </>
  );
};

function ShowStrongPassword() {}

export default Login;
