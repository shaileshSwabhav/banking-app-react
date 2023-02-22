import { useEffect, useState } from "react";
import { getBanks as getBanksService, deleteBank as deleteBankService } from "../../../service/bank";
import SaveBank from "./SaveBank";
import Navbar from '../../../layout/Navbar/Navbar';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";

const Bank = () => {

  const [banks, setBanks] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const isAdmin = localStorage.getItem("rolename")?.toLowerCase() === "admin"

  const getBanks = async () => {
    try {
      setIsLoading(true)
      const response = await getBanksService()
      console.log(response);
      setBanks(response.data)
    } catch (error) {
      console.error("error msg -> ", error);
      setError(error.message.message)
    } finally {
      setIsLoading(false)
    }
  }

  const deleteBank = async (bankID) => {
    try {
      setIsLoading(true)
      const response = await deleteBankService(bankID)
      console.log(response)
      getBanks()
    } catch (error) {
      console.error("error msg -> ", error);
      setError(error.message.message)
    } finally {
      setIsLoading(false)
    }
  }

  const navigateToAccounts = (bankID) => {
    navigate(`/banks/${bankID}/accounts`)
  }

  const renderBanks = banks.map((bank, index) => {
    return (
      <tr key={bank.id} className='cursor-pointer' onClick={() => navigateToAccounts(bank.id)}>
        <td>{index + 1}</td>
        <td>{bank.fullName}</td>
        <td>{bank.abbreviation}</td>
        {isAdmin &&
          <td>
            <Button size="sm" variant="danger" onClick={() => deleteBank(bank.id)}>Delete</Button>
          </td>
        }
      </tr>
    )
  })

  useEffect(() => {
    getBanks()
  }, [])

  return (
    <>
      <Navbar />
      <div className="container">

        {isAdmin && <SaveBank getBanks={getBanks} />}
        {isLoading && <p>Loading...</p>}
        {error &&
          <div className="d-flex align-items-center full-h mt-3">
            <div className="col-sm-12 col-md-8 mx-auto">
              <div className="jumbotron">
                <div className="form-group col-sm-12 col-md-12 col-lg-12 text-center">
                  <h2>Banks not found</h2>
                </div>
              </div>
            </div>
          </div>
        }

        {!error && banks.length > 0 &&

          <Table striped bordered responsive hover>
            <thead>
              <tr>
                <th>Sr no.</th>
                <th>Bank name</th>
                <th>Abbreviation</th>
                {isAdmin && <th>Delete</th>}
              </tr>
            </thead>
            <tbody>
              {renderBanks}
            </tbody>
          </Table>

        }
      </div>
    </>
  );
}

export default Bank;