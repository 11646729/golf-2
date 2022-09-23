import React, { memo } from "react"
import PropTypes from "prop-types"
import { makeStyles, ListItemText, Typography } from "@material-ui/core"

const useStyles = makeStyles({
  routeNameId: () => ({
    paddingLeft: "10px",
    fontSize: "14px",
    fontWeight: "400",
    variant: "caption",
  }),
  routeViaId: () => ({
    paddingLeft: "10px",
    fontSize: "12px",
    fontWeight: "50",
  }),
})

const BandListItemText = (props) => {
  const { routeNameId, routeVia } = props

  const classes = useStyles(props)

  BandListItemText.propTypes = {
    routeNameId: PropTypes.string,
    routeVia: PropTypes.string,
  }

  return (
    <ListItemText
      primary={
        <Typography className={classes.routeNameId}>{routeNameId}</Typography>
      }
      secondary={
        <Typography className={classes.routeViaId}>{routeVia}</Typography>
      }
    />
  )
}

export default memo(BandListItemText)
