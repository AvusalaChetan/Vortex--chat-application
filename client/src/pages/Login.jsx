import {useState} from "react";
import {
  Container,
  Paper,
  TextField,
  Typography,
  Button,
  Avatar,
  IconButton,
} from "@mui/material";
import {CameraAlt} from "@mui/icons-material";
import {Stack} from "@mui/system";
import {VisuallyHiddenInput} from "../components/StyledComponent";
import {useForm} from "react-hook-form";
import Oauth from "../components/auth/Oauth";
import {useFileHandler} from "6pp";

const Login = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [filePath, setFilePath] = useState("");
  const profile = useFileHandler("single");

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
    formState: {errors},
    reset,
  } = useForm();

  const onSubmit = (data) => {};

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

              <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  required
                  fullWidth
                  label="username"
                  autoComplete="username"
                  type="text"
                  margin="normal"
                  variant="outlined"
                  // work for mui
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
              <Oauth />
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
                  src={profile.preview}
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
                    onChange={profile.changeHandler}
                  />
                </IconButton>
              </Stack>
              {/* camera  end icon */}

              <form onSubmit={handleSubmit(onSubmit)}>
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
                >
                  sign up
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
