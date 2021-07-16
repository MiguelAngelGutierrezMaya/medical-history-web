import { Backdrop, Button, Fade, Grid, Modal, SvgIcon, Typography } from '@material-ui/core'

// styles & assets
import { ReactComponent as CloseIcon } from '../../../assets/images/close.svg'
import { ReactComponent as SuccessIcon } from '../../../assets/images/success.svg'
import { ReactComponent as WarningIcon } from '../../../assets/images/warning.svg'
import { ReactComponent as InfoIcon } from '../../../assets/images/info.svg'
import { useStyles } from './style'

export const PopupMessage = ({ open, type, onClose, onConfirm, title, description, btnLabel, customContent }) => {
  const classes = useStyles()

  const getIcon = (type) => {
    if (type === 'error')
      return <SvgIcon className={classes.errorIcon} component={CloseIcon} viewBox="0 0 365.696 365.696" />
    if (type === 'warning')
      return <SvgIcon className={classes.warningIcon} component={WarningIcon} viewBox="0 0 510.045 510.045" />
    if (type === 'info') return <SvgIcon className={classes.infoIcon} component={InfoIcon} viewBox="0 0 488.9 488.9" />
    if (type === 'success')
      return <SvgIcon className={classes.successIcon} component={SuccessIcon} viewBox="0 -46 417.81333 417" />
    return null
  }

  const getTitle = (type) => {
    if (type === 'error') return classes.errorTitle
    if (type === 'warning') return classes.warningTitle
    if (type === 'info') return classes.infoTitle
    if (type === 'success') return classes.successTitle
    return null
  }

  const getButtonConfirm = (type) => {
    if (type === 'error') return classes.btnError
    if (type === 'warning') return classes.btnWarning
    if (type === 'info') return classes.btnInfo
    if (type === 'success') return classes.btnSuccess
    return null
  }

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        {
          customContent
            ? customContent
            : (
              <>
                <div className={classes.paper}>
                  <Grid container direction="row" justify="center" alignItems="center">
                    <div className={classes.iconContainer}>
                      <div className={classes.iconBackground}>{getIcon(type)}</div>
                      <Button className={classes.btnClose} onClick={onClose}>
                        <SvgIcon className={classes.iconClose} component={CloseIcon} viewBox="0 0 365.696 365.696" />
                      </Button>
                    </div>
                    <div className={classes.content}>
                      <Typography className={getTitle(type)} component="div">
                        {title}
                      </Typography>
                      <Typography className={classes.description} component="div">
                        {description}
                      </Typography>
                      <Button
                        className={getButtonConfirm(type)}
                        variant="contained"
                        type="submit"
                        disableElevation
                        onClick={onConfirm}
                      >
                        {btnLabel}
                      </Button>
                    </div>
                  </Grid>
                </div>
              </>
            )
        }
      </Fade>
    </Modal>
  )
}
