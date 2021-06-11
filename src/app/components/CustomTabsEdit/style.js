import {
  makeStyles,
  Radio,
  Switch,
  Tab,
  Tabs,
  withStyles,
} from '@material-ui/core'
import { Color } from '../../../assets/js/color'

export const StyledTabs = withStyles({
  indicator: {
    backgroundColor: 'transparent',
    display: 'flex',
    justifyContent: 'center',
    '& > span': {
      width: '100%',
      backgroundColor: 'transparent',
    },
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />)

export const StyledTab = withStyles((theme) => ({
  root: {
    backgroundColor: Color.blueExtraLight,
    color: Color.blueDark,
    fontSize: theme.typography.pxToRem(15),
    minWidth: 70,
    fontWeight: 600,
    minHeight: 38,
    opacity: 1,
    textTransform: 'none',
    '&.MuiTab-textColorInherit.Mui-selected': {
      backgroundColor: Color.purpleLight,
    },
    '&:hover': {
      backgroundColor: Color.purpleLight,
      color: Color.blueDark,
      opacity: 1,
    },
    '&:focus': {
      backgroundColor: Color.purpleLight,
      color: Color.blueDark,
      opacity: 1,
    },
  },
}))((props) => <Tab disableRipple {...props} />)

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

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: '10px 24px',
  },
  padding: {
    padding: '0 12px 18px 12px',
  },
  content: {
    backgroundColor: theme.palette.background.paper,
  },
  customTab: {
    '& .MuiInput-underline:before': {
      borderBottom: `0px solid ${Color.blueDark}`,
      textAlign: 'center',
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
    '& .MuiInput-underline textarea': {
      color: Color.blueDark,
      fontWeight: 500,
      textAlign: 'center',
    },
    '& .MuiInput-underline.Mui-error:after': {
      borderBottomColor: 'red',
    },
    '& input:invalid + fieldset': {
      borderColor: 'red',
      borderWidth: 2,
    },
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
    '& .MuiFormControl-fullWidth': {
      width: '96%',
    },
  },
  remove: {
    color: 'red',
    cursor: 'pointer',
  },
  removeStyle: {
    position: 'absolute',
    right: '2px',
    top: '-10px',
  },
  label: {
    color: Color.blueDark,
    fontWeight: 500,
  },
}))
