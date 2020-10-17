import React from "react"
import PropTypes from "prop-types"
import Typography from "@material-ui/core/Typography"

export default function Title(props) {
  const { children } = props
  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      {/* color="primary" */}
      {children}
    </Typography>
  )
}

Title.propTypes = {
  children: PropTypes.node,
}
