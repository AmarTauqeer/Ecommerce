import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { productValidator } from "../validation";
import axios from "axios";
import loader from "../../../images/fading-lines.gif";
import uploadImage from "../../../images/default-upload-1.png";

const OrderDetail = () => {
  const [loading, setLoading] = useState(false);
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState(0);
  const [productId, setProductId] = useState(0);
  const [fetchCategory, setFetchCategory] = useState([]);
  const [fetchProducts, setFetchProducts] = useState([]);
  const [fetchOrderDetails, setFetchOrderDetails] = useState([]);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(1);
  const [message, setMessage] = useState({
    success: "",
    error: "",
    warning: "",
    color: "",
  });

  const history = useHistory();
  const { paramId } = useParams();

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
        // const selectedProd = product.filter((item) => item.id === parseInt(id));
        setFetchProducts(product);
      })
      .catch((err) => console.log(err));
  };

  // get order detail

  const fetchOrderDetail = () => {
    axios
      .get("http://127.0.0.1:8000/all_order_detail/")
      .then((res) => {
        let orderDetail = res.data;
        const selectedOrderDetail = orderDetail.filter(
          (item) => item.order === parseInt(paramId)
        );
        setFetchOrderDetails(selectedOrderDetail);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (paramId && paramId !== null) {
      fetchCategories();
      fetchProduct();
      fetchOrderDetail();
    }
  }, [paramId]);

  const totalPrice = fetchOrderDetails.reduce(
    (amount_per_product, x) => amount_per_product + x.qty * x.price,
    0
  );
  return (
    <>
      <h3 className="heading pt-4">Order Detail</h3>
      <hr />
      <div
        className="d-flex row align-items-center"
        style={{
          height: "40px",
          backgroundColor: "#392613",
          verticalAlign: "center",
          fontWeight: "bold",
          color: "white",
        }}
      >
        <div className="col-md-1">Order</div>
        <div className="col-md-3">Product</div>
        <div className="col-md-2">Qty</div>
        <div className="col-md-3">Price</div>
        <div className="col-md-3">Amount</div>
      </div>

      {fetchOrderDetails &&
        fetchOrderDetails.map((x, index) => {
          return (
            <>
              <div className="row border pt-2" key={index}>
                <div className="col-md-1">{x.order}</div>
                <div className="col-md-3">
                  {fetchProducts
                    .filter((item) => item.id === parseInt(x.product))
                    .map((filterProduct) => filterProduct.product_name)}
                </div>
                <div className="col-md-2">{x.qty}</div>
                <div className="col-md-3">{x.price}</div>
                <div className="col-md-3">${x.amount_per_product}</div>
              </div>
            </>
          );
        })}
      <div
        className="row mt-4 border"
        style={{ backgroundColor: "#392613", color: "white" }}
      >
        <div className="col-md-1"></div>
        <div className="col-md-3"></div>
        <div className="col-md-2"></div>
        <div className="col-md-3">
          <b>Total</b>
        </div>
        <div className="col-md-3">
          <b>${totalPrice}</b>
        </div>
      </div>
    </>
  );
};

export default OrderDetail;
