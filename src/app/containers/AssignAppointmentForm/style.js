import { makeStyles, withStyles, Switch } from '@material-ui/core'
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
  btnSearch: {
    backgroundColor: Color.blueDark,
    color: Color.white,
    padding: '10px 18px',
    '&:hover': {
      backgroundColor: Color.blueDarkHover,
    },
  },
  boxSearch: {
    backgroundColor: Color.blueExtraLight,
    padding: 10,
    '& span': {
      fontWeight: 'bold'
    }
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


export const CustomSwitch = withStyles((theme) => ({
  root: {
    width: 42,
    height: 26,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    padding: 1,
    '&$checked': {
      transform: 'translateX(16px)',
      color: theme.palette.common.white,
      '& + $track': {
        backgroundColor: Color.blueDark,
        opacity: 1,
        border: 'none',
      },
    },
    '&$focusVisible $thumb': {
      color: Color.blueDark,
      border: '6px solid #fff',
    },
  },
  thumb: {
    width: 24,
    height: 24,
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  )
})
