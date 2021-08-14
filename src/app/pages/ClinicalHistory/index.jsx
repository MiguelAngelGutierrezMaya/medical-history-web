import { useState } from 'react'
import { useHistory } from 'react-router'
import { useSelector } from 'react-redux'
import moment from 'moment'

// components
import { IndexCardHolderEmpty } from '../../containers/IndexCardHolderEmpty'
import { PatientSearchBar } from '../../containers/PatientSearchBar'
import { PatientInfo } from '../../components/PatientInfo'
import { PopupMessage } from '../../components/PopupMessage'
import { PatientMedicalHistories } from '../../components/PatientMedicalHistories'
import { FormUserMedicalHistory } from '../../containers/FormUserMedicalHistory'

import { Fab, Grid } from '@material-ui/core'

// containers
import { HeaderBasic } from '../../containers/HeaderBasic'
import { CardHCContainer } from '../../containers/CardHCContainer'


//Icons
import DescriptionIcon from '@material-ui/icons/Description'

// api
import { Patient } from '../../../api/patient'
import { Country } from '../../../api/country'
import { Deparment } from '../../../api/deparment'
import { City } from '../../../api/city'
import { MedicalHistory } from '../../../api/medicalHistory'
import { UserMedicalHistory } from '../../../api/userMedicalHistory'
import { Diagnose } from '../../../api/diagnose'
import { Category } from '../../../api/category'
import { Appointment } from '../../../api/appointment'
import { DiagnosticAids } from '../../../api/diagnosticAids'
import { ExternalCause } from '../../../api/externalCause'
import { Medicine } from '../../../api/medicine'
import { Presentation } from '../../../api/presentation'
import { Specialist } from '../../../api/specialist'

// routes
import { Router } from '../../../routes'

// reducers
import { selectedUser } from '../../../reducers/userSlice'

// utils
import { ObjFormat } from '../../../utils/obj_format'

// styles & assets
import { useStyles } from './style'

