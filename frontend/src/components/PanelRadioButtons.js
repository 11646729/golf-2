import React from "react"
import { makeStyles } from "@material-ui/core"
import Radio from "@material-ui/core/Radio"
import RadioGroup from "@material-ui/core/RadioGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import FormControl from "@material-ui/core/FormControl"

const useStyles = makeStyles({
  radioButtonGroup: {
    marginLeft: 70,
  },
})

export default function PanelRadioButtons(props) {
  const classes = useStyles(props)

  const [radioButtonValue, setRadioButtonValue] = React.useState(
    props.busRoutesSelectedAgency
  )

  const handleRadioChange = (event) => {
    setRadioButtonValue(event.target.value)
  }

  return (
    <FormControl component="fieldset" className={classes.radioButtonGroup}>
      <RadioGroup
        row
        defaultValue="Hamilton Street Railway"
        // {props.busRoutesSelectedAgency}
        onChange={handleRadioChange}
      >
        <FormControlLabel
          value={props.busRoutesSelectedAgency}
          control={<Radio color="primary" />}
          label={props.busRoutesSelectedAgency}
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
  )
}
