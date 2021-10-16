import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../pages/Home";
import SignIn from "../pages/authentication/SignIn";
import SignUp from "../pages/authentication/SignUp";
import ChangePassword from "../pages/authentication/ChangePassword";
import NewCategory from "../pages/category/NewCategory";
import CategoryList from "../pages/category/CategoryList";
import UpdateCategory from "../pages/category/UpdateCategory";
import ProductList from "../pages/product/ProductList";
import NewProduct from "../pages/product/NewProduct";
import UpdateProduct from "../pages/product/UpdateProduct";
import ProductGallery from "../pages/product/ProductGallery";
import CustomerList from "../pages/customer/CustomerList";
import NewCustomer from "../pages/customer/NewCustomer";
import Contact from "../pages/Contact";
import Order from "../pages/order/Order";
import Cart from "../pages/cart/Cart";
import Dashboard from "../pages/Dashboard";
import UpdateCustomer from "../pages/customer/UpdateCustomer";
import ImageSlider from "../slider/ImageSlider";
import Profile from "../pages/authentication/Profile";
import OrderDetail from "../pages/order/OrderDetail";

const Main = ({
  products,
  user,
  handleAddProduct,
  handleRemoveProduct,
  handleEmptyCart,
  onToken,
}) => {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Home products={products} />
        </Route>
        <Route exact path="/slider">
          <ImageSlider />
        </Route>

        <Route exact path="/contact">
          <Contact products={products} />
        </Route>
        <Route exact path="/signin">
          <SignIn />
        </Route>
        <Route exact path="/signup">
          <SignUp />
        </Route>
        <Route exact path="/product-gallery">
          <ProductGallery handleAddProduct={handleAddProduct} />
        </Route>
        <Route exact path="/cart">
          <Cart
            products={products}
            handleAddProduct={handleAddProduct}
            handleRemoveProduct={handleRemoveProduct}
            handleEmptyCart={handleEmptyCart}
            onToken={onToken}
            user={user}
          />
        </Route>

        {user !== "" && (
          <>
            <Route exact path="/dashboard">
              <Dashboard user={user} />
            </Route>
            <Route exact path="/category">
              <CategoryList />
            </Route>
            <Route exact path="/add-category">
              <NewCategory />
            </Route>
            <Route exact path="/update-category/:id">
              <UpdateCategory />
            </Route>

            <Route exact path="/product">
              <ProductList />
            </Route>
            <Route exact path="/add-product">
              <NewProduct />
            </Route>
            <Route exact path="/update-product/:id">
              <UpdateProduct />
            </Route>

            <Route exact path="/customer">
              <CustomerList />
            </Route>
            <Route exact path="/add-customer">
              <NewCustomer />
            </Route>
            <Route exact path="/update-customer/:id">
              <UpdateCustomer />
            </Route>
            <Route exact path="/order">
              <Order user={user} />
            </Route>
            <Route exact path="/order-detail/:paramId">
              <OrderDetail user={user} />
            </Route>

            <Route exact path="/change-password">
              <ChangePassword />
            </Route>
            <Route exact path="/profile">
              <Profile user={user} />
            </Route>
          </>
        )}
      </Switch>
    </>
  );
};

export default Main;
