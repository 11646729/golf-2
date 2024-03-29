import React, { memo } from "react"
import PropTypes from "prop-types"
import Checkbox from "@material-ui/core/Checkbox"
import { createTheme, makeStyles } from "@material-ui/core/styles"
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

const useStyles = makeStyles(() => ({
  root: {
    color: theme.status.danger,
    "&$checked": {
      color: theme.status.danger,
    },
  },
  checked: {},
}))

const CustomCheckbox = (props) => {
  const { checked } = props

  const classes = useStyles()

  CustomCheckbox.propTypes = {
    checked: PropTypes.bool,
  }

  return (
    <CheckboxContainer>
      <Checkbox
        checked={checked}
        classes={{
          root: classes.root,
          checked: classes.checked,
        }}
      />
    </CheckboxContainer>
  )
}

export default memo(CustomCheckbox)
