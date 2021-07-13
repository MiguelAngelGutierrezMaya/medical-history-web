import { CssBaseline, IconButton, InputAdornment, ThemeProvider } from '@material-ui/core'
import { KeyboardTimePicker } from '@material-ui/pickers'
import { useState } from 'react'
import { InputField } from '../InputField'
import { customTheme, useStyles } from './style'
import { Schedule } from '@material-ui/icons'

export const InputTime = ({
  label,
  placeholder,
  pickerFormat,
  inputFormat,
  name,
  views,
  value,
  onChange,
  error,
  helperText,
  openTo,
  ampm,
  openVale,
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
        <KeyboardTimePicker
          disableFuture
          ampm={ampm}
          openTo={openTo || 'hours'}
          views={views || ['hours']}
          value={value || openVale}
          open={open}
          margin="normal"
          format={pickerFormat || 'h:mm:ss a'}
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
        onClick={() => isOpen(!open)}
        inputProps={{
          readOnly: true,
          value: value ? value.format(inputFormat || 'L') : '',
          onChange: () => null,
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => isOpen(!open)}>
                <Schedule />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </>
  )
}
