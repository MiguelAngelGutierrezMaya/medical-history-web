import { Menu, MenuItem } from '@material-ui/core'
import { useHistory } from 'react-router-dom'

export const HeaderMenu = ({ anchorEl, isMenuOpen, menuId, onClose, style, options }) => {
  const history = useHistory()

  const handleRedirect = (route) => {
    onClose()
    history.push(route)
  }

  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={onClose}
    >
      {options?.map((option, index) => (
        <MenuItem key={index} className={style} onClick={() => handleRedirect(option.url)}>
          {option.text}
        </MenuItem>
      ))}
    </Menu>
  )
}
