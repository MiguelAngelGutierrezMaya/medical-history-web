import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import { Layout } from '../../containers/Layout'
import { selectedUser } from '../../../reducers/userSlice'
import { Router } from '../../../routes'

export const LayoutRoute = ({ children, hasAuthorization, ...rest }) => {
  const user = useSelector(selectedUser)

  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (user !== null) return <Redirect to={{ pathname: Router.appHome, state: { from: location } }} />
        return <Layout>{children}</Layout>
      }}
    />
  )
}
