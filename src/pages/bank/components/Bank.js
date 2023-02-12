import { useEffect, useState } from "react";
import { getBanks as getBanksService } from "../../bank/service";

const Bank = () => {

  const [banks, setBanks] = useState([])

  const getBanks = async () => {
    try {
      const response = await getBanksService()
      console.log(response);
      setBanks(response.data)
    } catch (error) {
      console.error(error);
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
        <div className="row">
          {banks.length > 0 && renderBanks}
        </div>
      </div>
    </>
  );
}

export default Bank;