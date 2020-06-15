import React from "react"
import Album from "./components/Album"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"
import {
  AppBar,
  CssBaseline,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import SaveIcon from "@material-ui/icons/Save"
import EditIcon from "@material-ui/icons/Edit"
import HomeIcon from "@material-ui/icons/Home"
import MenuIcon from "@material-ui/icons/Menu"

import CoursesMapContainer from "./components/CoursesGMContainer"
import LeafletMap from "./components/LeafletMap"
import CruiseTable from "./components/CruiseTable"
// import CrimesMapContainer from "./components/CrimesGMContainer"
// import CrimesMapContainer from "./components/CrimesGMContainerTemp"
// import CrimesMapContainer from "./components/CrimesGMContainerLeigh"
import CrimesMapContainer from "./components/CrimesGMContainerPartLeigh"

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  // This group of buttons will be aligned to the right
  rightToolbar: {
    marginLeft: "auto",
    marginRight: -12,
  },
  menuButton: {
    marginRight: 16,
    marginLeft: -12,
  },
}))

export default function App() {
  const classes = useStyles()
  return (
    <Router>
      <CssBaseline />
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            aria-label="Menu"
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="Home"
            // tooltip="Home"
            // linkButton="true"
            href="/"
          >
            {<HomeIcon />}
          </IconButton>
          <Typography variant="h6" color="inherit" noWrap>
            My Website
          </Typography>
          <section className={classes.rightToolbar}>
            <IconButton color="inherit" aria-label="Edit">
              <EditIcon />
            </IconButton>
            <IconButton color="inherit" aria-label="Save">
              <SaveIcon />
            </IconButton>
            <IconButton color="inherit" aria-label="More Options">
              <MoreVertIcon />
            </IconButton>
          </section>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="golfcoursesmap" element={<CoursesMapLink />} />
        <Route path="leaflet" element={<LeafletMapLink />} />
        <Route path="cruisetable" element={<CruiseTableLink />} />
        <Route path="crimesmap" element={<CrimesMapLink />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

function Home() {
  return <Album />
}

function CoursesMapLink() {
  return (
    <CoursesMapContainer
      center={{
        lat: 54.665577,
        lng: -5.766897,
      }}
    />
  )
}

function LeafletMapLink() {
  return <LeafletMap />
}

function CruiseTableLink() {
  return <CruiseTable />
}

function CrimesMapLink() {
  return (
    <CrimesMapContainer
      center={{
        lat: 54.665577,
        lng: -5.766897,
      }}
    />
  )
}

function NotFound() {
  return (
    <div>
      <h1>Not found!</h1>
      <p>Sorry your page was not found!</p>
    </div>
  )
}
