/* eslint-disable no-undef */
import React, { Fragment } from "react"
import { loadCSS } from 'fg-loadcss'
import {
  CssBaseline,
  Typography,
  Button,
  Icon,
  makeStyles,
} from "@material-ui/core"
import { green } from "@material-ui/core/colors"

const useStyles = makeStyles((theme) => ({
  root: {
    '& > .fa': {
      margin: theme.spacing(2),
    },
  },
}))

export default function RouteListItem() {
  const classes = useStyles()

  React.useEffect(() => {
    loadCSS(
      'https://use.fontawesome.com/releases/v5.12.0/css/all.css',
      document.querySelector('#font-awesome-css'),
    );
  }, []);

  return (
    <Fragment>
      <CssBaseline />
      <div className={classes.root}>
        <Icon className="fa fa-check-square" style={{ color: green[500] }} />
          <Button variant="contained" color="primary">18</Button>
        <Typography
          component="div"
          display="inline"
          variant="h6"
          color="primary"
          p={1}
          m={1}
        >
          San Rafael - Sausalito
      </Typography>
      </div>
      <Typography
        component="div"
        // display="inline"
        variant="h7"
        color="primary"
        p={1}
        m={1}
      >
        via Strawberry, Mill Valley
    </Typography>
    </Fragment>
  )
}

