import { makeStyles } from '@material-ui/core'
import { Color } from '../../../assets/js/color'

export const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '10px',
    marginBottom: '10px',
    '&:hover': {
      backgroundColor: Color.blueExtraLight
    }
  },
  spacing: {
    padding: '5px'
  },
  body: {
    marginTop: '60px',
    marginBottom: '30px',
    margin: '0px 2px',
    transform: 'scale(0.8)',
    color: Color.blueDark,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  button: {
    margin: 'auto',
    marginBottom: '10px',
    '&:hover': {
      backgroundColor: Color.blueExtraLight,
      textDecorationLine: 'underline'
    }
  }
}))
