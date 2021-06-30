//Components
import { Button, Card, CardActions, CardContent, Grid, Typography } from '@material-ui/core'
// styles & assets
import { useStyles } from './style'

export const CardHC = ({ data, onClick }) => {
  const classes = useStyles()


  return (
    <Grid className={classes.spacing} item lg={4} md={6} sm={12} xs={12}>
      <Card className={classes.root}>
        <CardContent className={classes.content}>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            HISTORIA CLINICA
          </Typography>
          <Typography className={classes.body}>
            {data.text}    
          </Typography>
        </CardContent>
        <CardActions>
          <Button className={classes.button} size="small" onClick={() => onClick()}>Crear</Button>
        </CardActions>
      </Card>
    </Grid>
  )
}
