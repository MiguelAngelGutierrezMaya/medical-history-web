import { makeStyles, Tab, Tabs, withStyles } from '@material-ui/core'
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

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: 100,
    padding: '24px 0px 24px 0px',
  },
  padding: {
    padding: '12px 24px 18px',
  },
  content: {
    backgroundColor: theme.palette.background.paper,
  },
}))
