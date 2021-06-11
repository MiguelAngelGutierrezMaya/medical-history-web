import { GroupingPanel } from '@devexpress/dx-react-scheduler-material-ui'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'clsx'

import { groupingStyles } from './style'

export const GroupingPanelCell = withStyles(groupingStyles, {
  name: 'GroupingPanelCell',
})(({ group, classes, ...restProps }) => {
  const groupId = group.id

  return (
    <GroupingPanel.Cell
      className={classNames({
        [classes.headerCellLowPriority]: groupId === 1,
        [classes.headerCellMediumPriority]: groupId === 2,
        [classes.headerCellHighPriority]: groupId === 3,
      })}
      group={group}
      {...restProps}
    ></GroupingPanel.Cell>
  )
})
