import { ColDef, GridOptions, IViewportDatasource, IViewportDatasourceParams } from '@ag-grid-community/core'

const columnDefs: ColDef[] = [
  {
    headerName: 'ID',
    field: 'id',
  },
  {
    headerName: 'Expected Position',
    valueGetter: '"translateY(" + node.rowIndex * 100 + "px)"',
  },

  {
    field: 'a',
  },
  {
    field: 'b',
  },
  {
    field: 'c',
  },
]

const gridOptions: GridOptions = {
  debug: true,
  rowHeight: 100,
  columnDefs: columnDefs,
  rowModelType: 'viewport',
  viewportDatasource: createViewportDatasource(),
}

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', function () {
  var gridDiv = document.querySelector('#myGrid')
  new agGrid.Grid(gridDiv, gridOptions)
})

function createViewportDatasource() {

  class MyViewportDataSource implements IViewportDatasource {
    initParams!: IViewportDatasourceParams
    init(params: IViewportDatasourceParams) {
      this.initParams = params
      var oneMillion = 1000 * 1000
      params.setRowCount(oneMillion)
    }

    setViewportRange(
      firstRow: number,
      lastRow: number
    ) {
      var rowData: any = {}

      for (var rowIndex = firstRow; rowIndex <= lastRow; rowIndex++) {
        var item: any = {}
        item.id = rowIndex
        item.a = 'A-' + rowIndex
        item.b = 'B-' + rowIndex
        item.c = 'C-' + rowIndex
        rowData[rowIndex] = item
      }

      this.initParams.setRowData(rowData)
    }

    destroy() { }
  }

  return new MyViewportDataSource()
}
