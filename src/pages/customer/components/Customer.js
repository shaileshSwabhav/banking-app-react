import { useEffect, useState } from "react";
import Navbar from '../../../layout/Navbar/Navbar';
import { getCustomers as getCustomerService } from "../../../service/customer";
import CustomerForm from "./CustomerForm";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

const Customer = () => {

  const [customers, setCustomer] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const getCustomers = async () => {
    try {
      setIsLoading(true)
      const response = await getCustomerService()
      console.log(response);
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

  useEffect(() => {
    getCustomers()
  }, [])

  const renderCustomers = customers.map((customer, index) => {
    return (
      <tr key={customer.id}>
        <td>{index + 1}</td>
        <td>{customer.firstName + " " + customer.lastName}</td>
        <td>{customer.balance}</td>
        <td>
          <Button size="sm" variant="danger" onClick={() => deleteCustomer(customer.id)}>Delete</Button>
        </td>
      </tr>
    )
  })

  useEffect(() => {
    getCustomers()
  }, [])


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
          <Table striped bordered responsive hover>
            <thead>
              <tr>
                <th>Sr no.</th>
                <th>Fullname</th>
                <th>Balance</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {renderCustomers}
            </tbody>
          </Table>
        }
      </div>
    </>
  );
}

export default Customer;