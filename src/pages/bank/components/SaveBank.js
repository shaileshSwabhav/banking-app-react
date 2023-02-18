import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Input from "../../../layout/Form/Input/Input";
import { addBank as addBankService } from '../../../service/bank'

const SaveBank = ({ getBanks }) => {
  // const [isUpdateOperation, setIsUpdateOperation] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false)
    setBankForm(bankFormValue)
  }

  const handleShow = () => {
    // setIsUpdateOperation(false)
    setBankForm(bankFormValue)
    setShow(true)
  }

  // const handleUpdateShow = (bank) => {
  //   setBankForm({
  //     id: bank.id,
  //     fullName: bank.fullName,
  //     abbreviation: bank.abbreviation,
  //   })
  //   setShow(true)
  // }

  const bankFormValue = {
    id: "",
    fullName: "",
    abbreviation: "",
  }

  const inputs = [
    {
      id: "fullName",
      name: "fullName",
      type: "fullName",
      label: "Bank name",
      placeholder: "State bank of india",
      value: "",
      errorMessage: "Bank name must be specified",
      required: true,
    },
    {
      id: "abbreviation",
      name: "abbreviation",
      type: "abbreviation",
      label: "abbreviation",
      placeholder: "abbreviation",
      value: "",
      errorMessage: "Abbreviation must be specified",
      required: true,
    },
  ]

  const [bankForm, setBankForm] = useState(bankFormValue)

  const onChange = (e) => {
    setBankForm({ ...bankForm, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    console.log(bankForm)
    validate()
  }

  const validate = async () => {
    addBank()
  }

  const addBank = async () => {
    try {
      const response = await addBankService(bankForm)
      console.log(response)
      getBanks()
      handleClose()
    } catch (error) {
      console.error(error);
    }
  }

  // useEffect(() => {
  //   handleUpdateShow(bank)
  //   setIsUpdateOperation(true)
  // }, [isUpdate])

  const saveModal = (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Add Bank</Modal.Title>
      </Modal.Header>
      <form onSubmit={onSubmit}>
        <Modal.Body>

          {inputs.map((input) => (
            <Input key={input.id} {...input}
              value={bankForm[input.name]} onChange={onChange} />
          ))}

        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" variant="primary" onClick={onSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </form>

    </Modal >
  )

  return (
    <>
      <div className="text-end mb-3">
        <Button variant="primary" type="button" size="md" onClick={handleShow}>
          Add bank
        </Button>
      </div>

      {saveModal}
    </>
  );
}

export default SaveBank;