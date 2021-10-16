import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { customerValidator } from "../validation";
import axios from "axios";
import loader from "../../../images/fading-lines.gif";
import "./customer.css";

const UpdateCustomer = () => {
  const [loading, setLoading] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [region, setRegion] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [custId, setCustId] = useState(0);

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
  const { id } = useParams();

  const fetchCustomer = () => {
    axios
      .get("http://127.0.0.1:8000/all_customer/")
      .then((res) => {
        let customer = res.data;
        if (customer) {
          let filteredCustomer = customer.filter(
            (item) => item.id === parseInt(id)
          );
          console.log(filteredCustomer[0].customer_address);
          setCustomerName(filteredCustomer[0].customer_name);
          setAddress(filteredCustomer[0].customer_address);
          setCountry(filteredCustomer[0].customer_country);
          setState(filteredCustomer[0].customer_state);
          setRegion(filteredCustomer[0].customer_region);
          setPhone(filteredCustomer[0].customer_phone);
          setEmail(filteredCustomer[0].customer_email);

          setCustId(parseInt(id));
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (id && id !== null) fetchCustomer();
  }, [id]);

  const updateCustomerData = () => {
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
        .put(`http://127.0.0.1:8000/update_customer/${custId}`, userData)
        .then((res) => {
          if (!res.data) {
            setMessage({
              error: "There are issues to update the record",
              color: "red",
            });
          } else {
            setMessage({
              success: `${customerName} updated successfully.`,
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
      updateCustomerData();
      setLoading(false);

      // clear form data
      setCustomError({
        nameError: "",
        addressError: "",
        countryError: "",
        emailError: "",
      });
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <h3 className="heading pt-4">Update Customer</h3>
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
            type="email"
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
          <label className="col-form-label-sm"></label>
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

export default UpdateCustomer;
