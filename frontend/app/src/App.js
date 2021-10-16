import { useState, useEffect } from "react";
import "./App.css";
import Main from "./components/navigation/Main";
import Sidebar from "./components/navigation/Sidebar";
import { BrowserRouter as Router } from "react-router-dom";
import ClientNavbar from "./components/navigation/ClientNavbar";
import axios from "axios";
import ImageSlider from "./components/slider/ImageSlider";
import { SliderData } from "./components/slider/Sliderdata";

function App() {
  const [cartItems, setCartItems] = useState([]);

  // get user info
  let user = localStorage.getItem("userInfo");
  if (user) {
    user = JSON.parse(user);
  }

  // add cart items functions
  const handleAddProduct = (proddata) => {
    // get cart items
    let cart = localStorage.getItem("cart");
    if (cart) {
      cart = JSON.parse(cart);
      setCartItems(cart);
    }

    const exist = cartItems.find((x) => x.id === proddata.id);

    if (exist !== undefined) {
      setCartItems(
        cartItems.map((x) =>
          x.id === proddata.id
            ? {
                ...exist,
                quantity: exist.quantity + 1,
              }
            : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...proddata, quantity: 1 }]);
    }
  };
  // remove cart item

  const handleRemoveProduct = (product) => {
    // get cart items
    let cart = JSON.parse(localStorage.getItem("cart"));
    setCartItems(cart);

    const exist = cartItems.find((x) => x.id === product.id);

    if (exist) {
      if (exist.quantity === 1) {
        let data = cartItems.filter((item) => item.id !== product.id);
        setCartItems(cartItems.filter((item) => item.id !== product.id));
      } else {
        setCartItems(
          cartItems.map((item) =>
            item.id === product.id
              ? { ...exist, quantity: exist.quantity - 1 }
              : item
          )
        );
      }
    }
  };

  // clear the cart
  const handleEmptyCart = () => {
    localStorage.setItem("cart", []);
    setCartItems([]);
  };

  // stripe token and cart

  const addOrder = () => {
    let totalPrice = 0;
    // get total amount
    if (cartItems.length > 0) {
      totalPrice = cartItems.reduce(
        (sale_price, x) => sale_price + x.quantity * x.sale_price,
        0
      );
    }

    const orderData = {
      user: user.id,
      order_amount: totalPrice,
    };
    axios
      .post("http://127.0.0.1:8000/add_order/", orderData)
      .then((res) => {
        if (res.data) {
          console.log("data added to cart successful");
          orderDetail(res.data.id);
        }
      })
      .catch((err) => console.log(err));

    // order detail

    const orderDetail = (orderid) => {
      if (cartItems.length > 0) {
        for (let index = 0; index < cartItems.length; index++) {
          const element = cartItems[index];
          const data = {
            order: orderid,
            product: element.id,
            qty: element.quantity,
            price: element.sale_price,
            amount_per_product: element.quantity * element.sale_price,
          };
          axios
            .post("http://127.0.0.1:8000/add_order_detail/", data)
            .then((res) => {
              if (res.data) {
                console.log("data added to order detail successful");
              }
            })
            .catch((err) => console.log(err));
        }
      }
    };
  };

  const onToken = (token) => {
    //console.log(token);
    if (token) {
      addOrder();
      localStorage.setItem("cart", []);
      setCartItems([]);
      alert("An order is placed successfully.");
    }
  };

  return (
    <div className="container">
      <Router>
        <div
          className="row"
          style={
            {
              // border: "solid 1px red",
            }
          }
        >
          {/* if page is referesh */}
          {window.performance.navigation.type == 1 &&
            cartItems.length === 0 &&
            localStorage.getItem("cart") &&
            setCartItems(JSON.parse(localStorage.getItem("cart")))}
          {/* if page is referesh */}

          {cartItems.length === 0 ||
            (cartItems === "" && localStorage.setItem("cart", "q"))}

          {/* after addition subtraction */}
          {cartItems.length > 0 &&
            localStorage.setItem("cart", JSON.stringify(cartItems))}
          {/* after addition subtraction */}

          {user.is_admin === true ? (
            <>
              <div
                className="col-md-3"
                style={{
                  // border: "solid 3px green",
                  padding: 0,
                  margin: 0,
                }}
              >
                <Sidebar
                  products={cartItems}
                  user={user}
                  handleAddProduct={handleAddProduct}
                />
              </div>
              <div className="col-md-9  border">
                <Main
                  products={cartItems}
                  user={user}
                  handleAddProduct={handleAddProduct}
                  handleRemoveProduct={handleRemoveProduct}
                  handleEmptyCart={handleEmptyCart}
                  onToken={onToken}
                />
              </div>
            </>
          ) : (
            <div>
              <div
                style={
                  {
                    // border: "solid 3px blue",
                  }
                }
              >
                <ClientNavbar user={user} products={cartItems} />
                <ImageSlider slides={SliderData} />
              </div>
              <div className="container border">
                <Main
                  products={cartItems}
                  user={user}
                  handleAddProduct={handleAddProduct}
                  handleRemoveProduct={handleRemoveProduct}
                  handleEmptyCart={handleEmptyCart}
                  onToken={onToken}
                />
              </div>
            </div>
          )}
        </div>
      </Router>
    </div>
  );
}

export default App;
