import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./signin.css";
import { validator } from "../validation";
import axios from "axios";

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const [customError, setCustomError] = useState({
    nameError: "",
    passError: "",
    confirmPassError: "",
  });

  const history = useHistory();

  const addUsers = () => {
    if (userName && password) {
      const userData = {
        user_name: userName,
        user_password: password,
        is_admin: isAdmin,
      };
      axios.post("http://127.0.0.1:8000/add_user/", userData).then((res) => {
        if (res.data) {
          history.push("/signin");
        } else {
          alert("There are issues to insert the record");
        }
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationResult = validator(userName, password, confirmedPassword);
    setCustomError({
      nameError: validationResult.nameError,
      passError: validationResult.passError,
      confirmPassError: validationResult.confirmPassError,
    });
    const isValid = validationResult.valid;
    if (isValid) {
      // check user
      addUsers();
      // clear form data
      setCustomError({ nameError: "", passError: "", confirmPassError: "" });
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <h3 className="heading pt-4">Sign up</h3>
      <hr />
      <div className="d-flex row pt-4 justify-content-center">
        <div className="col-md-2 text-end">
          <label className="col-form-label ">
            <b>User Name :</b>
          </label>
        </div>
        <div className="col-md-4 has-validation">
          <input
            type="text"
            name="username"
            className="form-control"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          {customError.nameError && (
            <div className="validation-input">{customError.nameError}</div>
          )}
        </div>
      </div>
      <div className="d-flex row justify-content-center pt-1">
        <div className="col-md-2 text-end">
          <label className="col-form-label ">
            <b>Password :</b>
          </label>
        </div>
        <div className="col-md-4">
          <input
            type="password"
            name="password"
            value={password}
            className="form-control"
            onChange={(e) => setPassword(e.target.value)}
          />
          {customError.passError && (
            <div className="validation-input">{customError.passError}</div>
          )}
        </div>
      </div>
      <div className="d-flex row justify-content-center pt-1">
        <div className="col-md-2 text-end">
          <label className="col-form-label ">
            <b>Confirmed password :</b>
          </label>
        </div>
        <div className="col-md-4">
          <input
            type="password"
            name="confirmPassword"
            value={confirmedPassword}
            className="form-control"
            onChange={(e) => setConfirmedPassword(e.target.value)}
          />
          {customError.confirmPassError && (
            <div className="validation-input">
              {customError.confirmPassError}
            </div>
          )}
        </div>
      </div>

      <div className="d-flex row justify-content-center pt-1">
        <div className="col-md-2">
          <label for="password" className="col-form-label"></label>
        </div>
        <div className="col-md-4 text-end">
          <button
            type="submit"
            onClick={handleSubmit}
            className="btn btn-primary form-control"
            style={{ backgroundColor: "#392613", color: "white" }}
          >
            Sign up
          </button>
        </div>
      </div>
      <div className="d-flex row justify-content-center pt-1">
        <div className="col-md-2">
          <label className="col-form-label-sm"></label>
        </div>
        <div className="col-md-4 text-end">
          <p>
            already have an account?
            <Link to="/signin" style={{ color: "black" }}>
              {" "}
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
};

export default SignUp;
