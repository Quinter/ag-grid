import {
  ColDef,
  GridOptions,
  IDoesFilterPassParams,
  IFilterComp,
  IFilterParams,
  RowNode,
} from '@ag-grid-community/core'

const isNumeric = (n: string) =>
  !isNaN(parseFloat(n)) && isFinite(parseFloat(n))

const getNumberFilter = () => {
  return class NumberFilter implements IFilterComp {
    valueGetter!: (rowNode: RowNode) => any
    filterText: string | null = null
    eFilterText: any
    params!: IFilterParams
    gui: any
    onFilterChanged!: () => void

    init(params: IFilterParams) {
      this.valueGetter = params.valueGetter
      this.filterText = null
      this.params = params
      this.setupGui()
    }

    // not called by AG Grid, just for us to help setup
    setupGui() {
      this.gui = document.createElement('div')
      this.gui.innerHTML =
        '<div style="padding: 4px;">' +
        '<div style="font-weight: bold;">Greater than: </div>' +
        '<div><input style="margin: 4px 0px 4px 0px;" type="number" id="filterText" placeholder="Number of medals..."/></div>' +
        '</div>'

      const that = this
      this.onFilterChanged = function () {
        that.extractFilterText()
        that.params.filterChangedCallback()
      }

      this.eFilterText = this.gui.querySelector('#filterText')
      this.eFilterText.addEventListener('input', this.onFilterChanged)
    }

    extractFilterText() {
      this.filterText = this.eFilterText.value
    }

    getGui() {
      return this.gui
    }

    doesFilterPass(params: IDoesFilterPassParams) {
      const valueGetter = this.valueGetter
      const value = valueGetter(params.node)
      const filterValue = this.filterText

      if (this.isFilterActive()) {
        if (!value) return false
        return Number(value) > Number(filterValue)
      }
      return false
    }

    isFilterActive() {
      return (
        this.filterText !== null &&
        this.filterText !== undefined &&
        this.filterText !== '' &&
        isNumeric(this.filterText)
      )
    }

    getModel() {
      return this.isFilterActive() ? Number(this.eFilterText.value) : null
    }

    setModel(model: any) {
      this.eFilterText.value = model
      this.extractFilterText()
    }

    destroy() {
      this.eFilterText.removeEventListener('input', this.onFilterChanged)
    }

    getModelAsString() {
      return this.isFilterActive() ? '>' + this.filterText : ''
    }
  }
}
const columnDefs: ColDef[] = [
  { field: 'athlete', width: 150, filter: false },
  {
    field: 'gold',
    width: 100,
    filter: 'customNumberFilter',
    suppressMenu: true,
  },
  {
    field: 'silver',
    width: 100,
    filter: 'customNumberFilter',
    suppressMenu: true,
  },
  {
    field: 'bronze',
    width: 100,
    filter: 'customNumberFilter',
    suppressMenu: true,
  },
  {
    field: 'total',
    width: 100,
    filter: 'customNumberFilter',
    suppressMenu: true,
  },
]

const gridOptions: GridOptions = {
  defaultColDef: {
    editable: true,
    sortable: true,
    flex: 1,
    minWidth: 100,
    filter: true,
    floatingFilter: true,
    resizable: true,
  },
  components: {
    customNumberFilter: getNumberFilter(),
  },
  columnDefs: columnDefs,
  rowData: null,
}

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', () => {
  const gridDiv = document.querySelector('#myGrid')
  new agGrid.Grid(gridDiv, gridOptions)

  fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
    .then(response => response.json())
    .then(data => {
      gridOptions.api!.setRowData(data)
    })
})
