import "./App.css";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import RegisterPage from "./screen/RegisterPage";
import LoginPage from "./screen/LoginPage";
import BlogPage from "./screen/BlogPage";
import UserBlog from "./screen/UserBlog";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route exact path="/" element={<BlogPage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/register" element={<RegisterPage />} />
        <Route exact path="/my-blogs" element={<UserBlog />} />p
      </Routes>
    </>
  );
}

export default App;
