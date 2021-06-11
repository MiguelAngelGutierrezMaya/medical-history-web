import {
  Button,
  CircularProgress,
  Grid,
  SvgIcon,
  Typography,
} from '@material-ui/core'
import { AccessTime, Event, EventBusy } from '@material-ui/icons'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
  closeLockTooltip,
  openLockTooltip,
  setData,
  selectCalendar,
} from '../../../reducers/calendarSlice'
import { AppointmentFormModal } from './appointmentFormModal'
import classNames from 'clsx'
import moment from 'moment'

import { useTooltipContentStyles } from './style'
// import DomiciliarioIcon from '../../../assets/images/icon-domiciliario.png'
// import PresencialIcon from '../../../assets/images/icon-presencial.png'
// import VirtualIcon from '../../../assets/images/icon-virtual.png'
import { ReactComponent as UserIcon } from '../../../assets/images/user.svg'
import { Schedule } from '../../../api/schedules'
import { Router } from '../../../routes'
import { PopupMessage } from '../PopupMessage'

const getIcon = (classes, attentionMethod) => {
  if (attentionMethod === 1){}
    // return (
    //   <img className={classes.img} src={PresencialIcon} alt="presencial icon" />
    // )
  else if (attentionMethod === 2){}
    // return (
    //   <img
    //     className={classes.img}
    //     src={DomiciliarioIcon}
    //     alt="domiciliario icon"
    //   />
    // )
  // return <img className={classes.img} src={VirtualIcon} alt="virtual icon" />
}

const getButton1 = ({ classes, hasLoading, loading, text, onClick }) => {
  if (hasLoading)
    return (
      <div className={classes.wrapper}>
        {loading && <CircularProgress size={24} className={classes.progress} />}
        <Button
          variant="contained"
          disableElevation
          className={classes.btnReschedule}
          disabled={loading}
          onClick={onClick}
          style={{ marginLeft: -24 }}
        >
          {text}
        </Button>
      </div>
    )
  return (
    <Button
      className={classes.btnReschedule}
      disableElevation
      variant="contained"
      onClick={onClick}
    >
      {text}
    </Button>
  )
}

const getButton2 = ({ classes, hasLoading, loading, text, onClick, style }) => {
  if (hasLoading)
    return (
      <div className={classes.wrapper}>
        <Button
          variant="contained"
          disableElevation
          className={classes.btnCancelAppointment}
          disabled={loading}
          onClick={onClick}
          style={style || { marginRight: -24 }}
        >
          {text}
        </Button>
        {loading && (
          <CircularProgress
            size={24}
            className={classes.progress}
            style={{ left: -62 }}
          />
        )}
      </div>
    )
  return (
    <Button
      className={classes.btnCancelAppointment}
      disableElevation
      variant="contained"
      onClick={onClick}
    >
      {text}
    </Button>
  )
}

const eventOptions = ({
  classes,
  option1,
  option2,
  onClick1,
  onClick2,
  hasOption1,
  hasOption2,
  hasLoading1,
  hasLoading2,
  loading1,
  loading2,
  style,
}) => {
  return (
    <>
      {hasOption1
        ? getButton1({
            classes,
            hasLoading: hasLoading1,
            text: option1,
            onClick: onClick1,
            loading: loading1,
          })
        : null}
      {hasOption2
        ? getButton2({
            classes,
            hasLoading: hasLoading2,
            text: option2,
            onClick: onClick2,
            loading: loading2,
            style,
          })
        : null}
    </>
  )
}

const getElementByXpath = (path) => {
  return document.evaluate(
    path,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null,
  ).singleNodeValue
}

