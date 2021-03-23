import { CssBaseline, Grid, ThemeProvider } from "@material-ui/core";

// styles
import { theme } from "../../components/Global/style";
import { useStyles } from "./style";

export const Layout = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Grid container className={classes.content}>
          {children}
        </Grid>
      </ThemeProvider>
    </div>
  );
};
