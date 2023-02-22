import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { getBanks as getBanksService } from "../../../service/bank";
import { addAccount as addAccountService, updateAccount as updateAccountService } from "../../../service/account";

const AccountForm = ({ getAccounts, account }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false)
    reset()
  }

  const handleShow = () => {
    reset()
    setShow(true)
  }

  const [banks, setBanks] = useState([])

  const getBanks = async () => {
    try {
      const response = await getBanksService()
      console.log(response);
      setBanks(response.data)
    } catch (error) {
      console.error("error msg -> ", error);
      // setError(error.message.message)
    }
  }

  const { bankID } = useParams()

  const customerID = localStorage.getItem('rolename').toLowerCase() === 'customer' ? localStorage.getItem('credentialID') : null
  const accountForm = {
    id: account ? account.id : "",
    accountName: account ? account.accountName : "",
    bankID: bankID ? bankID : (account ? account.bankID : ""),
    balance: account ? account.balance : 1000,
    customerID: customerID,
  }

  const { register, handleSubmit, formState, reset } = useForm({ defaultValues: accountForm })
  // register -> takes 2 arguments i.e. name and options
  // trigger -> used to trigger some validation manually. it usually gets triggered automatically.

  const onSubmit = (accountData) => {
    if (bankID) {
      accountData.bankID = bankID
    }

    accountData.balance = parseFloat(accountData.balance)
    if (account) {
      updateAccount(accountData)
      return
    }

    addAccount(accountData)
  }

  const addAccount = async (account) => {
    try {
      const response = await addAccountService(account)
      console.log(response);
      handleClose()
      getAccounts()
    } catch (error) {
      console.error(error);
    }
  }

  const updateAccount = async () => {
    try {
      const response = await updateAccountService(account)
      console.log(response);
      handleClose()
      getAccounts()
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getBanks()
  }, [])

  const renderOptions = banks.map((option, index) => {
    return (
      <option value={option.id} key={index}>{option['fullName']}</option>
    )
  })

  const saveModal = (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-floating mb-3">
              <input type="text" className="form-control" id="accountName" placeholder="State bank of india"
                {...register("accountName", {
                  required: "Account name must be specified",
                  maxLength: {
                    value: 50,
                    message: "Account name cannot be greater than 50 characters",
                  },
                  minLength: {
                    value: 2,
                    message: "Account name must include at least 2 characters",
                  },
                })} />
              <label htmlFor="accountName">Account name</label>
              {formState.errors.accountName && <span className="text-red">{formState.errors.accountName.message}</span>}
            </div>
            <div className="form-floating mb-3">
              <select className="form-control" id="bank" {...register("bankID", { required: true, disabled: bankID ? true : false })}>
                <option value="">Select Bank</option>
                {renderOptions}
              </select>
              <label htmlFor="bank">Bank</label>
              {formState.errors.bankID && <span className="text-red">Bank must be specified</span>}
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
          Add Account
        </Button>
      </div>

      {saveModal}
    </>
  );
}

export default AccountForm;