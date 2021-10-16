import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { productValidator } from "../validation";
import axios from "axios";
import loader from "../../../images/fading-lines.gif";
import uploadImage from "../../../images/default-upload-1.png";

const UpdateProduct = () => {
  const [loading, setLoading] = useState(false);
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState(0);
  const [productId, setProductId] = useState(0);
  const [fetchCategory, setFetchCategory] = useState([]);
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [purchaseRate, setPurchaseRate] = useState(1);
  const [saleRate, setSaleRate] = useState(1);
  const [message, setMessage] = useState({
    success: "",
    error: "",
    warning: "",
    color: "",
  });

  const [customError, setCustomError] = useState({
    nameError: "",
    descError: "",
    categoryError: "",
  });

  const history = useHistory();
  const { id } = useParams();

  // get category
  const fetchCategories = async () => {
    await axios
      .get("http://127.0.0.1:8000/all_category/")
      .then((res) => {
        setFetchCategory(res.data);
      })
      .catch((err) => console.log(err));
  };

  // get products

  const fetchProduct = () => {
    axios
      .get("http://127.0.0.1:8000/all_product/")
      .then((res) => {
        let product = res.data;
        const selectedProd = product.filter((item) => item.id === parseInt(id));
        setProductName(selectedProd[0].product_name);
        setDescription(selectedProd[0].product_description);
        setProductId(parseInt(id));
        setCategory(selectedProd[0].category);
        var file = selectedProd[0].image;
        setImageUrl(file);
        //setSelectedFile(file);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (id && id !== null) fetchProduct();
    fetchCategories();
  }, [id]);

  const updateProduct = () => {
    if (productName && description && category) {
      const fd = new FormData();

      fd.append("product_name", productName);
      fd.append("product_description", description);
      fd.append("category", category);
      fd.append("sale_price", saleRate);
      fd.append("purchase_price", purchaseRate);
      if (selectedFile !== "") {
        fd.append("image", selectedFile);
      }

      //Display the key/value pairs
      // for (var pair of fd.entries()) {
      //   console.log(pair[0] + ", " + pair[1]);
      // }

      axios
        .put(`http://127.0.0.1:8000/update_product/${productId}`, fd)
        .then((res) => {
          if (!res.data) {
            setMessage({
              error: "There are issues to insert the record",
              color: "red",
            });
          } else {
            setMessage({
              success: `${productName} updated successfully.`,
              color: "green",
            });
          }
        });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationResult = productValidator(
      productName,
      description,
      category
    );
    setCustomError({
      nameError: validationResult.nameError,
      descError: validationResult.descError,
      categoryError: validationResult.categoryError,
    });
    const isValid = validationResult.valid;
    if (isValid) {
      // add product
      // loading
      setLoading(true);
      updateProduct();
      setLoading(false);

      // clear form data
      setCustomError({ nameError: "", descError: "", categoryError: "" });
    }
  };

  // image handler
  const imageHandler = (e) => {
    setSelectedFile(e.target.files[0]);

    var file = e.target.files[0];
    var reader = new FileReader();
    var url = reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImageUrl(reader.result);
    };
  };
  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <h3 className="heading pt-4">Update Product</h3>
      <hr />
      <div className="row">
        <div className="col-sm-6">
          <div className="row pt-1">
            <div className="col-sm-2">
              <label className="col-form-label-sm">
                <Link to="/product" style={{ color: "black" }}>
                  {" "}
                  Back{" "}
                </Link>
              </label>
            </div>
            <div className="col-sm-4 text-end"></div>
          </div>
          <div className="row pt-1">
            <div className="col-sm-2">
              <label className="col-form-label-sm"></label>
            </div>
            <div className="col-sm-4 text-center">
              {loading ? (
                <>
                  <img src={loader} alt="loader" />
                </>
              ) : message.success ? (
                <div style={{ color: `${message.color}` }}>
                  {message.success}
                </div>
              ) : (
                <div style={{ color: `${message.color}` }}>{message.error}</div>
              )}
            </div>
          </div>
          <div className="row pb-1">
            <div className="col-sm-4 text-end">
              <label className="col-form-label-sm ">
                <b>Product Name :</b>
              </label>
            </div>
            <div className="col-sm-8">
              <input
                type="text"
                name="productName"
                className="form-control form-control-sm"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                autoComplete="off"
              />
              {customError.nameError && (
                <div className="validation-input">{customError.nameError}</div>
              )}
            </div>
          </div>
          <div className="row pb-1">
            <div className="col-sm-4 text-end">
              <label className="col-form-label-sm ">
                <b>Category Name :</b>
              </label>
            </div>
            <div className="col-sm-8 has-validation">
              <select
                className="form-control form-control-sm"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              >
                {fetchCategory.map((x) => {
                  return (
                    <option key={x.id} value={x.id}>
                      {x.category_name}
                    </option>
                  );
                })}
              </select>
              {customError.categoryError && (
                <div className="validation-input">
                  {customError.categoryError}
                </div>
              )}
            </div>
          </div>

          <div className="row">
            <div className="col-sm-4 text-end">
              <label className="col-form-label-sm ">
                <b>Description :</b>
              </label>
            </div>
            <div className="col-sm-8">
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
            <div className="col-sm-4 text-end">
              <label className="col-form-label-sm ">
                <b>Purchase Price :</b>
              </label>
            </div>
            <div className="col-sm-8">
              <input
                type="text"
                name="purchaseRate"
                value={purchaseRate}
                className="form-control form-control-sm"
                onChange={(e) => setPurchaseRate(e.target.value)}
                autoComplete="off"
              />
              {/* {customError.descError && (
            <div className="validation-input">{customError.descError}</div>
          )} */}
            </div>
          </div>
          <div className="row pt-1">
            <div className="col-sm-4 text-end">
              <label className="col-form-label-sm ">
                <b>Sale Price :</b>
              </label>
            </div>
            <div className="col-sm-8">
              <input
                type="text"
                name="saleRate"
                value={saleRate}
                className="form-control form-control-sm"
                onChange={(e) => setSaleRate(e.target.value)}
                autoComplete="off"
              />
              {/* {customError.descError && (
            <div className="validation-input">{customError.descError}</div>
          )} */}
            </div>
          </div>
          <div className="row pt-1">
            <div className="col-sm-4 text-end">
              <label className="col-form-label-sm ">
                <b>Image :</b>
              </label>
            </div>
            <div className="col-sm-8">
              <input
                name="file"
                type="file"
                className="form-control form-control-sm"
                onChange={imageHandler}
                autoComplete="off"
              />
              {/* {customError.descError && (
            <div className="validation-input">{customError.descError}</div>
          )} */}
            </div>
          </div>
          <div className="row pt-1">
            <div className="col-sm-4">
              <label className="col-form-label-sm"></label>
            </div>
            <div className="col-sm-8 text-end">
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
        </div>
        <div className="col-sm-6">
          {selectedFile === "" ? (
            <div>
              <img
                src={
                  imageUrl ? "http://127.0.0.1:8000" + imageUrl : uploadImage
                }
                style={{ paddingTop: "60px" }}
                width="300px"
                height="300px"
              />
            </div>
          ) : (
            <div>
              <img
                src={imageUrl ? imageUrl : uploadImage}
                style={{ paddingTop: "60px" }}
                width="300px"
                height="300px"
              />
            </div>
          )}
        </div>
      </div>
    </form>
  );
};

export default UpdateProduct;
