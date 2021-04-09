import { FormControl, FormHelperText, Input, InputLabel, MenuItem, Select } from '@material-ui/core'
import { ExpandMore } from '@material-ui/icons'
import classNames from 'clsx'

// styles & assets
import { MenuProps, useStyles } from './style'

export const SelectField = ({
  name,
  label,
  options,
  value,
  onChange,
  error,
  helperText,
  classNameLabel,
  classNameSelect,
  classNameIcon,
  disabled,
}) => {
  const classes = useStyles()

  return (
    <FormControl className={classNames(classes.formControl, classNameSelect)} error={error} disabled={disabled}>
      <InputLabel className={classNames(classes.label, classNameLabel)} id="select-field-label">
        {label}
      </InputLabel>
      <Select
        className={classes.select}
        labelId="select-field-label"
        value={value}
        name={name}
        onChange={onChange}
        input={<Input className={classes.input} />}
        MenuProps={MenuProps}
        IconComponent={() => <ExpandMore className={classNames(classes.icon, classNameIcon)} />}
      >
        {options.map((item) => (
          <MenuItem className={classes.menuItem} key={item.key} value={item.key}>
            {item.text}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  )
}
