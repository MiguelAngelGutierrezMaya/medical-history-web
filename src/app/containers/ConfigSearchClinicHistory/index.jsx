import { Button, Grid } from '@material-ui/core'
import { Save } from '@material-ui/icons'
import { useState } from 'react'
import { MedicalHistory } from '../../../api/medicalHistory'

// components
import { InputField } from '../../components/InputField'
import { SelectField } from '../../components/SelectField'

// styles & assets
import { useStyles } from './style'

export const ConfigSearchClinicHistory = ({
  onSelected,
  onChange,
  hcName,
  onClickBtnSave,
  options,
  setState,
  setTitles,
}) => {
  const classes = useStyles()
  const [value, setValue] = useState('')

  const getMedicalHistory = (MedicalHistoryId) => {
    MedicalHistory.getMedicalHistory(MedicalHistoryId).then((response) => {
      if (response?.status === 200) {
        let titles = []
        let contents = []
        response.data?.groups.forEach((item) => {
          titles.splice(titles.length === 0 ? 0 : titles.length - 1, 0, {
            id: item.id,
            name: item.name,
            value: item.title,
            canDelete: false,
          })
          item?.items?.forEach((component) => {
            component.canDelete = false
          })
          contents.splice(contents.length === 0 ? 0 : contents.length - 1, 0, {
            id: item.id,
            group: item.name,
            groupValue: item.title,
            items: item.items,
          })
        })
        titles[titles.length] = 'iconEvent'
        setTitles(titles)
        setState(contents)
      }
    })
  }

  const handleSelected = (event) => {
    setValue(event.target.value)
    onSelected(event)
    getMedicalHistory(event.target.value)
  }

  return (
    <div className={classes.root}>
      <Grid
        className={classes.grid}
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
        spacing={2}
      >
        <Grid item xs={12} sm={12} md={5} lg={4}>
          <SelectField
            classNameLabel={classes.customLabel}
            classNameSelect={classes.customSelect}
            label="Lista de Historias Clínicas"
            type="text"
            name="hcName"
            value={value}
            onChange={handleSelected}
            options={options}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={3} style={{ paddingTop: 15 }}>
          <InputField
            className={classes.customInput}
            label="Historia Clínica"
            type="text"
            name="label"
            error={hcName.error.status}
            helperText={hcName.error.message}
            inputProps={{
              value: hcName.value,
              onChange: onChange,
            }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={3}
          lg={5}
          style={{ padding: '15px 0 0 18px' }}
        >
          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="center"
          >
            <Button
              className={classes.btnSave}
              variant="contained"
              disableElevation
              onClick={onClickBtnSave}
            >
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <Save className={classes.saveIcon} />
                <div>GUARDAR</div>
              </Grid>
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}
