import { makeStyles } from '@material-ui/core/styles'
import { Color } from '../../../assets/js/color'
import { theme } from '../../components/Global/style'

export const useStyles = makeStyles({
  root: {
    [theme.breakpoints.up('xs')]: {
      width: '100%',
    },
    [theme.breakpoints.up('sm')]: {
      width: '100%',
    },
    [theme.breakpoints.up('md')]: {
      width: '100%',
      margin: 'auto',
    },
    [theme.breakpoints.up('lg')]: {
      width: '100%',
      margin: 'auto',
    },
    padding: '5px 10px',
  },
  separate: {
    height: 1,
    marginBottom: 20,
  },
  titleWeek: {
    color: Color.text,
    fontWeight: 600,
    textTransform: 'uppercase',
  },
  addAvailability: {
    textTransform: 'initial',
    color: Color.text,
    fontWeight: 400,
    padding: '6px 4px',
  },
  addAvailabilityIcon: {
    color: Color.purpleLight,
    marginRight: 5,
  },
  btn: {
    height: 50,
    width: '100%',
    margin: '40px 0 20px',
    borderRadius: 50,
    backgroundColor: Color.blueDark,
    color: Color.white,
    fontWeight: 600,
    fontSize: '0.85rem',
    '&:hover': {
      backgroundColor: Color.blueDarkHover,
    },
  },
  btnDelete: {
    color: Color.error,
    marginTop: 35,
  },
  rangeDate: {
    marginBottom: 15,
    width: '100%',
  },
})
