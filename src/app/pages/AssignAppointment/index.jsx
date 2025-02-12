// React libraries
import { useState } from 'react'
import { useHistory } from 'react-router'
import { useSelector } from 'react-redux'

// Dependencies
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
import { ProfessionalSchedule } from '../../containers/ProfessionalSchedule'

// api
import { Schedule } from '../../../api/schedules'
import { Patient } from '../../../api/patient'
import { Country } from '../../../api/country'
import { Deparment } from '../../../api/deparment'
import { City } from '../../../api/city'
import { TypeRequest } from '../../../api/typeRequest'
import { State } from '../../../api/state'
import { Program } from '../../../api/program'
import { ProductionCenter } from '../../../api/productionCenter'
import { Ips } from '../../../api/ips'
import { User } from '../../../api/user'
import { Appointment } from '../../../api/appointment'

// routes
import { Router } from '../../../routes'

// reducers
import { selectedUser } from '../../../reducers/userSlice'

// utils
import { ObjFormat } from '../../../utils/obj_format'
import { Role } from '../../../utils/role'

// styles & assets
import { useStyles } from './style'

export const AssignAppointment = () => {
  //Styles
  const classes = useStyles()

  //Auth user
  const userAuth = useSelector(selectedUser)

  // states
  const history = useHistory()
  const [professionals, setProfessionals] = useState([])
  const [requestsTypes, setRequestsTypes] = useState([])
  const [states, setStates] = useState([])
  const [programs, setPrograms] = useState([])
  const [countries, setCountries] = useState([])
  const [departments, setDepartments] = useState([])
  const [cities, setCities] = useState([])
  const [professionalSchedule, setProfessionalSchedule] = useState({})
  const [openView, setOpenView] = useState(false)
  const [showSaveButton, setShowSaveButton] = useState(false)
  const [isActiveAssign, setIsActiveAssign] = useState(false)
  const [canCancel, setCanCancel] = useState(false)
  const [limitNext, setLimitNext] = useState(false)
  const [limitPrev, setLimitPrev] = useState(false)
  const [search, setSearch] = useState({ nuip: '', nuipType: '' })
  const [dataSelected, setDataSelected] = useState('')
  const [controlDate, setControlDate] = useState(moment())
  const [popupMessage, setPopupMessage] = useState({
    open: false,
    openPS: false,
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
    required: true,
    disabled: true
  }
  const initialForm = {
    // Tab One
    appointmentId: {
      ...initAppointmentId,
      value: uuid()
    },
    professionals: {
      label: 'Profesional',
      name: 'professionals',
      disabled: false,
      required: true,
      value: ''
    },
    appointmentDate: {
      label: 'Fecha cita',
      name: 'appointmentDate',
      disabled: true,
      required: true,
      value: ''
    },
    appointmentDuration: {
      value: 0
    },
    appointmentHour: {
      label: 'Hora cita',
      name: 'appointmentHour',
      disabled: true,
      required: true,
      value: ''
    },
    suggestedDate: {
      label: 'Fecha sugerida',
      name: 'suggestedDate',
      disabled: false,
      required: true,
      value: ''
    },
    suggestedHour: {
      label: 'Hora sugerida',
      name: 'suggestedHour',
      disabled: false,
      required: true,
      value: ''
    },
    requestType: {
      label: 'Tipo de solicitud',
      name: 'requestType',
      disabled: false,
      required: true,
      value: ''
    },
    requestDate: {
      label: 'Fecha solicitud',
      name: 'requestDate',
      disabled: true,
      required: false,
      value: moment()
    },
    requestHour: {
      label: 'Hora solicitud',
      name: 'requestHour',
      disabled: true,
      required: false,
      value: moment()
    },
    searchIps: {
      label: 'Prestador (Código IPS)',
      name: 'searchIps',
      disabled: false,
      required: false,
      value: ''
    },
    searchProductionCode: {
      label: 'Código centro de producción',
      name: 'searchProductionCode',
      disabled: false,
      required: false,
      value: ''
    },

    // Tab Two
    states: {
      label: 'Estado',
      name: 'states',
      disabled: false,
      required: true,
      value: ''
    },
    saleDocument: {
      label: 'Documento de venta (opcional)',
      name: 'saleDocument',
      disabled: false,
      required: false,
      value: ''
    },
    firstTime: {
      label: 'Usuario de primera vez',
      name: 'firstTime',
      disabled: false,
      required: true,
      value: false
    },
    observations: {
      label: 'Observaciones',
      name: 'observations',
      disabled: false,
      required: true,
      value: ''
    },
    programs: {
      label: 'Programas',
      name: 'programs',
      disabled: false,
      required: false,
      value: ''
    },
  }

  const [form, setForm] = useState({
    ...initialForm
  })
  const [ips, setIps] = useState({})
  const [productionCenter, setProductionCenter] = useState({})
  const [programsSelected, setProgramsSelected] = useState([])
  const [error, setError] = useState({
    // Tab One
    appointmentId: { hasError: false, message: '' },
    professionals: { hasError: false, message: '' },
    appointmentDate: { hasError: false, message: '' },
    appointmentHour: { hasError: false, message: '' },
    suggestedDate: { hasError: false, message: '' },
    suggestedHour: { hasError: false, message: '' },
    requestType: { hasError: false, message: '' },
    requestDate: { hasError: false, message: '' },
    requestHour: { hasError: false, message: '' },
    searchIps: { hasError: false, message: '' },
    searchProductionCode: { hasError: false, message: '' },

    // Tab Two
    states: { hasError: false, message: '' },
    saleDocument: { hasError: false, message: '' },
    firstTime: { hasError: false, message: '' },
    observations: { hasError: false, message: '' },
    programs: { hasError: false, message: '' }
  })

  //DataObj
  const [userObj, setUserObj] = useState({})
  const [profilerObj, setProfilerObj] = useState({})

  //
  // Handlers
  //
  const getUserAvailabilities = async (user_id, date) => {
    if (date.format('YYYY-MM-DD') === moment().format('YYYY-MM-DD')) {
      setLimitPrev(true)
      date = date.format('YYYY-MM-DDTHH:mm:ss')
    } else {
      setLimitPrev(false)
      date = `${date.format('YYYY-MM-DD')}T00:00:00`
    }
    await Schedule.userAvailabilities({ user_id, date }).then((response) => {
      if (response?.status === 200) {
        if (response.data.length === 0) setLimitNext(true)
        else setLimitNext(false)
        setProfessionalSchedule({
          schedules: [...response.data],
          professional: {
            ...professionals.find(el => el.key === user_id)
          }
        })
      } else if (response?.status === 401) {
        history.push(Router.appLogout)
      }
    })
  }
  const handleChangeForm = (event) => setForm({ ...form, [event.target.name]: { ...form[event.target.name], value: event.target.value } })
  const handleChangeProfessional = async (event) => {
    await getUserAvailabilities(event.target.value, controlDate)
    return handleChangeForm(event)
  }
  const customHandleChangeForm = (event, prop) => handleChangeForm({ target: { name: event.target.name, value: event.target[prop] } })

  const resetForm = () => setForm({
    ...initialForm,
    requestDate: {
      ...form.requestDate,
      value: moment()
    },
    requestHour: {
      ...form.requestHour,
      value: moment()
    },
    appointmentId: {
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

  const initVarsData = () => {
    setProfessionalSchedule({})
    setProfessionals([])
    setRequestsTypes([])
    setStates([])
    setIps({})
    setProductionCenter({})
    setPrograms([])
    setProgramsSelected([])
    setCountries([])
    setDepartments([])
    setCities([])
    setProfessionalSchedule({})
    setLimitNext(false)
    setLimitPrev(false)
    setSearch({ nuip: '', nuipType: '' })
    setDataSelected('')
    setControlDate(moment())
  }

  const initValidators = () => {
    const errorObj = { ...error }
    Object.keys(error).forEach(el => errorObj[el] = { hasError: false, message: '' })
    setError({ ...errorObj })
  }

  const reset = () => {
    initVarsControl()
    initVarsData()
    initValidators()
    return resetForm()
  }

  const handleClose = () => setPopupMessage({ ...popupMessage, open: false, openPS: false })
  const handleOpen = (type, title, description, btnLabel, openPS = false) => setPopupMessage({
    open: openPS ? false : true,
    openPS,
    btnLabel,
    type,
    title,
    description
  })

  const handleSearch = async () => {
    initVarsControl()
    var user = {}, profile = {}
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
        history.push(Router.appLogout)
      } else {
        handleOpen(
          'info',
          'Sin resultados',
          'No se encontró el paciente con el número de identificacion ingresado',
          'Aceptar'
        )
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
        history.push(Router.appLogout)
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
        history.push(Router.appLogout)
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
        history.push(Router.appLogout)
      }
    })
    await TypeRequest.list().then((response) => {
      if (response?.status === 200) {
        setRequestsTypes(
          response.data.map((item) => ({
            key: item.id,
            text: item.description,
          })),
        )
      } else if (response?.status === 401) {
        history.push(Router.appLogout)
      }
    })
    await State.list().then((response) => {
      if (response?.status === 200) {
        setStates(
          response.data.map((item) => ({
            key: item.id,
            text: item.description,
          })),
        )
      } else if (response?.status === 401) {
        history.push(Router.appLogout)
      }
    })
    await Program.list().then((response) => {
      if (response?.status === 200) {
        setPrograms(
          response.data.map((item) => ({
            key: item.id,
            text: item.description,
          })),
        )
      } else if (response?.status === 401) {
        history.push(Router.appLogout)
      }
    })
    await User.getByRole(Role.professional).then((response) => {
      if (response?.status === 200) {
        setProfessionals(
          response.data.map((item) => ({
            key: item.id,
            text: `${item.first_name} ${item.second_name} ${item.surname} ${item.second_surname}`,
          })),
        )
      } else if (response?.status === 401) {
        history.push(Router.appLogout)
      }
    })
  }

  const handleSearchIps = async () => Ips.getByCode(form.searchIps.value).then((response) => {
    if (response?.status === 200) {
      setIps({ ...response.data })
    } else if (response?.status === 401) {
      history.push(Router.appLogout)
    }
  })

  const handleSearchProductionCenter = async () => ProductionCenter.getByCode(form.searchProductionCode.value).then((response) => {
    if (response?.status === 200) {
      setProductionCenter({ ...response.data })
    } else if (response?.status === 401) {
      history.push(Router.appLogout)
    }
  })

  const handleAddProgram = () => {
    if (!form.programs.value) return
    const index = programs.findIndex(el => el.key === form.programs.value)
    const array = [...programsSelected, { ...programs[index] }]
    const data = Array.from(new Set(array.map(JSON.stringify))).map(JSON.parse);
    setProgramsSelected([...data])
  }

  const handleDeleteProgram = (id) => {
    const array = [...programsSelected]
    const index = programsSelected.findIndex(el => el.key === id)
    array.splice(index, 1)
    setProgramsSelected([...array])
  }

  const handleSchedule = (duration, date, time) => {
    const momentDate = moment(`${date}T${time}:00`, "YYYY-MM-DDThh:mm:ss")
    setForm({
      ...form,
      appointmentDate: { ...form.appointmentDate, value: momentDate },
      appointmentHour: { ...form.appointmentHour, value: momentDate },
      appointmentDuration: { value: parseInt(duration) }
    })
    setDataSelected(`${date} ${time}`)
    return handleClose()
  }

  const handleSaveAppointment = async () => {
    const errorObj = { ...error }
    const formArray = Object.keys(form)
    formArray.forEach(el => {
      const value = typeof form[el].value === 'boolean' ? form[el].value + '' : form[el].value
      if (form[el].required && !value)
        errorObj[el] = { hasError: true, message: 'Este campo es obligatorio' }
      else errorObj[el] = { hasError: false, message: '' }
    })
    setError({ ...errorObj })
    for (let i = 0; i < formArray.length; i++) {
      if (errorObj[formArray[i]].hasError) return
    }
    if (!ips.name || !productionCenter.name) return handleOpen(
      'error',
      'Campos obligatorios',
      'Debes buscar una ips y un centro de producción',
      'Aceptar'
    )
    if (programsSelected.length === 0) return handleOpen(
      'error',
      'Campos obligatorios',
      'Debes agregar al menos un programa',
      'Aceptar'
    )
    const formData = {}
    formArray.forEach(el => formData[el] = form[el].value)
    delete formData.requestDate
    delete formData.suggestedDate
    delete formData.appointmentDate
    const response = await Appointment.savePatienAppointment({
      ...ObjFormat.snakeCase(formData),
      request_datetime: `${form.requestDate.value.format('YYYY-MM-DD')}T${form.requestHour.value.format('HH:mm:ss')}`,
      suggested_datetime: `${form.suggestedDate.value.format('YYYY-MM-DD')}T${form.suggestedHour.value.format('HH:mm:ss')}`,
      start_date: `${form.appointmentDate.value.format('YYYY-MM-DD')}T${form.appointmentHour.value.format('HH:mm')}:00`,
      ips: JSON.stringify({ ...ips }),
      production_center: JSON.stringify({ ...productionCenter }),
      programs: JSON.stringify([...programsSelected]),
      patient: userObj,
      user: userAuth
    })
    if (response.status === 201) {
      handleOpen('success', 'La cita ha sido programada', '', 'Cerrar alerta')
      return reset()
    } else
      return handleOpen('error', 'Error', JSON.stringify(response.data), 'Cerrar alerta')
  }

  // constants
  const handleChangeDateControlAndSearch = {
    'next': async () => {
      if (limitNext) return
      let newDate = controlDate.add(7, 'days')
      setControlDate(newDate)
      return getUserAvailabilities(form.professionals.value, controlDate)
    },
    'prev': async () => {
      if (limitPrev) return
      let newDate = controlDate.subtract(7, 'days')
      setControlDate(newDate)
      return getUserAvailabilities(form.professionals.value, controlDate)
    }
  }

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
      handleChangeProfessional={handleChangeProfessional}
      onSearchIps={() => handleSearchIps()}
      onSearchProductionCode={() => handleSearchProductionCenter()}
      openProfessionalSchedule={() => professionalSchedule.schedules ? handleOpen('info', '', '', '', true) : null}
      ips={ips}
      productionCenter={productionCenter}
    />,
    <TabTwo
      form={form}
      error={error}
      handleChangeForm={handleChangeForm}
      customHandleChangeForm={(event, prop) => customHandleChangeForm(event, prop)}
      states={states}
      programs={programs}
      programsSelected={programsSelected}
      handleAddProgram={handleAddProgram}
      handleDeleteProgram={handleDeleteProgram}
    />
  ]

  return (
    <>
      <PatientSearchBar
        showSaveButton={showSaveButton}
        onClickBtnSave={() => handleSaveAppointment()}
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
        open={popupMessage.openPS}
        onClose={handleClose}
        onConfirm={handleClose}
        customContent={
          <ProfessionalSchedule
            professional={professionalSchedule}
            handleSchedule={(duration, date, time) => handleSchedule(duration, date, time)}
            dataSelected={dataSelected}
            handleChangeNext={() => handleChangeDateControlAndSearch['next']()}
            handleChangePrev={() => handleChangeDateControlAndSearch['prev']()}
          />
        }
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
