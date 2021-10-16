import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./signin.css";
import { validator } from "../validation";
import axios from "axios";

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const [customError, setCustomError] = useState({
    nameError: "",
    passError: "",
  });

  const history = useHistory();

  const checkUsers = () => {
    if (userName && password) {
      const userData = {
        user_name: userName,
        user_password: password,
        is_admin: isAdmin,
      };

      axios.post("http://127.0.0.1:8000/check_user/", userData).then((res) => {
        if (
          res.data === "Account doesn't exist" ||
          res.data === "Email or password incorrect" ||
          res.data === "You are not authorized to access dashboad"
        ) {
          alert("invalid user name or password");
        } else {
          localStorage.setItem(
            "userInfo",
            JSON.stringify({
              ...userData,
              is_admin: isAdmin,
              id: res.data.id,
            })
          );
          //Session.set("userInfo", userData);
          if (res.data.is_admin === true) {
            history.push("/dashboard");
            window.location.reload(false);
          } else {
            history.push("/");
            window.location.reload(false);
          }
        }
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationResult = validator(userName, password);

    setCustomError({
      nameError: validationResult.nameError,
      passError: validationResult.passError,
    });
    const isValid = validationResult.valid;
    if (isValid) {
      // check user
      console.log(isAdmin);
      checkUsers();
      // clear form data
      setCustomError({ nameError: "", passError: "" });
    }
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "60vh",
        }}
      >
        <form onSubmit={handleSubmit}>
          <h3 className="heading pt-4 pb-4 text-center">Sign in</h3>
          <div className="row">
            <div className="col has-validation">
              <input
                type="text"
                name="username"
                className="form-control"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                autoComplete="off"
              />
              {customError.nameError && (
                <div className="validation-input">{customError.nameError}</div>
              )}
            </div>
          </div>
          <div className="row pt-2">
            <div className="col">
              <input
                type="password"
                name="password"
                value={password}
                className="form-control"
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="off"
              />
              {customError.passError && (
                <div className="validation-input">{customError.passError}</div>
              )}
            </div>
          </div>
          <div className="row pt-2">
            <div className="col text-end">
              <div className="form-check">
                <label>Is Admin</label>
                {"  "}
                <input
                  type="checkbox"
                  name="isAdmin"
                  value={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                  autoComplete="off"
                />
              </div>
            </div>
          </div>

          <div className="row pt-2">
            <div className="col">
              <button
                type="submit"
                onClick={handleSubmit}
                className="btn btn-primary form-control"
              >
                Sign in
              </button>
            </div>
          </div>
          <div className="row pt-2">
            <div className="col text-end">
              <p>
                don't have an account?
                <Link to="/signup" style={{ color: "black" }}>
                  {" "}
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignIn;
