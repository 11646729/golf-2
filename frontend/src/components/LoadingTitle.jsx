import React, { memo } from "react"
import PropTypes from "prop-types"
import Typography from "@material-ui/core/Typography"

const LoadingTitle = (props) => {
  const { children } = props

  LoadingTitle.propTypes = {
    children: PropTypes.node,
  }

  return (
    <Typography
      component="div"
      display="inline"
      variant="h6"
      color="primary"
      p={1}
      m={1}
    >
      {children}
    </Typography>
  )
}

export default memo(LoadingTitle)
