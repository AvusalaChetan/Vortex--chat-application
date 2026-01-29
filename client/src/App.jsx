import {lazy, Suspense, useEffect} from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import ProtectRoute from "./components/auth/ProtectRoute.jsx";
import {LayOutLoader} from "./components/layout/Loaders.jsx";
import NotFound from "./pages/NotFound.jsx";
import axios from "axios";
import {server} from "./constants/config.js";
import {useDispatch, useSelector} from "react-redux";
import {userExists, userNotExists} from "./redux/reducers/auth.js";
import {Toaster} from "react-hot-toast";

const Home = lazy(() => import("./pages/Home.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const Chat = lazy(() => import("./pages/Chart.jsx"));
const Group = lazy(() => import("./pages/Group.jsx"));

const AdminLogin = lazy(() => import("./pages/admin/AdminLogin.jsx"));
const AdminDashboard = lazy(() => import("./pages/admin/Dashboard.jsx"));
const UserManagement = lazy(() => import("./pages/admin/UserManagement.jsx"));
const ChatManagement = lazy(() => import("./pages/admin/ChatManagement.jsx"));
const MessageManagement = lazy(
  () => import("./pages/admin/MessageMagnagement.jsx"),
);

const App = () => {
  const {user, loader} = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`${server}/api/v1/user/profile`, {withCredentials: true})
      .then((res) => dispatch(userExists(res.data.user)))
      .catch((err) => dispatch(userNotExists()));
  }, [dispatch]);

  return loader ? (
    <LayOutLoader />
  ) : (
    <BrowserRouter>
      <Suspense fallback={<LayOutLoader />}>
        <Routes>
          <Route element={<ProtectRoute user={user} />}>
            <Route path="/" element={<Home />} />
            <Route path="/chat/:chatId" element={<Chat />} />
            <Route path="/groups" element={<Group />} />
          </Route>
          <Route
            path="/login"
            element={
              <ProtectRoute user={!user} redirect="/">
                <Login />
              </ProtectRoute>
            }
          />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/chats" element={<ChatManagement />} />
          <Route path="/admin/messages" element={<MessageManagement />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Toaster position="bottom-center" />
    </BrowserRouter>
  );
};

export default App;
