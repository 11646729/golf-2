import React from "react"
import { makeStyles, List, ListItem, ListItemText } from "@material-ui/core"
import BandListItem from "./BandListItem"
import BandListItemText from "./BandListItemText"

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  item: {
    padding: 0,
  },
}))

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
    <div className={classes.root}>
      {/* <List>
        <BandListItem
          classes={{ root: classes.item }}
          // className={{ root: classes.item }}
          busRouteColor={props.busRouteColor}
          busRouteNumber={props.busRouteNumber}
          busRouteName={props.busRouteName}
          busRouteVia={props.busRouteVia}
        />
      </List> */}
      <List component="nav">
        <ListItem button classes={{ root: classes.item }}>
          <BandListItemText busRouteName={props.busRouteName} />
        </ListItem>
        {/* <ListItem button classes={{ root: classes.item }}>
          <ListItemText primary="Item 02" />
        </ListItem>
        <ListItem button classes={{ root: classes.item }}>
          <ListItemText primary="Item 03" />
        </ListItem> */}
      </List>
    </div>
  )
}
