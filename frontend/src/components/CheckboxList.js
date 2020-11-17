import React from "react"
import {
  makeStyles,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Typography,
} from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  busRouteNameId: {
    // marginBottom: 0,
    paddingLeft: 10,
    fontSize: 16,
    fontWeight: 500,
    variant: "caption",
  },
  busRouteViaId: {
    // textalign: "top",
    // marginTop: 0,
    paddingLeft: 10,
    // paddingTop: 0,
    fontSize: 12,
    fontWeight: 50,
    // variant: "caption",
  },
  captionButton: {
    maxWidth: "40px",
    maxHeight: "30px",
    minWidth: "40px",
    minHeight: "30px",
    color: "#ffffff",
    backgroundColor: "#87cefa",
    padding: "12px 22px",
    fontSize: "18px",
  },
  checkbox: {
    color: "#42cef5",
  },
}))

CheckboxList.defaultProps = {
  busRouteNumber: "18",
  busRouteName: "San Rafael - Sausalito",
  busRouteVia: "via Strawberry, Mill Valley",
}

export default function CheckboxList(props) {
  const classes = useStyles()
  const [checked, setChecked] = React.useState([0])

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    setChecked(newChecked)
  }

  return (
    <List className={classes.root}>
      {[0, 1, 2].map((value) => {
        const labelId = `checkbox-list-label-${value}`

        return (
          <ListItem
            key={value}
            role={undefined}
            dense
            button
            onClick={handleToggle(value)}
          >
            <ListItemIcon>
              <Checkbox
                className={classes.checkbox}
                edge="start"
                checked={checked.indexOf(value) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{ "aria-labelledby": labelId }}
              />
              <Button className={classes.captionButton}>
                {props.busRouteNumber}
              </Button>
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography className={classes.busRouteNameId}>
                  {props.busRouteName}
                </Typography>
              }
              secondary={
                <Typography className={classes.busRouteViaId}>
                  {props.busRouteVia}
                </Typography>
              }
            />
          </ListItem>
        )
      })}
    </List>
  )
}
