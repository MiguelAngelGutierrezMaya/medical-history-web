// Components
import { TableCell, TableRow } from '@material-ui/core'

export const ReportAppointment = ({ names, last_names, documents, date_hour, professional }) => {
    return (
        <TableRow>
            <TableCell align="center">{names}</TableCell>
            <TableCell align="center">{last_names}</TableCell>
            <TableCell align="center">{documents}</TableCell>
            <TableCell align="center">{date_hour}</TableCell>
            <TableCell align="center">{professional}</TableCell>
        </TableRow>
    )
}
