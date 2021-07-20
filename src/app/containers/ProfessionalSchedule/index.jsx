import React from 'react';

// Components
import Slider from "react-slick"
import { Grid, Card, Typography, Button } from '@material-ui/core'

// Libraries
import moment from 'moment'

// Styles
import { useStyles } from './style'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { Color } from "../../../assets/js/color"

// Utils
import { Weekday } from "../../../utils/weekday"

function SlideNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", top: "20px", background: Color.dark, borderRadius: "50%" }}
      onClick={onClick}
    />
  );
}

function SlidePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", top: "20px", background: Color.dark, borderRadius: "50%" }}
      onClick={onClick}
    />
  );
}

export const ProfessionalSchedule = (
  {
    professional,
    handleSchedule,
    handleChangeNext,
    handleChangePrev,
    propStyle = { widthCard: 900, heightCard: 600, resizeHeight: false },
    dataSelected = ''
  }
) => {

  const classes = useStyles(propStyle);

  const settings = {
    arrows: true,
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    nextArrow: <SlideNextArrow />,
    prevArrow: <SlidePrevArrow />,
    responsive: [
      {
        breakpoint: 860,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          initialSlide: 1
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          initialSlide: 1
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
    ]
  };

  const getSchedules = (data) => {
    if (data.schedules.length > 0) {

      let arr_result = [];
      let auxSuperior = 0;
      let availabityData = [];

      data.schedules.forEach(item => {
        if (auxSuperior < item.data.length) {
          auxSuperior = item.data.length
        }
      });

      // let tempSchedules = data.schedules;

      // Se recorren los registros de schedules
      data.schedules.forEach(schedule => {

        // Se obtienen los valores temporales para trabajar con ellos
        let temp_date = moment(schedule.date).format('YYYY-MM-DD');
        let timeTemp = [];

        availabityData = schedule.available;
        schedule.data.forEach(function (time, index) {
          const isAppointment = availabityData[index]
          timeTemp.push({
            'status': isAppointment || false,
            'time': time
          });
        })

        // Si no tiene registros de agenda
        if (auxSuperior === 0) auxSuperior = 7

        // Rellenar los dias sin datos, con dato estandar
        if (timeTemp.length === 0) {
          for (let empty = 0; empty < auxSuperior; empty++) {
            timeTemp.push({ 'status': false, 'time': '-' })
          }
        } else { // Rellenar los espacios sobrantes con el dato estandar
          let rest = auxSuperior - timeTemp.length;
          for (let empty = 0; empty < rest; empty++) {
            timeTemp.push({ 'status': false, 'time': '-' })
          }
        }

        arr_result.push({ "weekday": schedule.weekday, "duration": schedule.duration, "date": temp_date, "data": timeTemp })
      })

      return (
        arr_result.map((column, index) =>
        (
          <div className={classes.slickSlide} key={index}>
            <Typography className={classes.scheduleDay} variant="h1" component="h6">
              {Weekday[column.weekday]}
            </Typography>
            <Typography className={classes.scheduleDate} variant="h1" component="h6">
              {column.date}
            </Typography>

            {column.data.map((item, index) => {
              return (
                item.time !== '-' ?
                  (
                    <Button
                      key={index}
                      className={
                        (dataSelected === column.date + ' ' + item.time)
                          ? classes.btnSelected
                          : classes.btnSchedule
                      }
                      disabled={
                        !item.status ||
                        (dataSelected === column.date + ' ' + item.time) ||
                        moment(column.date + ' ' + item.time).locale('es-ES').format('YYYY-MM-DD HH:mm') < moment().locale('es-ES').format('YYYY-MM-DD HH:mm')
                      }
                      onClick={() => handleSchedule(column.duration, column.date, item.time)}>
                      {item.time}
                    </Button>
                  ) :
                  (
                    <Typography key={index} className={classes.labelSchedule} variant="body1" component="h6">
                      {item.time}
                    </Typography>
                  )
              )
            })}
          </div>
        ))
      )
    }
  }

  return (
    <Card elevation={4} className={classes.schedule}>

      <Grid container spacing={4}>
        <Grid item xs={12} sm={12} md={12} lg={12} style={{ textAlign: 'center', marginBottom: 20 }}>
          <Button variant="contained" disableElevation onClick={handleChangePrev}>
            Anterior semana
          </Button>
          <Button variant="contained" disableElevation onClick={handleChangeNext}>
            Siguiente semana
          </Button>
        </Grid>
      </Grid>

      {professional.schedules.length > 0 && (
        <div className={classes.sliderWrapper}>
          <Slider {...settings} >
            {getSchedules(professional)}
          </Slider>
        </div>
      )
      }

      {professional.schedules.length === 0 && (
        <div className={classes.scheduleNoData}>
          <span className={classes.caption}>No tiene agenda establecida!</span>
        </div>
      )}

    </Card>
  )
}