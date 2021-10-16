import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { categoryValidator } from "../validation";
import axios from "axios";
import loader from "../../../images/fading-lines.gif";

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({
    success: "",
    error: "",
    warning: "",
    color: "",
  });

  const [customError, setCustomError] = useState({
    nameError: "",
    descError: "",
  });

  const history = useHistory();

  //   const addCategory = () => {
  //     if (categoryName && description) {
  //       const userData = {
  //         category_name: categoryName,
  //         category_description: description,
  //       };
  //       axios
  //         .post("http://127.0.0.1:8000/add_category/", userData)
  //         .then((res) => {
  //           if (!res.data) {
  //             setMessage({
  //               error: "There are issues to insert the record",
  //               color: "red",
  //             });
  //           } else {
  //             setMessage({
  //               success: `${categoryName} saved successfully.`,
  //               color: "green",
  //             });
  //           }
  //         });
  //     }
  //   };

  const handleSubmit = (e) => {
    e.preventDefault();

    // const validationResult = categoryValidator(categoryName, description);
    // setCustomError({
    //   nameError: validationResult.nameError,
    //   descError: validationResult.descError,
    // });
    // const isValid = validationResult.valid;
    // if (isValid) {
    //   // add category
    //   // loading
    //   //   setLoading(true);
    //   //   addCategory();
    //   //   setLoading(false);
    //   // clear form data
    //   //   setCustomError({ nameError: "", descError: "" });
    //   //   setCategoryName("");
    //   //   setDescription("");
    // }
  };
  return (
    <form onSubmit={handleSubmit}>
      <h3 className="heading pt-4">Profile</h3>
      <hr />
      <div className="row pt-4">
        <div className="col-md-2">
          <label for="password" className="col-form-label-sm"></label>
        </div>
        <div className="col-md-4 text-center">
          {loading ? (
            <>
              <img src={loader} alt="loader" />
            </>
          ) : message.success ? (
            <div style={{ color: `${message.color}` }}>{message.success}</div>
          ) : (
            <div style={{ color: `${message.color}` }}>{message.error}</div>
          )}
        </div>
      </div>
      <div className="d-flex row pb-1 pt-4 justify-content-center">
        <div className="col-md-2 text-end">
          <label className="col-form-label-sm ">
            <b>User Name :</b>
          </label>
        </div>
        <div className="col-md-4 has-validation">
          <input
            type="text"
            name="name"
            className="form-control form-control-sm"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="off"
          />
          {/* {customError.nameError && (
            <div className="validation-input">{customError.nameError}</div>
          )} */}
        </div>
      </div>
      <div className="d-flex row justify-content-center">
        <div className="col-md-2 text-end">
          <label className="col-form-label-sm ">
            <b>Password :</b>
          </label>
        </div>
        <div className="col-md-4">
          <input
            type="password"
            name="password"
            value={password}
            className="form-control form-control-sm"
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="off"
          />
          {/* {customError.descError && (
            <div className="validation-input">{customError.descError}</div>
          )} */}
        </div>
      </div>
      <div className="d-flex row pt-1 pb-4 justify-content-center">
        <div className="col-md-2">
          <label for="password" className="col-form-label-sm"></label>
        </div>
        <div className="col-md-4 pb-4 text-end">
          <button
            type="submit"
            onClick={handleSubmit}
            className="btn btn-primary btn-sm form-control"
            style={{ backgroundColor: "#392613", color: "white" }}
          >
            Update
          </button>
        </div>
      </div>
    </form>
  );
};

export default Profile;
