import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Header from "./pages/header";
import Home from "./pages/home";
import Signup from "./auth/signup";
import Login from "./auth/login";
import View from "./pages/view";
import Create from "./pages/create";
import Update from "./pages/update";
import Delete from "./pages/delete";
import { UserProvider } from "./auth/context";


// Component to handle routing and conditional Header rendering
function MainApp() {
  const location = useLocation(); // Now safe to use inside BrowserRouter
  const hideHeaderRoutes = ["/", "/login"];

  return (
    <UserProvider>
       {!hideHeaderRoutes.includes(location.pathname) && <Header />}
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/view" element={<View />} />
        <Route path="/create" element={<Create/>} />
        <Route path="/read" element={<Home />} />
        <Route path="/update" element={<Update />} />
        <Route path="/delete" element={<Delete />} />
        <Route path="/"  element={<Signup />} />
      </Routes>
    </UserProvider>

     
    
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