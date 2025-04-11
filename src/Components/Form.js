import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Form(props) {
  const navigate = useNavigate();
  const [text, setText] = useState("");

  // Convert text to uppercase
  function UpperCase() {
    setText(text.toUpperCase());
  }

  // Handle text input changes
  function onChangeHandler(event) {
    setText(event.target.value);
  }

  // Copy text to clipboard
  function CopyText() {
    navigator.clipboard.writeText(text);
  }

  // Log the API URL for debugging
  console.log("API URL:", process.env.REACT_APP_BASE_API_URL);

  // Fetch data from API and store the user info in localStorage
  const fetchData = async () => {
    console.log("Password being sent:", text);

    try {
      let result = await fetch(`${process.env.REACT_APP_BASE_API_URL}/signUp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // fix: "Content-Type" was lowercase
        },
        body: JSON.stringify({
          password: text,
        }),
      });

      if (!result.ok) {
        throw new Error(`HTTP error! Status: ${result.status}`);
      }

      result = await result.json();

      // Check if result.result exists before setting localStorage
      if (result && result.result) {
        console.warn(result);
        localStorage.setItem("user", JSON.stringify(result.result));
        setText(""); // Clear the input field
      } else {
        console.error("Invalid response from API:", result);
      }
    } catch (error) {
      console.error("Error occurred during fetch:", error);
    }
  };

  // Check if user is authenticated when the component mounts
  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        // Check if the user exists and if the entered text matches the password
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

      {/* Only show Set Password button if no user is in localStorage */}
      {localStorage.getItem("user") ? null : (
        <button
          type="button"
          className="btn btn-primary mx-2"
          onClick={fetchData}
        >
          Set Password
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
