import React from "react"
import { Paper, makeStyles } from "@material-ui/core"
import Radio from "@material-ui/core/Radio"
import RadioGroup from "@material-ui/core/RadioGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import FormControl from "@material-ui/core/FormControl"
import LoadingTitle from "./LoadingTitle"
import RouteSelectionList from "./RouteSelectionList"

const useStyles = makeStyles({
  routeSelectionList: {
    marginRight: 20,
    marginBottom: 50,
    height: "600px",
    square: true,
    border: "1px solid #ccc",
    maxHeight: "100%",
    overflow: "auto",
  },
  radioButtonGroup: {
    marginLeft: 70,
  },
})

export default function RouteSelectionPanel(props) {
  const classes = useStyles()

  const [radioButtonValue, setRadioButtonValue] = React.useState("Hamilton")

  const handleRadioChange = (event) => {
    setRadioButtonValue(event.target.value)
  }

  console.log("Radio Button: ", radioButtonValue)

  // Sort the busRoutesCollection array by increasing busRouteNumber
  let sortedBusRoutesCollection = props.busRoutesCollection
  sortedBusRoutesCollection.sort((a, b) =>
    a.routeNumber > b.routeNumber ? 1 : -1
  )

  return (
    <Paper className={classes.routeSelectionList}>
      {/* <LoadingTitle> Local Routes</LoadingTitle> */}
      <FormControl component="fieldset" className={classes.radioButtonGroup}>
        <RadioGroup row defaultValue="Hamilton" onChange={handleRadioChange}>
          <FormControlLabel
            value="Hamilton"
            control={<Radio color="primary" />}
            label="Hamilton"
            labelPlacement="end"
          />
          <FormControlLabel
            value="Translink"
            control={<Radio color="primary" />}
            label="Translink"
            labelPlacement="end"
          />
        </RadioGroup>
      </FormControl>
      {sortedBusRoutesCollection
        ? sortedBusRoutesCollection.map((busRoute) => (
            <RouteSelectionList
              key={busRoute.routeKey}
              routeVisible={busRoute.routeVisible}
              routeColor={busRoute.routeColor}
              routeNumber={busRoute.routeNumber}
              routeName={busRoute.routeLongName}
              routeVia={busRoute.routeNumber}
            />
          ))
        : null}
    </Paper>
  )
}
