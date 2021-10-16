import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import axios from "axios";
import { Link } from "react-router-dom";

const Dashboard = ({ user }) => {
  const [cdata, setCdata] = useState([]);
  const [pdata, setPdata] = useState([]);
  const [odata, setOdata] = useState([]);
  const [users, setUsers] = useState([]);
  // get category
  const cat = async () => {
    await axios
      .get("http://127.0.0.1:8000/all_category/")
      .then((res) => {
        if (res.data) {
          setCdata(res.data.length);
        }
      })
      .catch((err) => console.log(err));
  };

  // get product
  const prod = async () => {
    await axios
      .get("http://127.0.0.1:8000/all_product/")
      .then((res) => {
        if (res.data) {
          setPdata(res.data.length);
        }
      })
      .catch((err) => console.log(err));
  };

  // get order
  const order = async () => {
    await axios
      .get("http://127.0.0.1:8000/all_order/")
      .then((res) => {
        if (res.data) {
          setOdata(res.data);
        }
      })
      .catch((err) => console.log(err));
  };

  // get user
  const userData = async () => {
    await axios
      .get("http://127.0.0.1:8000/all_user/")
      .then((res) => {
        if (res.data) {
          setUsers(res.data);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    cat();
    prod();
    order();
    userData();
  }, []);

  return (
    <>
      <h3 className="heading pt-4">Dashboard</h3>
      <hr />
      <div className="row">
        <div className="col-md-4">
          <div className="category">
            <span>Categories</span>
            <span>{cdata}</span>
          </div>
        </div>

        <div className="col-md-4">
          <div className="product">
            <span>Products</span>
            <span>{pdata}</span>
          </div>
        </div>

        <div className="col-md-4">
          <div className="order">
            <span>Orders</span>
            <span>{odata.length}</span>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="order-data">
              <div className="heading pt-4 pb-4">Orders</div>
              {odata && (
                <>
                  <div
                    className="d-flex row align-items-center"
                    style={{
                      height: "50px",
                      backgroundColor: "#392613",
                      verticalAlign: "center",
                      fontWeight: "bold",
                      color: "white",
                    }}
                  >
                    <div className="col-md-1">#</div>
                    <div className="col-md-2">Date</div>
                    <div className="col-md-2">Party</div>
                    <div className="col-md-2">Status</div>
                    <div className="col-md-2">Amount</div>
                    <div className="col-md-3">Actions</div>
                  </div>
                  {odata.map((x) => {
                    return (
                      <div className="row pt-2 border" key={x.id}>
                        <div className="col-md-1">{x.id}</div>
                        <div className="col-md-2">{x.create_date}</div>
                        <div className="col-md-2">
                          {users && (
                            <>
                              {users
                                .filter((u) => u.id === x.user)
                                .map((filterName) => (
                                  <div key={filterName}>
                                    {filterName.user_name}
                                  </div>
                                ))}
                            </>
                          )}
                        </div>
                        <div className="col-md-2">
                          {x.order_status === "Pending" ? (
                            <span style={{ backgroundColor: "lightsalmon" }}>
                              {x.order_status}
                            </span>
                          ) : (
                            <span style={{ backgroundColor: "lightgreen" }}>
                              {x.order_status}
                            </span>
                          )}
                        </div>
                        <div className="col-md-2">${x.order_amount}</div>
                        <div className="col-md-3">
                          <div className="d-flex row">
                            <div className="col-md-3">
                              <Link
                                to={`/order-detail/${x.id}`}
                                className="nav-item"
                                style={{ color: "black" }}
                              >
                                Detail
                              </Link>
                            </div>

                            {/* <div className="col-md-3">
                              <button type="button" className="btn btn-sm">
                                Edit
                              </button>
                            </div>
                            <div className="col-md-3">
                              <button type="button" className="btn btn-sm">
                                Delete
                              </button>
                            </div> */}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
