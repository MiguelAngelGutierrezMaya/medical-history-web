import { makeStyles } from '@material-ui/core'
import { Color } from '../../../assets/js/color'

const drawerWidth = 280

export const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: Color.white,
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
    color: Color.blueDark,
  },
  hide: {
    display: 'none',
  },
  grow: {
    flexGrow: 1,
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  menuIcon: {
    fontSize: '1.3rem',
    color: Color.blackDark,
  },
  icon: {
    color: Color.blueDark,
  },
  popupMenuItem: {
    fontSize: '0.85rem',
    '&:hover': {
      backgroundColor: Color.blueExtraLight,
    },
  },
  logo: {
    marginTop: 2,
  },
}))
