import React, { useState, useEffect } from "react"
import axios from "axios"
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

const columns = [
  { id: "name", label: "Name", minWidth: 70 },
  { id: "code", label: "ISO\u00a0Code", minWidth: 50 },
  {
    id: "population",
    label: "Population",
    minWidth: 100,
    align: "right",
    format: (value) => value.toLocaleString(),
  },
  {
    id: "size",
    label: "Size\u00a0(km\u00b2)",
    minWidth: 100,
    align: "right",
    format: (value) => value.toLocaleString(),
  },
  {
    id: "density",
    label: "Density",
    minWidth: 100,
    align: "right",
    format: (value) => value.toFixed(2),
  },
]

function createData(name, code, population, size) {
  const density = population / size
  return { name, code, population, size, density }
}

// const portArrivalSchema = new Schema(
//   {
//     databaseVersion: { type: Number },
//     portName: { type: String },
//     portUnLocode: { type: String },
//     portCoordinates: { type: CoordsSchema.schema },
//     vesselShortCruiseName: { type: String },
//     vesselEta: { type: String },
//     vesselEtd: { type: String },
//     vesselNameUrl: { type: String },
//   },
//   {
//     timestamps: true,
//   }
// )

// TODO
// Cruise Line
// Port Name - without code
// Cruise Line Logo
// Separate eta & date
// Separate etd & data
// Add Day of the Week
// Add Notification of change (except End of Month rollover)
// Details of this Cruise?
// Current Position - to plot on a map

// {
//   "_id":
//   {
//     "$oid":"6040ac78f4f40d591028ebba"
//   },
//   "databaseVersion":1,
//   "portName":"geiranger-port-547",
//   "portUnLocode":"NOGNR",
//   "portCoordinates":
//   {
//     "lat":62.100833,
//     "lng":7.203439
//   },
//   "vesselShortCruiseName":"AIDAsol",
//   "vesselEta":"2021-04-14T12:00:00.000Z",
//   "vesselEtd":"2021-04-14T20:00:00.000Z",
//   "vesselNameUrl":"https://www.cruisemapper.com/ships/AIDAsol-732",
//   "createdAt":
//   {
//     "$date":"2021-03-04T09:46:32.730Z"
//   },
//   "updatedAt":
//   {
//     "$date":"2021-03-04T09:46:32.730Z"
//   },
//   "__v":0
// }

const rows = [
  createData("India", "IN", 1324171354, 3287263),
  createData("China", "CN", 1403500365, 9596961),
  createData("Italy", "IT", 60483973, 301340),
  createData("United States", "US", 327167434, 9833520),
  createData("Canada", "CA", 37602103, 9984670),
  createData("Australia", "AU", 25475400, 7692024),
  createData("Germany", "DE", 83019200, 357578),
  createData("Ireland", "IE", 4857000, 70273),
  createData("Mexico", "MX", 126577691, 1972550),
  createData("Japan", "JP", 126317000, 377973),
  createData("France", "FR", 67022000, 640679),
  createData("United Kingdom", "GB", 67545757, 242495),
  createData("Russia", "RU", 146793744, 17098246),
  createData("Nigeria", "NG", 200962417, 923768),
  createData("Brazil", "BR", 210147125, 8515767),
]

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

export default function CruiseTableCard() {
  const classes = useStyles()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const [portArrivals, setData] = useState([])
  const [loadingData, setLoadingData] = useState(false)
  const [loadingError, setLoadingError] = useState("")

  const getAllData = async () => {
    const source = axios.CancelToken.source()
    setLoadingData(true)
    await axios
      .get("http://localhost:5000/api/cruise/portArrivals", {
        cancelToken: source.token,
      })
      .then((response) => {
        setData(response.data)
        setLoadingData(false)
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log(error) // Component unmounted, request is cancelled
        } else {
          setLoadingError(error)
        }
      })
    return () => {
      source.cancel("Component unmounted, request is cancelled")
    }
  }

  useEffect(() => {
    getAllData()
  }, [])

  console.log(portArrivals[0])

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
              {loadingData ? <LoadingTitle>Loading...</LoadingTitle> : null}
              {loadingError ? (
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
                  {rows
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
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </div>
    </Paper>
  )
}
