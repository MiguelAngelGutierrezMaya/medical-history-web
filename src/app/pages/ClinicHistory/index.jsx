import { useState } from 'react'
// import _ from 'lodash'

// components
import { ConfigClinicHistory } from '../../containers/ConfigClinicHistory'
import { CustomTabsEdit } from '../../components/CustomTabsEdit'
import { Grid, Typography } from '@material-ui/core'

// styles & assets
import { useStyles } from './style'
import { InputField } from '../../components/InputField'
import { PopupMessage } from '../../components/PopupMessage'
import { MedicalHistory } from '../../../api/medicalHistory'

export const ClinicHistory = () => {
  const classes = useStyles()
  const [hcName, setHcName] = useState({
    value: '',
    error: { status: false, message: '' },
  })
  const [component, setComponent] = useState({ type: '', label: '', value: '' })
  const [errorComponent, setErrorComponent] = useState({
    type: { status: false, message: '' },
    label: { status: false, message: '' },
  })
  const [titles, setTitles] = useState(['iconEvent'])
  const [state, setState] = useState([])
  const [index, setIndex] = useState(0)
  const [popupMessage, setPopupMessage] = useState({
    open: false,
    type: '',
    title: '',
    description: '',
    btnLabel: '',
  })

  const handleAddTitle = () => {
    let aux = [...titles]
    aux.splice(titles.length - 1, 0, {
      name: `name${aux.length - 1}`,
      value: 'UNNAMED',
    })
    setTitles(aux)
    setState([
      ...state,
      {
        items: [],
      },
    ])
  }

  const handleRemoveTitle = (position) => {
    let aux = [...titles]
    aux.splice(position, 1)
    setTitles(aux)
    aux = state
    aux.splice(position, 1)
    setState(aux)
  }

  const handleChangeTitle = (event, position) => {
    setTitles(
      titles.map((item) => {
        if (item.name === event.target.name) {
          return { name: item.name, value: event.target.value }
        }
        return item
      }),
    )
    setState(
      state.map((item, i) => {
        if (i === position) {
          let el = state[position]
          el.group = event.target.value.replaceAll(' ', '-').toLowerCase()
          el.groupValue = event.target.value
          return el
        }
        return item
      }),
    )
  }

  const handleAddItem = (position) => {
    if (component.type === '' || component.label === '') {
      setErrorComponent({
        type: {
          status: component.type === '',
          message: component.type === '' ? 'Campo obligatorio' : '',
        },
        label: {
          status: component.label === '',
          message: component.label === '' ? 'Campo obligatorio' : '',
        },
      })
    } else {
      setErrorComponent({
        type: { status: false, message: '' },
        label: { status: false, message: '' },
      })
      if (titles.length === 1) {
        setPopupMessage({
          open: true,
          type: 'error',
          title: 'Grupos no creados',
          description:
            'Se debe crear al menos un grupo para agregar campos a la historia clínica',
          btnLabel: 'Aceptar',
        })
      } else {
        setState(
          state.map((item, i) => {
            if (position === i) {
              const { items, cols } = state[position]
              return {
                group: titles[position].value.toLowerCase().replace(' ', '-'),
                groupValue: titles[position].value,
                items: items.concat({
                  compactType: 'vertical',
                  mounted: false,
                  i: 'n' + state.newCounter,
                  x: (items.length * 6) % (cols || 12),
                  y: Infinity, // puts it at the bottom
                  w: 6,
                  h: component.type === 'text-area' ? 3 : 2,
                  component: { ...component },
                }),
              }
            }
            return item
          }),
        )
        setComponent({ type: '', label: '', value: '' })
      }
    }
  }

  const handleBreakpointChange = (breakpoint, cols, position) => {
    // setState(
    //   state.map((item, i) => {
    //     if (position === i) {
    //       return {
    //         ...item,
    //         breakpoint: breakpoint,
    //         cols: cols,
    //       }
    //     }
    //     return item
    //   }),
    // )
  }

  const handleLayoutChange = (layout, position) => {
    setState(
      state.map((item, i) => {
        if (position === i) {
          item.items.forEach((obj, i) => {
            obj.x = layout[i].x
            obj.y = layout[i].y
            obj.w = layout[i].w
            obj.h = layout[i].h
          })
          return item
        }
        return item
      }),
    )
  }

  const handleRemoveItem = (i, groupPosition) => {
    setState(
      state.map((item, index) => {
        const group = state[groupPosition]
        if (index === groupPosition) {
          group.items.splice(i, 1)
          return group
        }
        return item
      }),
    )
  }

  const handleChangleHcName = (event) => {
    setHcName({ ...hcName, [event.target.name]: event.target.value })
  }

  const handleClose = () => {
    setPopupMessage({ ...popupMessage, open: false })
  }

  const handleSave = () => {
    if (hcName.value === '') {
      setPopupMessage({
        open: true,
        type: 'error',
        title: 'Historia clínica con errores',
        description: 'Se debe agregar un nombre a la historia clínica',
        btnLabel: 'Aceptar',
      })
      setHcName({
        ...hcName,
        error: { status: true, message: 'Campo obligatorio' },
      })
    } else if (titles.length === 1) {
      setPopupMessage({
        open: true,
        type: 'error',
        title: 'Historia clínica con errores',
        description: 'Se debe agregar al menos un grupo',
        btnLabel: 'Aceptar',
      })
    } else if (state.length === 0) {
      setPopupMessage({
        open: true,
        type: 'error',
        title: 'Historia clínica con errores',
        description: 'Se debe agregar al menos un campo',
        btnLabel: 'Aceptar',
      })
    } else {
      setHcName({
        ...hcName,
        error: { status: false, message: '' },
      })
      const data = {
        name: hcName.value,
        groups: state.map((item) => ({
          name: item.group,
          title: item.groupValue,
          items: item.items,
        })),
      }
      MedicalHistory.saveHcConfig(data).then((response) => {
        if (response?.status === 201) {
          setIndex(0)
          setTitles(['iconEvent'])
          setState([])
          setHcName({
            value: '',
            error: { status: false, message: '' },
          })
          setPopupMessage({
            open: true,
            type: 'success',
            title: 'Éxito',
            description:
              'Se la configuración de la historia clínica con satisfactoriamente',
            btnLabel: 'Aceptar',
          })
        } else {
          setPopupMessage({
            open: true,
            type: 'error',
            title: 'Error',
            description:
              'Se presentó un error al crear la configuración de la historia clínica.',
            btnLabel: 'Aceptar',
          })
        }
      })
    }
  }

  return (
    <>
      <ConfigClinicHistory
        index={index}
        onAddItem={handleAddItem}
        onChange={handleChangleHcName}
        component={component}
        errorComponent={errorComponent}
        setComponent={setComponent}
        onClickBtnSave={handleSave}
      />
      <Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={4}
          lg={4}
          style={{ padding: '20px 24px 5px' }}
        >
          <InputField
            className={classes.customInput}
            label="Nombre de la historia clínica"
            type="text"
            name="value"
            error={hcName.error.status}
            helperText={hcName.error.message}
            inputProps={{
              value: hcName.value,
              onChange: handleChangleHcName,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Typography className={classes.title}>{hcName.value}</Typography>
        </Grid>
        <CustomTabsEdit
          titles={titles}
          contents={state}
          onAddTitle={handleAddTitle}
          onChangeTitle={handleChangeTitle}
          onRemoveTitle={handleRemoveTitle}
          onLayoutChange={handleLayoutChange}
          onBreakpointChange={handleBreakpointChange}
          onRemoveItem={handleRemoveItem}
          index={index}
          setIndex={setIndex}
        />
      </Grid>
      <PopupMessage
        open={popupMessage.open}
        type={popupMessage.type}
        title={popupMessage.title}
        description={popupMessage.description}
        btnLabel={popupMessage.btnLabel}
        onClose={handleClose}
        onConfirm={handleClose}
      />
    </>
  )
}
