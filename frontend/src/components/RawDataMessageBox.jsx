import React, { memo } from "react"
// import PropTypes from "prop-types"
import styled from "styled-components"

import Title from "./Title"

const RawDataMessageBoxTitle = "Status Messages"
const RawDataMessageString = "Here is the first message"

const RawDataMessageBoxContainer = styled.div`
  font-size: 20px;
  font-weight: 600;
  padding-left: 20px;
  padding-top: 30px;
`

const RawDataMessageBoxStyle = styled.textarea`
  margin-left: 30px;
  width: 92%;
  height: 90%;
  border: 1px solid lightgray;
  font-size: 13px;
`

const RawDataMessageBox = (props) => {
  // const { messageString } = props

  // RawDataMessageBox.propTypes = {
  //   messageString: PropTypes.string,
  // }

  return (
    <RawDataMessageBoxContainer>
      <Title>{RawDataMessageBoxTitle}</Title>
      <RawDataMessageBoxStyle rows="6">
        {RawDataMessageString}
      </RawDataMessageBoxStyle>
    </RawDataMessageBoxContainer>
  )
}

export default memo(RawDataMessageBox)
