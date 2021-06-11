import { makeStyles } from '@material-ui/core'
import { Color } from '../../../assets/js/color'

export const useStyles = makeStyles({
  formControl: {
    width: '100%',
    margin: '10px 0 0',
    '& .MuiFormLabel-root.Mui-focused': {
      color: 'rgb(59, 59, 59)',
      fontSize: '0.9rem',
    },
    '& .MuiInput-underline:after': {
      borderBottom: 'rgba(0, 0, 0, 0.54)',
    },
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
      borderBottom: '1px solid rgba(0, 0, 0, 0.42)',
      outline: 'none',
    },
    '& .MuiInput-underline.Mui-error:after': {
      borderBottom: `2px solid ${Color.error}`,
      outline: 'none',
    },
    '& .MuiInputLabel-shrink': {
      transform: 'translate(0, 1.5px) scale(0.75)',
      fontSize: '1rem',
    },
  },
  select: {
    '& .MuiSelect-select:focus': {
      backgroundColor: 'inherit',
    },
  },
  label: {
    fontSize: '0.85rem',
  },
  menuItem: {
    '&:hover': {
      backgroundColor: Color.blueExtraLight,
    },
    '&[aria-selected], &[aria-selected]:hover': {
      backgroundColor: Color.blueExtraLight,
    },
  },
  input: {
    color: 'red',
  },
  icon: {
    fontSize: '2.1rem',
    color: Color.blueDark,
    '&:hover': {
      cursor: 'pointer',
    },
  },
})

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
export const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
      '&:hover': {
        backgroundColor: Color.greenExtraLight,
      },
    },
  },
}
