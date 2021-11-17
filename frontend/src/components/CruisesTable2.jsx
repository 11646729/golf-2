import React, { memo } from "react"
import { useTable } from "react-table"
// import styled from "styled-components"
import "./cruisestable/cruisestable.css"

const Button = ({ type }) => {
  return <button className={"widgetLgButton " + type}>{type}</button>
}

const CruisesTable2 = ({ data, loadingError }) => {
  const columns = React.useMemo(
    () => [
      {
        Header: "Day",
        accessor: "arrivalDate",
      },
      {
        Header: "Ship",
        accessor: "vesselshortcruisename",
        Cell: (tableProps) => (
          <img
            src={tableProps.row.original.cruiselinelogo}
            alt={"Cruise Line Logo"}
            width="30px"
            height="30px"
          />
        ),
      },
      {
        Header: "Arrival Time",
        accessor: "vesseletatime",
      },
      {
        Header: "Departure Time",
        accessor: "vesseletdtime",
      },
      {
        Header: "Itinerary",
        accessor: "cruiselinelogo",
        Cell: () => <Button type="Show" />,
      },
    ],
    []
  )

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data })

  return (
    <table
      {...getTableProps()}
      style={{
        width: "94%",
        marginLeft: "20px",
        marginRight: "20px",
        borderSpacing: "20px",
        border: "1px solid lightgray",
        borderCollapse: "collapse",
      }}
    >
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps()}
                style={{
                  fontSize: "14px",
                  padding: "10px",
                  color: "black",
                }}
              >
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <td
                    {...cell.getCellProps()}
                    style={{
                      fontSize: "13px",
                      padding: "10px",
                      border: "solid 1px lightgray",
                      background: "papayawhip",
                      textAlign: "center",
                    }}
                  >
                    {cell.render("Cell")}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default memo(CruisesTable2)
