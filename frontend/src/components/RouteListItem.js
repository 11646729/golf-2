import React from "react"
import { loadCSS } from "fg-loadcss"
import {
  Grid,
  CssBaseline,
  Typography,
  Button,
  Icon,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core"

const theme = createMuiTheme({
  typography: {
    // button: {
    //   fontSize: 16,
    //   fontStyle: "bold",
    // },
    body1: {
      fontWeight: 500,
    },
    subtitle1: {
      fontSize: 12,
    },
  },
})

export default function RouteListItem(props) {
  // const busRouteNumber = "18"
  // const busRouteName = "San Rafael - Sausalito"
  // const busRouteVia = "via Strawberry, Mill Valley"

  React.useEffect(() => {
    loadCSS(
      "https://use.fontawesome.com/releases/v5.12.0/css/all.css",
      document.querySelector("#font-awesome-css")
    )
  }, [])

  return (
    <div>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={2}>
            <Grid container justify="flex-end">
              <Icon
                className="fa fa-check-square"
                style={{ color: "#87cefa" }}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} sm={1}>
            <Button
              style={{
                maxWidth: "40px",
                maxHeight: "30px",
                minWidth: "40px",
                minHeight: "30px",
                color: "#ffffff",
                backgroundColor: "#87cefa",
                padding: "12px 22px",
                fontSize: "18px",
              }}
              variant="contained"
            >
              {props.busRouteNumber}
            </Button>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Grid container justify="center">
              <Typography variant="body1">{props.busRouteName}</Typography>
              <Typography variant="subtitle1">{props.busRouteVia}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </ThemeProvider>
    </div>
  )
}
