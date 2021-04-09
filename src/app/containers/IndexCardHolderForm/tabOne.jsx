import { Grid } from '@material-ui/core'
import { City } from '../../../api/city'
import { Deparment } from '../../../api/deparment'
import { Router } from '../../../routes'
import { InputDate } from '../../components/InputDate'

// components
import { InputField } from '../../components/InputField'
import { SelectField } from '../../components/SelectField'

// styles & assets
import { useStyles } from './style'

export const TabOne = ({
  form,
  setForm,
  error,
  canEdit,
  history,
  countries,
  nacionalities,
  departments,
  setDepartments,
  cities,
  setCities,
  usualOccupations,
  specialPopulations,
  sexualOrientations,
  socialSecuritySchemes,
  epsList,
}) => {
  const classes = useStyles()
  // const [departments, setDepartments] = useState([])
  // const [cities, setCities] = useState([])

  const genderList = [
    { key: 'M', text: 'Masculino' },
    { key: 'F', text: 'Femenino' },
  ]

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
    if (event.target.name === 'country') {
      Deparment.list(event.target.value).then((response) => {
        if (response?.status === 200) {
          setForm({ ...form, country: event.target.value, department: '', city: '' })
          setCities([])
          setDepartments(response.data.map((item) => ({ key: item.id, text: item.description })))
        } else if (response?.status === 401) {
          history.push(Router.appLogin)
        }
      })
    } else if (event.target.name === 'department') {
      City.list(event.target.value).then((response) => {
        if (response?.status === 200) {
          setForm({ ...form, department: event.target.value, city: '' })
          setCities(response.data.map((item) => ({ key: item.id, text: item.description })))
        } else if (response?.status === 401) {
          history.push(Router.appLogin)
        }
      })
    }
  }

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <InputField
          error={error.surname.hasError}
          helperText={error.surname.message}
          className={classes.customInput}
          label="Primer apellido"
          type="text"
          name="surname"
          inputProps={{
            value: form.surname,
            onChange: handleChange,
            disabled: canEdit,
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <InputField
          error={error.secondSurname.hasError}
          helperText={error.secondSurname.message}
          className={classes.customInput}
          label="Segundo apellido"
          type="text"
          name="secondSurname"
          inputProps={{
            value: form.secondSurname,
            onChange: handleChange,
            disabled: canEdit,
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <InputField
          error={error.firstName.hasError}
          helperText={error.firstName.message}
          className={classes.customInput}
          label="Primer nombre"
          type="text"
          name="firstName"
          inputProps={{
            value: form.firstName,
            onChange: handleChange,
            disabled: canEdit,
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <InputField
          className={classes.customInput}
          label="Segundo nombre"
          type="text"
          name="secondName"
          inputProps={{
            value: form.secondName,
            onChange: handleChange,
            disabled: canEdit,
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <InputDate
          disableFuture={true}
          disabled={canEdit}
          // error={error.birthday.hasError}
          // helperText={error.birthday.message}
          label="Fecha de nacimiento"
          placeholder="Ej: dd/mm/yyyy"
          pickerFormat="DD/MM/YYYY"
          inputFormat="L"
          name="birthday"
          value={form.birthday}
          onChange={handleChange}
          openTo="year"
          views={['year', 'month', 'date']}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <InputField
          className={classes.customInput}
          label="Edad"
          type="text"
          name="birthday"
          inputProps={{
            value: form.birthday,
            onChange: handleChange,
            disabled: true,
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <SelectField
          classNameLabel={classes.customLabel}
          classNameSelect={classes.customSelect}
          label="Género"
          type="text"
          name="gender"
          value={form.gender}
          classNameIcon={classes.customSelectIcon}
          // error={error.profession.hasError}
          // helperText={error.profession.message}
          disabled={canEdit}
          onChange={handleChange}
          options={genderList}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <InputField
          error={error.nuip.hasError}
          helperText={error.nuip.message}
          className={classes.customInput}
          label="Documento de identidad"
          type="text"
          name="nuip"
          inputProps={{
            value: form.nuip,
            onChange: handleChange,
            disabled: canEdit,
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <SelectField
          classNameLabel={classes.customLabel}
          classNameSelect={classes.customSelect}
          label="Nacionalidad"
          type="text"
          name="nationality"
          value={form.nationality}
          classNameIcon={classes.customSelectIcon}
          // error={error.profession.hasError}
          // helperText={error.profession.message}
          disabled={canEdit}
          onChange={handleChange}
          options={nacionalities}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <SelectField
          classNameLabel={classes.customLabel}
          classNameSelect={classes.customSelect}
          label="País de residencia"
          type="text"
          name="country"
          value={form.country}
          classNameIcon={classes.customSelectIcon}
          // error={error.profession.hasError}
          // helperText={error.profession.message}
          disabled={canEdit}
          onChange={handleChange}
          options={countries}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <SelectField
          classNameLabel={classes.customLabel}
          classNameSelect={classes.customSelect}
          label="Departamento"
          type="text"
          name="department"
          value={form.department}
          classNameIcon={classes.customSelectIcon}
          // error={error.profession.hasError}
          // helperText={error.profession.message}
          disabled={canEdit}
          onChange={handleChange}
          options={departments}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <SelectField
          classNameLabel={classes.customLabel}
          classNameSelect={classes.customSelect}
          label="Municipio"
          type="text"
          name="city"
          value={form.city}
          classNameIcon={classes.customSelectIcon}
          // error={error.profession.hasError}
          // helperText={error.profession.message}
          disabled={canEdit}
          onChange={handleChange}
          options={cities}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <InputField
          className={classes.customInput}
          label="Dirección de residencia"
          type="text"
          name="address"
          inputProps={{
            value: form.address,
            onChange: handleChange,
            disabled: canEdit,
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <InputField
          className={classes.customInput}
          label="Barrio"
          type="text"
          name="neighborhood"
          inputProps={{
            value: form.neighborhood,
            onChange: handleChange,
            disabled: canEdit,
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <InputField
          className={classes.customInput}
          label="Teléfono"
          type="text"
          name="telephone"
          inputProps={{
            value: form.telephone,
            onChange: handleChange,
            disabled: canEdit,
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <InputField
          className={classes.customInput}
          label="Celular"
          type="text"
          name="cellphone"
          inputProps={{
            value: form.cellphone,
            onChange: handleChange,
            disabled: canEdit,
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <InputField
          error={error.email.hasError}
          helperText={error.email.message}
          className={classes.customInput}
          label="Correo electrónico"
          type="email"
          name="email"
          inputProps={{
            value: form.email,
            onChange: handleChange,
            disabled: canEdit,
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <SelectField
          classNameLabel={classes.customLabel}
          classNameSelect={classes.customSelect}
          label="Ocupación habitual"
          type="text"
          name="usualOccupation"
          value={form.usualOccupation}
          classNameIcon={classes.customSelectIcon}
          // error={error.profession.hasError}
          // helperText={error.profession.message}
          disabled={canEdit}
          onChange={handleChange}
          options={usualOccupations}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <SelectField
          classNameLabel={classes.customLabel}
          classNameSelect={classes.customSelect}
          label="Población especial"
          type="text"
          name="specialPopulation"
          value={form.specialPopulation}
          classNameIcon={classes.customSelectIcon}
          // error={error.profession.hasError}
          // helperText={error.profession.message}
          disabled={canEdit}
          onChange={handleChange}
          options={specialPopulations}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <SelectField
          classNameLabel={classes.customLabel}
          classNameSelect={classes.customSelect}
          label="Orientación sexual"
          type="text"
          name="sexualOrientation"
          value={form.sexualOrientation}
          classNameIcon={classes.customSelectIcon}
          // error={error.profession.hasError}
          // helperText={error.profession.message}
          disabled={canEdit}
          onChange={handleChange}
          options={sexualOrientations}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <SelectField
          classNameLabel={classes.customLabel}
          classNameSelect={classes.customSelect}
          label="Régimen de seguridad social"
          type="text"
          name="socialSecurityScheme"
          value={form.socialSecurityScheme}
          classNameIcon={classes.customSelectIcon}
          // error={error.profession.hasError}
          // helperText={error.profession.message}
          disabled={canEdit}
          onChange={handleChange}
          options={socialSecuritySchemes}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <SelectField
          classNameLabel={classes.customLabel}
          classNameSelect={classes.customSelect}
          label="Empresa"
          type="text"
          name="eps"
          value={form.eps}
          classNameIcon={classes.customSelectIcon}
          // error={error.profession.hasError}
          // helperText={error.profession.message}
          disabled={canEdit}
          onChange={handleChange}
          options={epsList}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <InputField
          className={classes.customInput}
          label="Nivel"
          type="text"
          name="epsLevel"
          inputProps={{
            value: form.epsLevel,
            onChange: handleChange,
            disabled: canEdit,
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <InputField
          className={classes.customInput}
          label="Número de afiliación"
          type="text"
          name="affiliationNumber"
          inputProps={{
            value: form.affiliationNumber,
            onChange: handleChange,
            disabled: canEdit,
          }}
        />
      </Grid>
    </Grid>
  )
}
