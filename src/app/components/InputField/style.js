import { TextField, withStyles } from '@material-ui/core'

export const CustomTextField = withStyles({
  root: {
    '& .MuiFormControl-root': {
      width: '100%',
    },
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
      borderBottom: '1px solid rgba(0, 0, 0, 0.42)',
      outline: 'none',
    },
    '& .MuiInputBase-input::placeholder': {
      fontStyle: 'italic',
      fontSize: '0.85rem',
    },
    '& label.MuiInputLabel-animated': {
      fontSize: '0.85rem',
    },
    '& label.Mui-focused': {
      color: 'rgb(59, 59, 59)',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#959595',
    },
    '& .MuiInput-underline:hover': {
      borderBottomColor: '#959595',
    },
    '& .MuiInput-underline.Mui-error:after': {
      borderBottomColor: 'red',
    },
    '& input:invalid + fieldset': {
      borderColor: 'red',
      borderWidth: 2,
    },
  },
})(TextField)
