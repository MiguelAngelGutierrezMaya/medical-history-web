import { useCallback, useEffect, useRef, useState } from 'react'
import {
  ViewState,
  GroupingState,
  IntegratedGrouping,
} from '@devexpress/dx-react-scheduler'
import {
  Scheduler,
  WeekView,
  DayView,
  Appointments,
  Toolbar,
  DateNavigator,
  ViewSwitcher,
  AllDayPanel,
  AppointmentTooltip,
  GroupingPanel,
  Resources,
} from '@devexpress/dx-react-scheduler-material-ui'
import { connectProps } from '@devexpress/dx-react-core'
import { ThemeProvider, withStyles } from '@material-ui/core/styles'
import { CssBaseline, Paper } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import moment from 'moment'

import { DayViewDayScaleCell, DayViewTimeTableCell } from './dayView'
import { WeekViewDayScaleCell, WeekViewTimeTableCell } from './weekView'
import { AllDayCell } from './allDayCell'
import { GroupingPanelCell } from './groupingPanelCell'
import { PrioritySelector } from './prioritySelector'
import { TooltipContent } from './tooltipContent'
import { AppointmentComponent } from './appointmentComponent'
import {
  selectCalendar,
  setCurrentDay,
  setData,
  toggleTooltip,
} from '../../../reducers/calendarSlice'
import { Router } from '../../../routes'

import { styles } from './style'
import { customTheme } from '../InputDate/style'
import { Schedule } from '../../../api/schedules'
import { Color } from '../../../assets/js/color'

const grouping = [{ resourceName: 'groupId' }]

const group = [{ id: 0, text: 'Citas programadas', color: Color.notAvailable }]

const priorities = [
  { id: 1, text: 'Presencial', color: Color.presential },
  { id: 2, text: 'Domiciliario', color: Color.domiciliary },
  { id: 3, text: 'Virtual', color: Color.virtual },
]

const filterTasks = (items, attentionMethod) =>
  items.filter(
    (item) => !attentionMethod || item.attentionMethod === attentionMethod,
  )

const FlexibleSpace = withStyles(styles, { name: 'FlexibleSpace' })(
  ({ classes, priority, priorityChange, ...restProps }) => (
    <Toolbar.FlexibleSpace {...restProps} className={classes.flexibleSpace}>
      <PrioritySelector
        priority={priority}
        priorityChange={priorityChange}
        priorities={priorities}
      />
    </Toolbar.FlexibleSpace>
  ),
)

export const Calendar = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const calendar = useSelector(selectCalendar)
  const isInitRef = useRef(true)
  const [state, setState] = useState({
    currentDate: new Date(),
    currentViewName: 'Semana',
    editingFormVisible: false,
    editingAppointment: undefined,
    currentPriority: 0,
    resources: [
      {
        fieldName: 'groupId',
        title: 'Appointments',
        instances: group,
      },
    ],
  })

  const getAppointments = useCallback(
    (startDate, endDate, currentDate) => {
      Schedule.appointments(startDate, endDate).then((response) => {
        if (response?.status === 200) {
          dispatch(setData(response.data))
          setState({ ...state, currentDate })
        } else if (response?.status === 401) {
          history.push(Router.appLogin)
        }
      })
    },
    [history, setState, state, dispatch],
  )

  const currentViewNameChange = (currentViewName) => {
    setState({ ...state, currentViewName })
  }

  const currentDateChange = (currentDate) => {
    setState({ ...state, currentDate })
    setCurrentDay(currentDate)
    const date = moment(currentDate)
    getAppointments(
      date.day(0).format('YYYY-MM-DD'),
      date.day(6).format('YYYY-MM-DD'),
      currentDate,
    )
  }

  const priorityChange = (value) => {
    setState({ ...state, currentPriority: value })
  }

  const flexibleSpace = connectProps(FlexibleSpace, () => {
    const { currentPriority } = state
    return {
      priority: currentPriority,
      priorityChange: priorityChange,
    }
  })

  useEffect(() => {
    flexibleSpace.update()
    if (isInitRef.current) {
      getAppointments(
        moment(new Date()).day(0).format('YYYY-MM-DD'),
        moment(new Date()).day(6).format('YYYY-MM-DD'),
      )
      isInitRef.current = false
    }
  }, [flexibleSpace, getAppointments])

  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <Paper>
        <Scheduler
          data={filterTasks(calendar.data, state.currentPriority)}
          locale="es"
          height={800}
        >
          <ViewState
            currentDate={state.currentDate}
            currentViewName={state.currentViewName}
            onCurrentViewNameChange={currentViewNameChange}
            onCurrentDateChange={currentDateChange}
          />
          <GroupingState grouping={grouping} />

          <DayView
            startDayHour={6}
            endDayHour={24}
            name="Día"
            timeTableCellComponent={DayViewTimeTableCell}
            dayScaleCellComponent={DayViewDayScaleCell}
            intervalCount={2}
          />
          <WeekView
            startDayHour={6}
            endDayHour={24}
            name="Semana"
            timeTableCellComponent={WeekViewTimeTableCell}
            dayScaleCellComponent={WeekViewDayScaleCell}
          />
          <AllDayPanel
            cellComponent={AllDayCell}
            messages={{ allDay: 'Todo el día' }}
          />

          <Appointments appointmentContentComponent={AppointmentComponent} />
          <Resources data={state.resources} />
          <IntegratedGrouping />

          <GroupingPanel cellComponent={GroupingPanelCell} />
          <Toolbar flexibleSpaceComponent={flexibleSpace} />
          <DateNavigator />
          <ViewSwitcher />
          <AppointmentTooltip
            contentComponent={TooltipContent}
            showCloseButton
            visible={calendar.openTooltip}
            onVisibilityChange={() => {
              if (!calendar.lockTooltip) dispatch(toggleTooltip())
            }}
          />
        </Scheduler>
      </Paper>
    </ThemeProvider>
  )
}
