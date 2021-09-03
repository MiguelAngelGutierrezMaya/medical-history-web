import { Button, Grid } from '@material-ui/core'

// components
import { InputField } from '../../components/InputField'

//Containers
import { DateRange } from '../DateRange'

// styles & assets
import { useStyles } from './style'

export const PatientReportSearchBar = ({
  onlyDates,
  canEdit,
  form,
  handleChangeInit,
  handleChangeEnd,
  handleChange,
  onSearch
}) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Grid className={classes.grid} container direction="row" justify="flex-start" alignItems="center" spacing={2}>
        {
          !onlyDates ? (
            <Grid item xs={12} sm={12} md={4} lg={3}>
              <InputField
                className={classes.customInput}
                label="Documento de identidad"
                type="number"
                name="nuip"
                placeholder="Ej: 1111111"
                inputProps={{
                  value: form.nuip,
                  onChange: handleChange,
                }}
              />
            </Grid>
          ) : (
            <></>
          )
        }
        <Grid item xs={12} sm={12} md={6} lg={7}>
          <DateRange
            canEdit={canEdit}
            form={form}
            handleChangeInit={handleChangeInit}
            handleChangeEnd={handleChangeEnd}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={2} lg={2} style={{ padding: '15px 0 0 18px' }}>
          <Grid container direction="row" justify="space-between" alignItems="center">
            <Button className={classes.btnSearch} variant="contained" disableElevation onClick={onSearch}>
              Buscar
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}
