import { makeStyles } from '@material-ui/core/styles'
import { Color } from '../../../assets/js/color'

export const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: Color.light,
    boxShadow: theme.shadows[5],
    borderRadius: 20,
    width: '28rem',
    '&:focus': {
      outline: 'none',
    },
  },
  iconContainer: {
    height: 130,
    width: '100%',
    borderRadius: '20px 20px 0 0',
    backgroundColor: Color.blueExtraLight,
  },
  iconBackground: {
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: Color.light,
    display: 'flex',
    alignItems: 'center',
    margin: 'auto',
    marginTop: 25,
  },
  successIcon: {
    fontSize: '2.8rem',
    margin: 'auto',
    color: Color.success,
  },
  errorIcon: {
    fontSize: '2.8rem',
    margin: 'auto',
    color: Color.error,
  },
  warningIcon: {
    fontSize: '2.8rem',
    margin: 'auto',
    color: Color.warning,
  },
  infoIcon: {
    fontSize: '2.8rem',
    margin: 'auto',
    color: Color.info,
  },
  iconClose: {
    fontSize: '0.7rem',
    color: Color.dark,
  },
  btnClose: {
    width: 25,
    height: 25,
    borderRadius: 50,
    backgroundColor: Color.light,
    minWidth: 0,
    padding: 0,
    position: 'relative',
    top: -95,
    left: '92%',
    '&:hover': {
      backgroundColor: Color.light,
    }
  },
  content: {
    width: '100%',
    [theme.breakpoints.up('xs')]: {
      padding: '20px 30px 30px 30px',
    },
    [theme.breakpoints.up('sm')]: {
      padding: '20px 50px 30px 50px',
    },
    [theme.breakpoints.up('md')]: {
      padding: '20px 50px 30px 50px',
    },
  },
  successTitle: {
    fontSize: '1.8rem',
    textAlign: 'center',
    color: Color.green,
    fontWeight: 600,
  },
  errorTitle: {
    fontSize: '1.8rem',
    textAlign: 'center',
    color: Color.error,
    fontWeight: 600,
  },
  warningTitle: {
    fontSize: '1.8rem',
    textAlign: 'center',
    color: Color.warning,
    fontWeight: 600,
  },
  infoTitle: {
    fontSize: '1.8rem',
    textAlign: 'center',
    color: Color.info,
    fontWeight: 600,
  },
  description: {
    fontSize: '0.85rem',
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 0.7)',
    margin: '10px 0 20px 0',
  },
  btnSuccess: {
    height: 48,
    width: '90%',
    margin: 'auto',
    display: 'block',
    borderRadius: 30,
    backgroundColor: Color.green,
    color: Color.light,
    fontWeight: 600,
    fontSize: '0.85rem',
    '&:hover': {
      backgroundColor: Color.green,
    },
    [theme.breakpoints.up('xs')]: {
      width: '100%',
    },
    [theme.breakpoints.up('sm')]: {
      width: '90%',
    },
    [theme.breakpoints.up('md')]: {
      width: '85%',
    },
  },
  btnError: {
    height: 48,
    width: '90%',
    margin: 'auto',
    display: 'block',
    borderRadius: 30,
    backgroundColor: Color.error,
    color: Color.light,
    fontWeight: 600,
    fontSize: '0.85rem',
    '&:hover': {
      backgroundColor: Color.error,
    },
    [theme.breakpoints.up('xs')]: {
      width: '100%',
    },
    [theme.breakpoints.up('sm')]: {
      width: '90%',
    },
    [theme.breakpoints.up('md')]: {
      width: '85%',
    },
  },
  btnWarning: {
    height: 48,
    width: '90%',
    margin: 'auto',
    display: 'block',
    borderRadius: 30,
    backgroundColor: Color.warning,
    color: Color.light,
    fontWeight: 600,
    fontSize: '0.85rem',
    '&:hover': {
      backgroundColor: Color.warning,
    },
    [theme.breakpoints.up('xs')]: {
      width: '100%',
    },
    [theme.breakpoints.up('sm')]: {
      width: '90%',
    },
    [theme.breakpoints.up('md')]: {
      width: '85%',
    },
  },
  btnInfo: {
    height: 48,
    width: '90%',
    margin: 'auto',
    display: 'block',
    borderRadius: 30,
    backgroundColor: Color.info,
    color: Color.light,
    fontWeight: 600,
    fontSize: '0.85rem',
    '&:hover': {
      backgroundColor: Color.info,
    },
    [theme.breakpoints.up('xs')]: {
      width: '100%',
    },
    [theme.breakpoints.up('sm')]: {
      width: '90%',
    },
    [theme.breakpoints.up('md')]: {
      width: '85%',
    },
  },
}))