const appointmentInfo = ({
  classes,
  appointmentData,
  resource,
  formatDate,
  dispatch,
  changeView,
  open,
  setOpen,
  popupMessage,
  setPopupMessage,
}) => {
  const handleReschedule = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setPopupMessage({ ...popupMessage, open: false })
    getElementByXpath('/html/body/div[3]/div[3]/div[1]/div/button').click()
    setOpen(false)
  }

  const handleCancel = () => {
    dispatch(openLockTooltip())
    changeView(1)
  }

  const handleConfirm = () => {
    getElementByXpath('/html/body/div[3]/div[3]/div[1]/div/button')?.click()
    getElementByXpath('/html/body/div[4]/div[3]/div[1]/div/button')?.click()
    changeView(0)
  }

  if (appointmentData.attentionMethod === 4) {
    return appointmentCanceled({
      classes,
      resource,
      changeView,
      dispatch,
      title: appointmentData.title,
      message:
        'Cambiar la disponibilidad de la agenda para agregar citas en este espacio.',
      btnLabel: 'Aceptar',
    })
  }

  return (
    <div className={classes.content}>
      <Grid
        container
        alignItems="flex-start"
        className={classes.titleContainer}
      >
        <Grid item xs={2} className={classNames(classes.textCenter)}>
          {getIcon(classes, appointmentData.attentionMethod)}
        </Grid>
        <Grid item xs={10}>
          <div>
            <div className={classNames(classes.title, classes.dateAndTitle)}>
              {appointmentData.title}
            </div>
            <div className={classNames(classes.text, classes.dateAndTitle)}>
              <Typography className={classes.session}>Sesiones:</Typography>
              <Typography className={classes.numSessions}>1 de 3</Typography>
            </div>
          </div>
        </Grid>
      </Grid>
      <Grid container alignItems="center" className={classes.contentContainer}>
        <Grid item xs={2} className={classes.textCenter}>
          <SvgIcon
            className={classes.icon}
            component={UserIcon}
            viewBox="0 0 512 512"
          />
        </Grid>
        <Grid item xs={10}>
          <div className={classes.text}>{appointmentData.patient}</div>
        </Grid>
        <Grid item xs={2} className={classes.textCenter}>
          <Event className={classes.icon} />
        </Grid>
        <Grid item xs={10}>
          <div className={classes.text}>
            {moment(appointmentData.startDate).format('dddd, DD [de] YYYY')}
          </div>
        </Grid>
        <Grid item xs={2} className={classes.textCenter}>
          <AccessTime className={classes.icon} />
        </Grid>
        <Grid item xs={10}>
          <div className={classes.text}>
            {`${formatDate(appointmentData.startDate, {
              hour: 'numeric',
              minute: 'numeric',
            })}
              - ${formatDate(appointmentData.endDate, {
                hour: 'numeric',
                minute: 'numeric',
              })}`}
          </div>
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="center"
        key={`${resource.fieldName}_${resource.id}`}
      >
        {appointmentData.status === 'CANCELED'
          ? eventOptions({
              classes,
              option1: 'Aceptar',
              onClick1: handleConfirm,
              hasOption1: true,
              hasOption2: false,
            })
          : eventOptions({
              classes,
              option1: 'Reprogramar',
              option2: 'Cancelar cita',
              onClick1: handleReschedule,
              onClick2: handleCancel,
              hasOption1: true,
              hasOption2: true,
            })}
      </Grid>
      <AppointmentFormModal
        open={open}
        data={appointmentData}
        setPopupMessage={setPopupMessage}
        onClose={() => {
          getElementByXpath(
            '/html/body/div[3]/div[3]/div[1]/div/button',
          ).click()
          setOpen(false)
        }}
      />
      <PopupMessage
        open={popupMessage.open}
        type={popupMessage.type}
        title={popupMessage.title}
        description={popupMessage.description}
        btnLabel={popupMessage.btnLabel}
        onClose={handleClose}
        onConfirm={handleClose}
      />
    </div>
  )
}

