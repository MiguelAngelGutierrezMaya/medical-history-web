import { useState } from 'react'
import { useHistory } from 'react-router'
import { useSelector } from 'react-redux'
import { v4 as uuid } from 'uuid';
import moment from 'moment'

// components
import { IndexCardHolderEmpty } from '../../containers/IndexCardHolderEmpty'
import { PatientSearchBar } from '../../containers/PatientSearchBar'
import { PatientInfo } from '../../components/PatientInfo'
import { PopupMessage } from '../../components/PopupMessage'
import { CustomTabs } from '../../components/CustomTabs'
import { TabOne } from '../../containers/AssignAppointmentForm/tabOne'
import { TabTwo } from '../../containers/AssignAppointmentForm/tabTwo'

import { Grid } from '@material-ui/core'

// containers


// api
import { Patient } from '../../../api/patient'
import { Country } from '../../../api/country'
import { Deparment } from '../../../api/deparment'
import { City } from '../../../api/city'

// routes
import { Router } from '../../../routes'

// reducers
import { selectedUser } from '../../../reducers/userSlice'

// utils
import { ObjFormat } from '../../../utils/obj_format'

// styles & assets
import { useStyles } from './style'

export const AssignAppointment = () => {
  //Styles
  const classes = useStyles()

  //Auth user
  const user = useSelector(selectedUser)

  //DataObj
  const [userObj, setUserObj] = useState({})
  const [profilerObj, setProfilerObj] = useState({})

  // states
  const history = useHistory()
  const [professionals, setProfessionals] = useState([])
  const [requestsTypes, setRequestsTypes] = useState([])
  const [states, setStates] = useState([])
  const [programs, setPrograms] = useState([])
  const [countries, setCountries] = useState([])
  const [departments, setDepartments] = useState([])
  const [cities, setCities] = useState([])
  const [openView, setOpenView] = useState(false)
  const [showSaveButton, setShowSaveButton] = useState(false)
  const [isActiveAssign, setIsActiveAssign] = useState(false)
  const [canCancel, setCanCancel] = useState(false)
  const [search, setSearch] = useState({ nuip: '', nuipType: '' })
  const [popupMessage, setPopupMessage] = useState({
    open: false,
    type: '',
    title: '',
    description: '',
    btnLabel: '',
  })

  //
  // FormData
  //
  const initAppointmentId = {
    label: 'Identificación de la cita',
    name: 'appointmentId',
    disabled: true
  }
  const [form, setForm] = useState({
    // Tab One
    appointmentId: {
      ...initAppointmentId,
      value: uuid()
    },
    professionals: {
      label: 'Profesional',
      name: 'professionals',
      disabled: false,
      value: ''
    },
    appointmentDate: {
      label: 'Fecha cita',
      name: 'appointmentDate',
      disabled: true,
      value: ''
    },
    appointmentHour: {
      label: 'Hora cita',
      name: 'appointmentHour',
      disabled: true,
      value: ''
    },
    suggestedDate: {
      label: 'Fecha sugerida',
      name: 'suggestedDate',
      disabled: false,
      value: ''
    },
    suggestedHour: {
      label: 'Hora sugerida',
      name: 'suggestedHour',
      disabled: false,
      value: ''
    },
    requestType: {
      label: 'Tipo de solicitud',
      name: 'requestType',
      disabled: false,
      value: ''
    },
    requestDate: {
      label: 'Fecha solicitud',
      name: 'requestDate',
      disabled: false,
      value: ''
    },
    requestHour: {
      label: 'Hora solicitud',
      name: 'requestHour',
      disabled: false,
      value: ''
    },
    searchIps: {
      label: 'Prestador (Código IPS)',
      name: 'searchIps',
      disabled: false,
      value: ''
    },
    searchProductionCode: {
      label: 'Código centro de producción',
      name: 'searchProductionCode',
      disabled: false,
      value: ''
    },
    states: {
      label: 'Estado',
      name: 'states',
      disabled: false,
      value: ''
    },
    saleDocument: {
      label: 'Documento de venta (opcional)',
      name: 'states',
      disabled: false,
      value: ''
    },
    firstTime: {
      label: 'Usuario de primera vez',
      name: 'firstTime',
      disabled: false,
      value: false
    },
    observations: {
      label: 'Observaciones',
      name: 'observations',
      disabled: false,
      value: ''
    },
    programs: {
      label: 'Programas',
      name: 'programs',
      disabled: false,
      value: ''
    },

    // Tab Two

  })

  const [error, setError] = useState({
    appointmentId: { hasError: false, message: '' },
    professionals: { hasError: false, message: '' },
    appointmentDate: { hasError: false, message: '' },
    appointmentHour: { hasError: false, message: '' },
    suggestedDate: { hasError: false, message: '' },
    suggestedHour: { hasError: false, message: '' },
    requestType: { hasError: false, message: '' },
    requestDate: { hasError: false, message: '' },
    requestHour: { hasError: false, message: '' },
    states: { hasError: false, message: '' },
    saleDocument: { hasError: false, message: '' },
    firstTime: { hasError: false, message: '' },
    observations: { hasError: false, message: '' }
  })


  //
  // Handlers
  //

  const handleChangeForm = (event) => setForm({ ...form, [event.target.name]: { ...form[event.target.name], value: event.target.value } })
  const customHandleChangeForm = (event, prop) => handleChangeForm({ target: { name: event.target.name, value: event.target[prop] } })

  const resetForm = () => setForm({
    ...form, appointmentId: {
      ...initAppointmentId,
      value: uuid()
    }
  })

  const initVarsControl = () => {
    setOpenView(false)
    setIsActiveAssign(false)
    setCanCancel(false)
    setShowSaveButton(false)
  }

  const reset = () => {
    initVarsControl()
    return resetForm()
  }

  const handleClose = () => setPopupMessage({ ...popupMessage, open: false })
  const handleOpen = (type, title, description, btnLabel) => setPopupMessage({
    open: true,
    btnLabel,
    type,
    title,
    description
  })

  const handleSearch = async () => {
    initVarsControl()
    var user, profile
    await Patient.getPatient(search).then((response) => {
      if (response?.status === 200) {
        user = ObjFormat.camelCase(response.data)
        profile = ObjFormat.camelCase({
          ...response.data?.profile,
          birthday:
            response.data?.profile?.birthday !== null
              ? moment(response.data?.profile?.birthday, 'YYYY-MM-DD')
              : '',
          transferDate:
            response.data?.profile?.transfer_date !== null
              ? moment(response.data?.profile?.transfer_date, 'YYYY-MM-DD')
              : '',
          dateLastAttention:
            response.data?.profile?.date_last_attention !== null
              ? moment(
                response.data?.profile?.date_last_attention,
                'YYYY-MM-DD',
              )
              : '',
        })
        setUserObj({ ...user })
        setProfilerObj({ ...profile })
        setOpenView(true)
        setIsActiveAssign(true)
        setCanCancel(true)
        setShowSaveButton(true)
      } else if (response?.status === 401) {
        history.push(Router.appLogin)
      } else {
        setPopupMessage({
          open: true,
          type: 'info',
          title: 'Sin resultados',
          description:
            'No se encontró el paciente con el número de identificacion ingresado',
          btnLabel: 'Aceptar',
        })
      }
    })
    await Country.list().then((response) => {
      if (response?.status === 200) {
        setCountries(
          response.data.map((item) => ({
            key: item.id,
            text: item.description,
          })),
        )
      } else if (response?.status === 401) {
        history.push(Router.appLogin)
      }
    })
    await Deparment.list(profile.country).then((response) => {
      if (response?.status === 200) {
        setDepartments(
          response.data.map((item) => ({
            key: item.id,
            text: item.description,
          })),
        )
      } else if (response?.status === 401) {
        history.push(Router.appLogin)
      }
    })
    await City.list(profile.department).then((response) => {
      if (response?.status === 200) {
        setCities(
          response.data.map((item) => ({
            key: item.id,
            text: item.description,
          })),
        )
      } else if (response?.status === 401) {
        history.push(Router.appLogin)
      }
    })
  }

  // constants
  const titles = [
    'DATOS BÁSICOS',
    'UBICACIÓN DE LA HISTORIA CLÍNICA',
  ]

  const contents = [
    <TabOne
      form={form}
      error={error}
      professionals={professionals}
      requestsTypes={requestsTypes}
      handleChangeForm={handleChangeForm}
      onSearchIps={() => console.log('algo ips')}
      onSearchProductionCode={() => console.log('algo production code')}
    />,
    <TabTwo
      form={form}
      error={error}
      handleChangeForm={handleChangeForm}
      customHandleChangeForm={(event, prop) => customHandleChangeForm(event, prop)}
      states={states}
      programs={programs}
      addProgram={() => console.log('add program')}
    />
  ]

  return (
    <>
      <PatientSearchBar
        showSaveButton={showSaveButton}
        onClickBtnSave={() => console.log('funciona save')}
        search={search}
        setSearch={setSearch}
        onSearch={handleSearch}
        isActiveEdit={false}
        isActiveAssign={isActiveAssign}
        canCancel={canCancel}
        canEdit={false}
        toggleEdit={null}
        toggleCancel={() => reset()}
      />
      {!openView ? (
        <IndexCardHolderEmpty
          onClick={null}
          title={'Digitar documento de identidad del paciente'}
          text={'para visualizar su información y asignar una cita'}
          showButton={false}
        />
      ) : (
        <Grid
          container
          direction="row"
          alignItems="flex-start"
        >
          <Grid className={classes.spacing} item lg={5} md={6} sm={12} xs={12}>
            <PatientInfo
              user={userObj}
              profile={profilerObj}
              countries={countries}
              departments={departments}
              cities={cities}
            ></PatientInfo>
          </Grid>
          <Grid item lg={7} md={6} sm={12} xs={12}>
            <CustomTabs titles={titles} contents={contents} />
          </Grid>
        </Grid>
      )}
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
