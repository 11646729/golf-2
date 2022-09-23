import React, { memo } from "react"
import styled from "styled-components"

import RawDataTable from "../components/RawDataTable"

const RawDataContainer = styled.div`
  display: flex;
`

const RawDataTableContainer = styled.div`
  flex: 2;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  min-height: 500px;
`

// -------------------------------------------------------
// React Controller component
// -------------------------------------------------------
const RawDataPage = () => (
  <RawDataContainer>
    <RawDataTableContainer>
      <RawDataTable rawDataTableTitle="Raw Data Import" />
    </RawDataTableContainer>
  </RawDataContainer>
)

export default memo(RawDataPage)
