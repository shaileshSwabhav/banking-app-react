import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from '../../../layout/Navbar/Navbar';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import AccountForm from "./AccountForm";
import { getAccounts as getAccountsService, deleteAccount as deleteAccountService } from "../../../service/account";
import { accountTransaction as accountTransactionService } from '../../../service/accountTransaction'

export function Account() {

  const transactionType = {
    deposit: "deposit",
    withdraw: "withdraw",
    transfer: "transfer",
  }

  const { bankID } = useParams()
  const [accounts, setAccounts] = useState([])
  const [error, setError] = useState(null)

  const customerID = localStorage.getItem('rolename').toLowerCase() === 'customer' ? localStorage.getItem('credentialID') : null

  // const [searchParams, setSearchParams] = useSearchParams()
  // console.log(searchParams.get("name"));

  const getAccounts = async () => {
    try {
      const querparams = {}
      if (bankID) {
        querparams.bankID = bankID
      }

      if (customerID) {
        querparams.customerID = customerID
      }

      const response = await getAccountsService(querparams)
      console.log(response);

      setAccounts(response.data)
    } catch (error) {
      console.error(error);
      setError(error.message.message)
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

  const deposit = async (account) => {
    console.log("depositing to ", account);
    const accountTransaction = {
      toAccountID: account.id,
      fromAccountID: null,
      amount: 100,
      bankID: account.bankID,
      type: transactionType.deposit,
      date: new Date().toLocaleDateString("en-US")
    }

    try {
      const response = await accountTransactionService(account.id, transactionType.deposit, accountTransaction)
      console.log(response);
      getAccounts()
    } catch (error) {
      console.error(error);
      alert(error.message?.message)
    }
  }

  const withdraw = async (account) => {
    console.log("withdrawing from ", account)

    const accountTransaction = {
      fromAccountID: account.id,
      toAccountID: null,
      amount: 100,
      bankID: account.bankID,
      type: transactionType.withdraw,
      date: new Date().toLocaleDateString("en-US")
    }

    try {
      const response = await accountTransactionService(account.id, transactionType.withdraw, accountTransaction)
      console.log(response);
      getAccounts()
    } catch (error) {
      console.error(error);
      alert(error.message?.message)
    }
  }


  const transfer = async (account) => {
    console.log("transfer clicked by ", account);

    const accountTransaction = {
      toAccountID: account.id,
      fromAccountID: null,
      amount: 100,
      bankID: account.bankID,
      type: transactionType.transfer,
      date: new Date().toLocaleDateString("en-US")
    }

    try {
      const response = await accountTransactionService(account.id, transactionType.transfer, accountTransaction)
      console.log(response);
      getAccounts()
    } catch (error) {
      console.error(error);
      alert(error.message?.message)
    }
  }

  const renderAccounts = accounts.map((account, index) => {
    return (
      <tr key={account.id} className='cursor-pointer'>
        <td>{index + 1}</td>
        <td>{account.accountName}</td>
        <td>{account.balance}</td>
        <td>
          <Button size="sm" variant="info" onClick={() => deposit(account)}>Deposit</Button>
        </td>
        <td>
          <Button size="sm" variant="info" onClick={() => withdraw(account)}>Withdraw</Button>
        </td>
        <td>
          <Button size="sm" variant="info" onClick={() => transfer(account)}>Transfer</Button>
        </td>
        <td>
          <Button size="sm" variant="danger" onClick={() => deleteAccount(account.id)}>Delete</Button>
        </td>
      </tr>
    )
  })

  useEffect(() => {
    getAccounts()
  }, [])

  return (
    <>
      <Navbar />

      <div className="container">

        <AccountForm getAccounts={getAccounts} />

        {(error || accounts.length == 0) &&
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

        {!error && accounts.length > 0 &&

          <Table striped bordered responsive hover>
            <thead>
              <tr>
                <th>Sr no.</th>
                <th>Account name</th>
                <th>Balance</th>
                <th>Deposit</th>
                <th>Withdraw</th>
                <th>Transfer</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {renderAccounts}
            </tbody>
          </Table>

        }

      </div>
    </>
  );
}

export default Account;