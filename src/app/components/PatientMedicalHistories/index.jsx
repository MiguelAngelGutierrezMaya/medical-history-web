// Components
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'

// styles & assets
import { useStyles } from './style'

export const PatientMedicalHistories = ({ data }) => {
  const classes = useStyles()

  return (
    <TableContainer component={Paper} className={classes.container}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Fecha</TableCell>
            <TableCell align="center">Id historia clínica</TableCell>
            <TableCell align="center">Título</TableCell>
            <TableCell align="center">Profesional</TableCell>
            <TableCell align="center">Hitoria Clínica</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell align="center">{row.date}</TableCell>
              <TableCell align="center">{row.id}</TableCell>
              <TableCell align="center">{row.title}</TableCell>
              <TableCell align="center">{row.profesional}</TableCell>
              <TableCell align="center">{row.clinic_history}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
