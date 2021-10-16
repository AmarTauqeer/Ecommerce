import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { customerValidator } from "../validation";
import axios from "axios";
import loader from "../../../images/fading-lines.gif";

const NewCustomer = () => {
  const [loading, setLoading] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [region, setRegion] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [message, setMessage] = useState({
    success: "",
    error: "",
    warning: "",
    color: "",
  });

  const [customError, setCustomError] = useState({
    nameError: "",
    addressError: "",
    countryError: "",
    emailError: "",
  });

  const history = useHistory();

  const addCustomer = () => {
    if (customerName && address && country && email) {
      const userData = {
        customer_name: customerName,
        customer_address: address,
        customer_country: country,
        customer_state: state,
        customer_region: region,
        customer_phone: phone,
        customer_email: email,
      };
      axios
        .post("http://127.0.0.1:8000/add_customer/", userData)
        .then((res) => {
          if (!res.data) {
            setMessage({
              error: "There are issues to insert the record",
              color: "red",
            });
          } else {
            setMessage({
              success: `${customerName} saved successfully.`,
              color: "green",
            });
          }
        });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationResult = customerValidator(
      customerName,
      address,
      country,
      email
    );
    setCustomError({
      nameError: validationResult.nameError,
      addressError: validationResult.addressError,
      countryError: validationResult.countryError,
      emailError: validationResult.emailError,
    });
    const isValid = validationResult.valid;
    if (isValid) {
      // add customer
      // loading
      setLoading(true);
      addCustomer();
      setLoading(false);

      // clear form data
      setCustomError({
        nameError: "",
        addressError: "",
        countryError: "",
        emailError: "",
      });
      setCustomerName("");
      setAddress("");
      setCountry("");
      setState("");
      setRegion("");
      setPhone("");
      setEmail("");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <h3 className="heading pt-4">New Customer</h3>
      <hr />
      <div className="row pt-1">
        <div className="col-md-2">
          <label className="col-form-label-sm">
            <Link to="/customer" style={{ color: "black" }}>
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
          <label className="col-form-label-sm ">
            <b>Customer Name :</b>
          </label>
        </div>
        <div className="col-md-4 has-validation">
          <input
            type="text"
            name="customerName"
            className="form-control form-control-sm"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            autoComplete="off"
          />
          {customError.nameError && (
            <div className="validation-input">{customError.nameError}</div>
          )}
        </div>
      </div>
      <div className="row pt-1">
        <div className="col-md-2 text-end">
          <label className="col-form-label-sm ">
            <b>Address :</b>
          </label>
        </div>
        <div className="col-md-4">
          <input
            type="text"
            name="address"
            value={address}
            className="form-control form-control-sm"
            onChange={(e) => setAddress(e.target.value)}
            autoComplete="off"
          />
          {customError.addressError && (
            <div className="validation-input">{customError.addressError}</div>
          )}
        </div>
      </div>
      <div className="row pt-1">
        <div className="col-md-2 text-end">
          <label className="col-form-label-sm ">
            <b>Country :</b>
          </label>
        </div>
        <div className="col-md-4">
          <input
            type="text"
            name="country"
            value={country}
            className="form-control form-control-sm"
            onChange={(e) => setCountry(e.target.value)}
            autoComplete="off"
          />
          {customError.countryError && (
            <div className="validation-input">{customError.countryError}</div>
          )}
        </div>
      </div>
      <div className="row pt-1">
        <div className="col-md-2 text-end">
          <label className="col-form-label-sm ">
            <b>State :</b>
          </label>
        </div>
        <div className="col-md-4">
          <input
            type="text"
            name="state"
            value={state}
            className="form-control form-control-sm"
            onChange={(e) => setState(e.target.value)}
            autoComplete="off"
          />
        </div>
      </div>
      <div className="row pt-1">
        <div className="col-md-2 text-end">
          <label className="col-form-label-sm ">
            <b>Region :</b>
          </label>
        </div>
        <div className="col-md-4">
          <input
            type="text"
            name="region"
            value={region}
            className="form-control form-control-sm"
            onChange={(e) => setRegion(e.target.value)}
            autoComplete="off"
          />
        </div>
      </div>
      <div className="row pt-1">
        <div className="col-md-2 text-end">
          <label className="col-form-label-sm ">
            <b>Phone :</b>
          </label>
        </div>
        <div className="col-md-4">
          <input
            type="text"
            name="phone"
            value={phone}
            className="form-control form-control-sm"
            onChange={(e) => setPhone(e.target.value)}
            autoComplete="off"
          />
        </div>
      </div>
      <div className="row pt-1">
        <div className="col-md-2 text-end">
          <label className="col-form-label-sm ">
            <b>Email :</b>
          </label>
        </div>
        <div className="col-md-4">
          <input
            type="text"
            name="email"
            value={email}
            className="form-control form-control-sm"
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
          />
          {customError.emailError && (
            <div className="validation-input">{customError.emailError}</div>
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
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default NewCustomer;
