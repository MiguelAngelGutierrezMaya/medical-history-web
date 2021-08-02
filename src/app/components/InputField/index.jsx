import { CustomTextField } from './style'

export const InputField = ({
  label,
  className,
  type,
  name,
  placeholder,
  error,
  inputProps,
  onClick,
  helperText,
  inputLabelProps,
  multiline,
  rows,
  rowsMax,
  autoFocus
}) => {
  return (
    <CustomTextField
      autoFocus={autoFocus || false}
      error={error || false}
      helperText={helperText || ''}
      className={className}
      multiline={multiline}
      label={label}
      fullWidth={true}
      type={type || 'text'}
      name={name}
      placeholder={placeholder}
      InputProps={inputProps}
      InputLabelProps={inputLabelProps}
      onClick={onClick}
      rows={rows}
      rowsMax={rowsMax}
    />
  )
}
