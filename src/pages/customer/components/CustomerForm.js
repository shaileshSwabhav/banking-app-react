import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { addCustomer as addCustomerService } from "../../../service/customer";

const CustomerForm = ({ getCustomers, customer }) => {

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false)
    reset()
  }

  const handleShow = () => {
    reset()
    setShow(true)
  }

  const customerForm = {
    id: customer ? customer.id : "",
    firstName: customer ? customer.firstName : "",
    lastName: customer ? customer.lastName : "",
    email: customer ? customer.email : "",
    password: customer ? customer.password : "",
    balance: customer ? customer.balance : 1000,
  }

  const { register, handleSubmit, formState, reset } = useForm({ defaultValues: customerForm })

  const onSubmit = (customerData) => {
    customerData.balance = parseFloat(customerData.balance)
    console.log(customerData);

    addCustomer(customerData)
  }

  const addCustomer = async (customerData) => {
    try {
      const response = await addCustomerService(customerData)
      console.log(response);
      getCustomers()
      handleClose()
    } catch (error) {
      console.error(error);
    }
  }

  const saveModal = (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-floating mb-3">
              <input type="text" className="form-control" id="firstName" placeholder="John"
                {...register("firstName", {
                  required: "First name must be specified",
                })} />
              <label htmlFor="firstName">First name</label>
              {formState.errors.firstName && <span className="text-red">{formState.errors.firstName.message}</span>}
            </div>
            <div className="form-floating mb-3">
              <input type="text" className="form-control" id="lastName" placeholder="Doe"
                {...register("lastName", {
                  required: "Last name must be specified",
                })} />
              <label htmlFor="lastName">Last name</label>
              {formState.errors.lastName && <span className="text-red">{formState.errors.lastName.message}</span>}
            </div>
            <div className="form-floating mb-3">
              <input type="email" className="form-control" id="email" placeholder="Doe"
                {...register("email", {
                  required: "Email must be specified",
                })} />
              <label htmlFor="email">Email</label>
              {formState.errors.email && <span className="text-red">{formState.errors.email.message}</span>}
            </div>
            <div className="form-floating mb-3">
              <input type="password" className="form-control" id="password" placeholder="Doe"
                {...register("password", {
                  required: "Password must be specified",
                })} />
              <label htmlFor="password">Password</label>
              {formState.errors.password && <span className="text-red">{formState.errors.password.message}</span>}
            </div>
            <div className="form-floating mb-3">
              <input type="number" className="form-control" id="balance" placeholder="1000"
                {...register("balance", {
                  required: "Balance must be specified",
                  min: {
                    value: 1000,
                    message: "Minimum balance is 1000"
                  },
                  max: {
                    value: 10000,
                    message: "Maximum balance is 10000"
                  },
                })} />
              <label htmlFor="balance">Balance</label>
              {formState.errors.balance && <span className="text-red">{formState.errors.balance.message}</span>}
            </div>
            <Button type="submit" variant="primary">
              Save Changes
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  )

  return (
    <>
      <div className="text-end mb-3">
        <Button variant="primary" type="button" size="md" onClick={handleShow}>
          Add Customer
        </Button>
      </div>

      {saveModal}
    </>
  );
}

export default CustomerForm;