const appointmentCancel = ({
  classes,
  appointmentData,
  resource,
  dispatch,
  changeView,
  history,
  loading2,
  setLoading2,
  data,
}) => {
  getElementByXpath(
    '/html/body/div[3]/div[3]/div[1]/div/button',
  ).addEventListener('click', function () {
    dispatch(closeLockTooltip())
    this.click()
    changeView(0)
  })

  const handleConfirm = () => {
    setLoading2(true)
    Schedule.cancelAppointment({
      pk: appointmentData.appointmentId,
      data: { status: 'CANCELED' },
    }).then((response) => {
      if (response?.status === 204) {
        let list = []
        setLoading2(false)
        data.forEach((item) => {
          if (item.appointmentId === appointmentData.appointmentId) {
            list[list.length] = { ...item, status: 'CANCELED' }
          } else {
            list[list.length] = { ...item }
          }
        })
        dispatch(closeLockTooltip())
        changeView(2)
        dispatch(setData(list))
      } else if (response?.status === 401) {
        setLoading2(false)
        history.push(Router.appLogin)
      } else {
        setLoading2(false)
      }
    })
  }

  const handleClose = () => {
    dispatch(closeLockTooltip())
    getElementByXpath('/html/body/div[3]/div[3]/div[1]/div/button').click()
    changeView(0)
  }

  return (
    <div className={classes.content}>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.titleContainer}
      >
        <EventBusy className={classes.cancelIcon} />
        <div className={classNames(classes.title, classes.titleCancel)}>
          Cancelar cita
        </div>
        <div className={classNames(classes.text, classes.dateAndTitle)}>
          <Typography className={classes.session}>
            ¿Está seguro que desea cancelar la cita?
          </Typography>
        </div>
      </Grid>
      <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="center"
        key={`${resource?.fieldName}_${resource?.id}`}
      >
        {eventOptions({
          classes,
          option1: 'Regresar',
          option2: 'Confirmar',
          onClick1: handleClose,
          onClick2: handleConfirm,
          hasOption1: true,
          hasOption2: true,
          loading2,
          hasLoading2: true,
          style: { marginRight: 0 },
        })}
      </Grid>
    </div>
  )
}

const appointmentCanceled = ({
  classes,
  resource,
  changeView,
  dispatch,
  title,
  message,
  btnLabel,
}) => {
  getElementByXpath(
    '/html/body/div[3]/div[3]/div[1]/div/button',
  )?.addEventListener('click', function () {
    dispatch(closeLockTooltip())
    changeView(2)
  })

  const handleConfirm = () => {
    getElementByXpath('/html/body/div[3]/div[3]/div[1]/div/button')?.click()
    getElementByXpath('/html/body/div[4]/div[3]/div[1]/div/button')?.click()
    changeView(0)
  }

  return (
    <div className={classes.content}>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.titleContainer}
      >
        <EventBusy className={classes.canceledIcon} />
        <div className={classNames(classes.title, classes.titleCancel)}>
          {title}
        </div>
        <div className={classNames(classes.text, classes.dateAndTitle)}>
          <Typography className={classes.session}>{message}</Typography>
        </div>
      </Grid>
      <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="center"
        key={`${resource?.fieldName}_${resource?.id}`}
      >
        {eventOptions({
          classes,
          option1: 'Confirmar',
          onClick1: handleConfirm,
          hasOption1: true,
        })}
      </Grid>
    </div>
  )
}

export const TooltipContent = ({
  appointmentData,
  formatDate,
  appointmentResources,
}) => {
  const history = useHistory()
  const calendar = useSelector(selectCalendar)
  const resource = appointmentResources[0]
  const classes = useTooltipContentStyles({ color: resource?.color })
  const [state, setState] = useState(0)
  const [open, setOpen] = useState(false)
  const [loading2, setLoading2] = useState(false)
  const dispatch = useDispatch()
  const [popupMessage, setPopupMessage] = useState({
    open: false,
    type: '',
    title: '',
    description: '',
    btnLabel: '',
  })

  const changeView = (view) => setState(view)

  if (state === 0) {
    return appointmentInfo({
      classes,
      appointmentData,
      resource,
      formatDate,
      dispatch,
      changeView,
      hasLoading1: true,
      loading1: true,
      open,
      setOpen,
      popupMessage,
      setPopupMessage,
    })
  } else if (state === 1) {
    return appointmentCancel({
      classes,
      history,
      appointmentData,
      resource,
      formatDate,
      dispatch,
      changeView,
      loading2,
      setLoading2,
      data: calendar.data,
    })
  }

  return appointmentCanceled({
    classes,
    resource,
    changeView,
    dispatch,
    title: 'Cita Cancelada',
    message: 'Tu cita fue cancelada con éxito',
    btnLabel: 'Confirmar',
  })
}
