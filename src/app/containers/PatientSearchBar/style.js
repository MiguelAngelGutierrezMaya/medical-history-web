import { makeStyles } from '@material-ui/core'
import { Color } from '../../../assets/js/color'

export const useStyles = makeStyles({
  root: {
    backgroundColor: Color.gray,
    padding: '0px 20px 15px 20px',
  },
  grid: {
    '& > .MuiGrid-item': {
      padding: '8px 18px',
    },
  },
  btnSearch: {
    backgroundColor: Color.blueDark,
    color: Color.white,
    padding: '10px 18px',
    '&:hover': {
      backgroundColor: Color.blueDarkHover,
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
  btnEdit: {
    backgroundColor: Color.purpleLight,
    color: Color.white,
    fontSize: '0.72rem',
    height: 70,
    padding: 0,
    width: 80,
    '&:hover': {
      backgroundColor: Color.purpleLight,
    },
  },
  btnActiveEdit: {
    backgroundColor: Color.purpleLightHover,
    '&:hover': {
      backgroundColor: Color.purpleLightHover,
    },
  },
  saveIcon: {
    fontSize: '2.5rem',
  },
  customInput: {
    '& .MuiInput-underline:before': {
      borderBottom: `2px solid ${Color.blueDark}`,
    },
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
      borderBottom: `2px solid ${Color.blueDark}`,
      outline: 'none',
    },
    '& .MuiFormLabel-root': {
      color: `${Color.purpleLight} !important`,
      fontWeight: 500,
    },
    '& label.Mui-focused': {
      color: `${Color.purpleLight} !important`,
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: Color.blueDark,
    },
    '& .MuiInput-underline:hover': {
      borderBottomColor: Color.blueDark,
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
    color: `${Color.purpleLight} !important`,
    fontWeight: 500,
  },
  customSelect: {
    '& .MuiSelect-root': {
      color: `${Color.blueDark} !important`,
      fontWeight: 500,
    },
    '& .MuiInput-underline:before': {
      borderBottom: `2px solid ${Color.blueDark} !important`,
    },
    '& .MuiInput-underline:after': {
      // color: `2px solid ${Color.blueDark} !important`,
      borderBottom: `2px solid ${Color.blueDark}`,
    },
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
      borderBottom: `2px solid ${Color.blueDark}`,
      outline: 'none',
    },
  },
})
