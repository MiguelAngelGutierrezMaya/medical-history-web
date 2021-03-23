import { Button, Card, CardContent, Grid, Typography } from '@material-ui/core'
import { useState } from 'react'
import { useHistory, useParams } from 'react-router'

// utils
import { Router } from '../../../routes/index.js'

// api
import { Security } from '../../../api/security.js'

// components
import { InputField } from '../../components/InputField/index.jsx'

// styles & assets
import { useStyles } from './style'
import logo from '../../../assets/images/logo.png'
import { PopupMessage } from '../../components/PopupMessage/index.jsx'

export const ResetPasswordConfirm = () => {
  const history = useHistory()
  const classes = useStyles()
  const { token } = useParams()
  const [form, setForm] = useState({ password: '', confirmPassword: '' })
  const [error, setError] = useState({ hasError: false, message: '' })
  const [isValid, setIsValid] = useState(0)
  const [popupMessage, setPopupMessage] = useState({ open: false, type: '', title: '', description: '', btnLabel: '' })

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const handleClose = () => {
    if (isValid === 1) history.push(Router.appLogin)
    else if (isValid === 2) history.push(Router.appResetPassword)
    else setPopupMessage({ ...popupMessage, open: false })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (form.password === form.confirmPassword) {
      Security.resetPasswordConfirm({ password: form.password, token }).then((response) => {
        if (response?.status === 200) {
          setIsValid(1)
          setPopupMessage({
            open: true,
            type: 'success',
            title: 'Éxito',
            description: 'Se ha cambiado la contraseña satisfactoriamente.',
            btnLabel: 'Aceptar',
          })
        } else {
          console.log(response)
          if (response?.data?.msg === 'Invalid token') {
            setIsValid(2)
            setPopupMessage({
              open: true,
              type: 'error',
              title: 'Error',
              description:
                'Caducó el tiempo límite para cambiar la contraseña. Intente recuperar la contraseña nuevamente.',
              btnLabel: 'Aceptar',
            })
          } else if (response?.data?.password) {
            setIsValid(0)
            setError({ hasError: true, message: response?.data?.password })
            setPopupMessage({
              open: true,
              type: 'error',
              title: 'Error',
              description: 'Hay errores en el campo de la contraseña por favor validar.',
              btnLabel: 'Aceptar',
            })
          } else {
            setIsValid(0)
            setPopupMessage({
              open: true,
              type: 'error',
              title: 'Error',
              description: response?.data?.msg,
              btnLabel: 'Aceptar',
            })
          }
        }
      })
    } else {
      setError({ hasError: true, message: 'Las contraseñas no coinciden' })
    }
  }

  return (
    <Grid className={classes.root} container direction="row" justify="center" alignItems="center">
      <Card className={classes.container} elevation={7}>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <img className={classes.logo} src={logo} alt="logo" />
            <Typography className={classes.title}>Recuperación de contraseña</Typography>
            <Grid item xs={12}>
              <InputField
                className={classes.margin}
                label="Contraseña"
                type="password"
                name="password"
                placeholder="Contraseña"
                error={error.hasError}
                helperText={error.message}
                inputProps={{
                  value: form.password,
                  onChange: handleChange,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <InputField
                className={classes.margin}
                label="Confirmar contraseña"
                type="password"
                name="confirmPassword"
                placeholder="Confirmar contraseña"
                inputProps={{
                  value: form.confirmPassword,
                  onChange: handleChange,
                }}
              />
            </Grid>
            <Button className={classes.btn} variant="contained" type="submit" disableElevation>
              Guardar
            </Button>
          </form>
          <PopupMessage
            open={popupMessage.open}
            type={popupMessage.type}
            title={popupMessage.title}
            description={popupMessage.description}
            btnLabel={popupMessage.btnLabel}
            onClose={handleClose}
            onConfirm={handleClose}
          />
        </CardContent>
      </Card>
    </Grid>
  )
}
