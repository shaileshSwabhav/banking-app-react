import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAccounts as getAccountsService } from "../service";

export function Account() {

  const { bankID } = useParams()
  const [accounts, setAccounts] = useState([])

  // const [searchParams, setSearchParams] = useSearchParams()
  // console.log(searchParams.get("name"));

  const getAccounts = async () => {
    try {
      const querparams = {}
      if (bankID) {
        querparams.bankID = bankID
      }

      const response = await getAccountsService(querparams)
      console.log(response);

      setAccounts(response.data)
    } catch (error) {
      console.error(error);
    }
  }

  const renderAccounts = accounts.map((account) => {
    return (
      <div className="card col-md-4 col-sm-3 mx-2 shadow" key={account.id}>
        <div className="card-body">
          <p>Account Name: {account.accountName}</p>
          <p>Balance: {account.balance}</p>
        </div>
      </div>
    )
  })

  useEffect(() => {
    getAccounts()
  }, [])

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          {accounts.length > 0 && renderAccounts}
        </div>
      </div>
    </>
  );
}

export default Account;