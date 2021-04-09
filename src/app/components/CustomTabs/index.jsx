import { useState } from 'react'

// styles & assets
import { StyledTab, StyledTabs, useStyles } from './style'

// const AntTabs = withStyles({
//   root: {
//     borderBottom: '1px solid #e8e8e8',
//   },
//   indicator: {
//     backgroundColor: '#1890ff',
//   },
// })(Tabs)

// const AntTab = withStyles((theme) => ({
//   root: {
//     textTransform: 'none',
//     minWidth: 72,
//     fontWeight: theme.typography.fontWeightRegular,
//     marginRight: theme.spacing(4),
//     fontFamily: [
//       '-apple-system',
//       'BlinkMacSystemFont',
//       '"Segoe UI"',
//       'Roboto',
//       '"Helvetica Neue"',
//       'Arial',
//       'sans-serif',
//       '"Apple Color Emoji"',
//       '"Segoe UI Emoji"',
//       '"Segoe UI Symbol"',
//     ].join(','),
//     '&:hover': {
//       color: '#40a9ff',
//       opacity: 1,
//     },
//     '&$selected': {
//       color: '#1890ff',
//       fontWeight: theme.typography.fontWeightMedium,
//     },
//     '&:focus': {
//       color: '#40a9ff',
//     },
//   },
//   selected: {},
// }))((props) => <Tab disableRipple {...props} />)

export const CustomTabs = ({ titles, contents }) => {
  const classes = useStyles()
  const [index, setIndex] = useState(0)

  const handleChange = (_, newValue) => {
    setIndex(newValue)
  }

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <StyledTabs value={index} onChange={handleChange} variant="fullWidth" aria-label="styled tabs example">
          {titles?.map((item, i) => (
            <StyledTab key={i} wrapped label={item} />
          ))}
        </StyledTabs>
        <div className={classes.padding}>{index < contents?.length ? contents[index] : null}</div>
      </div>
    </div>
  )
}
