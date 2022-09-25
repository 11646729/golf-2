import React, { memo } from "react"
import styled from "styled-components"

import NearbyCrimesMap from "../components/crimesmap/NearbyCrimesMap"

const NearbyCrimesContainer = styled.div`
  display: flex;
`

const NearbyCrimesMapContainer = styled.div`
  flex: 2;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  min-height: 500px;
`

// -------------------------------------------------------
// React Controller component
// -------------------------------------------------------
const NearbyCrimesPage = () => (
  <NearbyCrimesContainer>
    <NearbyCrimesMapContainer>
      <NearbyCrimesMap nearbyCrimesMapTitle="Nearby Crimes" />
    </NearbyCrimesMapContainer>
  </NearbyCrimesContainer>
)

export default memo(NearbyCrimesPage)
