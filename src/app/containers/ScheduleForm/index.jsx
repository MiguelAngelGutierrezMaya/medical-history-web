import {
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  IconButton,
  Typography,
} from '@material-ui/core'
import { AddCircle, RemoveCircleOutline } from '@material-ui/icons'
import { useCallback, useEffect, useRef, useState } from 'react'
import moment from 'moment'

import { InputTime } from '../../components/InputTime'
import InputRangeDatePicker from '../../components/InputRangeDatePicker'
import { PopupMessage } from '../../components/PopupMessage'

import { useStyles } from './style'
import { Schedule } from '../../../api/schedules'
import { useHistory } from 'react-router-dom'
import { Router } from '../../../routes'
import { useDispatch, useSelector } from 'react-redux'
import { selectCalendar, setData } from '../../../reducers/calendarSlice'
import { InputField } from '../../components/InputField'

export const ScheduleForm = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const calendar = useSelector(selectCalendar)
  const classes = useStyles()
  const isInitRef = useRef(true)
  const [duration, setDuration] = useState(30)
  const [popupMessage, setPopupMessage] = useState({
    open: false,
    type: '',
    title: '',
    description: '',
    btnLabel: '',
  })
  const [form, setForm] = useState({
    duration: 30,
    monday: [
      {
        startDate: null,
        endDate: null,
        hasError1: false,
        message1: '',
        hasError2: false,
        message2: '',
      },
    ],
    tuesday: [
      {
        startDate: null,
        endDate: null,
        hasError1: false,
        message1: '',
        hasError2: false,
        message2: '',
      },
    ],
    wednesday: [
      {
        startDate: null,
        endDate: null,
        hasError1: false,
        message1: '',
        hasError2: false,
        message2: '',
      },
    ],
    thursday: [
      {
        startDate: null,
        endDate: null,
        hasError1: false,
        message1: '',
        hasError2: false,
        message2: '',
      },
    ],
    friday: [
      {
        startDate: null,
        endDate: null,
        hasError1: false,
        message1: '',
        hasError2: false,
        message2: '',
      },
    ],
    saturday: [
      {
        startDate: null,
        endDate: null,
        hasError1: false,
        message1: '',
        hasError2: false,
        message2: '',
      },
    ],
    sunday: [
      {
        startDate: null,
        endDate: null,
        hasError1: false,
        message1: '',
        hasError2: false,
        message2: '',
      },
    ],
  })

  const getData = useCallback(() => {
    Schedule.availabilities().then((response) => {
      if (response?.status === 200) {
        let data = {}
        response.data.forEach((item) => {
          const key = item.weekday.toLowerCase()
          if (!item.can_work && item.all_day) {
            data = {
              ...data,
              [key]: [
                {
                  id: item.id,
                  startDate: null,
                  endDate: null,
                  hasError1: false,
                  message1: '',
                  hasError2: false,
                  message2: '',
                },
              ],
            }
          } else {
            if (data[key] !== undefined) {
              const aux = moment(item.start_date)
              const aux2 = moment(item.end_date)
              data = {
                ...data,
                [key]: [
                  ...data[key],
                  {
                    id: item.id,
                    startDate: moment()
                      .set('date', moment().day(aux.day()).get('date'))
                      .set('hour', aux.get('hour'))
                      .set('minute', aux.get('minute'))
                      .set('second', aux.get('second')),
                    endDate: moment()
                      .set('date', moment().day(aux2.day()).get('date'))
                      .set('hour', aux2.get('hour'))
                      .set('minute', aux2.get('minute'))
                      .set('second', aux2.get('second')),
                    can_work: item.can_work,
                    hasError1: false,
                    message1: '',
                    hasError2: false,
                    message2: '',
                  },
                ],
              }
            } else {
              const aux = moment(item.start_date)
              const aux2 = moment(item.end_date)
              data = {
                ...data,
                [key]: [
                  {
                    id: item.id,
                    startDate: moment()
                      .set('date', moment().day(aux.day()).get('date'))
                      .set('hour', aux.get('hour'))
                      .set('minute', aux.get('minute'))
                      .set('second', aux.get('second')),
                    endDate: moment()
                      .set('date', moment().day(aux2.day()).get('date'))
                      .set('hour', aux2.get('hour'))
                      .set('minute', aux2.get('minute'))
                      .set('second', aux2.get('second')),
                    can_work: item.can_work,
                    hasError1: false,
                    message1: '',
                    hasError2: false,
                    message2: '',
                  },
                ],
              }
            }
          }
        })
        if (response.data.length > 0) setForm({ ...data })
      }
    })
  }, [])

  const handleChange = (event, day, position) => {
    const aux = form
    if (aux[day].length === 1 || position === 0) {
      if (event.target.name === 'startDate') {
        if (
          event.target.value < aux[day][position].endDate ||
          aux[day][position].endDate === null
        ) {
          aux[day][position] = {
            ...aux[day][position],
            [event.target.name]: event.target.value,
            hasError1: false,
            message1: '',
            hasError2: false,
            message2: '',
          }
        } else {
          aux[day][position] = {
            ...aux[day][position],
            hasError1: true,
            message1: 'La fecha inicial debe ser menor a la fecha final',
          }
        }
      } else {
        if (
          event.target.value > aux[day][position].startDate &&
          aux[day][position].startDate !== null
        ) {
          aux[day][position] = {
            ...aux[day][position],
            [event.target.name]: event.target.value,
            hasError1: false,
            message1: '',
            hasError2: false,
            message2: '',
          }
        } else {
          aux[day][position] = {
            ...aux[day][position],
            hasError2: true,
            message2: 'La fecha final debe ser mayor a la fecha inicial',
          }
        }
      }
    } else {
      if (event.target.name === 'startDate') {
        let index = 0
        for (let i = aux[day].length - 1; i > 0; i--) {
          index++
          if (aux[day][i].can_work) {
            break
          }
        }
        if (event.target.value > aux[day][aux[day].length - index].endDate) {
          aux[day][position] = {
            ...aux[day][position],
            [event.target.name]: event.target.value,
            hasError1: false,
            message1: '',
            hasError2: false,
            message2: '',
          }
        } else {
          aux[day][position] = {
            ...aux[day][position],
            hasError1: true,
            message1:
              'La fecha inicial debe ser mayor a la fecha final anterior',
          }
        }
      } else {
        if (
          event.target.value > aux[day][position].startDate &&
          aux[day][position].startDate !== null
        ) {
          aux[day][position] = {
            ...aux[day][position],
            [event.target.name]: event.target.value,
            hasError1: false,
            message1: '',
            hasError2: false,
            message2: '',
          }
        } else {
          aux[day][position] = {
            ...aux[day][position],
            hasError2: true,
            message2: 'La fecha final debe ser mayor a la fecha inicial',
          }
        }
      }
    }
    setForm({ ...aux })
  }

  const getAvailabilities = (dayWeek, day) => {
    const availabilities = []
    form[dayWeek].forEach((item) => {
      if (item.startDate == null) {
        availabilities[availabilities.length] = {
          id: item.id,
          start_date: moment()
            .day(day)
            .set('hour', 6)
            .set('minute', 0)
            .set('second', 0)
            .format('YYYY-MM-DD HH:mm:ss'),
          end_date: moment()
            .day(day)
            .set('hour', 23)
            .set('minute', 59)
            .set('second', 0)
            .format('YYYY-MM-DD HH:mm:ss'),
          can_work: false,
          all_day: true,
        }
      } else {
        availabilities[availabilities.length] = {
          id: item.id,
          start_date: item.startDate.format('YYYY-MM-DD HH:mm:ss'),
          end_date: item.endDate.format('YYYY-MM-DD HH:mm:ss'),
          can_work: true,
          all_day: false,
          action: item.action,
        }
      }
    })
    return availabilities
  }

  const getAppointments = useCallback(
    (startDate, endDate) => {
      Schedule.appointments(startDate, endDate).then((response) => {
        if (response?.status === 200) {
          dispatch(setData(response.data))
        } else if (response?.status === 401) {
          history.push(Router.appLogin)
        }
      })
    },
    [history, dispatch],
  )

  const handleSubmit = (event) => {
    event.preventDefault()
    let errors = 0
    const aux = form
    Object.keys(aux).forEach((key) => {
      for (let j = 0; j < aux[key].length; j++) {
        if (aux[key][j].hasError1 || aux[key][j].hasError2) {
          errors++
        } else if (
          aux[key][j].startDate === null ||
          aux[key][j].endDate === null
        ) {
          if (aux[key].length > 1) {
            errors++
            if (aux[key][j].startDate === null) {
              aux[key][j] = {
                ...aux[key][j],
                hasError1: true,
                message1: 'El campo de la fecha inicial es obligatorio',
              }
            }
            if (aux[key][j].endDate === null) {
              aux[key][j] = {
                ...aux[key][j],
                hasError2: true,
                message2: 'El campo de la fecha final es obligatorio',
              }
            }
            setForm({ ...aux })
          }
        }
      }
    })
    if (errors > 0) {
      setPopupMessage({
        open: true,
        type: 'error',
        title: 'Error',
        description: 'Hay campos que poseen errores, por favor revisarlos',
        btnLabel: 'Aceptar',
      })
    } else {
      let list = [].concat(getAvailabilities('sunday', 0))
      list = list.concat(getAvailabilities('monday', 1))
      list = list.concat(getAvailabilities('tuesday', 2))
      list = list.concat(getAvailabilities('wednesday', 3))
      list = list.concat(getAvailabilities('thursday', 4))
      list = list.concat(getAvailabilities('friday', 5))
      list = list.concat(getAvailabilities('saturday', 6))

      Schedule.addAvailabilities(list).then((response) => {
        if (response?.status === 204) {
          setPopupMessage({
            open: true,
            type: 'success',
            title: 'Exito',
            description: 'Se actualizó la disponibilidad satisfactoriamente',
            btnLabel: 'Aceptar',
          })
          getData()
          getAppointments(
            moment(calendar.currentDate || new Date())
              .day(0)
              .format('YYYY-MM-DD'),
            moment(calendar.currentDate || new Date())
              .day(6)
              .format('YYYY-MM-DD'),
          )
        } else if (response?.status === 401) {
          history.push(Router.appLogin)
        }
      })
    }
  }

  const handleClose = () => {
    setPopupMessage({ ...popupMessage, open: false })
  }

  const handleAddItem = (listName) => {
    const aux = form
    if (
      aux[listName][aux[listName].length - 1].startDate === null ||
      aux[listName][aux[listName].length - 1].endDate === null
    ) {
      if (aux[listName][aux[listName].length - 1].startDate === null) {
        aux[listName][aux[listName].length - 1] = {
          ...aux[listName][aux[listName].length - 1],
          hasError1: true,
          message1: 'El campo de la fecha inicial es obligatorio',
        }
      }
      if (aux[listName][aux[listName].length - 1].endDate === null) {
        aux[listName][aux[listName].length - 1] = {
          ...aux[listName][aux[listName].length - 1],
          hasError2: true,
          message2: 'El campo de la fecha final es obligatorio',
        }
      }
      setForm({ ...aux })
    } else {
      aux[listName][aux[listName].length - 1] = {
        ...aux[listName][aux[listName].length - 1],
        hasError1: false,
        message1: '',
        hasError2: false,
        message2: '',
      }
      setForm({
        ...aux,
        [listName]: [...aux[listName], { startDate: null, endDate: null }],
      })
    }
  }

  const handleRemove = (listName, position) => {
    const aux = form
    if (aux[listName][position].id !== undefined) {
      aux[listName][position].action = 'delete'
    } else {
      aux[listName].splice(position, 1)
    }
    setForm({ ...aux })
  }

  const item = (day, startDay, list, listName) => {
    return (
      <Grid item md={12}>
        <Grid item md={12}>
          <Typography className={classes.titleWeek}>{day}</Typography>
        </Grid>
        {list?.map((item, i) => {
          if (item?.action !== 'delete')
            return (
              <Grid container spacing={4} key={i}>
                <Grid
                  item
                  md={i > 0 ? 5 : 6}
                  style={{ padding: i > 0 ? '16px 8px' : '16px' }}
                >
                  <InputTime
                    error={item.hasError1}
                    helperText={item.message1}
                    label="Inicio"
                    placeholder="Ej: hh:mm a"
                    pickerFormat="hh:mm a"
                    inputFormat="hh:mm a"
                    name="startDate"
                    value={item.startDate}
                    onChange={(e) => handleChange(e, listName, i)}
                    openTo="hours"
                    views={['hours', 'minutes']}
                    ampm={true}
                    openVale={startDay}
                  />
                </Grid>
                <Grid item md={i > 0 ? 5 : 6}>
                  <InputTime
                    error={item.hasError2}
                    helperText={item.message2}
                    label="Final"
                    placeholder="Ej: hh:mm a"
                    pickerFormat="hh:mm a"
                    inputFormat="hh:mm a"
                    name="endDate"
                    value={item.endDate}
                    onChange={(e) => handleChange(e, listName, i)}
                    openTo="hours"
                    views={['hours', 'minutes']}
                    ampm={true}
                    openVale={startDay}
                  />
                </Grid>
                {i > 0 ? (
                  <Grid item md={2} style={{ padding: '0' }}>
                    <IconButton
                      className={classes.btnDelete}
                      onClick={() => handleRemove(listName, i)}
                    >
                      <RemoveCircleOutline />
                    </IconButton>
                  </Grid>
                ) : null}
              </Grid>
            )
          return null
        })}
        <Grid style={{ padding: '8px 0' }} item md={12}>
          <Button
            className={classes.addAvailability}
            onClick={() => handleAddItem(listName)}
          >
            <AddCircle className={classes.addAvailabilityIcon} />
            Adicionar nueva jornada
          </Button>
        </Grid>
        <Grid item md={12}>
          <Divider className={classes.separate} flexItem />
        </Grid>
      </Grid>
    )
  }

  const handleChangeInput = (event) => {
    if (!isNaN(parseInt(event.target.value))) {
      // setForm({ ...form, [event.target.name]: parseInt(event.target.value) })
      setDuration(event.target.value)
    }
  }

  useEffect(() => {
    if (isInitRef.current) {
      getData()
      isInitRef.current = false
    }
  }, [isInitRef, getData])

  return (
    <>
      <Card className={classes.root} elevation={4}>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container>
              <Grid container spacing={4}>
                <Grid
                  className={classes.rangeDate}
                  item
                  xs={12}
                  sm={12}
                  md={6}
                  lg={6}
                >
                  <InputRangeDatePicker />
                </Grid>
                <Grid
                  className={classes.rangeDate}
                  item
                  xs={12}
                  sm={12}
                  md={6}
                  lg={6}
                >
                  <InputField
                    // error={error.surname.hasError}
                    // helperText={error.surname.message}
                    // className={classes.customInput}
                    label="Duración"
                    type="text"
                    name="duration"
                    inputProps={{
                      value: duration,
                      onChange: handleChangeInput,
                    }}
                  />
                </Grid>
              </Grid>
              {item('Lunes', moment().day(1), form.monday, 'monday')}
              {item('Martes', moment().day(2), form.tuesday, 'tuesday')}
              {item('Miércoles', moment().day(3), form.wednesday, 'wednesday')}
              {item('Jueves', moment().day(4), form.thursday, 'thursday')}
              {item('Viernes', moment().day(5), form.friday, 'friday')}
              {item('Sábado', moment().day(6), form.saturday, 'saturday')}
              {item('Domingo', moment().day(0), form.sunday, 'sunday')}
            </Grid>
            <Button
              className={classes.btn}
              variant="contained"
              type="submit"
              disableElevation
            >
              Actualizar Agenda
            </Button>
          </form>
        </CardContent>
      </Card>
      <PopupMessage
        open={popupMessage.open}
        type={popupMessage.type}
        title={popupMessage.title}
        description={popupMessage.description}
        btnLabel={popupMessage.btnLabel}
        onClose={handleClose}
        onConfirm={handleClose}
      />
    </>
  )
}
