import React, { useEffect, useState } from "react";
import Navbar from '../../../layout/Navbar/Navbar';
import { getCustomers as getCustomerService } from "../../../service/customer";
import { updateCredential as updateCredentialService } from "../../../service/auth";
import CustomerForm from "./CustomerForm";
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Paginate from "../../../layout/Paginate/Pagination";
import { Modal } from "react-bootstrap";
import Account from "../../account/components/Account";
import { PacmanLoader } from "react-spinners";

export const Customer = () => {

  const [showAccount, setShowAccount] = useState(false);

  const handleShowAccount = () => {
    console.log("show account ->", showAccount);
    setShowAccount(true)
  }

  const handleCloseAccount = () => {
    setShowAccount(false)
  }

  const [customerID, setCustomerID] = useState("")
  const [customers, setCustomer] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [totalCount, setTotalCount] = useState(0)

  const getCustomers = async () => {
    try {
      setIsLoading(true)
      setCustomer([])
      let queryparams = {
        offset: offset,
        limit: limit,
      }
      const response = await getCustomerService(queryparams)
      console.log(response);
      setTotalCount(parseInt(response.headers.get("X-Total-Count")))
      setCustomer(response.data)

    } catch (error) {
      console.error("error msg -> ", error);
      setError(error.message.message)
    } finally {
      setIsLoading(false)
    }
  }

  let limit = 5
  const [offset, setOffset] = useState(0)

  const changePage = (pageNumber) => {
    setOffset(pageNumber)
  }

  const toggleCredential = async (e, customer) => {
    e.preventDefault()
    customer.credential.isActive = !customer.credential.isActive
    console.log(e.currentTarget.checked)
    console.log(customer)
    updateCredential({
      id: customer.id,
      username: customer.email,
      roleName: "Customer",
      isActive: customer.credential.isActive,
    })
  }

  const updateCredential = async (credential) => {
    try {
      console.log(credential);
      await updateCredentialService(credential)
      getCustomers()
    } catch (error) {
      console.error(error);
    }
  }

  const onRowClick = (index) => {
    console.log(customers[index]);
    setCustomerID(customers[index].id)
    customers[index].isClicked = !customers[index].isClicked
    setCustomer([...customers])
    // setShowAccount(true)
    // handleShowAccount()
  }

  useEffect(() => {
    getCustomers()
  }, [offset])

  const renderCustomers = customers.map((customer, index) => {
    return (
      <React.Fragment key={customer.id}>
        <tr onClick={() => onRowClick(index)} className="cursor-pointer">
          <td>{(index + 1) + (offset * limit)}</td>
          <td>{customer.firstName + " " + customer.lastName}</td>
          <td>{customer.email} {customer.isClicked ? 'true' : 'false'}</td>
          <td>{customer.balance}</td>
          <td>
            <Form.Check
              type="switch"
              id="custom-switch"
              checked={customer.credential.isActive}
              onChange={(e) => toggleCredential(e, customer)}
            />
          </td>
        </tr>
        {customer.isClicked &&
          <tr>
            <td colSpan="5">
              <Account customerID={customerID} isCustomerView={true} />
            </td>
          </tr>
        }
      </React.Fragment>
    )
  })


  return (
    <>
      <Navbar />
      <div className="container">

        <CustomerForm getCustomers={getCustomers} />

        {isLoading && 
          <div className="d-flex justify-content-center align-items-center">
            <PacmanLoader color="#36d7b7" />
          </div>
        }
        {error &&
          <div className="d-flex align-items-center full-h mt-3">
            <div className="col-sm-12 col-md-8 mx-auto">
              <div className="jumbotron">
                <div className="form-group col-sm-12 col-md-12 col-lg-12 text-center">
                  <h2>Customers not found</h2>
                </div>
              </div>
            </div>
          </div>
        }

        {!error && customers?.length > 0 &&
          <>
            <Paginate onClick={changePage} offset={offset} totalCount={totalCount} limit={limit} />

            <Table striped bordered responsive hover>
              <thead>
                <tr>
                  <th>Sr no. {showAccount ? 'do' : 'dont'}</th>
                  <th>Fullname</th>
                  <th>Email</th>
                  <th>Balance</th>
                  <th>Active</th>
                  {/* <th>Delete</th> */}
                </tr>
              </thead>
              <tbody>
                {renderCustomers}
              </tbody>
            </Table>
          </>
        }

        {/* {showAccount &&
          <>
            <Modal show={showAccount} size="lg" onHide={handleCloseAccount} backdrop="static" keyboard={false}>
              <Modal.Header closeButton>
                <Modal.Title>Customer Accounts</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Account customerID={customerID} isCustomerView={true} />
              </Modal.Body>
            </Modal>
          </>
        } */}

      </div>
    </>
  );
}

// export default Customer;