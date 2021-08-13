import { TextField, withStyles } from '@material-ui/core'

export const CustomTextField = withStyles({
    root: {
        '& .MuiFormControl-root': {
            width: '100%',
        },
        '& .MuiInputBase-input::placeholder': {
            fontStyle: 'italic',
            fontSize: '0.85rem',
        },
        '& label.MuiInputLabel-animated': {
            fontSize: '0.9rem',
            color: 'black'
        },
        '& label.Mui-focused': {
            color: 'rgb(59, 59, 59)',
        },
        '& .MuiInput-underline:before': {
            borderBottom: '2px solid rgba(0, 0, 0)',
            outline: 'none',
        },
        '& .MuiInput-underline:hover': {
            borderBottomColor: '#959595',
        },
    },
})(TextField)
