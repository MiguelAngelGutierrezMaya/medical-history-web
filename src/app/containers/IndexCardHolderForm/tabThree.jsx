import { Grid } from '@material-ui/core'
import { InputDate } from '../../components/InputDate'

// components
import { InputField } from '../../components/InputField'
import { SelectField } from '../../components/SelectField'

// styles & assets
import { useStyles } from './style'

export const TabThree = ({ form, setForm, canEdit, hcOpenPlaceList, hcTransferToList }) => {
  const classes = useStyles()

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} sm={12} md={6} lg={6}>
        <SelectField
          classNameLabel={classes.customLabel}
          classNameSelect={classes.customSelect}
          label="Historia abierta en"
          type="text"
          name="hcOpenPlace"
          value={form.hcOpenPlace}
          // error={error.profession.hasError}
          // helperText={error.profession.message}
          disabled={canEdit}
          onChange={handleChange}
          options={hcOpenPlaceList}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={6} lg={6}>
        <InputField
          className={classes.customInput}
          label="Usuario que creó el registro"
          type="text"
          name="userCreateHc"
          inputProps={{
            value: form.userCreateHc,
            onChange: handleChange,
            disabled: canEdit,
          }}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6}>
        <SelectField
          classNameLabel={classes.customLabel}
          classNameSelect={classes.customSelect}
          label="Historia transladada a"
          type="text"
          name="hcTransferTo"
          value={form.hcTransferTo}
          // error={error.profession.hasError}
          // helperText={error.profession.message}
          disabled={canEdit}
          onChange={handleChange}
          options={hcTransferToList}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={3}>
        <InputDate
          // error={error.birthday.hasError}
          // helperText={error.birthday.message}
          disabled={canEdit}
          label="Fecha de transferencia"
          placeholder="Ej: dd/mm/yyyy"
          pickerFormat="DD/MM/YYYY"
          inputFormat="L"
          name="transferDate"
          value={form.transferDate}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={3}>
        <InputDate
          // error={error.birthday.hasError}
          // helperText={error.birthday.message}
          disabled={canEdit}
          label="Fecha y hora de última atención"
          placeholder="Ej: dd/mm/yyyy"
          pickerFormat="DD/MM/YYYY"
          inputFormat="L"
          name="dateLastAttention"
          value={form.dateLastAttention}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={12}>
        <InputField
          className={classes.customInput}
          label="Alertas y condiciones especiales del usuario"
          type="text"
          name="userAlert"
          inputProps={{
            value: form.userAlert,
            onChange: handleChange,
            disabled: canEdit,
          }}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={12}>
        <InputField
          className={classes.customInput}
          label="Mensajes acerca del usuario"
          placeholder="Solo para Historia clínica"
          type="text"
          name="userMessageHc"
          inputProps={{
            value: form.userMessageHc,
            onChange: handleChange,
            disabled: canEdit,
          }}
        />
      </Grid>
    </Grid>
  )
}
