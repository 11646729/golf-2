import React, { memo } from "react"
import { Typography, Link } from "@material-ui/core"

function CopyRight() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        My Website
      </Link>
      {" " + new Date().getFullYear()}
    </Typography>
  )
}

export default memo(CopyRight)
