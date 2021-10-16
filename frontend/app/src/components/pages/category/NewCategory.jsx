import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { categoryValidator } from "../validation";
import axios from "axios";
import loader from "../../../images/fading-lines.gif";

const NewCategory = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({
    success: "",
    error: "",
    warning: "",
    color: "",
  });

  const [inputs, setInputs] = useState({
    categoryName: "",
    description: "",
  });

  const [customError, setCustomError] = useState({
    nameError: "",
    descError: "",
  });

  const history = useHistory();

  const addCategory = () => {
    if (inputs.categoryName && inputs.description) {
      const userData = {
        category_name: inputs.categoryName,
        category_description: inputs.description,
      };
      axios
        .post("http://127.0.0.1:8000/add_category/", userData)
        .then((res) => {
          if (!res.data) {
            setMessage({
              error: "There are issues to insert the record",
              color: "red",
            });
          } else {
            setMessage({
              success: `${inputs.categoryName} saved successfully.`,
              color: "green",
            });
          }
        });
    }
  };

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
    const validationResult = categoryValidator(
      inputs.categoryName,
      inputs.description
    );
    setCustomError({
      nameError: validationResult.nameError,
      descError: validationResult.descError,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationResult = categoryValidator(
      inputs.categoryName,
      inputs.description
    );
    setCustomError({
      nameError: validationResult.nameError,
      descError: validationResult.descError,
    });
    const isValid = validationResult.valid;
    if (isValid) {
      // add category
      // loading
      setLoading(true);
      addCategory();
      setLoading(false);

      // clear form data
      setCustomError({ nameError: "", descError: "" });
      setInputs({
        categoryName: "",
        description: "",
      });
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <h3 className="heading pt-4">New Category</h3>
      <hr />
      <div className="row pt-1">
        <div className="col-md-2">
          <label className="col-form-label-sm">
            <Link to="/category" style={{ color: "black" }}>
              {" "}
              Back{" "}
            </Link>
          </label>
        </div>
        <div className="col-md-4 text-end"></div>
      </div>
      <div className="row pt-1">
        <div className="col-md-2">
          <label className="col-form-label-sm"></label>
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
      <div className="row pb-1 pt-4">
        <div className="col-md-2 text-end">
          <label className="col-form-label-sm">
            <b>Category Name :</b>
          </label>
        </div>
        <div className="col-md-4 has-validation">
          <input
            type="text"
            name="categoryName"
            className="form-control form-control-sm"
            value={inputs.categoryName}
            onChange={handleChange}
            autoComplete="off"
          />
          {customError.nameError && (
            <div className="validation-input">{customError.nameError}</div>
          )}
        </div>
      </div>
      <div className="row">
        <div className="col-md-2 text-end">
          <label className="col-form-label-sm">
            <b>Description :</b>
          </label>
        </div>
        <div className="col-md-4">
          <input
            type="text"
            name="description"
            value={inputs.description}
            className="form-control form-control-sm"
            onChange={handleChange}
            autoComplete="off"
          />
          {customError.descError && (
            <div className="validation-input">{customError.descError}</div>
          )}
        </div>
      </div>
      <div className="row pt-1">
        <div className="col-md-2">
          <label className="col-form-label-sm"></label>
        </div>
        <div className="col-md-4 text-end">
          <button
            type="submit"
            onClick={handleSubmit}
            className="btn btn-primary btn-sm form-control"
            style={{ backgroundColor: "#392613", color: "white" }}
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default NewCategory;
