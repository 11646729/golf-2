import React from "react"
import styled from "styled-components"
import { NotificationsNone, Language, Settings } from "@material-ui/icons"

const Container = styled.div`
  width: 100%;
  height: 50px;
  background-color: white;
  position: sticky;
  top: 0;
  z-index: 999;
`

const TopBarWrapper = styled.div`
  height: 100%;
  padding: 0px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Logo = styled.span`
  font-weight: bold;
  font-size: 30px;
  color: darkblue;
  cursor: pointer;
`

const TopRight = styled.div`
  display: flex;
  align-items: center;
`

const TopBarIconContainer = styled.div`
  position: relative;
  cursor: pointer;
  margin-right: 10px;
  color: #555;
`

const TopIconBadge = styled.div`
  height: 15px;
  width: 15px;
  position: absolute;
  top: -5px;
  right: 0px;
  background-color: red;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
`
const TopAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
`

export default function TopBar() {
  return (
    <Container>
      <TopBarWrapper>
        {/* <div className="topLeft"> */}
        <Logo>My Website</Logo>
        {/* </div> */}
        <TopRight>
          <TopBarIconContainer>
            <NotificationsNone />
            <TopIconBadge>1</TopIconBadge>
          </TopBarIconContainer>
          <TopBarIconContainer>
            <Language />
            <TopIconBadge>2</TopIconBadge>
          </TopBarIconContainer>
          <TopBarIconContainer>
            <Settings />
          </TopBarIconContainer>
          <TopAvatar src="/static/images/brian.jpeg" alt="" />
        </TopRight>
      </TopBarWrapper>
    </Container>
  )
}
