import { makeStyles } from '@material-ui/core/styles'
import { Color } from '../../../assets/js/color'

export const useStyles = makeStyles({
  root: {
    height: '100vh',
    backgroundColor: 'rgb(138 181 32 / 80%)',
  },
  container: {
    width: 500,
    borderRadius: 25,
    padding: '10px 40px',
  },
  margin: {
    marginTop: 20,
  },
  logo: {
    display: 'block',
    margin: '10px auto',
  },
  title: {
    color: Color.blueDark,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '1.5rem',
    margin: '30px 0 10px',
  },
  errorContainer: {
    backgroundColor: Color.blueExtraLight,
    borderRadius: 5,
    padding: '5px 10px',
    marginBottom: 10,
  },
  errorMessage: {
    fontSize: '0.85rem',
    fontWeight: 500,
    color: Color.blueDark,
    padding: 8,
  },
  btn: {
    height: 50,
    width: '100%',
    margin: '40px 0 10px',
    borderRadius: 30,
    backgroundColor: Color.blueDark,
    color: Color.light,
    fontWeight: 600,
    fontSize: '0.85rem',
    '&:hover': {
      backgroundColor: Color.blueDarkHover,
    },
  },
  link: {
    display: 'block',
    textAlign: 'center',
    margin: '10px 0 0',
    color: 'currentcolor',
    fontSize: '0.85rem',
  },
})
