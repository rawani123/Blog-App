import "./App.css";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import RegisterPage from "./screen/RegisterPage";
import LoginPage from "./screen/LoginPage";
import BlogPage from "./screen/BlogPage";
import UserBlog from "./screen/UserBlog";
import CreateBlog from "./screen/CreateBlog";
import BlogDetails from "./screen/BlogDetails";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route exact path="/" element={<BlogPage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/register" element={<RegisterPage />} />
        <Route exact path="/my-blogs" element={<UserBlog />} />
        <Route exact path="/create-blogs" element={<CreateBlog />} />
        <Route exact path="/blog-details/:id" element={<BlogDetails />} />
        
      </Routes>
    </>
  );
}

export default App;
