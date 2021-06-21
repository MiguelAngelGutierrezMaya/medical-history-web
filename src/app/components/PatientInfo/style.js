import { makeStyles } from '@material-ui/core'
import { Color } from '../../../assets/js/color'

export const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0
  },
  header: {
    backgroundColor: Color.blueExtraLight,
    padding: '30px'
  },
  actions: {
    padding: 0,
    '& .MuiButtonBase-root': {
      margin: '0px 5px 0px 5px',
      width: theme.spacing(5),
      height: theme.spacing(5),
      backgroundColor: Color.purpleLight
    }
  },
  avatar: {
    backgroundColor: Color.purpleLight,
    width: theme.spacing(7),
    height: theme.spacing(7),
    '& .MuiSvgIcon-root': {
      fontSize: '3rem'
    }
  },
  content: {
    padding: '10px',
    '& .MuiList-root': {
      '& .MuiAvatar-root': {
        backgroundColor: Color.white
      },
      '& .MuiSvgIcon-root': {
        color: Color.blueDark
      }
    }
  },
  icon: {
    color: Color.blueExtraLight
  },
}))
