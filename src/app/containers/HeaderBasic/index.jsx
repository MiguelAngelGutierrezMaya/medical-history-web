// Icons
import AddIcon from '@material-ui/icons/Add'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import { Button, Fab } from '@material-ui/core'

// styles & assets
import { useStyles } from './style'

export const HeaderBasic = ({ subtitle, type, onClick, onReturn }) => {
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
    'two': (
      <div>
        <Button className={classes.button} startIcon={<ArrowBackIosIcon />} onClick={() => onReturn()}>REGRESAR</Button>
        <h3 className={classes.subtitle}>{subtitle}</h3>
      </div>
    )
  }

  return types[type] || (<></>)
}
