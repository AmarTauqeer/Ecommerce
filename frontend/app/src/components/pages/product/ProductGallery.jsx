import React, { useState, useEffect } from "react";
import "./product-list.css";
import axios from "axios";

const ProductGallery = ({ handleAddProduct }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState(0);
  const [data, setData] = useState([]);
  const [message, setMessage] = useState({
    success: "",
    error: "",
    warning: "",
    color: "",
  });

  // get product
  const fetchProducts = async () => {
    await axios
      .get("http://127.0.0.1:8000/all_product/")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h3 className="heading pt-4">Product Gallery</h3>
      <hr />
      {data && (
        <div className="row pt-4" style={{ padding: "10px" }}>
          {data.map((x) => {
            return (
              <>
                <div
                  className="col-md-3"
                  style={{ height: "350px" }}
                  key={x.id}
                >
                  <div className="card">
                    <img
                      className="card-img-top"
                      src={"http://127.0.0.1:8000" + x.image}
                      alt="product image"
                      height="150px"
                    />
                    <div className="card-body">
                      <h5 className="card-title">{x.product_name}</h5>
                      <p className="card-text">{x.product_description}</p>
                      <p className="card-text">
                        <b>${x.sale_price}</b>
                      </p>
                      <button
                        type="button"
                        className="btn btn-success btn-sm form-control"
                        style={{ backgroundColor: "#392613", color: "white" }}
                        onClick={() => handleAddProduct(x)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
