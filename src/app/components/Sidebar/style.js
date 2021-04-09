import { makeStyles } from '@material-ui/core'
import { Color } from '../../../assets/js/color'

const drawerWidth = 280

export const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    backgroundColor: Color.dark,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    backgroundColor: Color.dark,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  headerItem: {
    marginLeft: 68,
    textTransform: 'uppercase',
    fontWeight: 500,
    fontSize: '0.9rem',
    color: Color.white,
    padding: 5,
  },
  iconItem: {
    color: Color.white,
    paddingLeft: 8,
  },
  textItem: {
    color: Color.white,
    '& .MuiListItemText-primary': {
      fontSize: '0.82rem',
    },
  },
  sidebarControls: {
    color: Color.white,
    fontSize: '1.2rem',
  },
  divider: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  item: {
    padding: '10px 16px',
    '&:hover': {
      backgroundColor: Color.blackDark,
      color: Color.green,
    },
    '&:hover div': {
      color: Color.green,
    },
    '&[aria-current]': {
      backgroundColor: Color.blackDark,
      color: Color.green,
      '& div': {
        color: Color.green,
      },
    },
  },
}))
