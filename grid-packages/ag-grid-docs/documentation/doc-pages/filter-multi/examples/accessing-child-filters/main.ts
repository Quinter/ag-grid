import { GridOptions } from '@ag-grid-community/core'

const gridOptions: GridOptions = {
  columnDefs: [
    {
      field: 'athlete',
      filter: 'agMultiColumnFilter',
      filterParams: {
        filters: [
          {
            filter: 'agTextColumnFilter',
            filterParams: {
              buttons: ['apply', 'clear'],
            },
          },
          {
            filter: 'agSetColumnFilter',
          },
        ],
      },
    },
  ],
  defaultColDef: {
    flex: 1,
    minWidth: 200,
    resizable: true,
    menuTabs: ['filterMenuTab'],
  },
}

function getTextUiModel() {
  var textFilter = (gridOptions.api!.getFilterInstance(
    'athlete'
  ) as any).getChildFilterInstance(0)
  console.log('Current Text Filter model: ', textFilter.getModelFromUi())
}

function getSetMiniFilter() {
  var setFilter = (gridOptions.api!.getFilterInstance(
    'athlete'
  ) as any).getChildFilterInstance(1)
  console.log('Current Set Filter search text: ', setFilter.getMiniFilter())
}

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', function () {
  var gridDiv = document.querySelector('#myGrid')
  new agGrid.Grid(gridDiv, gridOptions)

  fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
    .then(response => response.json())
    .then(data => gridOptions.api!.setRowData(data))
})
