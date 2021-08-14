//Components
import { CustomTabs } from '../../components/CustomTabs'
import { InputField } from '../../components/InputField'
import { SelectField } from '../../components/SelectField'
import { AutocompleteField } from '../../components/AutocompleteField'
import { ItemDataSelected } from '../../components/ItemDataSelected'

import {
  Button,
  Fab,
  FormControlLabel,
  Grid,
  RadioGroup,
  Typography,
  List
} from '@material-ui/core'

//Icons
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'

//Containers
import { HeaderUserMedicalHistory } from '../../containers/HeaderUserMedicalHistory'

//Providers
import { WidthProvider, Responsive } from 'react-grid-layout'
import PropTypes from 'prop-types'

// styles & assets
import { useStyles, CustomSwitch, ItemRadio } from './style'

const ResponsiveReactGridLayout = WidthProvider(Responsive)

export const FormUserMedicalHistory = (
  {
    hcData,
    date,
    hour,
    content,
    titles,
    itemsValue,
    canEdit,
    diagnosesList,
    categoriesList,
    appointmentPurposesList,
    diagnosticAidsList,
    externalCausesList,
    medicinesList,
    presentationsList,
    specialistsList,
    specialistSelected,
    diagnosticAidSelected,
    medicineSelected,
    medicineObservation,
    medicineQuantity,
    presentationSelected,
    diagnoseSelected,
    categorySelected,
    appointmentPurposeSelected,
    externalCauseSelected,
    diagnosesCategories,
    handleChangeDate,
    handleChangeHour,
    handleChangeDiagnoses,
    handleChangeCategories,
    handleChangeSpecialists,
    handleChangeDiagnosticAids,
    handleChangeMedicines,
    handleChangePresentations,
    handleChangeAppointmentPurposes,
    handleChangeCauses,
    addSpecialistToList,
    removeSpecialistFromList,
    addDiagnosticAidToList,
    removeDiagnosticAidFromList,
    addMedicineToList,
    removeMedicineFromList,
    specialistsListSelected,
    diagnosticAidsListSelected,
    medicinesListSelected,
    onClickBtnSave,
    addDiagnoseCategory,
    deleteDiagnoseCategory,
    changeValueItem,
    handleChangeQuantity,
    handleChangeObservation
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
        <SelectField
          classNameLabel={classes.customLabel}
          classNameSelect={classes.customSelect}
          label="DIAGNOSTICOS"
          type="text"
          name="diagnoses"
          value={diagnoseSelected.text ? diagnoseSelected.text : ''}
          disabled={!canEdit}
          classNameIcon={classes.customSelectIcon}
          onChange={handleChangeDiagnoses}
          options={diagnosesList}
        />
        {
          diagnoseSelected.text
        }
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={4}
        lg={5}
        className={classes.containers}
      >
        <SelectField
          classNameLabel={classes.customLabel}
          classNameSelect={classes.customSelect}
          label="CATEGORIAS"
          type="text"
          name="categories"
          value={categorySelected.text ? categorySelected.text : ''}
          classNameIcon={classes.customSelectIcon}
          disabled={!canEdit}
          onChange={handleChangeCategories}
          options={categoriesList}
        />
        {
          categorySelected.text
        }
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
        <SelectField
          classNameLabel={classes.customLabel}
          classNameSelect={classes.customSelect}
          label="FINALIDAD CONSULTA EXTERNA"
          type="text"
          name="diagnoses"
          value={appointmentPurposeSelected.text ? appointmentPurposeSelected.text : ''}
          disabled={!canEdit}
          classNameIcon={classes.customSelectIcon}
          onChange={handleChangeAppointmentPurposes}
          options={appointmentPurposesList}
        />
        {
          appointmentPurposeSelected.text
        }
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={6}
        lg={6}
        className={classes.containers}
      >
        <SelectField
          classNameLabel={classes.customLabel}
          classNameSelect={classes.customSelect}
          label="CAUSA EXTERNA"
          type="text"
          name="categories"
          value={externalCauseSelected.text ? externalCauseSelected.text : ''}
          classNameIcon={classes.customSelectIcon}
          disabled={!canEdit}
          onChange={handleChangeCauses}
          options={externalCausesList}
        />
        {
          externalCauseSelected.text
        }
      </Grid>
    </Grid>
  )

  const referralsView = () => (
    <Grid container>
      <Grid
        item
        xs={10}
        sm={10}
        md={8}
        lg={8}
        className={classes.containers}
      >
        <AutocompleteField
          props={
            {
              options: specialistsList,
              getOptionLabel: (option) => option && option.text ? option.text : ''
            }
          }
          disabled={!canEdit}
          value={specialistSelected}
          setValueItem={(item) => handleChangeSpecialists(item)}
          label={'Especialistas'}
        ></AutocompleteField>
      </Grid>
      <Grid
        item
        xs={2}
        sm={2}
        md={4}
        lg={4}
        className={classes.buttonContainers}
      >
        <Button variant="contained" color="primary" onClick={addSpecialistToList} disabled={!canEdit}>
          Añadir
        </Button>
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        className={classes.containers}
      >
        <div className={classes.listItems}>
          <List dense={false}>
            {
              specialistsListSelected.map(el => (
                <ItemDataSelected
                  key={`specialist-selected-${el.key}`}
                  item={el}
                  disabled={!canEdit}
                  onDelete={(item) => removeSpecialistFromList(item)}
                />
              ))
            }
          </List>
        </div>
      </Grid>
      <Grid
        item
        xs={10}
        sm={10}
        md={8}
        lg={8}
        className={classes.containers}
      >
        <AutocompleteField
          props={
            {
              options: diagnosticAidsList,
              getOptionLabel: (option) => option && option.text ? option.text : ''
            }
          }
          disabled={!canEdit}
          value={diagnosticAidSelected}
          setValueItem={(item) => handleChangeDiagnosticAids(item)}
          label={'Ayudas diagnosticas'}
        ></AutocompleteField>
      </Grid>
      <Grid
        item
        xs={2}
        sm={2}
        md={4}
        lg={4}
        className={classes.buttonContainers}
      >
        <Button variant="contained" color="primary" onClick={addDiagnosticAidToList} disabled={!canEdit}>
          Añadir
        </Button>
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        className={classes.containers}
      >
        <div className={classes.listItems}>
          <List dense={false}>
            {
              diagnosticAidsListSelected.map(el => (
                <ItemDataSelected
                  key={`diagnostic-aid-selected-${el.key}`}
                  item={el}
                  disabled={!canEdit}
                  onDelete={(item) => removeDiagnosticAidFromList(item)}
                />
              ))
            }
          </List>
        </div>
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
              options: medicinesList,
              getOptionLabel: (option) => option && option.text ? option.text : ''
            }
          }
          disabled={!canEdit}
          value={medicineSelected}
          setValueItem={(item) => handleChangeMedicines(item)}
          label={'Medicamentos'}
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
        <InputField
          autoFocus={false}
          className={classes.customInput}
          label={'Cantidad'}
          type="number"
          name="cantidad"
          inputProps={
            {
              disabled: !canEdit,
              onChange: (event) => handleChangeQuantity(event),
              value: medicineQuantity
            }
          }
        />
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={4}
        lg={4}
        className={classes.containers}
      >
        <SelectField
          classNameLabel={classes.customLabel}
          classNameSelect={classes.customSelect}
          label="Presentación"
          type="text"
          name="diagnoses"
          value={presentationSelected.text ? presentationSelected.text : ''}
          disabled={!canEdit}
          classNameIcon={classes.customSelectIcon}
          onChange={handleChangePresentations}
          options={presentationsList}
        />
        {
          presentationSelected.text
        }
      </Grid>
      <Grid
        item
        xs={6}
        sm={6}
        md={4}
        lg={4}
        className={classes.containers}
      >
        <InputField
          autoFocus={false}
          inputProps={
            {
              disabled: !canEdit,
              onChange: (event) => handleChangeObservation(event),
              value: medicineObservation
            }
          }
          className={classes.customInput}
          label={'Observaciones'}
          type="text"
          name="label"
          multiline={true}
          rows={1}
          rowsMax={1}
        />
      </Grid>
      <Grid
        item
        xs={6}
        sm={6}
        md={4}
        lg={4}
        className={classes.buttonContainers}
      >
        <Button variant="contained" color="primary" onClick={addMedicineToList} disabled={!canEdit}>
          Añadir
        </Button>
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        className={classes.containers}
      >
        <div className={classes.listItems}>
          <List dense={false}>
            {
              medicinesListSelected.map(el => (
                <ItemDataSelected
                  key={`medicine-selected-${el.key}`}
                  item={{
                    ...el,
                    text: `${el.text} / ${el.medicineQuantity || 0} / ${el.presentationSelected || ''} / ${el.medicineObservation || ''}`
                  }}
                  disabled={!canEdit}
                  onDelete={(item) => removeMedicineFromList(item)}
                />
              ))
            }
          </List>
        </div>
      </Grid>
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
