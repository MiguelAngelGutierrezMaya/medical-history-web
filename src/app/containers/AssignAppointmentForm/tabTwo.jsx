// styles & assets
import { useStyles, CustomSwitch } from './style'

// components
import { Button, Grid, FormControlLabel, Typography, Fab } from '@material-ui/core'

import { SelectField } from '../../components/SelectField'
import { InputField } from '../../components/InputField'

// Icons
import DeleteIcon from '@material-ui/icons/Delete'

export const TabTwo = ({ form, error, states, programs, programsSelected, handleChangeForm, customHandleChangeForm, handleAddProgram, handleDeleteProgram }) => {
  const classes = useStyles()

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} sm={12} md={6} lg={6}>
        <SelectField
          classNameLabel={classes.customLabel}
          classNameSelect={classes.customSelect}
          classNameIcon={classes.customSelectIcon}
          label={form.states.label}
          type="text"
          name={form.states.name}
          value={form.states.value}
          error={error.states.hasError}
          helperText={error.states.message}
          disabled={form.states.disabled}
          onChange={handleChangeForm}
          options={states}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6}>
        <InputField
          error={error.saleDocument.hasError}
          helperText={error.saleDocument.message}
          className={classes.customInput}
          label={form.saleDocument.label}
          type="text"
          name={form.saleDocument.name}
          inputProps={{
            value: form.saleDocument.value,
            onChange: handleChangeForm,
            disabled: form.saleDocument.disabled
          }}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Typography className={classes.label} style={{ marginRight: 30 }}>
          {form.firstTime.label}
        </Typography>
        <FormControlLabel control={<CustomSwitch disabled={form.firstTime.disabled} name={form.firstTime.name} label={form.firstTime.label} checked={form.firstTime.value} onChange={(event) => customHandleChangeForm(event, 'checked')} />} />
        {
          error.firstTime.hasError ? (
            <span>{error.firstTime.message}</span>
          ) : (<></>)
        }
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <InputField
          error={error.observations.hasError}
          helperText={error.observations.message}
          className={classes.customInput}
          label={form.observations.label}
          type="text"
          name={form.observations.name}
          inputProps={{
            value: form.observations.value,
            onChange: handleChangeForm,
            disabled: form.observations.disabled
          }}
          multiline={true}
          rows={3}
          rowsMax={4}
        />
      </Grid>
      <Grid item xs={8} sm={8} md={8} lg={8}>
        <SelectField
          classNameLabel={classes.customLabel}
          classNameSelect={classes.customSelect}
          classNameIcon={classes.customSelectIcon}
          label={form.programs.label}
          type="text"
          name={form.programs.name}
          value={form.programs.value}
          disabled={form.programs.disabled}
          onChange={handleChangeForm}
          options={programs}
        />
      </Grid>
      <Grid item xs={2} sm={2} md={2} lg={2} style={{ padding: '15px 0 0 18px' }}>
        <Grid container direction="row" justify="space-between" alignItems="center">
          <Button className={classes.btnSearch} variant="contained" disableElevation onClick={() => handleAddProgram()}>
            Agregar
          </Button>
        </Grid>
      </Grid>
      {
        programsSelected.map((el, index) => (
          <Grid item xs={12} sm={12} md={6} lg={6} key={`program-${index}`}>
            <Grid container direction="row" justify="flex-start" alignItems="center">
              <span>{el.text}</span>
              <div className={classes.actions}>
                <Fab aria-label="delete" onClick={() => handleDeleteProgram(el.key)}>
                  <DeleteIcon className={classes.icon} />
                </Fab>
              </div>
            </Grid>
          </Grid>
        ))
      }
    </Grid>
  )
}