export const ClinicalHistory = () => {
  //Styles
  const classes = useStyles()

  //Auth user
  const user = useSelector(selectedUser)

  //DataObj
  const [userObj, setUserObj] = useState({})
  const [profilerObj, setProfilerObj] = useState({})

  // states
  const history = useHistory()
  const [titles, setTitles] = useState([])
  const [content, setContent] = useState([])
  const [countries, setCountries] = useState([])
  const [departments, setDepartments] = useState([])
  const [cities, setCities] = useState([])
  const [medicalHistories, setMedicalHistories] = useState([])
  const [userMedicalHistories, setUserMedicalHistories] = useState([])
  const [typeView, setTypeView] = useState("one")
  const [openView, setOpenView] = useState(false)
  const [canEdit, setCanEdit] = useState(true)
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
  const [specialistsList, setSpecialistsList] = useState([])
  const [specialistsListSelected, setSpecialistsListSelected] = useState([])
  const [specialistSelected, setSpecialistSelected] = useState({})

  const [diagnosticAidsList, setDiagnosticAidsList] = useState([])
  const [diagnosticAidsListSelected, setDiagnosticAidsListSelected] = useState([])
  const [diagnosticAidSelected, setDiagnosticAidSelected] = useState({})

  const [medicinesList, setMedicinesList] = useState([])
  const [medicinesListSelected, setMedicinesListSelected] = useState([])
  const [medicineSelected, setMedicineSelected] = useState({})
  const [medicineObservation, setMedicineObservation] = useState('')
  const [medicineQuantity, setMedicineQuantity] = useState(0)
  const [presentationsList, setPresentationsList] = useState([])
  const [presentationSelected, setPresentationSelected] = useState({})

  const [diagnosesList, setDiagnosesList] = useState([])
  const [categoriesList, setCategoriesList] = useState([])
  const [appointmentPurposesList, setAppointmentPurposesList] = useState([])
  const [externalCausesList, setExternalCausesList] = useState([])
  const [hcData, setHcData] = useState({})
  const [diagnosesCategories, setDiagnosesCategories] = useState([])
  const [diagnoseSelected, setDiagnoseSelected] = useState({})
  const [categorySelected, setCategorySelected] = useState({})
  const [appointmentPurposeSelected, setAppointmentPurposeSelected] = useState({})
  const [externalCauseSelected, setExternalCauseSelected] = useState({})
  const [date, setDate] = useState(null)
  const [hour, setHour] = useState(null)
  const [itemsValue, setItemsValue] = useState([])

  //
  // Handlers
  //

  const selectDiagnose = (key) => setDiagnoseSelected({ ...diagnosesList.find(el => el.key === key) })
  const selectCategory = (key) => setCategorySelected({ ...categoriesList.find(el => el.key === key) })
  const selectSpecialist = (value) => setSpecialistSelected({ ...value })
  const selectDiagnosticAid = (value) => setDiagnosticAidSelected({ ...value })
  const selectMedicine = (value) => setMedicineSelected({ ...value })
  const selectPresentation = (key) => setPresentationSelected({ ...presentationsList.find(el => el.key === key) })
  const selectAppointmentPurpose = (key) => setAppointmentPurposeSelected({ ...appointmentPurposesList.find(el => el.key === key) })
  const selectExternalCause = (key) => setExternalCauseSelected({ ...externalCausesList.find(el => el.key === key) })
  const changeObservation = (value) => setMedicineObservation(value)
  const changeQuantity = (value) => setMedicineQuantity(value)

  const genericListSelected = (array, objSelected) => {
    const arr = [...array]
    if (objSelected.key) {
      const inArray = arr.find(el => el.key === objSelected.key)
      if (inArray === undefined) arr.push({ ...objSelected })
    }
    return arr
  }

  const addSpecialist = () => setSpecialistsListSelected([
    ...genericListSelected(specialistsListSelected, specialistSelected)
  ])

  const addDiagnosticAid = () => setDiagnosticAidsListSelected([
    ...genericListSelected(diagnosticAidsListSelected, diagnosticAidSelected)
  ])

  const addMedicine = () => setMedicinesListSelected([
    ...genericListSelected(medicinesListSelected, {
      ...medicineSelected,
      presentationSelected: presentationSelected.text || '',
      medicineObservation,
      medicineQuantity
    })
  ])

  const genericRemove = (array, objSelected) => {
    const arr = [...array]
    const index = arr.findIndex(el => el.key === objSelected.key)
    if (index !== -1) arr.splice(index, 1)
    return arr
  }

  const removeSpecialist = (specialist) => setSpecialistsListSelected([
    ...genericRemove(specialistsListSelected, specialist)
  ])

  const removeDiagnosticAid = (diagnosticAid) => setDiagnosticAidsListSelected([
    ...genericRemove(diagnosticAidsListSelected, diagnosticAid)
  ])

  const removeMedicine = (medicine) => setMedicinesListSelected([
    ...genericRemove(medicinesListSelected, medicine)
  ])

  const initSelects = () => {
    setDiagnoseSelected({})
    setCategorySelected({})
  }

  const addDiagnoseCategory = () => {
    if (diagnoseSelected.key && categorySelected.key) {
      const index = diagnosesCategories.findIndex(el => el.diagnose.key === diagnoseSelected.key && el.category.key === categorySelected.key)
      if (index === -1) {
        const array = [...diagnosesCategories]
        array.push({ diagnose: { ...diagnoseSelected }, category: { ...categorySelected } })
        setDiagnosesCategories([...array])
      }
      return initSelects()
    }
  }

  const deleteDiagnoseCategory = (data) => {
    const index = diagnosesCategories.findIndex(el => el.diagnose.key === data.diagnose.key && el.category.key === data.category.key)
    const array = [...diagnosesCategories]
    array.splice(index, 1)
    setDiagnosesCategories([...array])
    return initSelects()
  }

  const handleChangeValueItem = (el, value, focus) => {
    const data = [...itemsValue].map(el => ({ ...el, focus: false }))
    const index = data.findIndex(elem => elem.item.id === el.id)
    if (index === -1) data.push({ item: { ...el }, value, focus })
    else data[index] = { item: { ...el }, value, focus }
    setItemsValue([...data])
  }

  const handleChangeView = (type) => setTypeView(type)
  const handleClose = () => setPopupMessage({ ...popupMessage, open: false })
  const handleOpen = (type, title, description, btnLabel) => setPopupMessage({
    open: true,
    btnLabel,
    type,
    title,
    description
  })

  const handleSearch = async () => {
    setOpenView(false)
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
    await Diagnose.list().then((response) => {
      if (response?.status === 200) {
        setDiagnosesList(
          response.data.map((item) => ({
            key: item.id,
            text: item.name,
          })),
        )
      } else if (response?.status === 401) {
        history.push(Router.appLogin)
      }
    })
    await Category.list().then((response) => {
      if (response?.status === 200) {
        setCategoriesList(
          response.data.map((item) => ({
            key: item.id,
            text: item.name,
          })),
        )
      } else if (response?.status === 401) {
        history.push(Router.appLogin)
      }
    })
    await DiagnosticAids.list().then((response) => {
      if (response?.status === 200) {
        setDiagnosticAidsList(
          response.data.map((item) => ({
            key: item.id,
            text: item.description,
          })),
        )
      } else if (response?.status === 401) {
        history.push(Router.appLogin)
      }
    })
    await ExternalCause.list().then((response) => {
      if (response?.status === 200) {
        setExternalCausesList(
          response.data.map((item) => ({
            key: item.id,
            text: item.description,
          })),
        )
      } else if (response?.status === 401) {
        history.push(Router.appLogin)
      }
    })
    await Medicine.list().then((response) => {
      if (response?.status === 200) {
        setMedicinesList(
          response.data.map((item) => ({
            key: item.id,
            text: item.description,
          })),
        )
      } else if (response?.status === 401) {
        history.push(Router.appLogin)
      }
    })
    await Presentation.list().then((response) => {
      if (response?.status === 200) {
        setPresentationsList(
          response.data.map((item) => ({
            key: item.id,
            text: item.description,
          })),
        )
      } else if (response?.status === 401) {
        history.push(Router.appLogin)
      }
    })
    await Specialist.list().then((response) => {
      if (response?.status === 200) {
        setSpecialistsList(
          response.data.map((item) => ({
            key: item.id,
            text: item.description,
          })),
        )
      } else if (response?.status === 401) {
        history.push(Router.appLogin)
      }
    })
    await MedicalHistory.list().then((response) => {
      if (response?.status === 200) {
        setMedicalHistories(
          response.data?.map((item) => ({
            key: item.id,
            text: item.name,
          })),
        )
      }
    })
    await Appointment.listAppointmentPurpose().then((response) => {
      if (response?.status === 200) {
        setAppointmentPurposesList(
          response.data?.map((item) => ({
            key: item.id,
            text: item.description,
          })),
        )
      }
    })
    if (user.id)
      await UserMedicalHistory.list(user.id).then((response) => {
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

  const initData = () => {
    setItemsValue([])
    setDiagnosesCategories([])
    setDiagnoseSelected({})
    setCategorySelected({})

    setSpecialistsList([])
    setSpecialistsListSelected([])
    setSpecialistSelected({})

    setDiagnosticAidsList([])
    setDiagnosticAidsListSelected([])
    setDiagnosticAidSelected({})

    setMedicinesList([])
    setMedicinesListSelected([])
    setMedicineSelected({})
    setMedicineObservation('')
    setMedicineQuantity(0)
    setPresentationsList([])
    setPresentationSelected({})

    setAppointmentPurposesList([])
    setExternalCausesList([])
    setAppointmentPurposeSelected({})
    setExternalCauseSelected({})

    setDate(null)
    setHour(null)
  }

  const modifyDataGroups = (groups) => groups.map(el => ({
    ...el,
    items: el.items.reverse()
  }))

  const showMedicalHistory = async (medHistory, canEdit) => {
    const medical_history = await MedicalHistory.getMedicalHistory(medHistory.key)
    initData()
    handleChangeView("three")
    setHcData({ ...medHistory })
    setTitles([...medical_history.data.groups.reverse().map(el => el.title.toUpperCase()), "FINALIDAD DE CONSULTA", "DIAGNÓSTICO", "REMISIONES"])
    setContent([...modifyDataGroups(medical_history.data.groups)])
    setCanEdit(canEdit)
  }

  const handleSearchConfigMedicalHistory = async (medHistory) => {
    return await showMedicalHistory(medHistory, true)
  }

  const handleSaveData = async () => {
    if (!date || !hour) return handleOpen('error', 'Error', 'La fecha y la hora son obligatorias', 'Cerrar alerta')
    if (itemsValue.length === 0) return handleOpen('error', 'Error', 'Debes contestar al menos 1 item del formulario', 'Cerrar alerta')
    const func = el => JSON.stringify(el)
    const response = await UserMedicalHistory.save({
      date: `${date.format('YYYY-MM-DD')}T${hour.format('HH:mm:ss')}`,
      medical_history_id: hcData.key,
      itemsValue,
      diagnosesCategories,
      specialists: specialistsListSelected.map(func),
      diagnosticAids: diagnosticAidsListSelected.map(func),
      medicines: medicinesListSelected.map(func),
      appointmentPurpose: appointmentPurposeSelected.key ? `${appointmentPurposeSelected.key}-${appointmentPurposeSelected.text}` : 'none',
      externalCause: externalCauseSelected.key ? `${externalCauseSelected.key}-${externalCauseSelected.text}` : 'none',
      user_id: userObj.id,
      professional_id: user.id
    })
    if (response.status === 201) {
      handleOpen('success', 'Historia clinica guardada', '', 'Cerrar alerta')
      initData()
      handleChangeView("one")
      return await handleSearch()
    } else
      return handleOpen('error', 'Error', response.data, 'Cerrar alerta')
  }

  const showUserMedicalHistory = async (item) => {
    await showMedicalHistory({ key: item.medical_history.id, text: item.medical_history.name }, false)
    const umh = await UserMedicalHistory.getUserMedicalHistory(item.id)
    const exCaSel = umh.data.filter(el => el.type === 'externalCauses')
    const appPur = umh.data.filter(el => el.type === 'appointmentPurposes')
    const func = el => ({ ...JSON.parse(el) })
    setDate(moment(item.date))
    setHour(moment(item.date))
    setItemsValue([...umh.data.filter(el => el.type === 'itemValue').map(el => ({ ...el, focus: false }))])
    setDiagnosesCategories([...umh.data.filter(el => el.type === 'diagnosesCategories').map(el => ({ ...JSON.parse(el.value.split("'").join('"')) }))])
    setSpecialistsListSelected([...umh.data.filter(el => el.type === 'specialists').map(func)])
    setDiagnosticAidsListSelected([...umh.data.filter(el => el.type === 'diagnosticAids').map(func)])
    medicinesListSelected([...umh.data.filter(el => el.type === 'medicines').map(func)])
    setExternalCauseSelected({ key: exCaSel.key, text: exCaSel.text })
    setAppointmentPurposeSelected({ key: appPur.key, text: appPur.text })
  }

  return (
    <>
      <PatientSearchBar
        showSaveButton={false}
        onClickBtnSave={null}
        search={search}
        setSearch={setSearch}
        onSearch={handleSearch}
        isActiveEdit={false}
        canEdit={false}
        toggleEdit={null}
      />
      {!openView ? (
        <IndexCardHolderEmpty
          onClick={null}
          title={'Digitar documento de identidad del paciente'}
          text={'para visualizar su historial médico'}
          showButton={false}
        />
      ) : (
        <Grid
          container
          direction="row"
          alignItems="flex-start"
        >
          <Grid className={classes.spacing} item lg={5} md={4} sm={12} xs={12}>
            <PatientInfo
              user={userObj}
              profile={profilerObj}
              countries={countries}
              departments={departments}
              cities={cities}
            ></PatientInfo>
          </Grid>
          <Grid className={classes.spacing} item lg={7} md={8} sm={12} xs={12}>
            <Grid
              container
              direction="row"
              alignItems="flex-start"
            >
              <Grid className={classes.spacing} item lg={12} md={12} sm={12} xs={12}>
                <HeaderBasic
                  type={typeView}
                  onClick={() => handleChangeView("two")}
                  onReturn={() => handleChangeView("one")}
                  subtitle={'Seleccionar tipo de Historia Clinica'}
                ></HeaderBasic>
              </Grid>
              <Grid className={classes.spacing} item lg={12} md={12} sm={12} xs={12}>
                {
                  typeView === 'one' ? (
                    <PatientMedicalHistories data={userMedicalHistories}></PatientMedicalHistories>
                  ) : typeView === 'two' ? (
                    <>
                      <CardHCContainer list={medicalHistories} onClick={(el) => handleSearchConfigMedicalHistory(el)}></CardHCContainer>
                    </>
                  ) : (
                    <FormUserMedicalHistory
                      hcData={hcData}
                      date={date}
                      hour={hour}
                      content={content}
                      titles={titles}
                      diagnosesList={diagnosesList}
                      categoriesList={categoriesList}
                      appointmentPurposesList={appointmentPurposesList}
                      diagnosticAidsList={diagnosticAidsList}
                      externalCausesList={externalCausesList}
                      medicinesList={medicinesList}
                      presentationsList={presentationsList}
                      specialistsList={specialistsList}
                      diagnosesCategories={diagnosesCategories}
                      diagnoseSelected={diagnoseSelected}
                      categorySelected={categorySelected}
                      specialistSelected={specialistSelected}
                      diagnosticAidSelected={diagnosticAidSelected}
                      medicineSelected={medicineSelected}
                      presentationSelected={presentationSelected}
                      specialistsListSelected={specialistsListSelected}
                      diagnosticAidsListSelected={diagnosticAidsListSelected}
                      medicinesListSelected={medicinesListSelected}
                      medicineObservation={medicineObservation}
                      medicineQuantity={medicineQuantity}
                      appointmentPurposeSelected={appointmentPurposeSelected}
                      externalCauseSelected={externalCauseSelected}
                      itemsValue={itemsValue}
                      canEdit={canEdit}
                      changeValueItem={handleChangeValueItem}
                      handleChangeDiagnoses={(event) => selectDiagnose(event.target.value)}
                      handleChangeCategories={(event) => selectCategory(event.target.value)}
                      handleChangeSpecialists={(value) => selectSpecialist(value)}
                      handleChangeDiagnosticAids={(value) => selectDiagnosticAid(value)}
                      handleChangeMedicines={(value) => selectMedicine(value)}
                      handleChangePresentations={(event) => selectPresentation(event.target.value)}
                      handleChangeAppointmentPurposes={(event) => selectAppointmentPurpose(event.target.value)}
                      handleChangeCauses={(event) => selectExternalCause(event.target.value)}
                      handleChangeDate={(event) => setDate(event.target.value)}
                      handleChangeHour={(event) => setHour(event.target.value)}
                      handleChangeQuantity={(event) => changeQuantity(event.target.value)}
                      handleChangeObservation={(event) => changeObservation(event.target.value)}
                      addDiagnoseCategory={() => addDiagnoseCategory()}
                      deleteDiagnoseCategory={(key) => deleteDiagnoseCategory(key)}
                      addSpecialistToList={() => addSpecialist()}
                      removeSpecialistFromList={(specialist) => removeSpecialist(specialist)}
                      removeDiagnosticAidFromList={(diagnosticAid) => removeDiagnosticAid(diagnosticAid)}
                      removeMedicineFromList={(medicine) => removeMedicine(medicine)}
                      addDiagnosticAidToList={() => addDiagnosticAid()}
                      addMedicineToList={() => addMedicine()}
                      onClickBtnSave={handleSaveData}
                    ></FormUserMedicalHistory>
                  )
                }
              </Grid>
            </Grid>
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
