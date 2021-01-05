import React from "react"
import Checkbox from "@material-ui/core/Checkbox"
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles"
import { blue } from "@material-ui/core/colors"

const theme = createMuiTheme({
  status: {
    danger: blue[500],
  },
})

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.status.danger,
    "&$checked": {
      color: theme.status.danger,
    },
  },
  checked: {},
}))

function CustomCheckbox() {
  const classes = useStyles()

  return (
    <Checkbox
      defaultChecked
      classes={{
        root: classes.root,
        checked: classes.checked,
      }}
    />
  )
}

export default function BandCheckbox() {
  return (
    <ThemeProvider theme={theme}>
      <CustomCheckbox />
    </ThemeProvider>
  )
}
