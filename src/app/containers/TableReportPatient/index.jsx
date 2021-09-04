// Components
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'

// Components
import { ReportPatient } from '../../components/ReportPatient'

// styles & assets
import { useStyles } from './style'

export const TableReportPatient = ({ data }) => {
  const classes = useStyles()

  return (
    <TableContainer component={Paper} className={classes.container}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Nombres</TableCell>
            <TableCell align="center">Apellidos</TableCell>
            <TableCell align="center">Documento</TableCell>
            <TableCell align="center">Fecha - creación</TableCell>
            <TableCell align="center">Tarjetero indice</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <ReportPatient
              key={row.id}
              names={row.names}
              last_names={row.last_names}
              documents={row.documents}
              date={row.date}
              index_target={row.index_target}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
