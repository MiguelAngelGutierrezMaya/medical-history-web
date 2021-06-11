import {
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  RadioGroup,
  Typography,
} from '@material-ui/core'
import { Close, Queue, RemoveCircleOutline } from '@material-ui/icons'
import { WidthProvider, Responsive } from 'react-grid-layout'
import PropTypes from 'prop-types'

// styles & assets
import {
  CustomSwitch,
  ItemRadio,
  StyledTab,
  StyledTabs,
  useStyles,
} from './style'

// components
import { InputField } from '../InputField'
const ResponsiveReactGridLayout = WidthProvider(Responsive)

export const CustomTabsEdit = ({
  titles,
  contents,
  onAddTitle,
  onChangeTitle,
  onRemoveTitle,
  onLayoutChange,
  onBreakpointChange,
  onRemoveItem,
  index,
  setIndex,
}) => {
  const classes = useStyles()

  const handleChange = (_, newValue) => {
    if (newValue !== titles.length - 1) {
      setIndex(newValue)
    } else {
      onAddTitle()
    }
  }

  const getComponent = (el, i) => {
    const { component } = el
    if (component.type === 'text-field') {
      return (
        <InputField
          key={`${contents[index]?.group}_${component.label}${i}`}
          className={classes.customInput}
          label={component.label}
          type="text"
          name="label"
        />
      )
    } else if (component.type === 'text-area') {
      return (
        <InputField
          key={`${component.label}${index}`}
          className={classes.customInput}
          label={component.label}
          type="text"
          name="label"
          multiline={true}
          rows={2}
          rowsMax={2}
        />
      )
    } else if (component.type === 'radio') {
      return (
        <Grid
          key={`${component.label}${index}`}
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Typography className={classes.label}>{component.label}</Typography>
          <RadioGroup row aria-label="position" name="position">
            <FormControlLabel value="y" control={<ItemRadio />} label="Si" />
            <FormControlLabel value="n" control={<ItemRadio />} label="No" />
          </RadioGroup>
        </Grid>
      )
    } else if (component.type === 'switch') {
      return (
        <Grid
          key={`${component.label}${index}`}
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
        >
          <Typography className={classes.label} style={{ marginRight: 30 }}>
            {component.label}
          </Typography>
          <FormControlLabel control={<CustomSwitch label="Label" />} />
        </Grid>
      )
    }
  }

  const createElement = (el, i, group) => {
    return (
      <div
        key={`${el.component.label}${i}`}
        data-grid={el}
        style={
          el.component.type === 'radio'
            ? { padding: '12px 20px 0 0' }
            : { padding: '0 20px 0 0' }
        }
      >
        {getComponent(el, i)}
        {el.canDelete !== false ? (
          <IconButton
            className={classes.removeStyle}
            onClick={onRemoveItem.bind(this, i, group)}
          >
            <Close fontSize="small" />
          </IconButton>
        ) : null}
      </div>
    )
  }

  const getContent = ({ items }) => {
    return (
      <ResponsiveReactGridLayout
        onLayoutChange={(layout) => onLayoutChange(layout, index)}
        onBreakpointChange={(breakpoint, cols) =>
          onBreakpointChange(breakpoint, cols, index)
        }
      >
        {items?.map((el, i) => createElement(el, i, index))}
      </ResponsiveReactGridLayout>
    )
  }

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <StyledTabs
          value={index}
          onChange={handleChange}
          aria-label="styled tabs example"
          variant="scrollable"
          scrollButtons="auto"
        >
          {titles?.map((item, i) => (
            <StyledTab
              key={i}
              wrapped
              label={
                i !== titles.length - 1 ? (
                  <InputField
                    className={classes.customTab}
                    // label="Nombre de la historia clínica"
                    multiline={true}
                    type="text"
                    name={item.name}
                    inputProps={{
                      value: item.value,
                      onChange: (event) => onChangeTitle(event, index),
                      endAdornment:
                        item.canDelete !== false ? (
                          <InputAdornment position="end">
                            <RemoveCircleOutline
                              className={classes.remove}
                              onClick={() => onRemoveTitle(i)}
                            />
                          </InputAdornment>
                        ) : null,
                    }}
                  />
                ) : (
                  <Queue style={{ fontSize: 25 }} />
                )
              }
            />
          ))}
        </StyledTabs>
        <div className={classes.padding}>
          {getContent(contents[index] ?? {})}
        </div>
      </div>
    </div>
  )
}

ResponsiveReactGridLayout.propTypes = {
  onLayoutChange: PropTypes.func.isRequired,
}

ResponsiveReactGridLayout.defaultProps = {
  className: 'layout',
  rowHeight: 20,
  onLayoutChange: function () {},
  cols: { lg: 12, md: 12, sm: 6, xs: 4, xxs: 2 },
}
