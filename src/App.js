import './App.css';
import React from "react";
import { useSelector } from "react-redux";
import Blogs from "./Components/Blogs";
import Homepage from "./Components/Homepage";
import Navbar from "./Components/Navbar";
import { selectSignedIn } from "./features/userSlice";
import "./styling/app.css";

const App = () => {
  const isSignedIn = useSelector(selectSignedIn);

  return (
    <div className="app">
      <Navbar />
      <Homepage />
      {isSignedIn && <Blogs />}
    </div>
  );
};

export default App;

// OAuth Client id 837352898406-p6q5munafisueurjdv4uh2hen1o1b813.apps.googleusercontent.com
