var gridOptions = {
    columnDefs: [
        {field: "athlete", minWidth: 150},
        {field: "age", maxWidth: 90},
        {field: "country", minWidth: 150},
        {field: "year", maxWidth: 90},
        {field: "date", minWidth: 150},
        {field: "sport", minWidth: 150},
        {field: "gold"},
        {field: "silver"},
        {field: "bronze"},
        {field: "total"}
    ],
    defaultColDef: {
        flex: 1,
        minWidth: 100,
    },
    rowSelection: 'single',
    rowData: null,
    navigateToNextCell: navigateToNextCell
};

function navigateToNextCell(params) {
    var suggestedNextCell = params.nextCellPosition;

    var KEY_UP = 'ArrowUp';
    var KEY_DOWN = 'ArrowDown';

    var noUpOrDownKeyPressed = params.key !== KEY_DOWN && params.key !== KEY_UP;
    if (noUpOrDownKeyPressed) {
        return suggestedNextCell;
    }

    gridOptions.api.forEachNode(function (node) {
        if (node.rowIndex === suggestedNextCell.rowIndex) {
            node.setSelected(true);
        }
    });

    return suggestedNextCell;
}

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', function () {
    var gridDiv = document.querySelector('#myGrid');
    new agGrid.Grid(gridDiv, gridOptions);

    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
        .then(response => response.json())
        .then(data => gridOptions.api.setRowData(data));
});
