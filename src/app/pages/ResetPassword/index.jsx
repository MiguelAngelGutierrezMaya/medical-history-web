import { Button, Card, CardContent, Grid, Typography } from '@material-ui/core'
import { useState } from 'react'
import { useHistory } from 'react-router'

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

export const ResetPassword = () => {
  const history = useHistory()
  const classes = useStyles()
  const [form, setForm] = useState({ email: '' })
  const [isValid, setIsValid] = useState(false)
  const [popupMessage, setPopupMessage] = useState({ open: false, type: '', title: '', description: '', btnLabel: '' })

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const handleClose = () => {
    if (isValid) {
      history.push(Router.appLogin)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    Security.resetPassword(form).then((response) => {
      if (response?.status === 200) {
        setIsValid(true)
        setPopupMessage({
          open: true,
          type: 'success',
          title: 'Éxito',
          description: 'Se ha enviado un correo con el link para realizar la recuperación de la contraseña.',
          btnLabel: 'Aceptar',
        })
      } else {
        setPopupMessage({
          open: true,
          type: 'error',
          title: 'Error',
          description: 'Correo no válido.',
          btnLabel: 'Aceptar',
        })
      }
    })
  }

  return (
    <Grid className={classes.root} container direction="row" justify="center" alignItems="center">
      <Card className={classes.container} elevation={7}>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <img className={classes.logo} src={logo} alt="logo" />
            <Typography className={classes.title}>Recuperación de contraseña</Typography>
            <div className={classes.errorContainer}>
              <Typography className={classes.errorMessage}>
                Al presionar "ENVIAR" se le enviará un correo con un link para restablecer la contraseña.
              </Typography>
            </div>
            <Grid item xs={12}>
              <InputField
                label="Correo electrónico"
                type="email"
                name="email"
                placeholder="Ej: abc@gmail.com"
                inputProps={{
                  value: form.email,
                  onChange: handleChange,
                }}
              />
            </Grid>
            <Button className={classes.btn} variant="contained" type="submit" disableElevation>
              Enviar
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
