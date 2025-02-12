import { useState } from 'react'
import moment from 'moment'

// Containers
import { PatientReportSearchBar } from '../../../containers/PatientReportSearchBar'
import { FormUserMedicalHistory } from '../../../containers/FormUserMedicalHistory'
import { HeaderBasic } from '../../../containers/HeaderBasic'

// Components
import { PatientMedicalHistories } from '../../../components/PatientMedicalHistories'
import { PopupMessage } from '../../../components/PopupMessage'
import { Fab, Grid } from '@material-ui/core'

//Icons
import DescriptionIcon from '@material-ui/icons/Description'

// Api
import { UserMedicalHistory } from '../../../../api/userMedicalHistory'
import { MedicalHistory } from '../../../../api/medicalHistory'

// styles & assets
import { useStyles } from './style'

// Patient
import { Patient } from '../../../../api/patient'

// utils
import { ObjFormat } from '../../../../utils/obj_format'

export const ClinicalHistory = () => {
  //Styles
  const classes = useStyles()

  //DataObj
  const [userObj, setUserObj] = useState({})
  const [profilerObj, setProfilerObj] = useState({})

  // 
  // Control vars
  // 
  const [typeView, setTypeView] = useState('one')
  const [titles, setTitles] = useState([])
  const [content, setContent] = useState([])
  const [hcData, setHcData] = useState({})
  const [form, setForm] = useState({
    nuip: '',
    date_init: null,
    date_end: null,
  })
  const [popupMessage, setPopupMessage] = useState({
    open: false,
    type: '',
    title: '',
    description: '',
    btnLabel: '',
  })
  const [userMedicalHistories, setUserMedicalHistories] = useState([])

  //
  // FormData
  //
  const [specialistsListSelected, setSpecialistsListSelected] = useState([])
  const [lendingSpecialistsListSelected, setLendingSpecialistsListSelected] = useState([])
  const [specialistSelected, setSpecialistSelected] = useState({})
  const [diagnosticAidsListSelected, setDiagnosticAidsListSelected] = useState([])
  const [diagnosticAidSelected, setDiagnosticAidSelected] = useState({})
  const [lendingDiagnosticAidSelected, setLendingDiagnosticAidSelected] = useState({})
  const [medicinesListSelected, setMedicinesListSelected] = useState([])
  const [medicineSelected, setMedicineSelected] = useState({})
  const [medicineObservation, setMedicineObservation] = useState('')
  const [specialistsObservation, setSpecialistsObservation] = useState('')
  const [diagnosticAidObservation, setDiagnosticAidObservation] = useState('')
  const [examObservation, setExamObservation] = useState('')
  const [medicineQuantity, setMedicineQuantity] = useState(0)
  const [diagnosticAidQuantity, setDiagnosticAidQuantity] = useState(0)
  const [examQuantity, setExamQuantity] = useState(0)
  const [examsListSelected, setExamsListSelected] = useState([])
  const [examSelected, setExamSelected] = useState({})
  const [lendingExamSelected, setLendingExamSelected] = useState({})
  const [presentationSelected, setPresentationSelected] = useState({})
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
  const handleOpen = (type, title, description, btnLabel) =>
    setPopupMessage({
      open: true,
      btnLabel,
      type,
      title,
      description,
    })
  const handleClose = () => setPopupMessage({ ...popupMessage, open: false })
  const handleChangeForm = (name, value) => setForm({ ...form, [name]: value })
  const handleChangeView = (type) => setTypeView(type)

  const initData = () => {
    setItemsValue([])
    setDiagnosesCategories([])
    setDiagnoseSelected({})
    setCategorySelected({})

    setSpecialistsListSelected([])
    setLendingSpecialistsListSelected([])
    setSpecialistSelected({})
    setSpecialistsObservation('')

    setDiagnosticAidsListSelected([])
    setLendingDiagnosticAidSelected({})
    setDiagnosticAidSelected({})
    setDiagnosticAidObservation('')
    setDiagnosticAidQuantity(0)

    setMedicinesListSelected([])
    setMedicineSelected({})
    setMedicineObservation('')
    setMedicineQuantity(0)
    setPresentationSelected({})

    setExamsListSelected([])
    setExamSelected({})
    setLendingExamSelected({})
    setExamObservation('')
    setExamQuantity(0)

    setAppointmentPurposeSelected({})
    setExternalCauseSelected({})

    setDate(null)
    setHour(null)
  }

  const modifyDataGroups = (groups) =>
    groups.map((el) => ({
      ...el,
      items: el.items.reverse(),
    }))

  const showMedicalHistory = async (medHistory) => {
    const medical_history = await MedicalHistory.getMedicalHistory(medHistory.key)
    initData()
    handleChangeView("three")
    setHcData({ ...medHistory })
    setTitles([...medical_history.data.groups.reverse().map(el => el.title.toUpperCase()), "FINALIDAD DE CONSULTA", "DIAGNÓSTICO", "REMISIONES"])
    setContent([...modifyDataGroups(medical_history.data.groups)])
  }

  const showUserMedicalHistory = async (item) => {
    await showMedicalHistory({ key: item.medical_history.id, text: item.medical_history.name })
    const umh = await UserMedicalHistory.getUserMedicalHistory(item.id)
    const exCaSel = umh.data.filter(el => el.type === 'externalCauses').reduce((acum, val) => acum = { key: val.value.split('-')[0], text: val.value.split('-')[1] }, {})
    const appPur = umh.data.filter(el => el.type === 'appointmentPurposes').reduce((acum, val) => acum = { key: val.value.split('-')[0], text: val.value.split('-')[1] }, {})
    const func = el => ({ ...JSON.parse(el.value) })
    setDate(moment(item.date))
    setHour(moment(item.date))
    setItemsValue([...umh.data.filter(el => el.type === 'itemValue').map(el => ({ ...el, focus: false }))])
    setDiagnosesCategories([...umh.data.filter(el => el.type === 'diagnosesCategories').map(el => ({ ...JSON.parse(el.value.split("'").join('"')) }))])
    setSpecialistsListSelected([...umh.data.filter(el => el.type === 'specialists').map(func)])
    setDiagnosticAidsListSelected([...umh.data.filter(el => el.type === 'diagnosticAids').map(func)])
    setMedicinesListSelected([...umh.data.filter(el => el.type === 'medicines').map(func)])
    setExamsListSelected([...umh.data.filter(el => el.type === 'exams').map(func)])
    setExternalCauseSelected({ key: exCaSel.key, text: exCaSel.text })
    setAppointmentPurposeSelected({ key: appPur.key, text: appPur.text })
  }

  const searchData = async () => {
    if (!form.nuip)
      return handleOpen(
        'error',
        'Error',
        'El nuip del paciente es obligatorio',
        'Cerrar alerta',
      )
    handleChangeView('one')
    var user = {}, profile = {}
    await Patient.getPatient({ nuip: form.nuip, nuip_type: 2 }).then((response) => {
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
      }
    })
    await UserMedicalHistory.getReportUserMedicalHistory({
      document: form.nuip,
      date_init: form.date_init
        ? moment(form.date_init).format('YYYY-MM-DDT00:00:00')
        : null,
      date_end: form.date_end
        ? moment(form.date_end).format('YYYY-MM-DDT23:59:59')
        : null,
    }).then((response) => {
      if (response?.status === 200) {
        if (response.data?.length <= 0) return handleOpen('info', 'Sin coincidencias', 'No se encontraron registros', 'Cerrar alerta')
        setUserMedicalHistories(
          response.data?.map((item) => ({
            id: item.id,
            date: moment(item.date, 'YYYY-MM-DD').format('L'),
            title: item.medical_history.name,
            profesional: `${item.professional.first_name} ${item.professional.second_name}`,
            clinic_history: (
              <Fab
                color="primary"
                aria-label="description"
                onClick={() =>
                  showUserMedicalHistory({ ...item })
                }
              >
                <DescriptionIcon />
              </Fab>
            ),
          })),
        )
      }
    })
  }

  return (
    <Grid className={classes.spacing} item lg={12} md={12} sm={12} xs={12}>
      <PatientReportSearchBar
        onlyDates={false}
        canEdit={true}
        form={form}
        handleChangeInit={(event) =>
          handleChangeForm('date_init', event.target.value)
        }
        handleChangeEnd={(event) =>
          handleChangeForm('date_end', event.target.value)
        }
        handleChange={(event) =>
          handleChangeForm(event.target.name, event.target.value)
        }
        onSearch={searchData}
      />
      {typeView === 'one' ? (
        <PatientMedicalHistories
          data={userMedicalHistories}
        ></PatientMedicalHistories>
      ) : (
        <>
          <HeaderBasic
            type={typeView}
            onClick={() => null}
            onReturn={() => handleChangeView('one')}
            subtitle={'Seleccionar tipo de Historia Clinica'}
          ></HeaderBasic>
          <FormUserMedicalHistory
            userObj={userObj}
            profilerObj={profilerObj}
            hcData={hcData}
            date={date}
            hour={hour}
            content={content}
            titles={titles}
            diagnosesList={[]}
            categoriesList={[]}
            appointmentPurposesList={[]}
            diagnosticAidsList={[]}
            externalCausesList={[]}
            medicinesList={[]}
            presentationsList={[]}
            specialistsList={[]}
            lendingList={[]}
            examList={[]}
            diagnosesCategories={diagnosesCategories}
            diagnoseSelected={diagnoseSelected}
            categorySelected={categorySelected}
            specialistSelected={specialistSelected}
            lendingSpecialistsListSelected={lendingSpecialistsListSelected}
            diagnosticAidSelected={diagnosticAidSelected}
            lendingDiagnosticAidSelected={lendingDiagnosticAidSelected}
            medicineSelected={medicineSelected}
            examSelected={examSelected}
            lendingExamSelected={lendingExamSelected}
            presentationSelected={presentationSelected}
            specialistsListSelected={specialistsListSelected}
            diagnosticAidsListSelected={diagnosticAidsListSelected}
            medicinesListSelected={medicinesListSelected}
            medicineObservation={medicineObservation}
            medicineQuantity={medicineQuantity}
            diagnosticAidQuantity={diagnosticAidQuantity}
            examQuantity={examQuantity}
            examsListSelected={examsListSelected}
            specialistsObservation={specialistsObservation}
            diagnosticAidObservation={diagnosticAidObservation}
            examObservation={examObservation}
            appointmentPurposeSelected={appointmentPurposeSelected}
            externalCauseSelected={externalCauseSelected}
            itemsValue={itemsValue}
            canEdit={false}
            changeValueItem={() => null}
            handleChangeDiagnoses={() => null}
            handleChangeCategories={() => null}
            handleChangeSpecialists={() => null}
            handleChangeDiagnosticAids={() => null}
            handleChangeMedicines={() => null}
            handleChangePresentations={() => null}
            handleChangeAppointmentPurposes={() => null}
            handleChangeCauses={() => null}
            handleChangeDate={() => null}
            handleChangeHour={() => null}
            handleChangeQuantity={() => null}
            handleChangeObservation={() => null}
            addDiagnoseCategory={() => null}
            deleteDiagnoseCategory={() => null}
            addSpecialistToList={() => null}
            removeSpecialistFromList={() => null}
            removeDiagnosticAidFromList={() => null}
            removeMedicineFromList={() => null}
            addDiagnosticAidToList={() => null}
            addMedicineToList={() => null}
            handleChangeLendingSpecialists={() => null}
            handleChangeLendingDiagnosticAid={() => null}
            handleChangeExam={() => null}
            handleChangeLendingExam={() => null}
            handleChangeQuantityDiagnosticAid={() => null}
            handleChangeQuantityExam={() => null}
            handleChangeObservationSpecialist={() => null}
            handleChangeObservationDiagnosticAid={() => null}
            handleChangeObservationExam={() => null}
            removeExamFromList={() => null}
            addExamToList={() => null}
            onClickBtnSave={null}
          ></FormUserMedicalHistory>
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
