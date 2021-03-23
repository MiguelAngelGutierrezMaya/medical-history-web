import { BrowserRouter, Switch } from 'react-router-dom'
import { Login } from './pages/Login/index.jsx'
import { Router } from '../routes'
import { LayoutRoute } from './components/LayoutRoute/index.jsx'
import { ResetPassword } from './pages/ResetPassword/index.jsx'
import { ResetPasswordConfirm } from './pages/ResetPasswordConfirm/index.jsx'

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <LayoutRoute path={Router.appLogin}>
          <Login />
        </LayoutRoute>
        <LayoutRoute path={Router.appResetPassword}>
          <ResetPassword />
        </LayoutRoute>
        <LayoutRoute path={Router.appResetPasswordConfirm}>
          <ResetPasswordConfirm />
        </LayoutRoute>
      </Switch>
    </BrowserRouter>
  )
}

export default App
