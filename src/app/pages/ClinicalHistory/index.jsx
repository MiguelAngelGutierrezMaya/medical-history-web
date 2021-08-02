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
  const [diagnosesList, setDiagnosesList] = useState([])
  const [categoriesList, setCategoriesList] = useState([])
  const [hcData, setHcData] = useState({})
  const [diagnosesCategories, setDiagnosesCategories] = useState([])
  const [diagnoseSelected, setDiagnoseSelected] = useState({})
  const [categorySelected, setCategorySelected] = useState({})
  const [date, setDate] = useState(null)
  const [hour, setHour] = useState(null)
  const [itemsValue, setItemsValue] = useState([])

  //
  // Handlers
  //

  const selectDiagnose = (key) => setDiagnoseSelected({ ...diagnosesList.find(el => el.key === key) })
  const selectCategory = (key) => setCategorySelected({ ...categoriesList.find(el => el.key === key) })

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
    setTitles([...medical_history.data.groups.reverse().map(el => el.title.toUpperCase()), "DIAGNÓSTICO"])
    setContent([...modifyDataGroups(medical_history.data.groups)])
    setCanEdit(canEdit)
  }

  const handleSearchConfigMedicalHistory = async (medHistory) => {
    return await showMedicalHistory(medHistory, true)
  }

  const handleSaveData = async () => {
    if (!date || !hour) return handleOpen('error', 'Error', 'La fecha y la hora son obligatorias', 'Cerrar alerta')
    if (itemsValue.length === 0) return handleOpen('error', 'Error', 'Debes contestar al menos 1 item del formulario', 'Cerrar alerta')
    const response = await UserMedicalHistory.save({
      date: `${date.format('YYYY-MM-DD')}T${hour.format('HH:mm:ss')}`,
      medical_history_id: hcData.key,
      itemsValue,
      diagnosesCategories,
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
    setDate(moment(item.date))
    setHour(moment(item.date))
    setItemsValue([...umh.data.filter(el => el.type === 'itemValue').map(el => ({ ...el, focus: false }))])
    setDiagnosesCategories([...umh.data.filter(el => el.type === 'diagnosesCategories').map(el => ({ ...JSON.parse(el.value.split("'").join('"')) }))])
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
          <Grid className={classes.spacing} item lg={5} md={5} sm={12} xs={12}>
            <PatientInfo
              user={userObj}
              profile={profilerObj}
              countries={countries}
              departments={departments}
              cities={cities}
            ></PatientInfo>
          </Grid>
          <Grid className={classes.spacing} item lg={7} md={7} sm={12} xs={12}>
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
                      diagnosesCategories={diagnosesCategories}
                      diagnoseSelected={diagnoseSelected}
                      categorySelected={categorySelected}
                      itemsValue={itemsValue}
                      canEdit={canEdit}
                      changeValueItem={handleChangeValueItem}
                      handleChangeDiagnoses={(event) => selectDiagnose(event.target.value)}
                      handleChangeCategories={(event) => selectCategory(event.target.value)}
                      handleChangeDate={(event) => setDate(event.target.value)}
                      handleChangeHour={(event) => setHour(event.target.value)}
                      addDiagnoseCategory={() => addDiagnoseCategory()}
                      deleteDiagnoseCategory={(key) => deleteDiagnoseCategory(key)}
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
