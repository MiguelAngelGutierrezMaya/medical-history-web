import { createMuiTheme, makeStyles } from '@material-ui/core'
import { Color } from '../../../assets/js/color'

export const customTheme = createMuiTheme({
  typography: {
    fontFamily: "'Poppins', sans-serif",
    button: {
      textTransform: 'capitalize',
    }
  },
  palette: {
    primary: {
      main: Color.blueDark,
      contrastText: Color.white,
      text: {
        primary: 'rgba(0, 0, 0, 0.87)',
      },
    },
  },
})

export const useStyles = makeStyles({
  root: {
    marginTop: 10,
  },
})
