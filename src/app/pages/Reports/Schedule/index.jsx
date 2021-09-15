import { useState } from 'react'
import moment from 'moment'

// Containers
import { PatientReportSearchBar } from "../../../containers/PatientReportSearchBar"

// Components
import { PopupMessage } from '../../../components/PopupMessage'
import { TableReportAppointment } from '../../../containers/TableReportAppointment'

// Api
import { Appointment } from '../../../../api/appointment'

export const Schedule = () => {
  const [form, setForm] = useState({ date_init: null, date_end: null })
  const [popupMessage, setPopupMessage] = useState({
    open: false,
    type: '',
    title: '',
    description: '',
    btnLabel: '',
  })
  const [userAppointments, setUserAppointments] = useState([])

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
    await Appointment.reportAppointments({
      date_init: form.date_init ? moment(form.date_init).format('YYYY-MM-DDT00:00:00') : null,
      date_end: form.date_end ? moment(form.date_end).format('YYYY-MM-DDT23:59:59') : null
    }).then((response) => {
      if (response?.status === 200) {
        if (response.data?.length <= 0) return handleOpen('info', 'Sin coincidencias', 'No se encontraron registros', 'Cerrar alerta')
        setUserAppointments(
          response.data?.map((item) => ({
            id: item.id,
            names: `${item.appointment.patient.profile.first_name} ${item.appointment.patient.profile.second_name ? item.appointment.patient.profile.second_name : ''}`,
            last_names: `${item.appointment.patient.profile.surname} ${item.appointment.patient.profile.second_surname ? item.appointment.patient.profile.second_surname : ''}`,
            documents: item.appointment.patient.profile.nuip,
            date_hour: `${moment(item.appointment.start_date, 'YYYY-MM-DD').format('L')} ${moment(item.appointment.start_date, 'YYYY-MM-DDTHH:mm:ss').format('HH:mm:ss')}`,
            professional: `${item.user.first_name} ${item.user.surname}`
          })),
        )
      }
    })
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
      <TableReportAppointment data={userAppointments}></TableReportAppointment>
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
