import { makeStyles } from '@material-ui/core'
import { Color } from '../../../assets/js/color'

export const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: Color.gray,
    padding: '5px 20px 15px 20px',
  },
  customInput: {
    '& .MuiInput-underline:before': {
      borderBottom: `2px solid ${Color.dark}`,
    },
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
      borderBottom: `2px solid ${Color.dark}`,
      outline: 'none',
    },
    '& .MuiFormLabel-root.Mui-error': {
      color: '#f44336',
    },
    '& .MuiFormLabel-root': {
      color: `${Color.dark}`,
      fontWeight: 500,
    },
    '& label.Mui-focused': {
      color: `${Color.dark}`,
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
  customLabel: {
    color: `${Color.dark} !important`,
    fontWeight: 500,
  },
  customSelect: {
    margin: 0,
    '& .MuiSelect-root': {
      color: `${Color.blueDark} !important`,
      fontWeight: 500,
    },
    '& .MuiInput-underline:before': {
      borderBottom: `2px solid ${Color.dark} !important`,
    },
    '& .MuiInput-underline:after': {
      borderBottom: `2px solid ${Color.dark}`,
    },
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
      borderBottom: `2px solid ${Color.dark}`,
      outline: 'none',
    },
  },
  customSelectIcon: {
    color: Color.purpleLight,
  },
  title: {
    color: Color.blueDark,
    fontSize: '1.2rem',
    fontWeight: 400,
    margin: '30px 0 10px',
  },
  divider: {
    backgroundColor: 'rgb(16 55 90 / 25%)',
  },
  showItemOnlyLg: {
    [theme.breakpoints.up('xs')]: {
      display: 'none',
    },
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
    [theme.breakpoints.up('lg')]: {
      display: 'block',
    },
  },
}))
