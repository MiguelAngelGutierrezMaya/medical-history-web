// Components
import { Grid } from '@material-ui/core'
import { CardHC } from '../../components/CardHC'

// styles & assets
// import { useStyles } from './style'

export const CardHCContainer = ({ list, onClick }) => {
  // const classes = useStyles()
  return (
    <Grid
      container
      direction="row"
      alignItems="flex-start"
    >
      {
        list.map(el => (
          <CardHC data={el} onClick={() => onClick()}></CardHC>
        ))
      }
    </Grid>
  )
}
