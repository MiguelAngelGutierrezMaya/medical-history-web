// Icons
import AddIcon from '@material-ui/icons/Add'

import { Fab } from '@material-ui/core'

// styles & assets
import { useStyles } from './style'

export const HeaderBasic = ({ type, onClick }) => {
  const classes = useStyles()

  const types = {
    'one': (
      <div className={classes.root}>
        <span className={classes.title}>HISTORIAS CLÍNICAS</span>
        <Fab className={classes.fab} aria-label="add" onClick={() => onClick()}>
          <AddIcon className={classes.icon} />
        </Fab>
      </div>
    ),
  }

  return types[type] || (<></>)
}
