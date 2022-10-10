import React, { memo } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import Title from "./Title"

const RawDataMessageBoxTitleContainer = styled.div`
  margin-top: 35px;
  margin-left: 20px;
  margin-right: 20px;
  width: "97%";
`

const RawDataMessageBox = (props) => {
  const { rawDataMessageBoxTitle, messageString } = props

  RawDataMessageBox.propTypes = {
    rawDataMessageBoxTitle: PropTypes.string,
    messageString: PropTypes.string,
  }

  return (
    <div>
      <RawDataMessageBoxTitleContainer>
        <Title>{rawDataMessageBoxTitle}</Title>
        {messageString}
      </RawDataMessageBoxTitleContainer>
    </div>
  )
}

export default memo(RawDataMessageBox)
