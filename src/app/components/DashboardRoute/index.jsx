import { Redirect, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

// reducers
import { selectedUser, logout } from '../../../reducers/userSlice'

// components
import { Dashboard } from '../../containers/Dashboard'

// Routes
import { Router } from '../../../routes'

export const DashboardRoute = ({ children, hasAuthorization, ...rest }) => {
  const user = useSelector(selectedUser)
  const dispatch = useDispatch()

  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (rest.path === '/logout') return dispatch(logout())
        if (hasAuthorization) {
          if (user !== null) return <Dashboard>{children}</Dashboard>
          return <Redirect to={{ pathname: Router.appLogin, state: { from: location } }} />
        }
        return <Dashboard>{children}</Dashboard>
      }}
    />
  )
}
