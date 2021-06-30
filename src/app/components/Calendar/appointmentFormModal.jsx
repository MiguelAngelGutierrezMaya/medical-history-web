import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Grow,
} from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import moment from 'moment'

import { InputTime } from '../InputTime'
import { InputDate } from '../InputDate'

import { useStyles } from './style'
import { Router } from '../../../routes'
import { InputField } from '../InputField'
import { Schedule } from '../../../api/schedules'
import { useDispatch } from 'react-redux'
import { setData } from '../../../reducers/calendarSlice'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Grow ref={ref} {...props} />
})

export const AppointmentFormModal = ({
  open,
  onClose,
  type,
  data,
  setPopupMessage,
}) => {
  const history = useHistory()
  const classes = useStyles()
  const isInitRef = useRef(true)
  // const attentionMethodRef = useRef('')
  const dispatch = useDispatch()
  const [form, setForm] = useState({
    title: data.title,
    date: moment(data.startDate),
    duration: data.duration,
    time: moment(data.startDate),
  })
  const [error, setError] = useState({
    title: { hasError: false, message: '' },
    duration: { hasError: false, message: '' },
    date: { hasError: false, message: '' },
    time: { hasError: false, message: '' },
  })

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

  // const getElementByXpath = (path) => {
  //   return document.evaluate(
  //     path,
  //     document,
  //     null,
  //     XPathResult.FIRST_ORDERED_NODE_TYPE,
  //     null,
  //   ).singleNodeValue
  // }

  const handleChange = (event) => {
    if (event.target.name === 'service') {
      setForm({
        ...form,
        [event.target.name]: event.target.value,
        attention_method: '',
      })
    } else if (event.target.name === 'date') {
      setForm({ ...form, [event.target.name]: event.target.value, time: '' })
    } else setForm({ ...form, [event.target.name]: event.target.value })
  }

  const validate = () => {
    let errors = 0
    if (form.title === '') {
      errors++
      setError({
        ...error,
        service: { hasError: true, message: 'Campo obligatorio' },
      })
    }
    if (form.duration === '') {
      errors++
      setError({
        ...error,
        attention_method: { hasError: true, message: 'Campo obligatorio' },
      })
    }
    if (form.date === '') {
      errors++
      setError({
        ...error,
        date: { hasError: true, message: 'Campo obligatorio' },
      })
    }
    if (form.time === '') {
      errors++
      setError({
        ...error,
        time: { hasError: true, message: 'Campo obligatorio' },
      })
    }
    if (errors > 0) return false

    setError({
      title: { hasError: false, message: '' },
      duration: { hasError: false, message: '' },
      date: { hasError: false, message: '' },
      time: { hasError: false, message: '' },
    })
    return true
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (validate()) {
      const json = {
        appointmentId: data.appointmentId,
        title: form.title,
        duration: form.duration,
        startDate: form.time.format('YYYY-MM-DD HH:mm'),
      }
      Schedule.reschedule(json).then((response) => {
        if (response?.status === 204) {
          // onClose()
          getAppointments(
            moment(data.startDate).day(0).format('YYYY-MM-DD'),
            moment(data.startDate).day(6).format('YYYY-MM-DD'),
          )
          setPopupMessage({
            open: true,
            type: 'success',
            title: 'Exito',
            description: 'Se reprogramó la cita satisfactoriamente',
            btnLabel: 'Aceptar',
          })
        } else {
          setPopupMessage({
            open: true,
            type: 'error',
            title: 'Error',
            description: response.data?.msg,
            btnLabel: 'Aceptar',
          })
        }
      })
    }
  }

  useEffect(() => {
    if (isInitRef.current) {
      isInitRef.current = false
    }
  }, [isInitRef])

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle
          className={classes.titleForm}
          id="alert-dialog-slide-title"
          style={{ padding: '18px 24px' }}
        >
          {`${type === 'add' ? 'Agendar' : 'Reprogramar'} cita `}m&eacute;dica
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent style={{ minWidth: 500, padding: '16px 24px' }}>
            <Grid container spacing={4}>
              <Grid item md={6}>
                <InputField
                  className={classes.margin}
                  label="Titulo"
                  type="text"
                  name="title"
                  placeholder="Titulo"
                  inputProps={{
                    value: form.title,
                    onChange: handleChange,
                    disabled: true,
                  }}
                />
              </Grid>
              <Grid item md={6}>
                <InputField
                  className={classes.margin}
                  label="Duración"
                  type="text"
                  name="duration"
                  placeholder="Duración"
                  inputProps={{
                    value: form.duration,
                    onChange: handleChange,
                  }}
                />
              </Grid>
              <Grid item md={6} style={{ padding: '25px 16px' }}>
                <InputDate
                  error={error.date.hasError}
                  helperText={error.date.message}
                  label="Fecha"
                  placeholder="Ej: dd/mm/yyyy"
                  pickerFormat="DD/MM/YYYY"
                  inputFormat="L"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  openTo="date"
                  disa
                />
              </Grid>
              <Grid item md={6}>
                <InputTime
                  error={error.time.hasError}
                  helperText={error.time.message}
                  label="Hora"
                  placeholder="Ej: hh:mm a"
                  pickerFormat="hh:mm a"
                  inputFormat="hh:mm a"
                  name="time"
                  value={form.time}
                  onChange={handleChange}
                  openTo="hours"
                  views={['hours', 'minutes']}
                  ampm={true}
                  openVale={form.date}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions style={{ padding: 16 }}>
            <Button onClick={onClose} color="primary">
              Cancelar
            </Button>
            <Button
              color="primary"
              variant="contained"
              type="submit"
              disableElevation
            >
              Guardar
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  )
}
