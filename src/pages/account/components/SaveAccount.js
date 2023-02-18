import { useEffect } from "react";
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { getBanks as getBanksService } from "../../../service/bank";
import AccountForm from "./AccountForm";

const SaveAccount = ({ bankID, getAccounts }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false)
  }

  const handleShow = () => {
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

  useEffect(() => {
    getBanks()
  }, [])

  const saveModal = (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Add Account</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AccountForm banks={banks} handleClose={handleClose} getAccounts={getAccounts} />
      </Modal.Body>
    </Modal>
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

export default SaveAccount;