// styles & assets
import { useStyles } from './style'

// components
import { Button, Grid } from '@material-ui/core'

import { InputDate } from '../../components/InputDate'
import { InputTime } from '../../components/InputTime'
import { InputField } from '../../components/InputField'
import { SelectField } from '../../components/SelectField'

export const TabOne = ({
  form,
  error,
  professionals,
  requestsTypes,
  handleChangeForm,
  handleChangeProfessional,
  onSearchIps,
  onSearchProductionCode,
  openProfessionalSchedule,
  ips,
  productionCenter
}) => {
  const classes = useStyles()

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} sm={12} md={6} lg={6}>
        <InputField
          error={error.appointmentId.hasError}
          helperText={error.appointmentId.message}
          className={classes.customInput}
          label={form.appointmentId.label}
          type="text"
          name={form.appointmentId.name}
          inputProps={{
            value: form.appointmentId.value,
            onChange: handleChangeForm,
            disabled: form.appointmentId.disabled
          }}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6}>
        <SelectField
          classNameLabel={classes.customLabel}
          classNameSelect={classes.customSelect}
          classNameIcon={classes.customSelectIcon}
          label={form.professionals.label}
          type="text"
          name={form.professionals.name}
          value={form.professionals.value}
          error={error.professionals.hasError}
          helperText={error.professionals.message}
          disabled={form.professionals.disabled}
          onChange={handleChangeProfessional}
          options={professionals}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={3}>
        <InputDate
          disableFuture={true}
          disabled={form.appointmentDate.disabled}
          error={error.appointmentDate.hasError}
          helperText={error.appointmentDate.message}
          label={form.appointmentDate.label}
          placeholder="Ej: dd/mm/yyyy"
          pickerFormat="DD/MM/YYYY"
          inputFormat="L"
          name={form.appointmentDate.name}
          value={form.appointmentDate.value}
          onChange={() => null}
          onClick={() => openProfessionalSchedule()}
          openTo="year"
          views={['year', 'month', 'date']}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={3}>
        <InputTime
          label={form.appointmentHour.label}
          placeholder="Ej: hh:mm a"
          disabled={form.appointmentHour.disabled}
          pickerFormat="hh:mm a"
          inputFormat="hh:mm a"
          error={error.appointmentHour.hasError}
          helperText={error.appointmentHour.message}
          name={form.appointmentHour.name}
          value={form.appointmentHour.value}
          onChange={() => null}
          onClick={() => openProfessionalSchedule()}
          openTo="hours"
          views={['hours', 'minutes']}
          ampm={true}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={3}>
        <InputDate
          disableFuture={true}
          disabled={form.suggestedDate.disabled}
          error={error.suggestedDate.hasError}
          helperText={error.suggestedDate.message}
          label={form.suggestedDate.label}
          placeholder="Ej: dd/mm/yyyy"
          pickerFormat="DD/MM/YYYY"
          inputFormat="L"
          name={form.suggestedDate.name}
          value={form.suggestedDate.value}
          onChange={handleChangeForm}
          openTo="year"
          views={['year', 'month', 'date']}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={3}>
        <InputTime
          label={form.suggestedHour.label}
          placeholder="Ej: hh:mm a"
          disabled={form.suggestedHour.disabled}
          error={error.suggestedHour.hasError}
          helperText={error.suggestedHour.message}
          pickerFormat="hh:mm a"
          inputFormat="hh:mm a"
          name={form.suggestedHour.name}
          value={form.suggestedHour.value}
          onChange={handleChangeForm}
          openTo="hours"
          views={['hours', 'minutes']}
          ampm={true}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={6}>
        <SelectField
          classNameLabel={classes.customLabel}
          classNameSelect={classes.customSelect}
          classNameIcon={classes.customSelectIcon}
          label={form.requestType.label}
          type="text"
          name={form.requestType.name}
          value={form.requestType.value}
          error={error.requestType.hasError}
          helperText={error.requestType.message}
          disabled={form.requestType.disabled}
          onChange={handleChangeForm}
          options={requestsTypes}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={3}>
        <InputDate
          disableFuture={true}
          disabled={form.requestDate.disabled}
          error={error.requestDate.hasError}
          helperText={error.requestDate.message}
          label={form.requestDate.label}
          placeholder="Ej: dd/mm/yyyy"
          pickerFormat="DD/MM/YYYY"
          inputFormat="L"
          name={form.requestDate.name}
          value={form.requestDate.value}
          onChange={() => null}
          openTo="year"
          views={['year', 'month', 'date']}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={3}>
        <InputTime
          className={classes.customTime}
          label={form.requestHour.label}
          placeholder="Ej: hh:mm a"
          disabled={form.requestHour.disabled}
          error={error.requestHour.hasError}
          helperText={error.requestHour.message}
          pickerFormat="hh:mm a"
          inputFormat="hh:mm a"
          name={form.requestHour.name}
          value={form.requestHour.value}
          onChange={() => null}
          openTo="hours"
          views={['hours', 'minutes']}
          ampm={true}
        />
      </Grid>
      <Grid item xs={8} sm={8} md={8} lg={5}>
        <InputField
          className={classes.customInput}
          label={form.searchIps.label}
          type="text"
          name={form.searchIps.name}
          inputProps={{
            value: form.searchIps.value,
            onChange: handleChangeForm,
            disabled: form.searchIps.disabled
          }}
        />
      </Grid>
      <Grid item xs={2} sm={2} md={2} lg={1} style={{ padding: '15px 0 0 18px' }}>
        <Grid container direction="row" justify="space-between" alignItems="center">
          <Button className={classes.btnSearch} variant="contained" disableElevation onClick={onSearchIps}>
            Buscar
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={6}>
        <div className={classes.boxSearch}>
          <span>Nombre IPS</span><br />
          <p>{ips.name}</p>
        </div>
      </Grid>
      <Grid item xs={8} sm={8} md={8} lg={5}>
        <InputField
          className={classes.customInput}
          label={form.searchProductionCode.label}
          type="text"
          name={form.searchProductionCode.name}
          inputProps={{
            value: form.searchProductionCode.value,
            onChange: handleChangeForm,
            disabled: form.searchProductionCode.disabled
          }}
        />
      </Grid>
      <Grid item xs={2} sm={2} md={2} lg={1} style={{ padding: '15px 0 0 18px' }}>
        <Grid container direction="row" justify="space-between" alignItems="center">
          <Button className={classes.btnSearch} variant="contained" disableElevation onClick={onSearchProductionCode}>
            Buscar
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={6}>
        <div className={classes.boxSearch}>
          <span>Nombre</span><br />
          <p>{productionCenter.name}</p>
        </div>
      </Grid>
    </Grid>
  )
}
