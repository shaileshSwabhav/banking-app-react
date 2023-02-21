import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAccountTransactions as getAccountTransactionService } from '../../../service/accountTransaction'
import { Table } from 'react-bootstrap';
import Navbar from '../../../layout/Navbar/Navbar';
import Paginate from "../../../layout/Paginate/Pagination";

const Transaction = () => {
  const { accountID } = useParams()
  const [totalCount, setTotalCount] = useState(0)
  const [transactions, setTransactions] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const getAccountTransactions = async () => {
    try {
      setTransactions([])
      setIsLoading(true)
      console.log(limit, offset);
      let queryparams = {
        limit: limit,
        offset: offset,
      }

      const response = await getAccountTransactionService(accountID, queryparams)
      console.log(response)
      setTotalCount(parseInt(response.headers.get("X-Total-Count")))
      setTransactions(response.data)
    } catch (error) {
      console.error(error);
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

  useEffect(() => {
    getAccountTransactions()
  }, [offset])

  const renderAccountTransactions = transactions.map((transaction, index) => {
    return (
      <tr key={transaction.id}>
        <td>{(index + 1) + (offset * limit)}</td>
        <td>{transaction.date}</td>
        <td>{transaction.type}</td>
        <td>{transaction.amount}</td>
        <td>{transaction.bank.fullName}</td>
      </tr>
    )
  })

  return (
    <>
      <Navbar />

      <div className="container">

        {isLoading && <p>Loading...</p>}
        {error &&
          <div className="d-flex align-items-center full-h mt-3">
            <div className="col-sm-12 col-md-8 mx-auto">
              <div className="jumbotron">
                <div className="form-group col-sm-12 col-md-12 col-lg-12 text-center">
                  <h2>Transactions not found</h2>
                </div>
              </div>
            </div>
          </div>
        }

        {!error && transactions?.length > 0 &&
          <>
            <Paginate onClick={changePage} offset={offset} totalCount={totalCount} limit={limit} />
            <br />
            <Table striped bordered responsive hover>
              <thead>
                <tr>
                  <th>Sr no.</th>
                  <th>Date</th>
                  <th>Transaction Type</th>
                  <th>Amount</th>
                  <th>Bank</th>
                </tr>
              </thead>
              <tbody>
                {renderAccountTransactions}
              </tbody>
            </Table>
          </>
        }
      </div>
    </>
  );
}

export default Transaction;