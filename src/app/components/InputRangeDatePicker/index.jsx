import {
  CssBaseline,
  withStyles,
  IconButton,
  ThemeProvider,
} from '@material-ui/core'

import clsx from 'clsx'
import format from 'date-fns/format'
import isValid from 'date-fns/isValid'
import isSameDay from 'date-fns/isSameDay'
import endOfWeek from 'date-fns/endOfWeek'
import React, { useState } from 'react'
import startOfWeek from 'date-fns/startOfWeek'
import isWithinInterval from 'date-fns/isWithinInterval'
import { DatePicker } from '@material-ui/pickers'
// this guy required only on the docs site to work with dynamic date library
import { makeJSDateObject } from './makeJSDateObject'

// styles & assets
import { customTheme, useStyles } from './style'

const InputRangeDatePicker = (props) => {
  const { value, onChange } = props

  const [state, setState] = useState({
    selectedDate: value || new Date(),
  })

  const handleWeekChange = (date) => {
    setState({ selectedDate: startOfWeek(makeJSDateObject(date)) })
    onChange(makeJSDateObject(date))
  }

  const formatWeekSelectLabel = (date, invalidLabel) => {
    let dateClone = makeJSDateObject(date)

    return dateClone && isValid(dateClone)
      ? `${format(startOfWeek(dateClone), 'dd')} - ${format(
          endOfWeek(dateClone),
          'dd LLLL yyyy',
        )}`
      : invalidLabel
  }

  const renderWrappedWeekDay = (date, selectedDate, dayInCurrentMonth) => {
    const { classes } = props
    let dateClone = makeJSDateObject(date)
    let selectedDateClone = makeJSDateObject(selectedDate)

    const start = startOfWeek(selectedDateClone)
    const end = endOfWeek(selectedDateClone)

    const dayIsBetween = isWithinInterval(dateClone, { start, end })
    const isFirstDay = isSameDay(dateClone, start)
    const isLastDay = isSameDay(dateClone, end)

    const wrapperClassName = clsx({
      [classes.highlight]: dayIsBetween,
      [classes.firstHighlight]: isFirstDay,
      [classes.endHighlight]: isLastDay,
    })

    const dayClassName = clsx(classes.day, {
      [classes.nonCurrentMonthDay]: !dayInCurrentMonth,
      [classes.highlightNonCurrentMonthDay]: !dayInCurrentMonth && dayIsBetween,
    })

    return (
      <div className={wrapperClassName}>
        <IconButton className={dayClassName}>
          <span> {format(dateClone, 'd')} </span>
        </IconButton>
      </div>
    )
  }

  const { selectedDate } = state

  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <DatePicker
        label="Fechas"
        fullWidth
        value={selectedDate}
        onChange={handleWeekChange}
        renderDay={renderWrappedWeekDay}
        labelFunc={formatWeekSelectLabel}
      />
    </ThemeProvider>
  )
}

export default withStyles(useStyles)(InputRangeDatePicker)
