// Components
import { TableCell, TableRow } from '@material-ui/core'

export const ReportPatient = ({ names, last_names, documents, date, index_target }) => {
    return (
        <TableRow>
            <TableCell align="center">{names}</TableCell>
            <TableCell align="center">{last_names}</TableCell>
            <TableCell align="center">{documents}</TableCell>
            <TableCell align="center">{date}</TableCell>
            <TableCell align="center">{index_target}</TableCell>
        </TableRow>
    )
}
