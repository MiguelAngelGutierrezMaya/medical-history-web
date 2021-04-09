import { Button, Card, CardContent, Grid, Link, Typography } from '@material-ui/core'
import { forwardRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link as RouterLink, useHistory } from 'react-router-dom'

// utils
import { Auth } from '../../../utils/auth'
import { Router } from '../../../routes'

// api
import { Security } from '../../../api/security'

// reducers
import { authenticate } from '../../../reducers/userSlice'

// components
import { InputField } from '../../components/InputField'

// styles & assets
import { useStyles } from './style'
import logo from '../../../assets/images/logo.png'

const LinkBehavior = forwardRef((props, ref) => {
  return <RouterLink ref={ref} to={Router.appHome} {...props} />
})

export const Login = () => {
  const history = useHistory()
  const classes = useStyles()
  const [form, setForm] = useState({ email: '', password: '' })
  const [hasError, setHasError] = useState(false)
  const dispatch = useDispatch()

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    Security.login(form).then((response) => {
      if (response?.status === 200) {
        Auth.authenticate({ ...response.data })
        const user = Auth.getUser()
        dispatch(authenticate(user))
        history.push(Router.appIndexCardHolder)
      } else {
        setHasError(true)
      }
    })
  }

  return (
    <Grid className={classes.root} container direction="row" justify="center" alignItems="center">
      <Card className={classes.container} elevation={7}>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <img className={classes.logo} src={logo} alt="logo" />
            <Typography className={classes.title}>Inicio de sesión</Typography>
            {hasError ? (
              <div className={classes.errorContainer}>
                <Typography className={classes.errorMessage}>
                  El usuario o la contraseña no coinciden. Verifique e intente nuevamente.
                </Typography>
              </div>
            ) : null}
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
            <Grid item xs={12}>
              <InputField
                className={classes.margin}
                label="Contraseña"
                type="password"
                name="password"
                placeholder="Contraseña"
                inputProps={{
                  value: form.password,
                  onChange: handleChange,
                }}
              />
            </Grid>
            <Button className={classes.btn} variant="contained" type="submit" disableElevation>
              Iniciar Sesión
            </Button>
          </form>
          <Link className={classes.link} component={LinkBehavior} to={Router.appResetPassword}>
            ¿Olvidaste la contraseña?
          </Link>
        </CardContent>
      </Card>
    </Grid>
  )
}
