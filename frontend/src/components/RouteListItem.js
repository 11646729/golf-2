import React from "react"
import {
  Grid,
  CssBaseline,
  Typography,
  Button,
  createMuiTheme,
  ThemeProvider,
  Checkbox,
} from "@material-ui/core"

const theme = createMuiTheme({
  typography: {
    body1: {
      fontWeight: 500,
    },
    subtitle1: {
      fontSize: 12,
    },
  },
})

RouteListItem.defaultProps = {
  busRouteNumber: "18",
  busRouteName: "San Rafael - Sausalito",
  busRouteVia: "via Strawberry, Mill Valley",
}

export default function RouteListItem(props) {
  return (
    <div>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={2}>
            <Grid container justify="flex-end">
              <Checkbox
                style={{ color: "#87cefa" }}
                // checked={busShapesCheckboxSelected}
                // onChange={handleBusShapesCheckboxChange}
                name="busShapesCheckbox"
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
