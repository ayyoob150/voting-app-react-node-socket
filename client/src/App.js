import { Route, Routes } from "react-router";
import Home from "./components/Home";
import Feed from "./components/Feed";
import Admin from "./components/pages/Admin";
import SignUp from "./components/Auth/SignUp";
import Login from "./components/Auth/Login";
import { ContextProvider } from "./context/context";


function App() {
  return (
  <ContextProvider>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Login />} />
          <Route path="/home" element={<Feed/>} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/admin" element={<Admin/>} />
          <Route path="/adminlogin" element={<Login admin={"admin"}/>} />
        </Route>
      </Routes>
  </ContextProvider>

  )
}

export default App;
