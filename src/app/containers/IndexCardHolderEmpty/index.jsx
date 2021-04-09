import { Button, Grid, Typography } from '@material-ui/core'
import { AssignmentInd } from '@material-ui/icons'
import { useStyles } from './style'

export const IndexCardHolderEmpty = ({ onClick }) => {
  const classes = useStyles()

  return (
    <Grid className={classes.root} container direction="column" justify="space-around" alignItems="center">
      <div>
        <AssignmentInd className={classes.icon} />
        <Typography className={classes.textInfo}>Digitar documento de identidad del paciente</Typography>
        <Typography className={classes.textInfo}>para visualizar su tarjetero índice</Typography>
      </div>
      <div>
        <Typography className={classes.textInfo} style={{ marginBottom: 40 }}>
          ¿Deseas registrar un nuevo Tarjetero índice?
        </Typography>
        <Button className={classes.btnAddIndexCardHolder} variant="contained" disableElevation onClick={onClick}>
          Nuevo Tarjetero Índice
        </Button>
      </div>
    </Grid>
  )
}
