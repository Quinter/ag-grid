import { ColDef, GridOptions } from '@ag-grid-community/core'

const columnDefs: ColDef[] = [
  { field: 'athlete', sort: 'desc' },
  { field: 'age', width: 90 },
  { field: 'country' },
  { field: 'year', width: 90, unSortIcon: true },
  { field: 'date', comparator: dateComparator },
  { field: 'sport' },
  { field: 'gold' },
  { field: 'silver' },
  { field: 'bronze' },
  { field: 'total' },
]

function dateComparator(date1: string, date2: string) {
  var date1Number = monthToComparableNumber(date1)
  var date2Number = monthToComparableNumber(date2)

  if (date1Number === null && date2Number === null) {
    return 0
  }
  if (date1Number === null) {
    return -1
  }
  if (date2Number === null) {
    return 1
  }

  return date1Number - date2Number
}

// eg 29/08/2004 gets converted to 20040829
function monthToComparableNumber(date: string) {
  if (date === undefined || date === null || date.length !== 10) {
    return null
  }

  var yearNumber = Number.parseInt(date.substring(6, 10))
  var monthNumber = Number.parseInt(date.substring(3, 5))
  var dayNumber = Number.parseInt(date.substring(0, 2))

  var result = yearNumber * 10000 + monthNumber * 100 + dayNumber
  return result
}

const gridOptions: GridOptions = {
  columnDefs: columnDefs,
  defaultColDef: {
    width: 170,
    sortable: true,
  },
}

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', function () {
  var gridDiv = document.querySelector('#myGrid')
  new agGrid.Grid(gridDiv, gridOptions)

  fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
    .then(response => response.json())
    .then(data => gridOptions.api!.setRowData(data))
})
