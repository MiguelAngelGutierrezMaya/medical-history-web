import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { forwardRef, useState } from 'react'

// Components

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
  Collapse
} from '@material-ui/core'
import { AssignmentInd, Event, FindInPage, Settings, Description, ExpandLess, ExpandMore } from '@material-ui/icons'
import AssessmentIcon from '@material-ui/icons/Assessment';
import AssignmentIcon from '@material-ui/icons/Assignment';
import EventIcon from '@material-ui/icons/Event';
import PeopleIcon from '@material-ui/icons/People';

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
  {
    icon: <AssessmentIcon />,
    text: 'Reportes',
    subItems: [
      {
        icon: <AssignmentIcon />,
        text: 'Historias Clinicas',
        route: Router.appReportUserClinicalHistories,
      },
      {
        icon: <EventIcon />,
        text: 'Citas',
        route: Router.appReportAppointments,
      },
      {
        icon: <PeopleIcon />,
        text: 'Pacientes',
        route: Router.appReportPatients,
      }
    ]
  }
]

const LinkBehavior = forwardRef((props, ref) => {
  return <NavLink ref={ref} to={Router.appHome} {...props} />
})

export const Sidebar = () => {
  const classes = useStyles()
  const theme = useTheme()
  const dashboard = useSelector(selectDashboard)
  const dispatch = useDispatch()

  const [open, setOpen] = useState(true);

  const handleOpenSubmenu = () => {
    setOpen(!open);
  };

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
          ) : item.subItems ? (
            <>
              <ListItem button onClick={handleOpenSubmenu} key={`item-${index}`}>
                <ListItemIcon className={classes.iconItem}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText className={classes.textItem} primary={item.text} />
                {open ? <ExpandLess className={classes.iconItem} /> : <ExpandMore className={classes.iconItem} />}
              </ListItem>
              <Collapse in={open} timeout="auto" key={`collapse-${index}`} unmountOnExit>
                <List component="div" disablePadding>
                  {
                    item.subItems.map((subItem, index2) => (
                      <ListItem
                        className={classes.item}
                        button
                        key={`${index}-${index2}`}
                        component={LinkBehavior}
                        to={subItem.route}
                      >
                        <ListItemIcon className={classes.iconItem}>
                          {subItem.icon}
                        </ListItemIcon>
                        <ListItemText className={classes.textItem} primary={subItem.text} />
                      </ListItem>
                    ))
                  }
                </List>
              </Collapse>
            </>
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
