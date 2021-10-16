import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";

const Cart = ({
  products,
  handleAddProduct,
  handleRemoveProduct,
  handleEmptyCart,
  onToken,
  user,
}) => {
  const totalPrice = products.reduce(
    (sale_price, x) => sale_price + x.quantity * x.sale_price,
    0
  );

  return (
    <>
      <h3 className="heading pt-4">Shopping Cart</h3>
      <hr />

      {products.length !== 0 && (
        <>
          <div className="d-flex row m-2 align-items-center">
            <div className="col-md-2">
              <button
                type="button"
                className="btn btn-danger"
                style={{ backgroundColor: "#392613", color: "white" }}
                onClick={() => handleEmptyCart()}
              >
                Empty Cart
              </button>
            </div>
          </div>
        </>
      )}
      <hr />
      <div className="content pt-4 row">
        {products.length === 0 ? (
          <div>Cart is empty</div>
        ) : (
          <>
            {products.map((x) => {
              return (
                <div className="d-flex row m-2 align-items-center" key={x.id}>
                  <div className="col-md-2">
                    <img src={"http://127.0.0.1:8000" + x.image} width="70px" />
                  </div>
                  <div className="col-md-3">{x.product_name}</div>
                  <div className="col-md-2">
                    <div className="row w-50">
                      <div className="w-50">
                        <button
                          onClick={() => handleAddProduct(x)}
                          className="btn btn-sm btn-success"
                          style={{ backgroundColor: "#392613", color: "white" }}
                        >
                          +
                        </button>
                      </div>
                      <div className="w-50 text-end">
                        <button
                          onClick={() => handleRemoveProduct(x)}
                          className="btn btn-sm btn-danger"
                          style={{ backgroundColor: "#392613", color: "white" }}
                        >
                          -
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-2">
                    {x.quantity} * ${x.sale_price}
                  </div>
                </div>
              );
            })}
            <hr />
            <div className="d-flex row m-2 align-items-center">
              <div className="col-md-2 text"></div>
              <div className="col-md-3 text">
                {user.length !== 0 ? (
                  <StripeCheckout
                    token={onToken}
                    name="Amar Tauqeer"
                    amount={totalPrice * 100}
                    currency="USD"
                    locale="at"
                    shippingAddress="shipping address"
                    zipCode={true}
                    stripeKey="pk_test_51IBn26IIuSnyNovEpM9t7OQHJ07FOST6XEyZwCbBUJyMEFHJTwGJnHfvSsX5nLkjxDLyrovZmQOjEEIRZNmoNajD00ElrCeNAI"
                  />
                ) : (
                  <>
                    For Checkout first{" "}
                    <Link to="/signin" style={{ color: "black" }}>
                      Signin
                    </Link>
                  </>
                )}
              </div>

              <div className="col-md-2 text">
                <h5>Total Price</h5>
              </div>
              <div className="col-md-2 text">
                <h5>${totalPrice}</h5>
              </div>
            </div>
            <hr />
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
