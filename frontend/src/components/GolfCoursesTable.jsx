import React, { memo } from "react"
import styled from "styled-components"

import Title from "./title/Title"

const GolfCourseTableContainer = styled.div`
  min-width: 200px;
  margin-left: 20px;
  margin-right: 10px;
  margin-bottom: 20px;
`

const GolfCourseTableTitleContainer = styled.div`
  margin-top: 35px;
  margin-left: 20px;
  margin-right: 20px;
  width: "97%";
`

function GolfCoursesTable(props) {
  return (
    <div>
      <GolfCourseTableTitleContainer>
        <Title>{props.golfCoursesTableTitle}</Title>
      </GolfCourseTableTitleContainer>
      <GolfCourseTableContainer>
        golf courses selection
      </GolfCourseTableContainer>
    </div>
  )
}

export default memo(GolfCoursesTable)
