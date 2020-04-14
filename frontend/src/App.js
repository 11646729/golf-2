import React from "react"
import Album from "./components/Album"
import AppBar from "@material-ui/core/AppBar"
import CameraAltIcon from "@material-ui/icons/CameraAlt"
import CssBaseline from "@material-ui/core/CssBaseline"
import Typography from "@material-ui/core/Typography"
import Toolbar from "@material-ui/core/Toolbar"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"
import GoogleMapCard from "./components/GoogleMapCard"

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
}))

export default function App() {
  const classes = useStyles()
  return (
    <Router>
      <CssBaseline />
      <AppBar position="sticky">
        <Toolbar>
          <CameraAltIcon className={classes.icon} color="white" />
          <Typography variant="h6" color="inherit" noWrap>
            My Album
          </Typography>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="googlemap" element={<GoogleMap />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

function Home() {
  return <Album />
}

function GoogleMap() {
  return <GoogleMapCard />
}

function NotFound() {
  return (
    <div>
      <h1>Not found!</h1>
      <p>Sorry your page was not found!</p>
    </div>
  )
}
