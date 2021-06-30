import { makeStyles } from '@material-ui/core'
import { Color } from '../../../assets/js/color'

export const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: 'transparent',
    padding: '0px 20px 15px 20px',
  },
  subtitle: {
    color: Color.purpleLight
  },
  grid: {
    '& > .MuiGrid-item': {
      padding: '8px 18px',
    },
  },
  btnSave: {
    backgroundColor: Color.green,
    color: Color.white,
    fontSize: '0.72rem',
    height: 70,
    marginLeft: 10,
    padding: 0,
    width: 80,
    '&:hover': {
      backgroundColor: Color.greenHover,
    },
  },
  saveIcon: {
    fontSize: '2.5rem',
  },
}))
