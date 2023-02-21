import { useEffect, useState } from "react";
import Navbar from '../../../layout/Navbar/Navbar';
import { getCustomers as getCustomerService } from "../../../service/customer";
import CustomerForm from "./CustomerForm";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Paginate from "../../../layout/Paginate/Pagination";

const Customer = () => {

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

  const deleteCustomer = async (customerID) => {
    console.log(customerID);
  }

  let limit = 5
  const [offset, setOffset] = useState(0)

  const changePage = (pageNumber) => {
    setOffset(pageNumber)
  }

  const toggleCredential = async (customerID) => {
    console.log(customerID);
  }

  useEffect(() => {
    getCustomers()
  }, [offset])

  const renderCustomers = customers.map((customer, index) => {
    return (
      <tr key={customer.id}>
        <td>{(index + 1) + (offset * limit)}</td>
        <td>{customer.firstName + " " + customer.lastName}</td>
        <td>{customer.email}</td>
        <td>{customer.balance}</td>
        <td>
          <Button size="sm" variant="danger" onClick={() => toggleCredential(customer.id)}>Delete</Button>
        </td>
        <td>
          <Button size="sm" variant="danger" onClick={() => deleteCustomer(customer.id)}>Delete</Button>
        </td>
      </tr>
    )
  })


  return (
    <>
      <Navbar />
      <div className="container">

        <CustomerForm getCustomers={getCustomers} />

        {isLoading && <p>Loading...</p>}
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
                  <th>Sr no.</th>
                  <th>Fullname</th>
                  <th>Email</th>
                  <th>Balance</th>
                  <th>Active</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {renderCustomers}
              </tbody>
            </Table>
          </>
        }
      </div>
    </>
  );
}

export default Customer;