import { useState } from 'react'
// import moment from 'moment'

// Containers
import { PatientReportSearchBar } from "../../../containers/PatientReportSearchBar"

// Components
import { PopupMessage } from '../../../components/PopupMessage'

//Icons

// Api

export const Patient = () => {
  const [form, setForm] = useState({ nuip: '', date_init: null, date_end: null })
  const [popupMessage, setPopupMessage] = useState({
    open: false,
    type: '',
    title: '',
    description: '',
    btnLabel: '',
  })
  // const [userMedicalHistories, setUserMedicalHistories] = useState([])

  // 
  // Handlers
  // 
  const handleOpen = (type, title, description, btnLabel) => setPopupMessage({
    open: true,
    btnLabel,
    type,
    title,
    description
  })
  const handleClose = () => setPopupMessage({ ...popupMessage, open: false })
  const handleChangeForm = (name, value) => setForm({ ...form, [name]: value })

  // const showUserMedicalHistory = () => { }

  const searchData = async () => {
    if (!form.date_init) return handleOpen('error', 'Error', 'La fecha de inicio es obligatoria', 'Cerrar alerta')
    if (!form.date_end) return handleOpen('error', 'Error', 'La fecha final es obligatoria', 'Cerrar alerta')
  }

  return (
    <>
      <PatientReportSearchBar
        onlyDates={false}
        canEdit={true}
        form={form}
        handleChangeInit={(event) => handleChangeForm('date_init', event.target.value)}
        handleChangeEnd={(event) => handleChangeForm('date_end', event.target.value)}
        handleChange={(event) => handleChangeForm(event.target.name, event.target.value)}
        onSearch={searchData}
      />
      <PopupMessage
        open={popupMessage.open}
        type={popupMessage.type}
        title={popupMessage.title}
        description={popupMessage.description}
        btnLabel={popupMessage.btnLabel}
        onClose={handleClose}
        onConfirm={handleClose}
      />
    </>
  )
}
