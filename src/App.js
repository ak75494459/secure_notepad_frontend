import "./App.css";
import Navbar from "./Components/Navbar.js";
import Form from "./Components/Form";
import React, { useState } from "react";
import Alert from "./Components/Alert";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateCom from "./Components/PrivateCom.js";
import GalleryPage from "./Pages/GalleryPage.js";

function App() {
  const [text, setText] = useState("Enable DarkMode");
  const [mode, setMode] = useState("light");

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      Type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "lightgray";
      setText("Enable LightMode");
      showAlert("Dark mode is enable", "success");
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
      setText("Enable DarkMode");
      showAlert("Light mode is enable", "success");
    }
  };
  const [alert, setAlert] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar mode={mode} toggleMode={toggleMode} textChange={text} />
              <Alert alert={alert} />
              <Form mode={mode} />
            </>
          }
        />
        <Route element={<PrivateCom />}>
          <Route path={`/secure-gallery/:id`} element={<GalleryPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
