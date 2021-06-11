import { fade, makeStyles } from '@material-ui/core'
import { Color } from '../../../assets/js/color'

const priorities = [
  { id: 1, text: 'Presencial', color: Color.presential },
  { id: 2, text: 'Domiciliario', color: Color.domiciliary },
  { id: 3, text: 'Virtual', color: Color.virtual },
]

export const usePrioritySelectorItemStyles = makeStyles(
  ({ palette, spacing }) => ({
    bullet: ({ color }) => ({
      backgroundColor: color ? color : Color.allItems,
      borderRadius: '50%',
      width: spacing(2),
      height: spacing(2),
      marginRight: 12,
      display: 'inline-block',
    }),
    prioritySelectorItem: {
      display: 'flex',
      alignItems: 'center',
    },
    priorityText: {
      '@media (max-width: 500px)': {
        display: 'none',
      },
    },
    priorityShortText: {
      '@media (min-width: 500px)': {
        display: 'none',
      },
    },
  }),
)

export const useTooltipContentStyles = makeStyles((theme) => ({
  content: {
    padding: theme.spacing(3, 1),
    paddingTop: 0,
    backgroundColor: theme.palette.background.paper,
    boxSizing: 'border-box',
    width: '400px',
  },
  contentContainer: {
    paddingBottom: theme.spacing(1.5),
  },
  text: {
    ...theme.typography.body2,
    display: 'inline-block',
    color: Color.text,
    fontWeight: 600,
    marginBottom: 6,
    textTransform: 'capitalize',
  },
  title: {
    ...theme.typography.h6,
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeightBold,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'normal',
  },
  icon: {
    verticalAlign: 'middle',
    fontSize: '1.3rem',
    marginBottom: 8,
    color: Color.grayDark,
  },
  contentItemIcon: {
    textAlign: 'center',
  },
  grayIcon: {
    color: theme.palette.action.active,
  },
  lens: {
    width: theme.spacing(4.5),
    height: theme.spacing(4.5),
    verticalAlign: 'super',
  },
  textCenter: {
    textAlign: 'center',
  },
  dateAndTitle: {
    lineHeight: 1.1,
  },
  titleContainer: {
    paddingBottom: theme.spacing(2),
  },
  container: {
    paddingBottom: theme.spacing(1.5),
  },
  img: {
    width: 45,
    height: 45,
  },
  session: {
    fontSize: '0.85rem',
    color: Color.text,
    display: 'inline-block',
    fontWeight: 500,
    padding: 5,
    textAlign: 'center',
    textTransform: 'initial',
  },
  numSessions: {
    fontSize: '0.85rem',
    color: Color.text,
    fontWeight: 'bold',
    display: 'inline-block',
    marginLeft: 5,
  },
  btnReschedule: {
    width: '10rem',
    backgroundColor: Color.grayDark,
    color: Color.white,
    textTransform: 'uppercase',
    fontSize: '0.75rem',
    borderRadius: 30,
    '&:hover': {
      backgroundColor: Color.grayDark,
    },
  },
  btnCancelAppointment: {
    width: '10rem',
    backgroundColor: Color.errorCalendar,
    color: Color.white,
    textTransform: 'uppercase',
    fontSize: '0.75rem',
    borderRadius: 30,
    '&:hover': {
      backgroundColor: Color.errorCalendar,
    },
  },
  titleCancel: {
    color: '#171c26',
    width: '100%',
    textAlign: 'center',
  },
  cancelIcon: {
    fontSize: '5rem',
    display: 'block',
    width: '100%',
    color: Color.error,
  },
  canceledIcon: {
    fontSize: '5rem',
    display: 'block',
    width: '100%',
    color: Color.grayDark,
  },
  wrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  progress: {
    color: Color.green,
    position: 'relative',
    top: 0,
    left: 62,
  },
}))

export const groupingStyles = ({ spacing }) => ({
  ...priorities.reduce(
    (acc, priority) => ({
      ...acc,
      [`cell${priority.text.replace(' ', '')}`]: {
        backgroundColor: fade(Color.white, 0.1),
        '&:hover': {
          backgroundColor: fade(priority.color, 0.1),
        },
        '&:focus': {
          backgroundColor: fade(priority.color, 0.2),
        },
      },
      [`headerCell${priority.text.replace(' ', '')}`]: {
        backgroundColor: fade(Color.white, 0.1),
        '&:hover': {
          backgroundColor: fade(priority.color, 0.1),
        },
        '&:focus': {
          backgroundColor: fade(priority.color, 0.1),
        },
      },
    }),
    {},
  ),
  icon: {
    paddingLeft: spacing(1),
    verticalAlign: 'middle',
  },
})

export const styles = (theme) => ({
  flexibleSpace: {
    margin: '0 auto 0 0',
  },
  prioritySelector: {
    marginLeft: theme.spacing(2),
    backgroundColor: Color.backgroundItems,
    borderRadius: 5,
    padding: '0 5px',
    minWidth: 105,
    fontWeight: 400,
    '@media (max-width: 500px)': {
      minWidth: 0,
      fontSize: '0.75rem',
      marginLeft: theme.spacing(0.5),
    },
    '& .MuiSelect-select:focus': {
      background: 'none',
    },
  },
  menuItem: {
    '&:hover': {
      backgroundColor: Color.greenExtraLight,
    },
    '&[aria-selected], &[aria-selected]:hover': {
      backgroundColor: Color.greenExtraLight,
    },
  },
})

export const useStyles = makeStyles((theme) => ({
  appointmentCanceled: {
    backgroundColor: `${Color.appointmentCanceled} !important`,
  },
  appointmentPresential: {
    backgroundColor: Color.presential,
    color: Color.white,
    padding: '2px 5px',
    fontSize: '0.6rem',
    width: '100%',
    height: '100%',
  },
  appointmentDomiciliary: {
    backgroundColor: Color.domiciliary,
    color: Color.white,
    padding: '2px 5px',
    fontSize: '0.6rem',
    width: '100%',
    height: '100%',
  },
  appointmentVirtual: {
    backgroundColor: Color.virtual,
    color: Color.white,
    padding: '2px 5px',
    fontSize: '0.6rem',
    width: '100%',
    height: '100%',
  },
  appointmentNotAvailable: {
    backgroundColor: Color.notAvailable,
    color: Color.white,
    padding: '2px 5px',
    fontSize: '0.6rem',
    width: '100%',
    height: '100%',
  },
  sectionIcon: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    textAlign: 'right',
    paddingRight: 11,
  },
  icon: {
    fontSize: '0.75rem',
  },
  iconCanceled: {
    fontSize: '0.75rem',
    color: Color.iconCanceled,
  },
  titleForm: {
    color: Color.white,
    fontWeight: 800,
    backgroundColor: Color.grayDark,
    textTransform: 'uppercase',
  },
}))
