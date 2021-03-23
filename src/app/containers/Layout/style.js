import { makeStyles } from "@material-ui/core/styles";
import { theme } from "../../components/Global/style";

export const useStyles = makeStyles({
  root: {
    [theme.breakpoints.up("sm")]: {
      height: "100%",
    },
    [theme.breakpoints.up("md")]: {
      height: "100vh",
    },
  },
  content: {
    margin: 0,
    padding: 0,
  },
});
