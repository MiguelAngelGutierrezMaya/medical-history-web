//Components
import { Button, Grid } from '@material-ui/core'
import { InputDate } from '../../components/InputDate'
import { InputTime } from '../../components/InputTime'

// styles & assets
import { useStyles } from './style'
import { Save } from '@material-ui/icons';

export const HeaderUserMedicalHistory = ({ hcName, hcID, userHCDate, userHCHour, canEdit, handleChangeDate, handleChangeHour, onClickBtnSave }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Grid className={classes.grid} container direction="row" justify="flex-start" alignItems="center" spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={5}>
          <h4>Historia Clínica: {hcName}</h4>
          <span className={classes.subtitle}>ID: {hcID}</span>
        </Grid>
        <Grid item xs={12} sm={12} md={8} lg={5} style={{ padding: '25px', backgroundColor: 'white', borderRadius: '5px' }}>
          <Grid container direction="row" justify="flex-start" alignItems="center" spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={6}>
              <InputDate
                disableFuture={true}
                disabled={!canEdit}
                label="Fecha"
                placeholder="Ej: dd/mm/yyyy"
                pickerFormat="DD/MM/YYYY"
                inputFormat="L"
                name="userHCDate"
                value={userHCDate}
                onChange={handleChangeDate}
                openTo="year"
                views={['year', 'month', 'date']}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={6}>
              <InputTime
                label="Hora"
                placeholder="Ej: hh:mm a"
                disabled={!canEdit}
                pickerFormat="hh:mm a"
                inputFormat="hh:mm a"
                name="userHCHour"
                value={userHCHour}
                onChange={handleChangeHour}
                openTo="hours"
                views={['hours', 'minutes']}
                ampm={true}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={2} style={{ padding: '15px 0 0 18px', textAlign: 'end' }}>
          {
            canEdit ? (
              <Button className={classes.btnSave} variant="contained" disableElevation onClick={onClickBtnSave}>
                <Grid container direction="column" justify="center" alignItems="center">
                  <Save className={classes.saveIcon} />
                  <div>GUARDAR</div>
                </Grid>
              </Button>
            ) : (<></>)
          }
        </Grid>
      </Grid>
    </div>
  )
}
