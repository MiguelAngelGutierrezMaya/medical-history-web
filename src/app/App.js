import { BrowserRouter, Switch } from 'react-router-dom'
import moment from 'moment'
import MomentUtils from '@date-io/moment'
import 'moment/locale/es'

// pages
import { Login } from './pages/Login/index.jsx'
import { ResetPassword } from './pages/ResetPassword/index.jsx'
import { ResetPasswordConfirm } from './pages/ResetPasswordConfirm/index.jsx'

// routers
import { LayoutRoute } from './components/LayoutRoute/index.jsx'
import { DashboardRoute } from './components/DashboardRoute/index.jsx'
import { IndexCardHolder } from './pages/IndexCardHolder'

// routes
import { Router } from '../routes'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'

const App = () => {
  moment.locale('es')

  return (
    <BrowserRouter>
      <Switch>
        <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils} locale="es">
          <LayoutRoute path={Router.appLogin}>
            <Login />
          </LayoutRoute>
          <LayoutRoute path={Router.appResetPassword}>
            <ResetPassword />
          </LayoutRoute>
          <LayoutRoute path={Router.appResetPasswordConfirm}>
            <ResetPasswordConfirm />
          </LayoutRoute>
          <DashboardRoute hasAuthorization={true} path={Router.appIndexCardHolder}>
            <IndexCardHolder />
          </DashboardRoute>
        </MuiPickersUtilsProvider>
      </Switch>
    </BrowserRouter>
  )
}

export default App
