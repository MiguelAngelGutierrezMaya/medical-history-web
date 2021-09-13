import { useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import moment from 'moment'

// Containers
import { PatientReportSearchBar } from "../../../containers/PatientReportSearchBar"
import { HeaderBasic } from '../../../containers/HeaderBasic'

// Components
import { PopupMessage } from '../../../components/PopupMessage'
import { TableReportPatient } from '../../../containers/TableReportPatient'
import { Fab, Grid } from '@material-ui/core'
import { CustomTabs } from '../../../components/CustomTabs'
import { TabOne } from '../../../containers/IndexCardHolderForm/tabOne'
import { TabTwo } from '../../../containers/IndexCardHolderForm/tabTwo'
import { TabThree } from '../../../containers/IndexCardHolderForm/tabThree'

//Icons
import DescriptionIcon from '@material-ui/icons/Description'

// Api
import { User } from '../../../../api/user'
import { Patient as PatienApi } from '../../../../api/patient'
import { Deparment } from '../../../../api/deparment'
import { City } from '../../../../api/city'
import { UsualOccupation } from '../../../../api/usualOccupation'
import { SpecialPopulation } from '../../../../api/specialPopulation'
import { SexualOrientation } from '../../../../api/sexualOrientation'
import { SocialSecurityScheme } from '../../../../api/socialSecurityScheme'
import { Eps } from '../../../../api/eps'
import { Country } from '../../../../api/country'
import { Nacionality } from '../../../../api/nacionality'
import { CivilStatus } from '../../../../api/civilStatus'
import { Scholarship } from '../../../../api/scholarship'
import { EthnicGroup } from '../../../../api/ethnicGroup'
import { TypeDegreeDisability } from '../../../../api/typeDegreeDisability'
import { RelationshipPersonInCharge } from '../../../../api/relationshipPersonInCharge'
import { HcOpenPlace } from '../../../../api/hcOpenPlace'
import { HcTransferTo } from '../../../../api/hcTransferTo'

// styles & assets
import { useStyles } from './style'

// routes
import { Router } from '../../../../routes'

// Utils
import { ObjFormat } from '../../../../utils/obj_format'

export const Patient = () => {
  //Styles
  const classes = useStyles()

  // States
  const history = useHistory()

  // 
  // Control vars
  // 
  const defaultForm = {
    // Data find
    date_init: null,
    date_end: null,

    // Tab One
    nuip: '',
    surname: '',
    secondSurname: '',
    firstName: '',
    secondName: '',
    birthday: '',
    gender: '',
    nationality: '',
    country: '',
    department: '',
    city: '',
    address: '',
    neighborhood: '',
    telephone: '',
    cellphone: '',
    email: '',
    usualOccupation: '',
    specialPopulation: '',
    sexualOrientation: '',
    socialSecurityScheme: '',
    eps: '',
    epsLevel: '',
    affiliationNumber: '',
    // Tab Two
    civilStatus: '',
    scholarship: '',
    ethnicGroup: '',
    typeDegreeDisability: '',
    workAddress: '',
    workPhoneOne: '',
    workPhoneTwo: '',
    lastNameMom: '',
    firstNameMom: '',
    responsable: '',
    relationshipPersonInCharge: '',
    addressPersonInCharge: '',
    telephonePersonInCharge: '',
    // Tab Three
    hcOpenPlace: '',
    userCreateHc: '',
    hcTransferTo: '',
    transferDate: '',
    dateLastAttention: '',
    userAlert: '',
    userMessageHc: ''
  }
  const [typeView, setTypeView] = useState('one')
  const [form, setForm] = useState({
    ...defaultForm
  })
  const [error] = useState({
    nuip: { hasError: false, message: '' },
    email: { hasError: false, message: '' },
    surname: { hasError: false, message: '' },
    secondSurname: { hasError: false, message: '' },
    firstName: { hasError: false, message: '' },
  })
  const [popupMessage, setPopupMessage] = useState({
    open: false,
    type: '',
    title: '',
    description: '',
    btnLabel: '',
  })
  const [patients, setPatients] = useState([])
  const [departments, setDepartments] = useState([])
  const [cities, setCities] = useState([])
  const [nacionalities, setNacionalities] = useState([])
  const [countries, setCountries] = useState([])
  const [usualOccupations, setUsualOccupations] = useState([])
  const [specialPopulations, setSpecialPopulations] = useState([])
  const [sexualOrientations, setSexualOrientations] = useState([])
  const [socialSecuritySchemes, setSocialSecuritySchemes] = useState([])
  const [epsList, setEpsList] = useState([])
  const [civilStatusList, setCivilStatusList] = useState([])
  const [scholarshipList, setScholarshipList] = useState([])
  const [ethnicGroupList, setEthnicGroupList] = useState([])
  const [typeDegreeDisabilityList, setTypeDegreeDisabilityList] = useState([])
  const [
    relationshipPersonInChargeList,
    setRelationshipPersonInChargeList,
  ] = useState([])
  const [hcOpenPlaceList, setHcOpenPlaceList] = useState([])
  const [hcTransferToList, setHcTransferToList] = useState([])


  // constants
  const titles = [
    'DATOS DE IDENTIFICACIÓN DEL USUARIO',
    'OTROS DATOS DEL USUARIO',
    'DATOS INSTITUCIONALES',
  ]
  const contents = [
    <TabOne
      form={form}
      setForm={setForm}
      error={error}
      countries={countries}
      history={history}
      nacionalities={nacionalities}
      canEdit={false}
      departments={departments}
      setDepartments={setDepartments}
      cities={cities}
      setCities={setCities}
      usualOccupations={usualOccupations}
      specialPopulations={specialPopulations}
      sexualOrientations={sexualOrientations}
      socialSecuritySchemes={socialSecuritySchemes}
      epsList={epsList}
    />,
    <TabTwo
      form={form}
      setForm={setForm}
      error={error}
      canEdit={false}
      civilStatusList={civilStatusList}
      scholarshipList={scholarshipList}
      ethnicGroupList={ethnicGroupList}
      typeDegreeDisabilityList={typeDegreeDisabilityList}
      relationshipPersonInChargeList={relationshipPersonInChargeList}
    />,
    <TabThree
      form={form}
      setForm={setForm}
      error={error}
      canEdit={false}
      hcOpenPlaceList={hcOpenPlaceList}
      hcTransferToList={hcTransferToList}
    />,
  ]

  // 
  // Handlers
  //
  const resetData = () => {
    setForm({
      ...defaultForm,
      date_init: form.date_init,
      date_end: form.date_end,
      nuip: form.nuip,
    })
    // setPatients([])
    setDepartments([])
    setCities([])
    setNacionalities([])
    setCountries([])
    setUsualOccupations([])
    setSpecialPopulations([])
    setSexualOrientations([])
    setSocialSecuritySchemes([])
    setEpsList([])
    setCivilStatusList([])
    setScholarshipList([])
    setEthnicGroupList([])
    setTypeDegreeDisabilityList([])
    setRelationshipPersonInChargeList([])
    setHcOpenPlaceList([])
    setHcTransferToList([])
  }
  const handleOpen = (type, title, description, btnLabel) => setPopupMessage({
    open: true,
    btnLabel,
    type,
    title,
    description
  })
  const handleClose = () => setPopupMessage({ ...popupMessage, open: false })
  const handleChangeForm = (name, value) => setForm({ ...form, [name]: value })
  const handleChangeView = (type) => setTypeView(type)

  const showIndexTarget = async (patient) => {
    handleChangeView("three")
    let data = {}
    await PatienApi.getPatient({ nuip: patient.profile.nuip, nuipType: 2 }).then((response) => {
      if (response?.status === 200) {
        const user = ObjFormat.camelCase(response.data)
        const profile = ObjFormat.camelCase({
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
        data = {
          date_init: form.date_init,
          date_end: form.date_end,
          ...user,
          ...profile
        }
        setForm({ ...data })
      } else if (response?.status === 401) {
        history.push(Router.appLogin)
      } else {
        handleOpen(
          'info',
          'Sin resultados',
          'No se encontró el paciente con el número de identificacion ingresado',
          'Aceptar'
        )
      }
    })
    await Deparment.list(data.country).then((response) => {
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
    await City.list(data.department).then((response) => {
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

  const closeIndexTarget = () => {
    handleChangeView('one')
    resetData()
  }

  const searchData = async () => {
    // if (!form.date_init) return handleOpen('error', 'Error', 'La fecha de inicio es obligatoria', 'Cerrar alerta')
    handleChangeView('one')
    await User.reportUsers({
      document: form.nuip ? form.nuip : null,
      date_init: form.date_init ? moment(form.date_init).format('YYYY-MM-DDT00:00:00') : null,
      date_end: form.date_end ? moment(form.date_end).format('YYYY-MM-DDT23:59:59') : null
    }).then((response) => {
      if (response?.status === 200) {
        if (response.data?.length <= 0) return handleOpen('info', 'Sin coincidencias', 'No se encontraron registros', 'Cerrar alerta')
        setPatients(
          response.data?.map((item) => ({
            id: item.id,
            date: moment(item.profile?.created, 'YYYY-MM-DD').format('L'),
            names: `${item.first_name} ${item.second_name}`,
            last_names: `${item.surname} ${item.second_surname}`,
            documents: item.profile?.nuip,
            index_target: (
              <Fab color="primary" aria-label="description" onClick={() => showIndexTarget(item)}>
                <DescriptionIcon />
              </Fab>
            )
          })),
        )
      }
    })
  }

  const getCountries = useCallback(() => {
    Country.list().then((response) => {
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
  }, [history])

  const getNacionalities = useCallback(() => {
    Nacionality.list().then((response) => {
      if (response?.status === 200) {
        setNacionalities(
          response.data.map((item) => ({
            key: item.id,
            text: item.description,
          })),
        )
      } else if (response?.status === 401) {
        history.push(Router.appLogin)
      }
    })
  }, [history])

  const getUsualOccupations = useCallback(() => {
    UsualOccupation.list().then((response) => {
      if (response?.status === 200) {
        setUsualOccupations(
          response.data.map((item) => ({
            key: item.id,
            text: item.description,
          })),
        )
      } else if (response?.status === 401) {
        history.push(Router.appLogin)
      }
    })
  }, [history])

  const getSpecialPopulations = useCallback(() => {
    SpecialPopulation.list().then((response) => {
      if (response?.status === 200) {
        setSpecialPopulations(
          response.data.map((item) => ({
            key: item.id,
            text: item.description,
          })),
        )
      } else if (response?.status === 401) {
        history.push(Router.appLogin)
      }
    })
  }, [history])

  const getSexualOrientations = useCallback(() => {
    SexualOrientation.list().then((response) => {
      if (response?.status === 200) {
        setSexualOrientations(
          response.data.map((item) => ({
            key: item.id,
            text: item.description,
          })),
        )
      } else if (response?.status === 401) {
        history.push(Router.appLogin)
      }
    })
  }, [history])

  const getSocialSecuritySchemes = useCallback(() => {
    SocialSecurityScheme.list().then((response) => {
      if (response?.status === 200) {
        setSocialSecuritySchemes(
          response.data.map((item) => ({
            key: item.id,
            text: item.description,
          })),
        )
      } else if (response?.status === 401) {
        history.push(Router.appLogin)
      }
    })
  }, [history])

  const getEps = useCallback(() => {
    Eps.list().then((response) => {
      if (response?.status === 200) {
        setEpsList(
          response.data.map((item) => ({
            key: item.id,
            text: item.description,
          })),
        )
      } else if (response?.status === 401) {
        history.push(Router.appLogin)
      }
    })
  }, [history])

  const getCivilStatus = useCallback(() => {
    CivilStatus.list().then((response) => {
      if (response?.status === 200) {
        setCivilStatusList(
          response.data.map((item) => ({
            key: item.id,
            text: item.description,
          })),
        )
      } else if (response?.status === 401) {
        history.push(Router.appLogin)
      }
    })
  }, [history])

  const getScholarship = useCallback(() => {
    Scholarship.list().then((response) => {
      if (response?.status === 200) {
        setScholarshipList(
          response.data.map((item) => ({
            key: item.id,
            text: item.description,
          })),
        )
      } else if (response?.status === 401) {
        history.push(Router.appLogin)
      }
    })
  }, [history])

  const getEthnicGroup = useCallback(() => {
    EthnicGroup.list().then((response) => {
      if (response?.status === 200) {
        setEthnicGroupList(
          response.data.map((item) => ({
            key: item.id,
            text: item.description,
          })),
        )
      } else if (response?.status === 401) {
        history.push(Router.appLogin)
      }
    })
  }, [history])

  const getTypeDegreeDisability = useCallback(() => {
    TypeDegreeDisability.list().then((response) => {
      if (response?.status === 200) {
        setTypeDegreeDisabilityList(
          response.data.map((item) => ({
            key: item.id,
            text: item.description,
          })),
        )
      } else if (response?.status === 401) {
        history.push(Router.appLogin)
      }
    })
  }, [history])

  const getRelationshipPersonInCharge = useCallback(() => {
    RelationshipPersonInCharge.list().then((response) => {
      if (response?.status === 200) {
        setRelationshipPersonInChargeList(
          response.data.map((item) => ({
            key: item.id,
            text: item.description,
          })),
        )
      } else if (response?.status === 401) {
        history.push(Router.appLogin)
      }
    })
  }, [history])

  const getHcOpenPlace = useCallback(() => {
    HcOpenPlace.list().then((response) => {
      if (response?.status === 200) {
        setHcOpenPlaceList(
          response.data.map((item) => ({
            key: item.id,
            text: item.description,
          })),
        )
      } else if (response?.status === 401) {
        history.push(Router.appLogin)
      }
    })
  }, [history])

  const getHcTransferTo = useCallback(() => {
    HcTransferTo.list().then((response) => {
      if (response?.status === 200) {
        setHcTransferToList(
          response.data.map((item) => ({
            key: item.id,
            text: item.description,
          })),
        )
      } else if (response?.status === 401) {
        history.push(Router.appLogin)
      }
    })
  }, [history])

  useEffect(() => {
    getCountries()
    getNacionalities()
    getUsualOccupations()
    getSpecialPopulations()
    getSexualOrientations()
    getSocialSecuritySchemes()
    getEps()
    getCivilStatus()
    getScholarship()
    getEthnicGroup()
    getTypeDegreeDisability()
    getRelationshipPersonInCharge()
    getHcOpenPlace()
    getHcTransferTo()
  }, [
    getCountries,
    getEps,
    getNacionalities,
    getSexualOrientations,
    getSocialSecuritySchemes,
    getSpecialPopulations,
    getUsualOccupations,
    getCivilStatus,
    getScholarship,
    getEthnicGroup,
    getTypeDegreeDisability,
    getRelationshipPersonInCharge,
    getHcOpenPlace,
    getHcTransferTo,
  ])

  return (
    <Grid className={classes.spacing} item lg={12} md={12} sm={12} xs={12}>
      <PatientReportSearchBar
        onlyDates={false}
        canEdit={true}
        form={form}
        handleChangeInit={(event) => handleChangeForm('date_init', event.target.value)}
        handleChangeEnd={(event) => handleChangeForm('date_end', event.target.value)}
        handleChange={(event) => handleChangeForm(event.target.name, event.target.value)}
        onSearch={searchData}
      />
      {typeView === 'one' ? (
        <TableReportPatient data={patients} />
      ) : (
        <>
          <HeaderBasic
            type={typeView}
            onClick={() => null}
            onReturn={() => closeIndexTarget()}
            subtitle={'Seleccionar tipo de Historia Clinica'}
          ></HeaderBasic>
          <CustomTabs titles={titles} contents={contents} />
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
    </Grid>
  )
}
