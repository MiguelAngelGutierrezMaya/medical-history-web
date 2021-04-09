import { makeStyles } from '@material-ui/core'
import { Color } from '../../../assets/js/color'

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    height: 64,
  },
  content: {
    minHeight: '100vh',
    flexGrow: 1,
    backgroundColor: Color.light,
    [theme.breakpoints.up('xs')]: {
      padding: '56px 0 0',
    },
    [theme.breakpoints.up('sm')]: {
      padding: '64px 0 0',
    },
  },
}))
