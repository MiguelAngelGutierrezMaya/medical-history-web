import { Grid, Typography } from '@material-ui/core'
import { ScheduleForm } from '../../containers/ScheduleForm'
import { WeekCalendar } from '../../containers/WeekCalendar'
import { useStyles } from './style'

export const Schedule = () => {
  const classes = useStyles()

  return (
    <Grid
      container
      direction="row"
      justify="space-around"
      alignItems="flex-start"
    >
      <Grid className={classes.spacing} item md={8} sm={12} xs={12}>
        <Typography className={classes.list}>Agenda semanal</Typography>
        <WeekCalendar />
      </Grid>
      <Grid className={classes.spacing} item md={4} sm={12} xs={12}>
        <Typography className={classes.serviceTitle}>
          Disponibilidad Agenda
        </Typography>
        <ScheduleForm />
      </Grid>
    </Grid>
  )
}
