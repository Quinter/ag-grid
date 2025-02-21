import { GridOptions } from '@ag-grid-community/core'

function getColumnDefs() {
  return [
    { field: 'athlete', initialWidth: 100, initialSort: 'asc' },
    { field: 'age' },
    { field: 'country', initialPinned: 'left' },
    { field: 'sport' },
    { field: 'year' },
    { field: 'date' },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' },
  ]
}

const gridOptions: GridOptions = {
  defaultColDef: {
    initialWidth: 100,
    sortable: true,
    resizable: true,
  },
  columnDefs: getColumnDefs(),
}

function onBtWithDefault() {
  gridOptions.api!.setColumnDefs(getColumnDefs())
}

function onBtRemove() {
  gridOptions.api!.setColumnDefs([])
}

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', () => {
  const gridDiv = document.querySelector('#myGrid')
  new agGrid.Grid(gridDiv, gridOptions)

  fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
    .then(response => response.json())
    .then(data => gridOptions.api!.setRowData(data))
})
