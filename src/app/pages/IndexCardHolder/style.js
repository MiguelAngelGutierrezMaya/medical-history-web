import { makeStyles } from '@material-ui/core'
import { Color } from '../../../assets/js/color'

export const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up('xs')]: {
      height: 'calc(100% - 275px)',
    },
    [theme.breakpoints.up('md')]: {
      height: 'calc(100% - 81px)',
    },
  },
  icon: {
    color: Color.purpleLight,
    display: 'block',
    fontSize: '11rem',
    margin: '0 auto 40px auto',
  },
  textInfo: {
    color: Color.purpleLight,
    display: 'block',
    fontSize: '1.3rem',
    textAlign: 'center',
  },
  btnAddIndexCardHolder: {
    backgroundColor: Color.blueDark,
    borderRadius: 30,
    color: Color.white,
    display: 'block',
    fontSize: '1rem',
    height: 60,
    margin: 'auto',
    '&:hover': {
      backgroundColor: Color.blueDarkHover,
    },
    [theme.breakpoints.up('xs')]: {
      width: '100%',
    },
    [theme.breakpoints.up('md')]: {
      width: 320,
    },
  },
}))
