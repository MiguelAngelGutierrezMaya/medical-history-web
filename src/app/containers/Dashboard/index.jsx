import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { useStyles } from './style'
import { ThemeProvider } from '@material-ui/core'
import { Sidebar } from '../../components/Sidebar'
import { theme } from '../../components/Global/style'
import { Header } from '../../components/Header'

export const Dashboard = ({ children }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Sidebar />
        <main className={classes.content}>
          {children}
        </main>
      </ThemeProvider>
    </div>
  )
}
