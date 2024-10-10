import { useState, useEffect, createContext } from "react";
import SideBar from "./components/SideBar/SideBar";
import Main from "./components/Main/Main";
import Auth from "./components/auth";
import AOS from "aos";
import "aos/dist/aos.css";
import "./style.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const [dark, setDark] = useState(
    localStorage.getItem("dark")
      ? JSON.parse(localStorage.getItem("dark"))
      : true,
  );

  useEffect(() => {
    AOS.init({
      offset: 200,
      duration: 600,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  useEffect(() => {
    localStorage.setItem("dark", JSON.stringify(dark));
  }, [dark]);

  function handleDark() {
    setDark((prev) => !prev);
  }
  function Ai() {
    return (
      <>
        <SideBar />
        <Main handleDark={handleDark} dark={dark} />
      </>
    );
  }

  return (
    <Router>
      <div className={dark ? "dark" : "light"}>
        <div className="flex">
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={<Ai />} />
          </Routes>
        </div>
        <p className="pb-5 text-center md:hidden">Made with 💓 by GLtech</p>
      </div>
    </Router>
  );
}

export default App;
