import React, { memo } from "react"

import styled from "styled-components"

const RawDataLoadContainer = styled.div`
  display: flex;
`

function RawDataLoadPage() {
  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>
  }

  return (
    <RawDataLoadContainer>
      <div>In RawDataLoadPage.jsx</div>
      <Button type="Show" />
    </RawDataLoadContainer>
  )
}

export default memo(RawDataLoadPage)
