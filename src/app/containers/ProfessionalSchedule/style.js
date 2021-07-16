import { makeStyles } from '@material-ui/core/styles'
import { Color } from '../../../assets/js/color'
import { theme } from '../../components/Global/style'


export const useStyles = makeStyles({
    sliderWrapper: {
        width: '90%',
        maxHeight: 350,
        margin: 'auto',
        justifyContent: 'center',
        [theme.breakpoints.down('sm')]: {
            width: '90%',
        },
        [theme.breakpoints.down('xs')]: {
            width: '80%',
        },
    },
    slickSlide: {
        textAlign: 'center',
        position: 'relative',
        maxWidth: '100px',
        margin: 0
    },
    schedule: {
        width: propStyle => parseInt(propStyle.widthCard),
        height: propStyle => parseInt(propStyle.heightCard),
        marginBottom: 15,
        padding: 10,
        background: Color.white,
        [theme.breakpoints.down('md')]: {
            width: propStyle => parseInt(propStyle.widthCard),
        },
        [theme.breakpoints.down('sm')]: {
            width: propStyle => parseInt(propStyle.widthCard) - (parseInt(propStyle.widthCard) * 0.15),
            height: propStyle => (propStyle.resizeHeight) ? parseInt(propStyle.heightCard / 1.5) : parseInt(propStyle.heightCard),
        },
        [theme.breakpoints.down('xs')]: {
            width: propStyle => parseInt(propStyle.widthCard) - (parseInt(propStyle.widthCard) * 0.6),
        },
        overflowX: 'hidden',
        overflowY: 'auto',
    },
    scheduleDay: {
        color: '#000',
        fontSize: '0.9rem'
    },
    scheduleDate: {
        color: Color.dark,
        fontSize: '0.7rem',
        fontWeight: 'bold',
        paddingBottom: '3px',
        borderBottom: '1px solid #444444'
    },
    scheduleNoData: {
        height: propStyle => parseInt(propStyle.heightCard) - 20,
        border: 'none',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },
    btnSchedule: {
        backgroundColor: Color.blueExtraLight,
        border: 'none',
        color: '#535353',
        display: 'block',
        fontSize: '0.75rem',
        margin: '0 auto',
        marginTop: '5px',
        width: '50px',
        "&.Mui-disabled": {
            backgroundColor: Color.gray,
            textDecoration: 'line-through'
        }
    },
    btnSelected: {
        backgroundColor: Color.blueExtraLight,
        border: 'none',
        color: '#535353',
        display: 'block',
        fontSize: '0.75rem',
        margin: '0 auto',
        marginTop: '5px',
        width: '50px',
        "&.Mui-disabled": {
            backgroundColor: Color.blueExtraLight
        }
    },
    labelSchedule: {
        border: 'none',
        color: '#535353',
        display: 'block',
        fontSize: '1.4rem',
        margin: '0 auto',
        marginTop: '5px',
        width: '50px',
    },
    caption: {
        fontSize: '1rem',
        fontWeight: 600,
        color: Color.blueDark,
    }
})
