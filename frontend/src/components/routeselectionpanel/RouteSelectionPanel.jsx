import React from "react"
// import { Paper, makeStyles } from "@material-ui/core"
import LoadingTitle from "../loadingtitle/LoadingTitle"
import RouteSelectionList from "../RouteSelectionList"

// const useStyles = makeStyles({
//   routeSelectionList: {
//     marginLeft: 20,
//     marginRight: 20,
//     marginBottom: 50,
//     height: "600px",
//     square: true,
//     border: "1px solid #ccc",
//     maxHeight: "100%",
//     overflow: "auto",
//   },
// })

export default function RouteSelectionPanel(props) {
  // const classes = useStyles()

  return (
    // <Paper className={classes.routeSelectionList}>
    <div className="widgetLg">
      {/* <h3 className="widgetLgTitle">{"Cruise Ships Arriving Soon"}</h3> */}
      <LoadingTitle>Available Bus Routes</LoadingTitle>

      {props.busRoutesCollection
        ? props.busRoutesCollection.map((busRoute) => (
            <RouteSelectionList
              className="widgetRSL"
              key={busRoute.route_id}
              routeVisible={true}
              routeColor={busRoute.route_color}
              routeNumber={busRoute.route_short_name}
              routeName={busRoute.route_long_name}
              routeVia={busRoute.route_short_name}
            />
          ))
        : null}
    </div>
    // </Paper>
  )
}
