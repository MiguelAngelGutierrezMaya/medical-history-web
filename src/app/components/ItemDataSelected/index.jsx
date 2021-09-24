import {
    // ListItem,
    ListItemText,
    // ListItemSecondaryAction,
    IconButton
} from '@material-ui/core'

//Icons
import DeleteIcon from '@material-ui/icons/Delete'

export const ItemDataSelected = ({ showAction, showLending, includeQuantity, item, disabled, onDelete }) => {
    return (
        <tr>
            <td>
                <ListItemText
                    primary={item.text}
                    secondary={null}
                />
            </td>
            {
                includeQuantity ? (<td>{item.quantity}</td>) : (<></>)
            }
            {
                showLending ? (
                    <td>{item.lendingPresentationSelected?.text || item.lendingPresentationSelected}</td>
                ) : (<></>)
            }
            <td>{item.observation}</td>
            {
                showAction ? (
                    <td>
                        <IconButton edge="end" aria-label="delete" onClick={() => onDelete(item)} disabled={disabled}>
                            <DeleteIcon />
                        </IconButton>
                    </td>
                ) : (<></>)
            }
        </tr>
    )
}