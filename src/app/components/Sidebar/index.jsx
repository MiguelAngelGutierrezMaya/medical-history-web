import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  SvgIcon,
  Typography,
  useTheme,
} from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { forwardRef } from 'react'
import { AssignmentInd, Event, FindInPage, Settings, Description } from '@material-ui/icons'

// routes
import { Router } from '../../../routes'

// styles & assets
import { closeSidebar, selectDashboard } from '../../../reducers/dashboardSlice'
import { ReactComponent as ChevronRightIcon } from '../../../assets/images/left-chevron.svg'
import { ReactComponent as ChevronLeftIcon } from '../../../assets/images/right-chevron.svg'
import { useStyles } from './style'
import clsx from 'clsx'

const options = [
  { isHeader: true, text: 'categoría' },
  {
    icon: <Description />,
    text: 'Asignar cita',
    route: Router.appAssignAppointment,
  },
  {
    icon: <AssignmentInd />,
    text: 'Historias Clinicas',
    route: Router.appClinicalHistories,
  },
  {
    icon: <Settings />,
    text: 'Config. Historias Clínicas',
    route: Router.appMedicalHistoriesConfig,
  },
  {
    icon: <FindInPage />,
    text: 'Buscar Config. Historia Clínica',
    route: Router.appSearchMedicalHistoriesConfig,
  },
  {
    icon: <Event />,
    text: 'Agenda',
    route: Router.appSchedule,
  },
  {
    icon: <AssignmentInd />,
    text: 'Tarjetero índice del paciente',
    route: Router.appIndexCardHolder,
  },
]

const LinkBehavior = forwardRef((props, ref) => {
  return <NavLink ref={ref} to={Router.appHome} {...props} />
})

export const Sidebar = () => {
  const classes = useStyles()
  const theme = useTheme()
  const dashboard = useSelector(selectDashboard)
  const dispatch = useDispatch()

  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: dashboard.sidebar.open,
        [classes.drawerClose]: !dashboard.sidebar.open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: dashboard.sidebar.open,
          [classes.drawerClose]: !dashboard.sidebar.open,
        }),
      }}
    >
      <div className={classes.toolbar}>
        <IconButton onClick={() => dispatch(closeSidebar())}>
          {theme.direction === 'rtl' ? (
            <SvgIcon
              className={classes.sidebarControls}
              component={ChevronLeftIcon}
              viewBox="0 0 407.436 407.436"
            />
          ) : (
            <SvgIcon
              className={classes.sidebarControls}
              component={ChevronRightIcon}
              viewBox="0 0 407.436 407.436"
            />
          )}
        </IconButton>
      </div>
      <List component="nav">
        {options.map((item, index) => {
          return item.isHeader ? (
            dashboard.sidebar.open ? (
              <Typography className={classes.headerItem} key={index}>
                {item.text}
              </Typography>
            ) : (
              <Divider className={classes.divider} key={index} />
            )
          ) : (
            <ListItem
              className={classes.item}
              button
              key={index}
              component={LinkBehavior}
              to={item.route}
            >
              <ListItemIcon className={classes.iconItem}>
                {item.icon}
              </ListItemIcon>
              <ListItemText className={classes.textItem} primary={item.text} />
            </ListItem>
          )
        })}
      </List>
    </Drawer>
  )
}
