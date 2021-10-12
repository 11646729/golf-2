import React, { memo } from "react"
import styled from "styled-components"

import Title from "./Title"

const TemperaturesTableContainer = styled.div`
  /* padding-left: 20px; */
  min-width: 200px;
  margin-left: 20px;
  margin-right: 10px;
  margin-bottom: 20px;
`

const TemperaturesTableTitleContainer = styled.div`
  margin-top: 35px;
  margin-left: 20px;
  margin-right: 20px;
  width: "97%";
`

function TemperaturesTable(props) {
  return (
    <div>
      <TemperaturesTableTitleContainer>
        <Title>{props.temperaturesTableTitle}</Title>
      </TemperaturesTableTitleContainer>
      <TemperaturesTableContainer>
        temperatures selection
      </TemperaturesTableContainer>
    </div>
  )
}

export default memo(TemperaturesTable)
