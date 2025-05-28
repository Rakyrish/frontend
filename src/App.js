import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Header from "./pages/header";
import Home from "./pages/home";
import Signup from "./auth/signup";
import Login from "./auth/login";

// Component to handle routing and conditional Header rendering
function MainApp() {
  const location = useLocation(); // Now safe to use inside BrowserRouter
  const hideHeaderRoutes = ["/", "/login"];

  return (
    <>
      {!hideHeaderRoutes.includes(location.pathname) && <Header />}
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/"  element={<Signup />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <MainApp />
    </BrowserRouter>
  );
}

export default App;