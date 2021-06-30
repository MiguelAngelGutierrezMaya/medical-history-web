//Components
import { CustomTabs } from '../../components/CustomTabs'
import { InputField } from '../../components/InputField'
import { SelectField } from '../../components/SelectField'

import { Fab, FormControlLabel, Grid, RadioGroup, Typography } from '@material-ui/core'

//Icons
import DeleteIcon from '@material-ui/icons/Delete'

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
    diagnoses,
    canEdit,
    diagnosesList,
    categories,
    categoriesList,
    handleChangeDate,
    handleChangeHour,
    handleChangeDiagnoses,
    handleChangeCategories,
    onClickBtnSave,
    deleteDiagnose,
    deleteCategory,
    changeValueItem
  }) => {
  const classes = useStyles()

  const getComponent = (el, i, parentID) => {
    const { component } = el
    const index = itemsValue.findIndex(elem => elem.item.id === el.id)
    const value = index !== -1 ? itemsValue[index].value : ''
    const focus = index !== -1 ? itemsValue[index].focus : false
    const objTextFields = {
      'text-field': (
        <InputField
          key={`${parentID}-${component.label}-item-${i}`}
          className={classes.customInput}
          label={component.label}
          type="text"
          name="label"
          inputProps={
            focus ? {
              disabled: !canEdit,
              onBlur: (event) => changeValueItem(el, event.target.value, false)
            } : {
              disabled: !canEdit,
              onFocus: (event) => changeValueItem(el, event.target.value, true),
              value: value
            }
          }
        />
      ),
      'text-area': (
        <InputField
          key={`${parentID}-${component.label}-item-${i}`}
          inputProps={
            focus ? {
              disabled: !canEdit,
              onBlur: (event) => changeValueItem(el, event.target.value, false)
            } : {
              disabled: !canEdit,
              onFocus: (event) => changeValueItem(el, event.target.value, true),
              value: value
            }
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
          <FormControlLabel control={<CustomSwitch disabled={!canEdit} label="Label" checked={typeof value === 'string' ? value.toLowerCase() === "true" : false || false} onChange={(event) => changeValueItem(el, event.target.checked, false)} />} />
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
    const { items } = data
    return (
      <ResponsiveReactGridLayout>
        {items?.reverse().map((el, i) => createElement(el, i, data.id))}
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
          md={6}
          lg={6}
          className={classes.containers}
        >
          <SelectField
            classNameLabel={classes.customLabel}
            classNameSelect={classes.customSelect}
            label="DIAGNOSTICOS"
            type="text"
            name="diagnoses"
            value={''}
            disabled={!canEdit}
            classNameIcon={classes.customSelectIcon}
            onChange={handleChangeDiagnoses}
            options={diagnosesList}
          />
          <Grid container className={classes.items}>
            {
              diagnoses.map((el, i) => (
                <Grid key={`diagnose-${i}`} item xs={12}
                  sm={12}
                  md={6}
                  lg={6}>
                  <span>{el.text}</span>
                  {
                    canEdit ? (
                      <Fab aria-label="delete" className={classes.fab} onClick={() => deleteDiagnose(el.key)}>
                        <DeleteIcon className={classes.icon} />
                      </Fab>
                    ) : (<></>)
                  }
                </Grid>
              ))
            }
          </Grid>
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
            label="CATEGORIAS"
            type="text"
            name="categories"
            value={''}
            classNameIcon={classes.customSelectIcon}
            disabled={!canEdit}
            onChange={handleChangeCategories}
            options={categoriesList}
          />
          <Grid container className={classes.items}>
            {
              categories.map((el, i) => (
                <Grid key={`category-${i}`} item xs={12}
                  sm={12}
                  md={6}
                  lg={6}>
                  <span>{el.text}</span>
                  {
                    canEdit ? (
                      <Fab aria-label="delete" className={classes.fab} onClick={() => deleteCategory(el.key)}>
                        <DeleteIcon className={classes.icon} />
                      </Fab>
                    ) : (<></>)
                  }
                </Grid>
              ))
            }
          </Grid>
        </Grid>
      </Grid>
    )
  }

  const getContent = () => {
    const views = [...content.map(el => container(el)), lastView()]
    return views
  }

  return (
    <>
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
      <CustomTabs titles={titles} contents={getContent()} variant={'scrollable'}></CustomTabs>
    </>
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
