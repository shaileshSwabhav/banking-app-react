import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAccounts as getAccountsService } from "../../../service/account";
import SaveAccount from "./SaveAccount";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

export function Account() {

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
  }

  const renderAccounts = accounts.map((account, index) => {
    return (
      // <div className="card col-md-4 col-sm-3 mx-2 shadow" key={account.id}>
      //   <div className="card-body">
      //     <p>Account Name: {account.accountName}</p>
      //     <p>Balance: {account.balance}</p>
      //   </div>
      // </div>

      <tr key={account.id} className='cursor-pointer'>
        <td>{index + 1}</td>
        <td>{account.accountName}</td>
        <td>{account.balance}</td>
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
      <div className="container">
        <SaveAccount getAccounts={getAccounts} bankID={bankID} />

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