import { makeStyles, withStyles, Switch, Radio } from '@material-ui/core'
import { Color } from '../../../assets/js/color'

export const useStyles = makeStyles((theme) => ({
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
    '& .MuiFormControl-fullWidth': {
      width: '96%',
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
  label: {
    color: Color.blueDark,
    fontWeight: 500,
    marginRight: '20px'
  },
  containers: {
    padding: '10px'
  },
  items: {
    marginTop: '20px'
  },
  fab: {
    margin: '0px 0px 0px 20px',
    width: theme.spacing(5),
    height: theme.spacing(5),
    backgroundColor: Color.purpleLight
  },
  icon: {
    color: Color.blueExtraLight
  },
  button: {
    color: Color.green
  }
}))

export const ItemRadio = withStyles({
  root: {
    color: Color.blueDark,
    '&$checked': {
      color: Color.blueDark,
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />)

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
