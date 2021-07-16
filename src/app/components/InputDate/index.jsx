import { useState } from 'react'
import { CssBaseline, IconButton, InputAdornment, /*SvgIcon,*/ ThemeProvider } from '@material-ui/core'
import { KeyboardDatePicker } from '@material-ui/pickers'

// components
import { InputField } from '../InputField'

// styles & assets
import { customTheme, useStyles } from './style'
import { Event } from '@material-ui/icons'
// import { ReactComponent as CalendarIcon } from '../../../assets/images/calendar-field.svg'

export const InputDate = ({
  label,
  placeholder,
  pickerFormat,
  inputFormat,
  name,
  views,
  value,
  onChange,
  onClick,
  error,
  helperText,
  openTo,
  disableFuture,
  disabled,
}) => {
  const classes = useStyles()
  const [open, isOpen] = useState(false)

  const handleChange = (date) => {
    onChange({ target: { name, value: date } })
    isOpen(false)
  }

  return (
    <>
      <ThemeProvider theme={customTheme}>
        <CssBaseline />
        <KeyboardDatePicker
          disableFuture={disableFuture}
          openTo={openTo || 'date'}
          views={views || ['date']}
          value={value}
          open={open}
          margin="normal"
          format={pickerFormat || 'DD/MM/YYYY'}
          cancelLabel="Cancelar"
          okLabel="Aceptar"
          onChange={handleChange}
          onClose={() => isOpen(false)}
          TextFieldComponent={() => null}
        />
      </ThemeProvider>
      <InputField
        className={classes.customInput}
        error={error}
        helperText={helperText}
        label={label}
        type="text"
        name={name}
        placeholder={placeholder}
        onClick={onClick ? () => onClick() : () => (!disabled ? isOpen(!open) : null)}
        inputProps={{
          readOnly: true,
          value: value ? value.format(inputFormat || 'L') : '',
          onChange: () => null,
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={onClick ? () => onClick() : () => isOpen(!open)}>
                {/* <SvgIcon component={CalendarIcon} viewBox="0 0 480 480" /> */}
                <Event className={classes.icon} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </>
  )
}
