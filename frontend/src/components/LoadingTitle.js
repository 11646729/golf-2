import React from "react"
import PropTypes from "prop-types"
import Typography from "@material-ui/core/Typography"

export default function LoadingTitle(props) {
  return (
    <Typography
      component="div"
      display="inline"
      variant="h6"
      color="primary"
      p={1}
      m={1}
    >
      {props.children}
    </Typography>
  )
}

LoadingTitle.propTypes = {
  children: PropTypes.node,
}