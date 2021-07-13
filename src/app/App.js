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

// Providers
import { MuiPickersUtilsProvider } from '@material-ui/pickers'

// Pages
import { ClinicHistory } from './pages/ClinicHistory/index.jsx'
import { SearchMedicalHistoryConfig } from './pages/SearchMedicalHistoryConfig/index.jsx'
import { Schedule } from './pages/Schedule/index.jsx'
import { ClinicalHistory } from './pages/ClinicalHistory/index.jsx'
import { AssignAppointment } from './pages/AssignAppointment/index.jsx'

const App = () => {
  moment.locale('es')

  return (
    <BrowserRouter>
      <Switch>
        <MuiPickersUtilsProvider
          libInstance={moment}
          utils={MomentUtils}
          locale="es"
        >
          {/* Guest views */}
          <LayoutRoute path={Router.appLogin}>
            <Login />
          </LayoutRoute>
          <LayoutRoute path={Router.appResetPassword}>
            <ResetPassword />
          </LayoutRoute>
          <LayoutRoute path={Router.appResetPasswordConfirm}>
            <ResetPasswordConfirm />
          </LayoutRoute>

          {/* Login views */}
          <DashboardRoute
            hasAuthorization={true}
            path={Router.appIndexCardHolder}
          >
            <IndexCardHolder />
          </DashboardRoute>
          <DashboardRoute
            hasAuthorization={true}
            path={Router.appMedicalHistoriesConfig}
          >
            <ClinicHistory />
          </DashboardRoute>
          <DashboardRoute
            hasAuthorization={true}
            path={Router.appSearchMedicalHistoriesConfig}
          >
            <SearchMedicalHistoryConfig />
          </DashboardRoute>
          <DashboardRoute
            hasAuthorization={true}
            path={Router.appClinicalHistories}
          >
            <ClinicalHistory />
          </DashboardRoute>
          <DashboardRoute
            hasAuthorization={true}
            path={Router.appAssignAppointment}
          >
            <AssignAppointment />
          </DashboardRoute>
          <DashboardRoute
            hasAuthorization={true}
            path={Router.appSchedule}
          >
            <Schedule />
          </DashboardRoute>
          <DashboardRoute
            hasAuthorization={true}
            path={Router.appLogout}
          >
          </DashboardRoute>
        </MuiPickersUtilsProvider>
      </Switch>
    </BrowserRouter>
  )
}

export default App
