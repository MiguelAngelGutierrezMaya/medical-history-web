import { makeStyles } from '@material-ui/core'
import { Color } from '../../../assets/js/color'

export const useStyles = makeStyles({
  list: {
    color: Color.purpleLight,
    fontWeight: 500,
    fontSize: '1.4rem',
    margin: '39px 0 8px',
  },
  serviceTitle: {
    color: Color.blueDark,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '1.5rem',
    margin: '30px 0 15px',
  },
  spacing: {
    padding: '0 15px',
  },
})
