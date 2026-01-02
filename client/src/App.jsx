import React, {lazy, Suspense} from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import ProtectRoute from "./components/auth/ProtectRoute";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Chart = lazy(() => import("./pages/Chart"));
const Group = lazy(() => import("./pages/Group"));

let user = true;

const App = () => {
  return (
    <BrowserRouter>
     <Suspense fallback={<div>loading...</div>}>
       <Routes>
        <Route element={<ProtectRoute user={user}/>}>
          <Route path="/" element={<Home />} />
          <Route path="/chart/:chatId" element={<Chart />} />
          <Route path="/group" element={<Group />} />
        </Route>
        <Route path="/login" element={<ProtectRoute user={!user} redirect="/"><Login /></ProtectRoute>} />
        <Route path="*" element={<div>404</div>}/>
      </Routes>
     </Suspense>
    </BrowserRouter>
  );
};

export default App;
