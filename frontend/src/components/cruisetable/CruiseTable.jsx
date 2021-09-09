import React, { useState, useEffect, memo } from "react"
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@material-ui/core"

// import Title from "../Title"
// import LoadingTitle from "../LoadingTitle"
import getData from "../Utilities"
import "./cruisetable.css"

// -------------------------------------------------------
// React Controller component
// -------------------------------------------------------
function CruiseTable() {
  const [portArrivals, setData] = useState([])
  const [loadingError, setLoadingError] = useState("")

  useEffect(() => {
    let isSubscribed = true

    getData("http://localhost:5000/api/cruise/portArrivals")
      .then((returnedData) => (isSubscribed ? setData(returnedData) : null))
      .catch((err) => (isSubscribed ? setLoadingError(err) : null))

    return () => (isSubscribed = false)
  }, [])

  return (
    <CruiseTableView cruiseData={portArrivals} loadingError={loadingError} />
  )
}

// -------------------------------------------------------
// React View component
// -------------------------------------------------------
function CruiseTableView(props) {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <div className="widgetCt">
      <Table size="small" stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell style={{ minWidth: 70 }} align="left">
              Date
            </TableCell>
            <TableCell style={{ minWidth: 50 }} align="left">
              Day
            </TableCell>
            {/* <TableCell style={{ minWidth: 20 }} align="left">
              Img
            </TableCell> */}
            <TableCell style={{ minWidth: 50 }} align="left">
              Vessel
            </TableCell>
            <TableCell style={{ minWidth: 30 }} align="left">
              ETA
            </TableCell>
            <TableCell style={{ minWidth: 30 }} align="left">
              ETD
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.cruiseData
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => (
              <TableRow key={row.portarrivalid}>
                <TableCell align="left">{row.arrivalDate}</TableCell>
                <TableCell align="left">{row.weekday}</TableCell>
                <TableCell className="widgetCruiseTableRow">
                  <Box
                    component="img"
                    sx={{ height: 20, width: 20 }}
                    src={row.cruiselinelogo}
                  />
                  {row.vesselshortcruisename}
                </TableCell>
                {/* <TableCell className="widgetLgShipName"> */}
                {/* {row.vesselshortcruisename} */}
                {/* </TableCell> */}
                <TableCell align="left">{row.vesseletatime}</TableCell>
                <TableCell align="left">{row.vesseletdtime}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={props.cruiseData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  )
}

export default memo(CruiseTable)
