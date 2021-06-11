import { WeekView } from '@devexpress/dx-react-scheduler-material-ui'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'clsx'

import { groupingStyles } from './style'

export const WeekViewTimeTableCell = withStyles(groupingStyles, {
  name: 'WeekViewTimeTableCell',
})(({ groupingInfo, classes, ...restProps }) => {
  const groupId = groupingInfo[0].id
  return (
    <WeekView.TimeTableCell
      className={classNames({
        [classes.cellLowPriority]: groupId === 1,
        [classes.cellMediumPriority]: groupId === 2,
        [classes.cellHighPriority]: groupId === 3,
      })}
      groupingInfo={groupingInfo}
      {...restProps}
    />
  )
})

export const WeekViewDayScaleCell = withStyles(groupingStyles, {
  name: 'WeekViewDayScaleCell',
})(({ groupingInfo, classes, ...restProps }) => {
  const groupId = groupingInfo[0].id
  return (
    <WeekView.DayScaleCell
      className={classNames({
        [classes.headerCellLowPriority]: groupId === 1,
        [classes.headerCellMediumPriority]: groupId === 2,
        [classes.headerCellHighPriority]: groupId === 3,
      })}
      groupingInfo={groupingInfo}
      {...restProps}
    />
  )
})
