import React, { useState, useEffect } from "react";
import axios from "axios";

const Order = ({ user }) => {
  const [pdata, setPdata] = useState([]);
  const [odata, setOdata] = useState([]);
  const [users, setUsers] = useState([]);

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
        console.log(res.data);
        if (res.data) {
          const ordData = res.data;
          console.log(user);
          const filterData = ordData.filter((x) => x.user === user.id);
          console.log(filterData);
          setOdata(filterData);
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
    prod();
    order();
    userData();
  }, []);

  return (
    <>
      <h3 className="heading pt-4">Customer Orders</h3>
      <hr />
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
                    color: "white",
                  }}
                >
                  <div className="col-md-1">#</div>
                  <div className="col-md-2">Date</div>
                  <div className="col-md-2">Party</div>
                  <div className="col-md-2">Status</div>
                  <div className="col-md-2">Amount</div>
                </div>
                {odata.map((x) => {
                  return (
                    <div className="row pt-4 border" key={x.id}>
                      <div className="col-md-1">{x.id}</div>
                      <div className="col-md-2">{x.create_date}</div>
                      <div className="col-md-2">
                        {users && (
                          <>
                            {users
                              .filter((u) => u.id === x.user)
                              .map((filterName) => (
                                <div key={filterName.id}>
                                  {filterName.user_name}
                                </div>
                              ))}
                          </>
                        )}
                      </div>
                      <div className="col-md-2 mb-4">
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
                    </div>
                  );
                })}
                <br />
                <br />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Order;
