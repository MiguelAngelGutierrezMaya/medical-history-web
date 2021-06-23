import { makeStyles } from '@material-ui/core'
import { Color } from '../../../assets/js/color'

export const useStyles = makeStyles((theme) => ({
  root: {},
  title: {
    color: Color.purpleLight,
    fontWeight: 'bold'
  },
  subtitle: {
    textAlign: 'center',
    color: Color.blueDark,
    fontWeight: 'bold'
  },
  fab: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    float: 'right',
    backgroundColor: Color.purpleLight
  },
  icon: {
    color: Color.blueExtraLight
  },
  button: {
    color: Color.green
  }
}))
