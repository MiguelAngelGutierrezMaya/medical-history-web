import { Divider, Grid, Typography } from '@material-ui/core'

// components
import { InputField } from '../../components/InputField'
import { SelectField } from '../../components/SelectField'

// styles & assets
import { useStyles } from './style'

export const TabTwo = ({
  form,
  setForm,
  canEdit,
  civilStatusList,
  scholarshipList,
  ethnicGroupList,
  typeDegreeDisabilityList,
  relationshipPersonInChargeList,
}) => {
  const classes = useStyles()

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <SelectField
          classNameLabel={classes.customLabel}
          classNameSelect={classes.customSelect}
          label="Estado civil"
          type="text"
          name="civilStatus"
          value={form.civilStatus}
          classNameIcon={classes.customSelectIcon}
          // error={error.profession.hasError}
          // helperText={error.profession.message}
          disabled={canEdit}
          onChange={handleChange}
          options={civilStatusList}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <SelectField
          classNameLabel={classes.customLabel}
          classNameSelect={classes.customSelect}
          label="Escolaridad"
          type="text"
          name="scholarship"
          value={form.scholarship}
          classNameIcon={classes.customSelectIcon}
          // error={error.profession.hasError}
          // helperText={error.profession.message}
          disabled={canEdit}
          onChange={handleChange}
          options={scholarshipList}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <SelectField
          classNameLabel={classes.customLabel}
          classNameSelect={classes.customSelect}
          label="Grupo étnico"
          type="text"
          name="ethnicGroup"
          value={form.ethnicGroup}
          classNameIcon={classes.customSelectIcon}
          // error={error.profession.hasError}
          // helperText={error.profession.message}
          disabled={canEdit}
          onChange={handleChange}
          options={ethnicGroupList}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={6} lg={3}>
        <SelectField
          classNameLabel={classes.customLabel}
          classNameSelect={classes.customSelect}
          label="Tipo y grado de discapacidad"
          type="text"
          name="typeDegreeDisability"
          value={form.typeDegreeDisability}
          classNameIcon={classes.customSelectIcon}
          // error={error.profession.hasError}
          // helperText={error.profession.message}
          disabled={canEdit}
          onChange={handleChange}
          options={typeDegreeDisabilityList}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={6} lg={3}>
        <InputField
          className={classes.customInput}
          label="Dirección del lugar  de trabajo"
          type="text"
          name="workAddress"
          inputProps={{
            value: form.workAddress,
            onChange: handleChange,
            disabled: canEdit,
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={6} lg={3}>
        <InputField
          className={classes.customInput}
          label="Teléfono 1 del trabajo"
          type="text"
          name="workPhoneOne"
          inputProps={{
            value: form.workPhoneOne,
            onChange: handleChange,
            disabled: canEdit,
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={6} lg={3}>
        <InputField
          className={classes.customInput}
          label="Teléfono 2 del trabajo"
          type="text"
          name="workPhoneTwo"
          inputProps={{
            value: form.workPhoneTwo,
            onChange: handleChange,
            disabled: canEdit,
          }}
        />
      </Grid>
      <Grid className={classes.showItemOnlyLg} item lg={3}></Grid>
      <Grid item xs={12} sm={6} md={6} lg={3}>
        <InputField
          className={classes.customInput}
          label="Apellidos de la madre"
          type="text"
          name="lastNameMom"
          inputProps={{
            value: form.lastNameMom,
            onChange: handleChange,
            disabled: canEdit,
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={6} lg={3}>
        <InputField
          className={classes.customInput}
          label="Nombres de la madre"
          type="text"
          name="firstNameMom"
          inputProps={{
            value: form.firstNameMom,
            onChange: handleChange,
            disabled: canEdit,
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography className={classes.title}>Datos del responsable</Typography>
        <Divider className={classes.divider} />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <InputField
          className={classes.customInput}
          label="Responsable"
          type="text"
          name="responsable"
          inputProps={{
            value: form.responsable,
            onChange: handleChange,
            disabled: canEdit,
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <SelectField
          classNameLabel={classes.customLabel}
          classNameSelect={classes.customSelect}
          label="Parentesco del responsable"
          type="text"
          name="relationshipPersonInCharge"
          value={form.relationshipPersonInCharge}
          classNameIcon={classes.customSelectIcon}
          // error={error.profession.hasError}
          // helperText={error.profession.message}
          disabled={canEdit}
          onChange={handleChange}
          options={relationshipPersonInChargeList}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <InputField
          className={classes.customInput}
          label="Dirección del responsable"
          type="text"
          name="addressPersonInCharge"
          inputProps={{
            value: form.addressPersonInCharge,
            onChange: handleChange,
            disabled: canEdit,
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <InputField
          className={classes.customInput}
          label="Teléfono del responsable"
          type="text"
          name="telephonePersonInCharge"
          inputProps={{
            value: form.telephonePersonInCharge,
            onChange: handleChange,
            disabled: canEdit,
          }}
        />
      </Grid>
    </Grid>
  )
}
