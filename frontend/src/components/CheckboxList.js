import React from "react"
import {
  makeStyles,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core"
import BandButton from "./BandButton"
import BandCheckbox from "./BandCheckbox"

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
}))

CheckboxList.defaultProps = {
  busRouteColor: "#87cefa",
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
        // const labelId = `checkbox-list-label-${value}`

        return (
          <ListItem
            key={value}
            role={undefined}
            dense
            button
            onClick={handleToggle(value)}
          >
            <BandCheckbox />
            <BandButton
              title="Here I am"
              backgroundColor="#87cefa"
              busRouteNumber="100"
            ></BandButton>
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
