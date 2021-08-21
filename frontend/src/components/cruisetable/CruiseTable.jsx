import React, { useState, useEffect, memo } from "react"
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  makeStyles,
  Grid,
} from "@material-ui/core"

import Title from "../Title"
import LoadingTitle from "../LoadingTitle"
import getData from "../Utilities"

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

  const useStyles = makeStyles({
    root: {
      width: "100%",
    },
    container: {
      marginTop: 50,
      maxHeight: 440,
    },
    headerSelection: {
      marginTop: 55,
      marginLeft: 20,
      width: "97%",
    },
  })

  const classes = useStyles()

  const columns = [
    { id: "sentencecaseport", label: "Port", minWidth: 50 },
    { id: "vesselshortcruisename", label: "Vessel", minWidth: 70 },
    { id: "weekday", label: "Day", minWidth: 50 },
    { id: "vesseleta", label: "ETA", minWidth: 50 },
    { id: "vesseletd", label: "ETD", minWidth: 50 },
  ]

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <Paper className={classes.root}>
      <div>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12}>
            <div className={classes.headerSelection}>
              <Title>Cruise Ship Arrivals</Title>
              {props.loadingError ? (
                <LoadingTitle>Error Loading...</LoadingTitle>
              ) : null}
            </div>
          </Grid>
          <Grid item xs={12} sm={12}>
            <TableContainer className={classes.container}>
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
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.code}
                      >
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
            </TableContainer>
          </Grid>
        </Grid>
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
    </Paper>
  )
}

export default memo(CruiseTable)
