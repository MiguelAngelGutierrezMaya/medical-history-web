import { useState } from 'react'
import moment from 'moment'

// Containers
import { PatientReportSearchBar } from "../../../containers/PatientReportSearchBar"

// Components
import { PopupMessage } from '../../../components/PopupMessage'
import { TableReportPatient } from '../../../containers/TableReportPatient'
import { Fab } from '@material-ui/core'

//Icons
import DescriptionIcon from '@material-ui/icons/Description'

// Api
import { User } from '../../../../api/user'

export const Patient = () => {
  const [form, setForm] = useState({ nuip: '', date_init: null, date_end: null })
  const [popupMessage, setPopupMessage] = useState({
    open: false,
    type: '',
    title: '',
    description: '',
    btnLabel: '',
  })
  const [patients, setPatients] = useState([])

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

  const showIndexTarget = () => console.log('funciona :3')

  const searchData = async () => {
    if (!form.date_init) return handleOpen('error', 'Error', 'La fecha de inicio es obligatoria', 'Cerrar alerta')
    await User.reportUsers({
      document: form.nuip ? form.nuip : null,
      date_init: form.date_init ? moment(form.date_init).format('YYYY-MM-DDT00:00:00') : null,
      date_end: form.date_end ? moment(form.date_end).format('YYYY-MM-DDT23:59:59') : null
    }).then((response) => {
      if (response?.status === 200) {
        setPatients(
          response.data?.map((item) => ({
            id: item.id,
            date: moment(item.profile.created, 'YYYY-MM-DD').format('L'),
            names: `${item.first_name} ${item.second_name}`,
            last_names: `${item.surname} ${item.second_surname}`,
            documents: item.profile.nuip,
            index_target: (
              <Fab color="primary" aria-label="description" onClick={() => showIndexTarget()}>
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
      <TableReportPatient data={patients} />
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
