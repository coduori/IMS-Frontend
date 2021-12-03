import {React, useEffect, useContext, useState, useMemo} from 'react';
import { useTable, useSortBy } from 'react-table';
import { COLUMNS } from '../../components/Reports/ReportTableColumns';

import './ReportTable.css';

function ReportTable({ data }) {

    const columns = useMemo(() => COLUMNS, [])
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
      } = useTable(
        {
          columns,
          data,
        },
        useSortBy
      )

    return (
        <table {...getTableProps()} id="reports-table">
            <thead>
                {
                    headerGroups.map((headerGroup) => {
                        return (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((headerColumn) => {
                                    return (
                                        <th {...headerColumn.getHeaderProps(headerColumn.getSortByToggleProps())}>
                                            {headerColumn.render('Header')}
                                            <span>
                                                {headerColumn.isSorted
                                                ? headerColumn.isSortedDesc
                                                    ? ' 🔽'
                                                    : ' 🔼'
                                                : ''}
                                            </span>
                                        </th>
                                    )
                                })}
                            </tr>
                        )
                    })
                }

            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map((cell) => {
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            })}
                        </tr>
                    )
                })}
                
            </tbody>
        </table>
    )
}

export default ReportTable;