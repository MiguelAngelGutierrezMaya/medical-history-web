//Components
import { CustomTabs } from '../../components/CustomTabs'
import { InputField } from '../../components/InputField'
import { AutocompleteField } from '../../components/AutocompleteField'

import {
  Button,
  Fab,
  FormControlLabel,
  Grid,
  RadioGroup,
  Typography,
  // List
} from '@material-ui/core'

//Icons
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'

//Containers
import { HeaderUserMedicalHistory } from '../../containers/HeaderUserMedicalHistory'
import { FormRemission } from '../../containers/FormRemission'

//Providers
import { WidthProvider, Responsive } from 'react-grid-layout'
import PropTypes from 'prop-types'

// styles & assets
import { useStyles, CustomSwitch, ItemRadio } from './style'

const ResponsiveReactGridLayout = WidthProvider(Responsive)

export const FormUserMedicalHistory = (
  {
    userObj,
    profilerObj,
    hcData,
    date,
    hour,
    content,
    titles,
    diagnosesList,
    categoriesList,
    appointmentPurposesList,
    diagnosticAidsList,
    externalCausesList,
    medicinesList,
    presentationsList,
    specialistsList,
    lendingList,
    examList,
    diagnosesCategories,
    diagnoseSelected,
    categorySelected,
    specialistSelected,
    lendingSpecialistSelected,
    diagnosticAidSelected,
    lendingDiagnosticAidSelected,
    examSelected,
    medicineSelected,
    lendingExamSelected,
    presentationSelected,
    specialistsListSelected,
    diagnosticAidsListSelected,
    medicinesListSelected,
    medicineObservation,
    medicineQuantity,
    examsListSelected,
    appointmentPurposeSelected,
    externalCauseSelected,
    itemsValue,
    canEdit,
    changeValueItem,
    handleChangeDiagnoses,
    handleChangeCategories,
    handleChangeSpecialists,
    handleChangeLendingSpecialists,
    handleChangeDiagnosticAids,
    handleChangeLendingDiagnosticAid,
    handleChangeMedicines,
    handleChangeExam,
    handleChangeLendingExam,
    handleChangePresentations,
    handleChangeAppointmentPurposes,
    handleChangeCauses,
    handleChangeDate,
    handleChangeHour,
    handleChangeQuantity,
    handleChangeQuantityDiagnosticAid,
    handleChangeQuantityExam,
    handleChangeObservation,
    handleChangeObservationSpecialist,
    handleChangeObservationDiagnosticAid,
    handleChangeObservationExam,
    addDiagnoseCategory,
    deleteDiagnoseCategory,
    addSpecialistToList,
    removeSpecialistFromList,
    removeDiagnosticAidFromList,
    removeMedicineFromList,
    removeExamFromList,
    addDiagnosticAidToList,
    addExamToList,
    addMedicineToList,
    onClickBtnSave,
    specialistsObservation,
    diagnosticAidObservation,
    examObservation,
    diagnosticAidQuantity,
    examQuantity
  }) => {
  const classes = useStyles()

  const getComponent = (el, i, parentID) => {
    const { component } = el
    const index = itemsValue.findIndex(elem => elem.item.id === el.id)
    const value = index !== -1 ? itemsValue[index].value : ''
    const focus = index !== -1 ? itemsValue[index].focus : false
    const inputProps = {
      disabled: !canEdit,
      onChange: (event) => changeValueItem(el, event.target.value, true),
      onFocus: function (event) {
        if (focus) {
          var val = event.target.value;
          event.target.value = '';
          event.target.value = val;
        }
      },
      value: value
    }
    const objTextFields = {
      'text-field': (
        <InputField
          autoFocus={focus}
          key={`${parentID}-${component.label}-item-${i}`}
          className={classes.customInput}
          label={component.label}
          type="text"
          name="label"
          inputProps={
            { ...inputProps }
          }
        />
      ),
      'text-area': (
        <InputField
          autoFocus={focus}
          key={`${parentID}-${component.label}-item-${i}`}
          inputProps={
            { ...inputProps }
          }
          className={classes.customInput}
          label={component.label}
          type="text"
          name="label"
          multiline={true}
          rows={2}
          rowsMax={2}
        />
      ),
      'radio': (
        <Grid
          key={`${parentID}-${component.label}-item-${i}`}
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Typography className={classes.label}>{component.label}</Typography>
          <RadioGroup row aria-label="position" name="position" value={value} onChange={(event) => changeValueItem(el, event.target.value, false)}>
            <FormControlLabel value="y" disabled={!canEdit} control={<ItemRadio />} label="Si" />
            <FormControlLabel value="n" disabled={!canEdit} control={<ItemRadio />} label="No" />
          </RadioGroup>
        </Grid>
      ),
      'switch': (
        <Grid
          key={`${parentID}-${component.label}-item-${i}`}
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
        >
          <Typography className={classes.label} style={{ marginRight: 30 }}>
            {component.label}
          </Typography>
          <FormControlLabel control={<CustomSwitch disabled={!canEdit} label="Label" checked={typeof value === 'string' ? value.toLowerCase() === "true" : value || false} onChange={(event) => changeValueItem(el, event.target.checked, false)} />} />
        </Grid>
      )
    }
    return objTextFields[component.type] || (<></>)
  }

  const createElement = (el, i, parentID) => (
    <div
      key={`${parentID}-${el.component.label}-${i}`}
      data-grid={el}
      style={
        el.component.type === 'radio'
          ? { padding: '12px 20px 0 0' }
          : { padding: '0 20px 0 0' }
      }
    >
      {getComponent(el, i, parentID)}
    </div>
  )

  const container = (data) => {
    const { items, id, name } = data
    return (
      <ResponsiveReactGridLayout isDraggable={false} isResizable={false} key={`${id}-${name}`}>
        {items?.map((el, i) => createElement(el, i, id))}
      </ResponsiveReactGridLayout>
    )
  }

  const diagnosesView = () => (
    <Grid container>
      <Grid
        item
        xs={12}
        sm={12}
        md={4}
        lg={5}
        className={classes.containers}
      >
        <AutocompleteField
          props={
            {
              options: diagnosesList,
              getOptionLabel: (option) => option && option.text ? option.text : ''
            }
          }
          disabled={!canEdit}
          value={diagnoseSelected}
          setValueItem={handleChangeDiagnoses}
          label={'DIAGNOSTICOS'}
        ></AutocompleteField>
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={4}
        lg={5}
        className={classes.containers}
      >
        <AutocompleteField
          props={
            {
              options: categoriesList,
              getOptionLabel: (option) => option && option.text ? option.text : ''
            }
          }
          disabled={!canEdit}
          value={categorySelected}
          setValueItem={handleChangeCategories}
          label={'CATEGORIAS'}
        ></AutocompleteField>
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={4}
        lg={2}
        className={classes.containers}
      >
        <Button className={classes.button} startIcon={<AddIcon />} onClick={() => addDiagnoseCategory()}>Agregar</Button>
      </Grid>
      <Grid item xs={5}
        sm={5}
        md={5}
        lg={5}>
        <h4>Diagnóstico</h4>
      </Grid>
      <Grid item xs={5}
        sm={5}
        md={5}
        lg={5}>
        <h4>Categoría</h4>
      </Grid>
      <Grid item xs={5}
        sm={2}
        md={2}
        lg={2}>
      </Grid>
      {
        diagnosesCategories.map((el, i) => (
          <Grid key={`container-diagnose-category-${i}`} style={{ marginTop: '5px' }} container>
            <Grid key={`diagnose-${i}`} item xs={5}
              sm={5}
              md={5}
              lg={5}>
              <span>{el.diagnose.text}</span>
            </Grid>
            <Grid key={`category-${i}`} item xs={5}
              sm={5}
              md={5}
              lg={5}>
              <span>{el.category.text}</span>
            </Grid>
            <Grid key={`diagnose-category-div-${i}`} item xs={2}
              sm={2}
              md={2}
              lg={2}>
              {
                canEdit ? (
                  <Fab key={`diagnose-category-button-${i}`} aria-label="delete" className={classes.fab} onClick={() => deleteDiagnoseCategory(el)}>
                    <DeleteIcon className={classes.icon} />
                  </Fab>
                ) : (<></>)
              }
            </Grid>
          </Grid>
        ))
      }
    </Grid>
  )

  const purposeAppointmentView = () => (
    <Grid container>
      <Grid
        item
        xs={12}
        sm={12}
        md={6}
        lg={6}
        className={classes.containers}
      >
        <AutocompleteField
          props={
            {
              options: appointmentPurposesList,
              getOptionLabel: (option) => option && option.text ? option.text : ''
            }
          }
          disabled={!canEdit}
          value={appointmentPurposeSelected}
          setValueItem={handleChangeAppointmentPurposes}
          label={'FINALIDAD CONSULTA EXTERNA'}
        ></AutocompleteField>
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={6}
        lg={6}
        className={classes.containers}
      >
        <AutocompleteField
          props={
            {
              options: externalCausesList,
              getOptionLabel: (option) => option && option.text ? option.text : ''
            }
          }
          disabled={!canEdit}
          value={externalCauseSelected}
          setValueItem={handleChangeCauses}
          label={'CAUSA EXTERNA'}
        ></AutocompleteField>
      </Grid>
    </Grid>
  )

  const referralsView = () => (
    <Grid container>

      <FormRemission
        userObj={userObj}
        profilerObj={profilerObj}
        includeQuantity={false}
        headers={['Especialista', 'Prestador', 'Observaciones']}
        title={'ESPECIALISTAS'}
        canEdit={canEdit}
        list={specialistsList}
        listSelected={specialistSelected}
        handleChangeList={(item) => handleChangeSpecialists(item)}
        helperText={'Buscar especialista'}
        handleChangeQuantity={null}
        medicineQuantity={0}
        lendingPresentationsList={lendingList}
        lendingPresentationSelected={lendingSpecialistSelected}
        lendingPresentationLabel={'Prestador'}
        handleChangeLendingsPresentations={(item) => handleChangeLendingSpecialists(item)}
        observation={specialistsObservation}
        handleChangeObservation={(event) => handleChangeObservationSpecialist(event)}
        addDataToList={addSpecialistToList}
        listKey={'specialist-selected-'}
        listDataSelected={specialistsListSelected}
        removeFromList={(item) => removeSpecialistFromList(item)}
      ></FormRemission>
      <FormRemission
        userObj={userObj}
        profilerObj={profilerObj}
        includeQuantity={true}
        headers={['Ayuda diagnóstica', 'Cantidad', 'Prestador', 'Observaciones']}
        title={'AYUDAS DIAGNOSTICAS'}
        canEdit={canEdit}
        list={diagnosticAidsList}
        listSelected={diagnosticAidSelected}
        handleChangeList={(item) => handleChangeDiagnosticAids(item)}
        helperText={'Buscar ayuda diagnostica'}
        handleChangeQuantity={(event) => handleChangeQuantityDiagnosticAid(event)}
        quantity={diagnosticAidQuantity}
        lendingPresentationsList={lendingList}
        lendingPresentationSelected={lendingDiagnosticAidSelected}
        lendingPresentationLabel={'Prestador'}
        handleChangeLendingsPresentations={(item) => handleChangeLendingDiagnosticAid(item)}
        observation={diagnosticAidObservation}
        handleChangeObservation={(event) => handleChangeObservationDiagnosticAid(event)}
        addDataToList={addDiagnosticAidToList}
        listKey={'diagnostic-aid-selected-'}
        listDataSelected={diagnosticAidsListSelected}
        removeFromList={(item) => removeDiagnosticAidFromList(item)}
      ></FormRemission>

      <FormRemission
        userObj={userObj}
        profilerObj={profilerObj}
        includeQuantity={true}
        headers={['Examen', 'Cantidad', 'Prestador', 'Observaciones']}
        title={'LABORATORIO'}
        canEdit={canEdit}
        list={examList}
        listSelected={examSelected}
        handleChangeList={(item) => handleChangeExam(item)}
        helperText={'Buscar examen'}
        handleChangeQuantity={(event) => handleChangeQuantityExam(event)}
        quantity={examQuantity}
        lendingPresentationsList={lendingList}
        lendingPresentationSelected={lendingExamSelected}
        lendingPresentationLabel={'Prestador'}
        handleChangeLendingsPresentations={(item) => handleChangeLendingExam(item)}
        observation={examObservation}
        handleChangeObservation={(event) => handleChangeObservationExam(event)}
        addDataToList={addExamToList}
        listKey={'laboratory-'}
        listDataSelected={examsListSelected}
        removeFromList={(item) => removeExamFromList(item)}
      ></FormRemission>

      <FormRemission
        userObj={userObj}
        profilerObj={profilerObj}
        includeQuantity={true}
        headers={['Medicamento', 'Cantidad', 'Presentación', 'Observaciones']}
        title={'MEDICAMENTOS'}
        canEdit={canEdit}
        list={medicinesList}
        listSelected={medicineSelected}
        handleChangeList={(item) => handleChangeMedicines(item)}
        helperText={'Buscar medicamento'}
        handleChangeQuantity={(event) => handleChangeQuantity(event)}
        quantity={medicineQuantity}
        lendingPresentationsList={presentationsList}
        lendingPresentationSelected={presentationSelected}
        lendingPresentationLabel={'Presentación'}
        handleChangeLendingsPresentations={(item) => handleChangePresentations(item)}
        observation={medicineObservation}
        handleChangeObservation={(event) => handleChangeObservation(event)}
        addDataToList={addMedicineToList}
        listKey={'medicine-selected-'}
        listDataSelected={medicinesListSelected}
        removeFromList={(item) => removeMedicineFromList(item)}
      ></FormRemission>
    </Grid>
  )

  const getContent = () => {
    const views = [...content.map(el => container(el)), purposeAppointmentView(), diagnosesView(), referralsView()]
    return views
  }

  return (
    <Grid container>
      <HeaderUserMedicalHistory
        hcName={hcData.text}
        hcID={hcData.key}
        canEdit={canEdit}
        userHCDate={date}
        userHCHour={hour}
        handleChangeDate={handleChangeDate}
        handleChangeHour={handleChangeHour}
        onClickBtnSave={onClickBtnSave}
      ></HeaderUserMedicalHistory>
      <Grid item xs={12} sm={12} md={12} lg={12} className={classes.customTabs}>
        <CustomTabs titles={titles} contents={getContent()} variant={'scrollable'}></CustomTabs>
      </Grid>
    </Grid>
  )
}

ResponsiveReactGridLayout.propTypes = {
  onLayoutChange: PropTypes.func.isRequired,
}

ResponsiveReactGridLayout.defaultProps = {
  className: 'layout',
  rowHeight: 20,
  onLayoutChange: function () { },
  cols: { lg: 12, md: 12, sm: 6, xs: 4, xxs: 2 },
}
