import React, { memo } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import Title from "./Title"

const RouteTableTitleContainer = styled.div`
  margin-top: 35px;
  margin-left: 20px;
  margin-right: 20px;
  width: "97%";
`

const RouteTableContainer = styled.div`
  min-width: 200px;
  margin-left: 20px;
  margin-right: 10px;
  margin-bottom: 20px;
`

const BusRoutesTable = (props) => {
  const { routesTableTitle } = props

  BusRoutesTable.propTypes = {
    routesTableTitle: PropTypes.string,
  }

  return (
    <div>
      <RouteTableTitleContainer>
        <Title>{routesTableTitle}</Title>
      </RouteTableTitleContainer>
      <RouteTableContainer>route selection</RouteTableContainer>
    </div>
  )
}

export default memo(BusRoutesTable)
