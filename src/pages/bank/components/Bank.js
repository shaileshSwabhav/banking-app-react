import { useEffect, useState } from "react";
import { getBanks as getBanksService } from "../../bank/service";

const Bank = () => {

  const [banks, setBanks] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

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

  const renderBanks = banks.map((bank) => {
    return (
      <div className="card col-md-4 col-sm-3 mx-2 shadow" key={bank.id}>
        <a href={"/banks/" + bank.id + "/accounts"} className="anchor-tag">
          <div className="card-body">
            <p>Name: {bank.fullName}</p>
            <p>Abbreviation: {bank.abbreviation}</p>
          </div>
        </a>
      </div>
    )
  })

  useEffect(() => {
    getBanks()
  }, [])

  return (
    <>
      <div className="container-fluid">
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
        {!error &&
          <div className="row">
            {banks.length > 0 && renderBanks}
          </div>
        }
      </div>
    </>
  );
}

export default Bank;