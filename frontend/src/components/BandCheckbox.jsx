import React from "react"
import Checkbox from "@material-ui/core/Checkbox"
import {
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles"
import { blue } from "@material-ui/core/colors"

import styled from "styled-components"

const CheckboxContainer = styled.div`
  color: black;
`

const theme = createTheme({
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

function CustomCheckbox(props) {
  const classes = useStyles()

  return (
    <CheckboxContainer>
      <Checkbox
        checked={props.checked}
        classes={{
          root: classes.root,
          checked: classes.checked,
        }}
      />
    </CheckboxContainer>
  )
}

export default function BandCheckbox(props) {
  return (
    <ThemeProvider theme={theme}>
      <CustomCheckbox checked={props.checked} />
    </ThemeProvider>
  )
}
