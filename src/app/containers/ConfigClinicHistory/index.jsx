import { Button, Grid } from '@material-ui/core'
import { Save } from '@material-ui/icons'
// import { Edit, Save } from '@material-ui/icons'
// import classNames from 'clsx'

// components
import { InputField } from '../../components/InputField'
import { SelectField } from '../../components/SelectField'

// styles & assets
import { useStyles } from './style'

export const ConfigClinicHistory = ({
  onAddItem,
  component,
  errorComponent,
  setComponent,
  index,
  onClickBtnSave
}) => {
  const classes = useStyles()
  const getComponentsType = [
    { key: 'text-field', text: 'Campo de texto' },
    { key: 'text-area', text: 'Campo multilinea' },
    { key: 'radio', text: 'Selección única' },
    { key: 'switch', text: 'Switch' },
  ]

  const handleChange = (event) => {
    setComponent({ ...component, [event.target.name]: event.target.value })
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
            label="Tipo de componente"
            type="text"
            name="type"
            value={component.type}
            error={errorComponent.type.status}
            helperText={errorComponent.type.message}
            onChange={handleChange}
            options={getComponentsType}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={3} style={{ paddingTop: 15 }}>
          <InputField
            className={classes.customInput}
            label="Nombre del componente"
            type="text"
            name="label"
            error={errorComponent.label.status}
            helperText={errorComponent.label.message}
            inputProps={{
              value: component.label,
              onChange: handleChange,
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
            justify="space-between"
            alignItems="center"
          >
            <Button
              className={classes.btnSearch}
              variant="contained"
              disableElevation
              onClick={() => onAddItem(index)}
            >
              Agregar
            </Button>
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
