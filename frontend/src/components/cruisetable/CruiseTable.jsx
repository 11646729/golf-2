import React, { useState, useEffect, memo } from "react"
import {
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
  const [rowsPerPage, setRowsPerPage] = useState(6)

  const columns = [
    { id: "arrivalDate", label: "Date", minWidth: 50 },
    { id: "weekday", label: "Day", minWidth: 50 },
    { id: "vesselshortcruisename", label: "Vessel", minWidth: 70 },
    { id: "vesseletatime", label: "ETA", minWidth: 50 },
    { id: "vesseletdtime", label: "ETD", minWidth: 50 },
  ]

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <div className="widgetCt">
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                align={column.align}
                style={{ minWidth: column.minWidth }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.cruiseData
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                {columns.map((column) => {
                  const value = row[column.id]
                  return (
                    <TableCell key={column.id} align={column.align}>
                      {column.format && typeof value === "number"
                        ? column.format(value)
                        : value}
                    </TableCell>
                  )
                })}
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
