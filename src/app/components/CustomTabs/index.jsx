import { useState } from 'react'

// styles & assets
import { StyledTab, StyledTabs, useStyles } from './style'

export const CustomTabs = ({ titles, contents, variant = 'fullWidth' }) => {
  const classes = useStyles()
  const [index, setIndex] = useState(0)

  const handleChange = (_, newValue) => {
    setIndex(newValue)
  }

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <StyledTabs
          value={index}
          onChange={handleChange}
          variant={variant}
          scrollButtons="auto"
          aria-label="styled tabs example"
        >
          {titles?.map((item, i) => (
            <StyledTab key={i} wrapped label={item} />
          ))}
        </StyledTabs>
        <div className={classes.padding}>{index < contents?.length ? contents[index] : null}</div>
      </div>
    </div>
  )
}
