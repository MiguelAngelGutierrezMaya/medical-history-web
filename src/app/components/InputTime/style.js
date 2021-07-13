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
  customInput: {
    '& .MuiInput-underline:before': {
      borderBottom: `2px solid ${Color.dark}`,
    },
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
      borderBottom: `2px solid ${Color.dark}`,
      outline: 'none',
    },
    '& .MuiFormLabel-root': {
      color: `${Color.dark} !important`,
    },
    '& label.Mui-focused': {
      color: `${Color.dark} !important`,
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: Color.dark,
    },
    '& .MuiInput-underline:hover': {
      borderBottomColor: Color.dark,
    },
    '& .MuiInput-underline input': {
      color: Color.blueDark,
      fontWeight: 500,
    },
    '& .MuiInput-underline.Mui-error:after': {
      borderBottomColor: 'red',
    },
    '& input:invalid + fieldset': {
      borderColor: 'red',
      borderWidth: 2,
    },
  },
})
