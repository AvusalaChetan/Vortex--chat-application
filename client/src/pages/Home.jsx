import AppLayout from "../components/layout/AppLayout";

const Home = () => {
  return (
    <div>
      <h1>Welcome to our app!</h1>
      <p>Please select a chat to start messaging.</p>
    </div>
  );
};

export default AppLayout(Home);
