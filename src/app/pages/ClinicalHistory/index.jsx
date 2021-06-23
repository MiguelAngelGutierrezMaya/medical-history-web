import { useState } from 'react'
import { useHistory } from 'react-router'
import moment from 'moment'

// components
import { IndexCardHolderEmpty } from '../../containers/IndexCardHolderEmpty'
import { PatientSearchBar } from '../../containers/PatientSearchBar'
import { PatientInfo } from '../../components/PatientInfo'
import { PopupMessage } from '../../components/PopupMessage'
import { PatientMedicalHistories } from '../../components/PatientMedicalHistories'
import { HeaderBasic } from '../../containers/HeaderBasic'
import { Grid } from '@material-ui/core'

// containers
import { CardHCContainer } from '../../containers/CardHCContainer'

// api
import { Patient } from '../../../api/patient'
import { Country } from '../../../api/country'
import { Deparment } from '../../../api/deparment'
import { City } from '../../../api/city'
import { MedicalHistory } from '../../../api/medicalHistory'

// routes
import { Router } from '../../../routes'

// utils
import { ObjFormat } from '../../../utils/obj_format'

// styles & assets
import { useStyles } from './style'

export const ClinicalHistory = () => {
  //Styles
  const classes = useStyles()

  //DataObj
  const [userObj, setUserObj] = useState({})
  const [profilerObj, setProfilerObj] = useState({})

  // states
  const history = useHistory()
  const [countries, setCountries] = useState([])
  const [departments, setDepartments] = useState([])
  const [cities, setCities] = useState([])
  const [medicalHistories, setMedicalHistories] = useState([])
  const [typeView, setTypeView] = useState("one")
  const [openView, setOpenView] = useState(false)
  const [search, setSearch] = useState({ nuip: '', nuipType: '' })
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

  const handleChangeView = (type) => setTypeView(type)
  const handleClose = () => {
    setPopupMessage({ ...popupMessage, open: false })
  }

  const handleSearch = async () => {
    setOpenView(false)
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
        <>
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
            <Grid className={classes.spacing} item lg={7} md={6} sm={12} xs={12}>
              <HeaderBasic
                type={typeView}
                onClick={() => handleChangeView("two")}
                onReturn={() => handleChangeView("one")}
                subtitle={'Seleccionar tipo de Historia Clinica'}
              ></HeaderBasic>
              {
                typeView === 'one' ? (
                  <PatientMedicalHistories data={[{
                    id: 1,
                    date: '--',
                    code: '--',
                    title: '--',
                    profesional: '--',
                    clinic_history: '--'
                  }]}></PatientMedicalHistories>
                ) : (
                  <>
                    <CardHCContainer list={medicalHistories} onClick={() => console.log('funciona')}></CardHCContainer>
                  </>
                )
              }
            </Grid>
          </Grid>
        </>
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
