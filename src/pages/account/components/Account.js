import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from '../../../layout/Navbar/Navbar';
import AccountForm from "./AccountForm";
import { getAccounts as getAccountsService, deleteAccount as deleteAccountService } from "../../../service/account";
import { addAccountTransaction as accountTransactionService } from '../../../service/accountTransaction'
import { Modal, Button, Table } from "react-bootstrap";
import { useForm } from "react-hook-form";

export function Account(props) {

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false)
  }

  const handleShow = () => {
    setShow(true)
  }

  const transactionType = {
    deposit: "deposit",
    withdraw: "withdraw",
    transfer: "transfer",
  }

  const { bankID } = useParams()
  const navigate = useNavigate()
  const [accounts, setAccounts] = useState([])
  const [transferAccounts, setTransferAccounts] = useState([])
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const isCustomer = localStorage.getItem('rolename')?.toLowerCase() === 'customer'
  const customerID = props.customerID ? props.customerID :
    (localStorage.getItem('rolename')?.toLowerCase() === 'customer' ? localStorage.getItem('credentialID') : null)

  const getAccounts = async () => {
    try {
      const queryparams = {}
      if (bankID) {
        queryparams.bankID = bankID
      }

      if (customerID) {
        queryparams.customerID = customerID
      }

      const response = await getAccountsService(queryparams)
      console.log(response);

      setAccounts(response.data)
    } catch (error) {
      console.error(error);
      setError(error.message.message)
    }
  }

  const getTransferAccounts = async () => {
    try {
      setIsLoading(true)
      const response = await getAccountsService()
      console.log(response);
      const acc = []

      for (let index = 0; index < response.data.length; index++) {
        if (response.data[index].customerID != customerID) {
          acc.push(response.data[index])
        }
      }

      setTransferAccounts(acc)
    } catch (error) {
      console.error(error);
      setError(error.message.message)
    } finally {
      setIsLoading(false)
    }
  }

  const deleteAccount = async (accountID) => {
    console.log(accountID);

    try {
      const response = await deleteAccountService(accountID)
      console.log(response);
      getAccounts()
    } catch (error) {
      console.error(error);
      setError(error.message.message)
    }
  }

  const deposit = async (e, account) => {
    e.stopPropagation()
    console.log("depositing to ", account);
    reset({
      type: transactionType.deposit,
      bankID: account.bankID,
      fromAccountID: account.id,
      date: new Date().toLocaleDateString("en-US"),
    })

    handleShow()
  }

  const withdraw = async (e, account) => {
    e.stopPropagation()
    console.log("withdrawing from ", account)
    reset({
      type: transactionType.withdraw,
      bankID: account.bankID,
      fromAccountID: account.id,
      date: new Date().toLocaleDateString("en-US"),
    })

    handleShow()
  }

  const transfer = async (e, account) => {
    console.log("transfer clicked by ", account);
    e.stopPropagation()
    reset({
      type: transactionType.transfer,
      bankID: account.bankID,
      fromAccountID: account.id,
      date: new Date().toLocaleDateString("en-US"),
    })

    setTransferAccounts([])

    getTransferAccounts()
    handleShow()

  }

  const addTransaction = async (transaction) => {
    console.log(transaction);
    try {
      const response = await accountTransactionService(transaction.fromAccountID, transaction.type, transaction)
      console.log(response);
      // getAccounts()
      handleClose()
    } catch (error) {
      console.error(error);
      alert(error.message?.message)
    }
  }

  useEffect(() => {
    getAccounts()
  }, [])

  const onSubmit = async (transactionData) => {
    transactionData.amount = parseFloat(transactionData.amount)
    addTransaction(transactionData)
  }

  const { register, handleSubmit, formState, reset, watch } = useForm()


  const renderOptions = transferAccounts.map((option, index) => {
    return (
      <option value={option.id} key={index}>{option['accountName']}</option>
    )
  })

  const transactionModal = (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Add Transaction</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-floating mb-3">
            <input type="number" className="form-control" id="amount" placeholder="1000"
              {...register("amount", {
                required: "Amount must be specified",
                min: {
                  value: 100,
                  message: "Minimum amount is 100"
                },
                max: {
                  value: 10000,
                  message: "Maximum amount is 10000"
                },
              })} />
            <label htmlFor="amount">Amount</label>
            {formState.errors.amount && <span className="text-red">{formState.errors.amount.message}</span>}
          </div>
          {watch("type")?.toLowerCase() == 'transfer' &&
            <div className="form-floating mb-3">
              <select className="form-control" id="toAccountID" {...register("toAccountID", { required: true })}>
                <option value="">Select Account</option>
                {renderOptions}
              </select>
              <label htmlFor="toAccountID">Account</label>
              {formState.errors.toAccountID && <span className="text-red">Account must be specified</span>}
            </div>
          }
          <Button type="submit" variant="primary">
            Save Changes
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  )

  const navigateToTransactions = (accountID) => {
    navigate(`${accountID}/transactions`)
  }

  const renderAccounts = accounts.map((account, index) => {
    return (
      <tr key={account.id} className='cursor-pointer' onClick={() => navigateToTransactions(account.id)}>
        <td>{index + 1}</td>
        <td>{account.accountName}</td>
        <td>{account.balance}</td>
        {isCustomer &&
          <>
            <td>
              <Button size="sm" variant="info" onClick={(e) => deposit(e, account)}>Deposit</Button>
            </td>
            <td>
              <Button size="sm" variant="info" onClick={(e) => withdraw(e, account)}>Withdraw</Button>
            </td>
            <td>
              <Button size="sm" variant="info" onClick={(e) => transfer(e, account)}>Transfer</Button>
            </td>
            <td>
              <Button size="sm" variant="danger" onClick={() => deleteAccount(account.id)}>Delete</Button>
            </td>
          </>
        }
      </tr>
    )
  })

  return (
    <>
      {!props?.isCustomerView && <Navbar />}

      <div className="container">

        {!props?.isCustomerView && <AccountForm getAccounts={getAccounts} />}
        {isLoading && <p>Loading...</p>}

        {(error && isLoading) &&
          <div className="d-flex align-items-center full-h mt-3">
            <div className="col-sm-12 col-md-8 mx-auto">
              <div className="jumbotron">
                <div className="form-group col-sm-12 col-md-12 col-lg-12 text-center">
                  <h2>Accounts not found</h2>
                </div>
              </div>
            </div>
          </div>
        }

        {!error && !isLoading && accounts.length > 0 &&
          <Table striped bordered responsive hover>
            <thead>
              <tr>
                <th>Sr no.</th>
                <th>Account name</th>
                <th>Balance</th>
                {isCustomer &&
                  <>
                    <th>Deposit </th>
                    <th>Withdraw</th>
                    <th>Transfer</th>
                    <th>Delete</th>
                  </>
                }
              </tr>
            </thead>
            <tbody>
              {renderAccounts}
            </tbody>
          </Table>
        }

        {transactionModal}

      </div>
    </>
  );
}

export default Account;