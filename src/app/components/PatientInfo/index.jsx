// Components
import { Avatar, Card, CardContent, CardHeader, Divider, Fab, Grid, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core'

// Icons
import PersonIcon from '@material-ui/icons/Person'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import PhoneIcon from '@material-ui/icons/Phone';

// styles & assets
import { useStyles } from './style'

export const PatientInfo = ({ user, profile, countries, cities, departments }) => {
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar className={classes.avatar}>
            <PersonIcon className={classes.icon} />
          </Avatar>
        }
        className={classes.header}
        action={
          <div className={classes.actions}>
            <Fab aria-label="edit">
              <EditIcon className={classes.icon} />
            </Fab>
            <Fab aria-label="delete">
              <DeleteIcon className={classes.icon} />
            </Fab>
          </div>
        }
        title={`${profile.firstName} ${profile.secondName} ${profile.secondName} ${profile.secondSurname}`}
        subheader={`c.c. ${profile.nuip}`}
      />
      <CardContent>
        <Grid
          container
          direction="row"
          alignItems="flex-start"
          className={classes.content}
        >
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <List className={classes.root}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <MailOutlineIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="" secondary={user.email} />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <WhatsAppIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="" secondary={profile.cellphone} />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <PhoneIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="" secondary={profile.phoneNumber} />
              </ListItem>
            </List>
            <Divider />
            <List className={classes.root}>
              <ListItem>
                <ListItemText primary="Fecha de nacimiento" secondary={profile.birthday.format('LL')} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Edad" secondary={profile.birthday.fromNow(true)} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Género" secondary={profile.gender} />
              </ListItem>
              <ListItem>
                <ListItemText primary="País de residencia" secondary={countries.length > 0 ? (countries.find(el => el.key === profile.country)).text : ''} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Departamento de residencia" secondary={departments.length > 0 ? (departments.find(el => el.key === profile.department)).text : ''} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Ciudad de residencia" secondary={cities.length > 0 ? (cities.find(el => el.key === profile.city)).text : ''} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Dirección de residencia" secondary={profile.address} />
              </ListItem>
            </List>
            <Divider />
            <List className={classes.root}>
              <ListItem>
                <ListItemText primary="Ocupación habitual" secondary={profile.usualOccupation} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Regimen de seguridad social" secondary={profile.socialSecurityScheme} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Empresa" secondary={profile.eps} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Nivel" secondary={profile.epsLevel} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Número de afilicación" secondary={profile.affiliationNumber} />
              </ListItem>
            </List>
            <Divider />
            <List className={classes.root}>
              <ListItem>
                <ListItemText primary="Estado civil" secondary={profile.civilStatus} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Nivel educativo" secondary={profile.scholarship} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Grupo poblacional" secondary={profile.specialPopulation} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Condición de vulnerabilidad" secondary={''} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Orientación sexual" secondary={profile.sexualOrientation} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Discapacidad" secondary={profile.typeDegreeDisability} />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}
