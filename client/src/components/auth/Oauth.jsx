import {Button} from "@mui/material";

const GoogleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48" aria-hidden>
    <path fill="#EA4335" d="M24 9.5c3.9 0 7.1 1.4 9.2 3.3l6.9-6.9C36.7 2.5 30.8 0 24 0 14.7 0 6.9 5.6 3 13.6l7.9 6.1C12.8 14.1 18 9.5 24 9.5z"/>
    <path fill="#34A853" d="M46.5 24.5c0-1.6-.1-2.8-.4-4H24v8h12.7c-.5 3-2.6 5.6-5.6 7.1l8.5 6.6C43.6 37.8 46.5 31.6 46.5 24.5z"/>
    <path fill="#4A90E2" d="M10.9 29.7A14.9 14.9 0 0 1 10 24c0-1.5.3-2.9.8-4.2L3 13.6C1.1 16.9 0 20.9 0 25c0 4.3 1.1 8.4 3.1 11.9l7.8-7.2z"/>
    <path fill="#FBBC05" d="M24 48c6.6 0 12.3-2.2 16.4-6l-8.5-6.6C29 35.9 26.7 36.8 24 36.8c-6 0-11.2-4.6-12.4-10.7l-7.9 6.1C6.9 42.4 14.7 48 24 48z"/>
  </svg>
);

const Oauth = () => {
  return (
    <Button
    //   href="/auth/google"
    href="/"
      variant="contained"
      startIcon={<GoogleIcon />}
      sx={{
        textTransform: "none",
        bgcolor: "white",
        color: "rgba(0,0,0,0.87)",
        border: "1px solid #dadce0",
        boxShadow: "none",
        '&:hover': { bgcolor: '#f5f5f5', boxShadow: 'none' },
        borderRadius: 2,
        px: 2,
        py: 1,
        fontWeight: 500,
        minWidth: 200,
      }}
      aria-label="Sign in with Google"
    >
      Sign in with Google
    </Button>
  );
};

export default Oauth;
