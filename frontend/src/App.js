import React, { Component } from "react"
import Album from "./components/Album"
// import BrowserPosition from "./components/BrowserPosition"

export default class App extends Component {
  render() {
    return (
      <React.Fragment>
        {/* <BrowserPosition /> */}
        <Album />
      </React.Fragment>
    )
  }
}
