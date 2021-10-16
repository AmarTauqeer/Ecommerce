import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { categoryValidator } from "../validation";
import axios from "axios";
import loader from "../../../images/fading-lines.gif";

const UpdateCategory = () => {
  const [loading, setLoading] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [catId, setCatId] = useState("");
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
  const { id } = useParams();

  const fetchCategory = () => {
    axios
      .get("http://127.0.0.1:8000/all_category/")
      .then((res) => {
        let category = res.data;
        const selectedCat = category.filter((item) => item.id === parseInt(id));
        setCategoryName(selectedCat[0].category_name);
        setDescription(selectedCat[0].category_description);
        setCatId(parseInt(id));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (id && id !== null) fetchCategory();
  }, [id]);

  const updateCategory = () => {
    if (categoryName && description) {
      const userData = {
        category_name: categoryName,
        category_description: description,
      };
      axios
        .put(`http://127.0.0.1:8000/update_category/${catId}`, userData)
        .then((res) => {
          if (!res.data) {
            setMessage({
              error: "There are issues to update the record",
              color: "red",
            });
          } else {
            setMessage({
              success: `${categoryName} updated successfully.`,
              color: "green",
            });
          }
        });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationResult = categoryValidator(categoryName, description);
    setCustomError({
      nameError: validationResult.nameError,
      descError: validationResult.descError,
    });
    const isValid = validationResult.valid;
    if (isValid) {
      // add category
      // loading
      setLoading(true);
      updateCategory();
      setLoading(false);

      // clear form data
      setCustomError({ nameError: "", descError: "" });
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <h3 className="heading pt-4">Update Category</h3>
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
      <div className="row pb-1 pt-4">
        <div className="col-md-2 text-end">
          <label className="col-form-label-sm ">
            <b>Category Name :</b>
          </label>
        </div>
        <div className="col-md-4 has-validation">
          <input
            type="text"
            name="categoryName"
            className="form-control form-control-sm"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            autoComplete="off"
          />
          {customError.nameError && (
            <div className="validation-input">{customError.nameError}</div>
          )}
        </div>
      </div>
      <div className="row">
        <div className="col-md-2 text-end">
          <label className="col-form-label-sm ">
            <b>Description :</b>
          </label>
        </div>
        <div className="col-md-4">
          <input
            type="text"
            name="description"
            value={description}
            className="form-control form-control-sm"
            onChange={(e) => setDescription(e.target.value)}
            autoComplete="off"
          />
          {customError.descError && (
            <div className="validation-input">{customError.descError}</div>
          )}
        </div>
      </div>
      <div className="row pt-1">
        <div className="col-md-2">
          <label for="password" className="col-form-label-sm"></label>
        </div>
        <div className="col-md-4 text-end">
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

export default UpdateCategory;
