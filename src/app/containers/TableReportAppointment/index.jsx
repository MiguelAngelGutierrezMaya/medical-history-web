// Components
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'

// Components
import { ReportAppointment } from '../../components/ReportAppointment'

// styles & assets
import { useStyles } from './style'

export const TableReportAppointment = ({ data }) => {
  const classes = useStyles()

  return (
    <TableContainer component={Paper} className={classes.container}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Nombres</TableCell>
            <TableCell align="center">Apellidos</TableCell>
            <TableCell align="center">Documento</TableCell>
            <TableCell align="center">Fecha - hora de cita</TableCell>
            <TableCell align="center">Profesional</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <ReportAppointment
              key={row.id}
              names={row.names}
              last_names={row.last_names}
              documents={row.documents}
              date_hour={row.date_hour}
              professional={row.professional}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
