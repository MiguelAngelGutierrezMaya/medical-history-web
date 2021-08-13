import {
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton
} from '@material-ui/core'

//Icons
import DeleteIcon from '@material-ui/icons/Delete'

export const ItemDataSelected = ({ item, disabled, onDelete }) => {
    return (
        <ListItem>
            <ListItemText
                primary={item.text}
                secondary={null}
            />
            <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={() => onDelete(item)} disabled={disabled}>
                    <DeleteIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    )
}