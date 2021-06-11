import { AppBar, IconButton, SvgIcon, Toolbar } from '@material-ui/core'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

// reducers
import { selectDashboard, toggleSidebar } from '../../../reducers/dashboardSlice'

// components
import { HeaderMenu } from '../HeaderMenu'

// routes
import { Router } from '../../../routes'

// styles & assets
import { ReactComponent as MenuIcon } from '../../../assets/images/menu.svg'
import { ReactComponent as UserIcon } from '../../../assets/images/user.svg'
import logo from '../../../assets/images/logo.png'
import { useStyles } from './style'
import clsx from 'clsx'

export const Header = () => {
  const classes = useStyles()
  const dashboard = useSelector(selectDashboard)
  const dispatch = useDispatch()
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedList, setSelectedList] = useState('')

  const isMenuOpen = Boolean(anchorEl)

  const menuId = 'primary-search-account-menu'

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleSelectedList = (event, item) => {
    setSelectedList(item)
    handleProfileMenuOpen(event)
  }

  return (
    <>
      <AppBar
        position="fixed"
        elevation={2}
        className={clsx(classes.appBar, {
          [classes.appBarShift]: dashboard.sidebar.open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => dispatch(toggleSidebar())}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: dashboard.sidebar.open,
            })}
          >
            <SvgIcon className={classes.menuIcon} component={MenuIcon} viewBox="0 0 512 512" />
          </IconButton>
          <Link to={Router.appMedicalHistoriesConfig}>
              <img className={classes.logo} src={logo} alt="logo" />
          </Link>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={(event) => handleSelectedList(event, 'profile')}
              className={classes.icon}
            >
              <SvgIcon component={UserIcon} viewBox="0 0 512 512" />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <HeaderMenu
        anchorEl={anchorEl}
        isMenuOpen={isMenuOpen}
        menuId={menuId}
        onClose={handleMenuClose}
        style={classes.popupMenuItem}
        options={dashboard.header[selectedList]}
      />
    </>
  )
}
