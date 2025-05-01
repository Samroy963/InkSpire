import logo from "./logo.svg";
import "./App.css";
import Post from "./post";
import Header from "./header";
import { Routes, Route } from "react-router-dom";
import Layout from "./layout";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CreatePost from "./pages/CreatePost";
import PostPage from "./pages/PostPage";
import { UserContextProvider } from "./pages/UserContext";
import EditPost from "./pages/EditPost";




function App() {
  return (
    <UserContextProvider>
        <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<IndexPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/edit/:id" element={<EditPost />} />
      </Route>
    </Routes>
    </UserContextProvider>
  );
}

export default App;
