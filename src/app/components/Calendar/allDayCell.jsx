import { AllDayPanel } from '@devexpress/dx-react-scheduler-material-ui'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'clsx'
import { groupingStyles } from './style'

export const AllDayCell = withStyles(groupingStyles, { name: 'AllDayCell' })(
  ({ groupingInfo, classes, ...restProps }) => {
    const groupId = groupingInfo[0].id
    return (
      <AllDayPanel.Cell
        className={classNames({
          [classes.cellLowPriority]: groupId === 1,
          [classes.cellMediumPriority]: groupId === 2,
          [classes.cellHighPriority]: groupId === 3,
        })}
        groupingInfo={groupingInfo}
        {...restProps}
      />
    )
  },
)
