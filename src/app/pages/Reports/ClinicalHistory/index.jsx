import { useState } from 'react'
import moment from 'moment'

// Containers
import { PatientReportSearchBar } from "../../../containers/PatientReportSearchBar"

// Components
import { PatientMedicalHistories } from '../../../components/PatientMedicalHistories'
import { PopupMessage } from '../../../components/PopupMessage'
import { Fab } from '@material-ui/core'

//Icons
import DescriptionIcon from '@material-ui/icons/Description'

// Api
import { UserMedicalHistory } from '../../../../api/userMedicalHistory'

export const ClinicalHistory = () => {

  const [form, setForm] = useState({ nuip: '', date_init: null, date_end: null })
  const [popupMessage, setPopupMessage] = useState({
    open: false,
    type: '',
    title: '',
    description: '',
    btnLabel: '',
  })
  const [userMedicalHistories, setUserMedicalHistories] = useState([])

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

  const showUserMedicalHistory = () => { }

  const searchData = async () => {
    if (!form.nuip) return handleOpen('error', 'Error', 'El nuip del paciente es obligatorio', 'Cerrar alerta')
    await UserMedicalHistory.getReportUserMedicalHistory({
      document: form.nuip,
      date_init: form.date_init ? moment(form.date_init).format('YYYY-MM-DDT00:00:00') : null,
      date_end: form.date_end ? moment(form.date_end).format('YYYY-MM-DDT23:59:59') : null
    }).then((response) => {
      if (response?.status === 200) {
        setUserMedicalHistories(
          response.data?.map((item) => ({
            id: item.id,
            date: moment(item.date, 'YYYY-MM-DD').format('L'),
            title: item.medical_history.name,
            profesional: `${item.professional.first_name} ${item.professional.second_name}`,
            clinic_history: (
              <Fab color="primary" aria-label="description" onClick={() => showUserMedicalHistory(item)}>
                <DescriptionIcon />
              </Fab>
            )
          })),
        )
      }
    })
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
      <PatientMedicalHistories data={userMedicalHistories}></PatientMedicalHistories>
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
