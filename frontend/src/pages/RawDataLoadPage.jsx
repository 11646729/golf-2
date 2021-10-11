import React, { memo } from "react"

import styled from "styled-components"

const RawDataContainer = styled.div`
  display: flex;
`

function RawDataLoadPage() {
  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>
  }

  return (
    <RawDataContainer>
      <div>In RawDataLoadPage.jsx</div>
      <Button type="Show" />
    </RawDataContainer>
  )
}

export default memo(RawDataLoadPage)
