import React, { memo } from "react"
import PropTypes from "prop-types"
import Typography from "@material-ui/core/Typography"

const Title = (props) => {
  const { children } = props

  Title.propTypes = {
    children: PropTypes.node,
  }

  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      {children}
    </Typography>
  )
}

export default memo(Title)
