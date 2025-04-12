import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Form(props) {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false); // ✅ Add loading state

  function UpperCase() {
    setText(text.toUpperCase());
  }

  function onChangeHandler(event) {
    setText(event.target.value);
  }

  function CopyText() {
    navigator.clipboard.writeText(text);
  }

  console.log("API URL:", process.env.REACT_APP_BASE_API_URL);

  const fetchData = async () => {
    console.log("Password being sent:", text);
    setLoading(true); // ✅ Start loading

    try {
      let result = await fetch(`${process.env.REACT_APP_BASE_API_URL}/signUp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: text,
        }),
      });

      if (!result.ok) {
        throw new Error(`HTTP error! Status: ${result.status}`);
      }

      result = await result.json();

      if (result && result.result) {
        console.warn(result);
        localStorage.setItem("user", JSON.stringify(result.result));
        setText("");
      } else {
        console.error("Invalid response from API:", result);
      }
    } catch (error) {
      console.error("Error occurred during fetch:", error);
    } finally {
      setLoading(false); // ✅ End loading
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        if (parsedUser && text === parsedUser.password) {
          sessionStorage.setItem("isAuthenticated", "true");
          navigate(`/secure-gallery/${parsedUser._id}`);
        }
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
      }
    }
  }, [text, navigate]);

  return (
    <div className="container my-5">
      <h1>Enter text below</h1>
      <div className="mb-3">
        <label htmlFor="exampleFormControlTextarea1" className="form-label">
          Example textarea
        </label>
        <textarea
          className={`form-control bg-${props.mode} text-${
            props.mode === "light" ? "dark" : "light"
          }`}
          id="exampleFormControlTextarea1"
          rows="15"
          value={text}
          onChange={onChangeHandler}
        ></textarea>
      </div>
      <button type="button" className="btn btn-primary" onClick={UpperCase}>
        UpperCase
      </button>
      <button type="button" className="btn btn-primary mx-2" onClick={CopyText}>
        Copy Text
      </button>

      {/* ✅ Show loading state for the Set Password button */}
      {!localStorage.getItem("user") && (
        <button
          type="button"
          className="btn btn-primary mx-2"
          onClick={fetchData}
          disabled={loading}
        >
          {loading ? "Creating User..." : "Set Password"}
        </button>
      )}

      <div className="container my-2">
        <p>No of Elements - {text.length}</p>
        <p>
          No of words -{" "}
          {text.trim() === "" ? 0 : text.trim().split(/\s+/).length}
        </p>
      </div>
    </div>
  );
}
