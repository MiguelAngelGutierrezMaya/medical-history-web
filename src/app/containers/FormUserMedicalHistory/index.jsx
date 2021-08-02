//Components
import { CustomTabs } from '../../components/CustomTabs'
import { InputField } from '../../components/InputField'
import { SelectField } from '../../components/SelectField'

import { Button, Fab, FormControlLabel, Grid, RadioGroup, Typography } from '@material-ui/core'

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
    diagnoseSelected,
    categorySelected,
    diagnosesCategories,
    handleChangeDate,
    handleChangeHour,
    handleChangeDiagnoses,
    handleChangeCategories,
    onClickBtnSave,
    addDiagnoseCategory,
    deleteDiagnoseCategory,
    changeValueItem
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

  const createElement = (el, i, parentID) => {
    return (
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
  }

  const container = (data) => {
    const { items, id, name } = data
    return (
      <ResponsiveReactGridLayout isDraggable={false} isResizable={false} key={`${id}-${name}`}>
        {items?.map((el, i) => createElement(el, i, id))}
      </ResponsiveReactGridLayout>
    )
  }

  const lastView = () => {
    return (
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
  }

  const getContent = () => {
    const views = [...content.map(el => container(el)), lastView()]
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
      <Grid item xs={12} sm={12} md={12} lg={12} style={{width: '100%'}}>
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
