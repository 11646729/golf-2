import React, { memo } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import {
  // Container,
  Grid,
  // styled,
} from "@material-ui/core"

import Title from "./Title"
// import LoadingTitle from "../components/LoadingTitle"

const NearbyCrimesTitleContainer = styled.div`
  margin-top: 35px;
  margin-left: 20px;
  margin-right: 20px;
  width: "97%";
`

// -------------------------------------------------------
// React Controller component
// -------------------------------------------------------
const NearbyCrimesInputPanel = (props) => {
  const {
    nearbyCrimesPanelTitle,
    homeCheckboxLabel,
    homeCheckboxStatus,
    latestCheckboxLabel,
    latestCheckboxStatus,
  } = props

  NearbyCrimesInputPanel.propTypes = {
    nearbyCrimesPanelTitle: PropTypes.string,
    homeCheckboxLabel: PropTypes.string,
    homeCheckboxStatus: PropTypes.bool,
    latestCheckboxLabel: PropTypes.string,
    latestCheckboxStatus: PropTypes.bool,
  }

  return (
    <div>
      <NearbyCrimesTitleContainer>
        <Title>{nearbyCrimesPanelTitle}</Title>
      </NearbyCrimesTitleContainer>

      <Grid item xs={12} sm={12} style={{ marginTop: 50 }}>
        <input
          type="checkbox"
          name="homeCheckbox"
          // checked={homeCheckboxStatus}
          defaultChecked={homeCheckboxStatus}
          value="Boat"
        />
        <label htmlFor="homeCheckbox">{homeCheckboxLabel}</label>

        <input
          type="checkbox"
          name="latestCheckbox"
          defaultChecked={latestCheckboxStatus}
          value="Boat"
        />
        <label htmlFor="latestCheckbox">{latestCheckboxLabel}</label>

        {/* {dataLoading ? <LoadingTitle>Loading...</LoadingTitle> : null}
        {errorLoading ? <LoadingTitle>Error Loading...</LoadingTitle> : null} */}

        {/* <FormControlLabel
          style={styles.displayHomeLocationCheckBox}
          control={
            <Checkbox
              color="primary"
              checked={homeCheckbox}
              onChange={handleHomeCheckboxChange}
              name="homeCheckbox"
            />
          }
          label="Home Location"
          labelPlacement="end"
        /> */}
        {/* <FormControlLabel
        style={styles.displayLatestDataCheckBox}
        control={
          <Checkbox
            color="primary"
            checked={latestDataCheckbox}
            onChange={handleLatestDataCheckboxChange}
            name="latestDataCheckbox"
          />
        }
        label="Latest Data"
        labelPlacement="end"
      />
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <DatePicker
          style={styles.displayDatePicker}
          name="datePicker"
          views={["year", "month"]}
          label="Year and Month"
          minDate={new Date("2018-01-01")}
          maxDate={new Date("2020-06-01")}
          disabled={latestDataCheckboxEnabled}
          value={selectedDate}
          onChange={(val) => {
            setDateChange(val)
            handleDateInfoChange(val)
          }}
        />
      </MuiPickersUtilsProvider> */}
      </Grid>
    </div>
  )
}

export default memo(NearbyCrimesInputPanel)
