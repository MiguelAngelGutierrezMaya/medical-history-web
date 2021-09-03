import { Grid } from '@material-ui/core'

// components
import { InputDate } from '../../components/InputDate'

// styles & assets
import { useStyles } from './style'

export const DateRange = ({ canEdit, form, handleChangeInit, handleChangeEnd }) => {
  const classes = useStyles()

  return (
    <Grid className={classes.grid} container direction="row" justify="flex-start" alignItems="center" spacing={2}>
      <Grid item xs={12} sm={12} md={6} lg={6}>
        <InputDate
          disableFuture={true}
          disabled={canEdit}
          label="Fecha inicial"
          placeholder="Ej: dd/mm/yyyy"
          pickerFormat="DD/MM/YYYY"
          inputFormat="L"
          name="birthday"
          value={form.date_init}
          onChange={handleChangeInit}
          openTo="year"
          views={['year', 'month', 'date']}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6}>
        <InputDate
          disableFuture={true}
          disabled={canEdit}
          label="Fecha final"
          placeholder="Ej: dd/mm/yyyy"
          pickerFormat="DD/MM/YYYY"
          inputFormat="L"
          name="birthday"
          value={form.date_end}
          onChange={handleChangeEnd}
          openTo="year"
          views={['year', 'month', 'date']}
        />
      </Grid>
    </Grid>
  )
}
