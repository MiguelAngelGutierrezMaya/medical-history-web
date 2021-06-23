import { useCallback, useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router'
import moment from 'moment'

// components
import { CustomTabs } from '../../components/CustomTabs'
import { IndexCardHolderEmpty } from '../../containers/IndexCardHolderEmpty'
import { PatientSearchBar } from '../../containers/PatientSearchBar'
import { TabOne } from '../../containers/IndexCardHolderForm/tabOne'
import { TabTwo } from '../../containers/IndexCardHolderForm/tabTwo'
import { TabThree } from '../../containers/IndexCardHolderForm/tabThree'
import { PopupMessage } from '../../components/PopupMessage'

// api
import { Patient } from '../../../api/patient'
import { UsualOccupation } from '../../../api/usualOccupation'
import { SpecialPopulation } from '../../../api/specialPopulation'
import { SexualOrientation } from '../../../api/sexualOrientation'
import { SocialSecurityScheme } from '../../../api/socialSecurityScheme'
import { Eps } from '../../../api/eps'
import { Country } from '../../../api/country'
import { Nacionality } from '../../../api/nacionality'
import { Deparment } from '../../../api/deparment'
import { City } from '../../../api/city'
import { CivilStatus } from '../../../api/civilStatus'
import { Scholarship } from '../../../api/scholarship'
import { EthnicGroup } from '../../../api/ethnicGroup'
import { TypeDegreeDisability } from '../../../api/typeDegreeDisability'
import { RelationshipPersonInCharge } from '../../../api/relationshipPersonInCharge'
import { HcOpenPlace } from '../../../api/hcOpenPlace'
import { HcTransferTo } from '../../../api/hcTransferTo'

// routes
import { Router } from '../../../routes'

// utils
import { ObjFormat } from '../../../utils/obj_format'

export const IndexCardHolder = () => {
  // refrences
  const isValidRef = useRef(false)
  // states
  const history = useHistory()
  const [openForm, setOpenForm] = useState(false)
  const [canEdit, setCanEdit] = useState(true)
  const [isActiveEdit, setIsActiveEdit] = useState(false)
  const [search, setSearch] = useState({ nuip: '', nuipType: '' })
  const [popupMessage, setPopupMessage] = useState({
    open: false,
    type: '',
    title: '',
    description: '',
    btnLabel: '',
  })
  const [nacionalities, setNacionalities] = useState([])
  const [countries, setCountries] = useState([])
  const [departments, setDepartments] = useState([])
  const [cities, setCities] = useState([])
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
  const [form, setForm] = useState({
    // Tab One
    surname: '',
    secondSurname: '',
    firstName: '',
    secondName: '',
    birthday: '',
    gender: '',
    nuip: '',
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
    userMessageHc: '',
  })
  const [error, setError] = useState({
    nuip: { hasError: false, message: '' },
    email: { hasError: false, message: '' },
    surname: { hasError: false, message: '' },
    secondSurname: { hasError: false, message: '' },
    firstName: { hasError: false, message: '' },
  })

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
      canEdit={!canEdit}
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
      canEdit={!canEdit}
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
      canEdit={!canEdit}
      hcOpenPlaceList={hcOpenPlaceList}
      hcTransferToList={hcTransferToList}
    />,
  ]

  const showForm = () => {
    setOpenForm(true)
  }

  const toggleEdit = () => {
    setCanEdit(!canEdit)
  }

  const handleClose = () => {
    setPopupMessage({ ...popupMessage, open: false })
    if (isValidRef.current) {
      setForm({
        // Tab One
        surname: '',
        secondSurname: '',
        firstName: '',
        secondName: '',
        birthday: '',
        gender: '',
        nuip: '',
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
        userMessageHc: '',
      })
    }
  }

  const validate = () => {
    let hasError = false
    let errors = {}
    if (form.email === '') {
      hasError = true
      errors = { email: { hasError: true, message: 'Campo obligatorio' } }
    }
    if (form.nuip === '') {
      hasError = true
      errors = {
        ...errors,
        nuip: { hasError: true, message: 'Campo obligatorio' },
      }
    }
    if (form.surname === '') {
      hasError = true
      errors = {
        ...errors,
        surname: { hasError: true, message: 'Campo obligatorio' },
      }
    }
    if (form.secondSurname === '') {
      hasError = true
      errors = {
        ...errors,
        secondSurname: { hasError: true, message: 'Campo obligatorio' },
      }
    }
    if (form.firstName === '') {
      hasError = true
      errors = {
        ...errors,
        firstName: { hasError: true, message: 'Campo obligatorio' },
      }
    }
    setError({ ...error, ...errors })

    return hasError
  }

  const handleSearch = async () => {
    setIsActiveEdit(false)
    setCanEdit(false)
    setOpenForm(false)
    let data = {}
    await Patient.getPatient(search).then((response) => {
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
        data = { ...user, ...profile }
        setForm(data)
        setIsActiveEdit(true)
        setOpenForm(true)
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

  const handleClickBtnSave = () => {
    if (!validate()) {
      const data = {
        ...form,
        secondName: form.secondName !== '' ? form.secondName : null,
        birthday:
          form.birthday !== '' ? form.birthday.format('YYYY-MM-DD') : null,
        transferDate:
          form.transferDate !== ''
            ? form.transferDate.format('YYYY-MM-DD')
            : null,
        dateLastAttention:
          form.dateLastAttention !== ''
            ? form.dateLastAttention.format('YYYY-MM-DD')
            : null,
      }
      Patient.saveUpdateProfile(data).then((response) => {
        if (response?.status === 204) {
          setError({
            nuip: { hasError: false, message: '' },
            email: { hasError: false, message: '' },
            surname: { hasError: false, message: '' },
            secondSurname: { hasError: false, message: '' },
            firstName: { hasError: false, message: '' },
          })
          setPopupMessage({
            open: true,
            type: 'success',
            title: 'Éxito',
            description:
              'Se ha actualizado la información del tarjetero índice del paciente.',
            btnLabel: 'Aceptar',
          })
          isValidRef.current = true
        } else if (response?.status === 401) {
          history.push(Router.appLogin)
        } else {
          setPopupMessage({
            open: true,
            type: 'error',
            title: 'Error',
            description: 'Hay errores en el tarjetero índice',
            btnLabel: 'Aceptar',
          })
        }
      })
    }
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
    <>
      <PatientSearchBar
        showSaveButton={openForm}
        onClickBtnSave={handleClickBtnSave}
        search={search}
        setSearch={setSearch}
        onSearch={handleSearch}
        isActiveEdit={isActiveEdit}
        canEdit={canEdit}
        toggleEdit={toggleEdit}
      />
      {!openForm ? (
        <IndexCardHolderEmpty 
          onClick={showForm}
          title={'Digitar documento de identidad del paciente'}
          text={'para visualizar su tarjetero índice'}
          showButton={true}
        />
      ) : (
        <CustomTabs titles={titles} contents={contents} />
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
