import { useState } from 'react'
// import moment from 'moment'

// Containers
import { PatientReportSearchBar } from "../../../containers/PatientReportSearchBar"

// Components
import { PopupMessage } from '../../../components/PopupMessage'

export const Schedule = () => {
  const [form, setForm] = useState({ date_init: null, date_end: null })
  const [popupMessage, setPopupMessage] = useState({
    open: false,
    type: '',
    title: '',
    description: '',
    btnLabel: '',
  })

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

  const searchData = async () => {
    if (!form.date_init) return handleOpen('error', 'Error', 'La fecha de inicio es obligatoria', 'Cerrar alerta')
    if (!form.date_end) return handleOpen('error', 'Error', 'La fecha final es obligatoria', 'Cerrar alerta')
  }

  return (
    <>
      <PatientReportSearchBar
        onlyDates={true}
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
