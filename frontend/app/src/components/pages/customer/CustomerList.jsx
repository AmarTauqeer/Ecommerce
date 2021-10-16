import React, { useState, useEffect } from "react";
import axios from "axios";
import "./customer.css";
import { Link, useHistory } from "react-router-dom";
import loadingImge from "../../../images/laoding.gif";
import { searchCustomer as search } from "../helper";
import ReactPaginate from "react-paginate";
import { Button, Modal, ModalBody, ModalFooter } from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";

const CustomerList = () => {
  const [fetchData, setFetchData] = useState([]);
  const [searchCustomer, setSearchCustomer] = useState("");
  const history = useHistory();

  const [openModal, setOpenModal] = useState(false);

  const [pageNumber, setPageNumber] = useState(0);
  const customerPerPage = 5;
  const pagesVisited = pageNumber * customerPerPage;

  const [selectedCustomer, setSelectedCustomer] = useState(0);

  // get customer
  const fetchCustomer = async () => {
    await axios
      .get("http://127.0.0.1:8000/all_customer/")
      .then((res) => {
        setFetchData(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchCustomer();
  }, []);

  let newData = [];
  if (searchCustomer.length > 0) {
    newData = search(searchCustomer, fetchData);
  } else {
    newData = fetchData;
  }

  const pageCount = Math.ceil(newData.length / customerPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const deleteHandler = (id) => {
    const deleteCustomer = async () => {
      const response = await axios
        .delete(`http://127.0.0.1:8000/delete_customer/${id}`)
        .then((res) => {
          if (res) {
            alert("Data deleted successfully");
            fetchCustomer();
            setOpenModal(false);
          }
        })
        .catch((err) => console.log(err));
    };

    deleteCustomer();
  };

  return (
    <>
      <h3 className="heading pt-4">Customer</h3>
      <hr />
      <div className="row pb-3 pt-4">
        <div className="col">
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => history.push("/add-customer")}
          >
            Add new record
          </button>
        </div>
      </div>
      <div className="row pb-3 pt-4">
        <div className="col-md-6">
          <input
            type="text"
            name="search"
            value={searchCustomer}
            onChange={(e) => setSearchCustomer(e.target.value)}
            className="form-control form-control-md"
            placeholder="search"
            autoComplete="off"
          />
        </div>
      </div>
      <div
        className="d-flex row align-items-center"
        style={{
          height: "40px",
          backgroundColor: "#392613",
          verticalAlign: "center",
          color: "white",
        }}
      >
        <div className="col-md-1">
          <b>#</b>
        </div>
        <div className="col-md-2">
          <b>Name</b>
        </div>
        <div className="col-md-3">
          <b>Address</b>
        </div>
        <div className="col-md-3">
          <b>Email</b>
        </div>
        <div className="col-md-3">
          <b>Actions</b>
        </div>
      </div>
      {newData.length === 0 ? (
        <div>No record found</div>
      ) : newData.length > 0 ? (
        <div>
          {newData
            .slice(pagesVisited, pagesVisited + customerPerPage)
            .map((i) => {
              return (
                <div className="row pb-1 border pt-2 " key={i.id}>
                  <div className="col-md-1">{i.id}</div>
                  <div className="col-md-2">{i.customer_name}</div>
                  <div className="col-md-3">{i.customer_address}</div>
                  <div className="col-md-3">{i.customer_email}</div>

                  <div className="col-md-3">
                    <div className="button-container">
                      <div>
                        <Link
                          to={`/update-customer/${i.id}`}
                          className="nav-link"
                        >
                          <button type="button" className="btn btn-info btn-sm">
                            Edit
                          </button>
                        </Link>
                      </div>
                      <div>
                        <button
                          type="button"
                          className="btn btn-danger btn-sm"
                          onClick={() => {
                            setOpenModal(true);
                            setSelectedCustomer(i.id);
                          }}
                        >
                          Delete
                        </button>
                        <Modal
                          show={openModal}
                          onHide={() => setOpenModal(false)}
                        >
                          <ModalHeader closeButton closeLabel={false}>
                            Delete
                          </ModalHeader>
                          <ModalBody>
                            Do you realy want to delet this reacord?
                          </ModalBody>
                          <ModalFooter>
                            <Button
                              onClick={() => setOpenModal(false)}
                              className="btn btn-sm"
                            >
                              CANCEL
                            </Button>
                            <Button
                              onClick={() => deleteHandler(selectedCustomer)}
                              className="btn btn-sm btn-danger"
                            >
                              DELETE
                            </Button>
                          </ModalFooter>
                        </Modal>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      ) : (
        <div>
          <img src={loadingImge} alt="loading image" width="300px" />
        </div>
      )}
      <br />
      <div
        className="d-flex row align-items-center"
        style={{
          height: "40px",
          backgroundColor: "#392613",
          verticalAlign: "center",
        }}
      >
        <div className="col">
          <ReactPaginate
            previousLabel={"<<"}
            nextLabel={">>"}
            nextClassName={"page-item"}
            pageLinkClassName={"page-link"}
            pageCount={pageCount}
            onPageChange={changePage}
            previousLinkClassName={"page-link"}
            nextLinkClassName={"page-link"}
            disabledClassName={"paginationDisabled"}
            activeClassName={"paginationActive"}
            containerClassName={"pagination"}
          />
        </div>
      </div>
      <br />
    </>
  );
};

export default CustomerList;
