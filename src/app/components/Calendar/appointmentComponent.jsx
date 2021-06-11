// import { SvgIcon } from '@material-ui/core'
// import { ReactComponent as HospitalIcon } from '../../../assets/images/hospital.svg'
// import { ReactComponent as HomeIcon } from '../../../assets/images/home.svg'
// import { ReactComponent as LaptopIcon } from '../../../assets/images/laptop.svg'
import classNames from 'clsx'
import { useStyles } from './style'
import { Block } from '@material-ui/icons'
import moment from 'moment'

const getIcon = (classes, attentionMethod, status) => {
  if (attentionMethod === 1) {
    if (status === 'CANCELED')
      return (
        <>
          <Block className={classes.iconCanceled} style={{ marginRight: 3 }} />
          {/* <SvgIcon
            className={classes.iconCanceled}
            component={HospitalIcon}
            viewBox="0 0 512 512"
          /> */}
        </>
      )
    // return (
    //   <SvgIcon
    //     className={classes.icon}
    //     component={HospitalIcon}
    //     viewBox="0 0 512 512"
    //   />
    // )
  } else if (attentionMethod === 2) {
    if (status === 'CANCELED')
      return (
        <>
          <Block className={classes.iconCanceled} style={{ marginRight: 3 }} />
          {/* <SvgIcon
            className={classes.iconCanceled}
            component={HomeIcon}
            viewBox="0 0 512.001 512.001"
          /> */}
        </>
      )
    // return (
    //   <SvgIcon
    //     className={classes.icon}
    //     component={HomeIcon}
    //     viewBox="0 0 512.001 512.001"
    //   />
    // )
  } else if (attentionMethod === 3) {
    if (status === 'CANCELED')
      return (
        <>
          <Block className={classes.iconCanceled} style={{ marginRight: 3 }} />
          {/* <SvgIcon
            className={classes.iconCanceled}
            component={LaptopIcon}
            viewBox="0 0 503.588 503.588"
          /> */}
        </>
      )
    // return (
    //   <SvgIcon
    //     className={classes.icon}
    //     component={LaptopIcon}
    //     viewBox="0 0 503.588 503.588"
    //   />
    // )
  }
  return null
}

const getSubtitle = (data) => {
  if (data.attentionMethod === 4) {
    if (data.all_day) {
      return <div>Todo el día</div>
    }
    return (
      <div>
        {moment(data.startDate).format('h:mma')} -{' '}
        {moment(data.endDate).format('h:mma')}
      </div>
    )
  }
  return null
}

export const AppointmentComponent = (model) => {
  const classes = useStyles()
  const { data } = model
  return (
    <div
      className={classNames({
        [classes.appointmentPresential]: data.attentionMethod === 1,
        [classes.appointmentDomiciliary]: data.attentionMethod === 2,
        [classes.appointmentVirtual]: data.attentionMethod === 3,
        [classes.appointmentNotAvailable]: data.attentionMethod === 4,
        [classes.appointmentCanceled]: data.status === 'CANCELED',
      })}
    >
      <div>{getSubtitle(data)}</div>
      <div>{data.title}</div>
      <div className={classes.sectionIcon}>
        {getIcon(classes, data.attentionMethod, data.status)}
      </div>
    </div>
  )
}
