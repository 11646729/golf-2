import React, { memo } from "react"
import styled from "styled-components"

import Title from "./Title"
// import LoadingTitle from "../LoadingTitle"

const RouteTableTitleContainer = styled.div`
  margin-top: 35px;
  margin-left: 20px;
  margin-right: 20px;
  width: "97%";
`

const RouteTableContainer = styled.div`
  /* padding-left: 20px; */
  min-width: 200px;
  margin-left: 20px;
  margin-right: 10px;
  margin-bottom: 20px;
`

function TransportTable(props) {
  return (
    <div>
      <RouteTableTitleContainer>
        {/* <h3>{props.routesTableTitle}</h3> */}
        <Title>{props.routesTableTitle}</Title>
        {/* {props.loadingError ? (
          <LoadingTitle>Error Loading...</LoadingTitle>
        ) : null} */}
      </RouteTableTitleContainer>
      <RouteTableContainer>route selection</RouteTableContainer>
    </div>
  )
}

export default memo(TransportTable)
