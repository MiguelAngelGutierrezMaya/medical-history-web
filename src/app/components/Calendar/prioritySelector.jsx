import { FormControl, MenuItem, Select } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import { styles, usePrioritySelectorItemStyles } from './style'

const PrioritySelectorItem = ({ color, text: resourceTitle }) => {
  const text = resourceTitle || 'Todo'
  const shortText = resourceTitle ? text.substring(0, 1) : 'All'
  const classes = usePrioritySelectorItemStyles({ color })

  return (
    <div className={classes.prioritySelectorItem}>
      <span className={classes.bullet} />
      <span className={classes.priorityText}>{text}</span>
      <span className={classes.priorityShortText}>{shortText}</span>
    </div>
  )
}

export const PrioritySelector = withStyles(styles, {
  name: 'PrioritySelector',
})(({ classes, priorityChange, priority, priorities }) => {
  const currentPriority = priority > 0 ? priorities[priority - 1] : {}

  return (
    <FormControl className={classes.prioritySelector}>
      <Select
        disableUnderline
        value={priority}
        onChange={(e) => {
          priorityChange(e.target.value)
        }}
        renderValue={() => (
          <PrioritySelectorItem
            text={currentPriority.text}
            color={currentPriority.color}
          />
        )}
      >
        <MenuItem className={classes.menuItem} value={0}>
          <PrioritySelectorItem />
        </MenuItem>
        {priorities.map(({ id, color, text }) => (
          <MenuItem className={classes.menuItem} value={id} key={id.toString()}>
            <PrioritySelectorItem color={color} text={text} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
})
