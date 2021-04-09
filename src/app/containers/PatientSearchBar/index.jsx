import { Button, Grid } from '@material-ui/core'
import { Edit, Save } from '@material-ui/icons'
import classNames from 'clsx'

// components
import { InputField } from '../../components/InputField'
import { SelectField } from '../../components/SelectField'

// styles & assets
import { useStyles } from './style'

export const PatientSearchBar = ({
  showSaveButton,
  onClickBtnSave,
  search,
  setSearch,
  onSearch,
  toggleEdit,
  isActiveEdit,
  canEdit,
}) => {
  const classes = useStyles()
  // const [hasError, setHasError] = useState(false)
  const getNuipType = [
    { key: 1, text: 'Tarjeta de identidad' },
    { key: 2, text: 'Cédula de Ciudadanía' },
  ]

  const handleChange = (event) => {
    setSearch({ ...search, [event.target.name]: event.target.value })
  }

  return (
    <div className={classes.root}>
      <Grid className={classes.grid} container direction="row" justify="flex-start" alignItems="center" spacing={2}>
        <Grid item xs={12} sm={12} md={5} lg={4}>
          <SelectField
            classNameLabel={classes.customLabel}
            classNameSelect={classes.customSelect}
            label="Tipo de documento de identidad"
            type="text"
            name="nuipType"
            value={search.nuipType}
            // error={error.profession.hasError}
            // helperText={error.profession.message}
            onChange={handleChange}
            options={getNuipType}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={3} style={{ paddingTop: 15 }}>
          <InputField
            className={classes.customInput}
            label="Documento de identidad"
            type="number"
            name="nuip"
            placeholder="Ej: 1111111"
            inputProps={{
              value: search.nuip,
              onChange: handleChange,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={5} style={{ padding: '15px 0 0 18px' }}>
          <Grid container direction="row" justify="space-between" alignItems="center">
            <Button className={classes.btnSearch} variant="contained" disableElevation onClick={onSearch}>
              Buscar
            </Button>
            {showSaveButton ? (
              <div>
                {isActiveEdit ? (
                  <Button
                    className={classNames(classes.btnEdit, { [classes.btnActiveEdit]: canEdit })}
                    variant="contained"
                    disableElevation
                    onClick={toggleEdit}
                  >
                    <Grid container direction="column" justify="center" alignItems="center">
                      <Edit className={classes.saveIcon} />
                      <div>Editar</div>
                    </Grid>
                  </Button>
                ) : null}
                <Button className={classes.btnSave} variant="contained" disableElevation onClick={onClickBtnSave}>
                  <Grid container direction="column" justify="center" alignItems="center">
                    <Save className={classes.saveIcon} />
                    <div>GUARDAR</div>
                  </Grid>
                </Button>
              </div>
            ) : null}
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}
