// Components
import {
    ListItemText,
    IconButton
} from '@material-ui/core'

import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

//Icons
import DeleteIcon from '@material-ui/icons/Delete'

export const ItemDataSelected = ({ showAction, showLending, includeQuantity, item, disabled, onDelete }) => {
    return (
        <TableRow>
            <TableCell component="th" align="center" scope="row">
                <ListItemText
                    primary={item.text}
                    secondary={null}
                />
            </TableCell>
            {
                includeQuantity ? (<TableCell align="center">{item.quantity}</TableCell>) : (<></>)
            }
            {
                showLending ? (
                    <TableCell align="center">{item.lendingPresentationSelected?.text || item.lendingPresentationSelected}</TableCell>
                ) : (<></>)
            }
            <TableCell align="center">{item.observation}</TableCell>
            {
                showAction ? (
                    <TableCell align="center">
                        <IconButton edge="end" aria-label="delete" onClick={() => onDelete(item)} disabled={disabled}>
                            <DeleteIcon />
                        </IconButton>
                    </TableCell>
                ) : (<></>)
            }
        </TableRow>
    )
}