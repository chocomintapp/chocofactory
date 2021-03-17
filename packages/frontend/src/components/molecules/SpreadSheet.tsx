import { AgGridReact } from "ag-grid-react";
import React from "react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

import { Metadata } from "../../types";

export interface SpreadSheetProps {
  metadataList: Metadata[];
}

export const SpreadSheet: React.FC<SpreadSheetProps> = ({ metadataList }) => {
  const [gridApi, setGridApi] = React.useState<any>();
  const [, setGridColumnApi] = React.useState<any>();

  const onGridReady = (params: any) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };

  const columnDefs = [
    {
      field: "tokenId",
      rowGroup: true,
      hide: true,
    },
    {
      field: "name",
    },
    {
      field: "description",
    },
    {
      field: "image",
    },
    {
      field: "animationUrl",
    },
    {
      field: "minted",
    },
  ];

  const defaultColDef = {
    filter: "agTextColumnFilter",
    resizable: true,
    sortable: true,
    editable: true,
    flex: 1,
  };

  const autoGroupColumnDef = {
    headerName: "tokenId",
    field: "tokenId",
    cellRendererParams: { checkbox: true },
  };

  return (
    <>
      <div className="mb-2 flex justify-start">
        <button className="p-1 px-2 text-xs border rounded-xl text-gray-600 mr-2">Add</button>
        <button className="p-1 px-2 text-xs border rounded-xl text-gray-600 mr-2">Save</button>
        <button className="p-1 px-2 text-xs border rounded-xl text-gray-600 mr-2">Mint</button>
      </div>
      <div className="ag-theme-balham" style={{ height: 400 }}>
        <AgGridReact
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          autoGroupColumnDef={autoGroupColumnDef}
          onGridReady={onGridReady}
          animateRows={true}
          enableRangeSelection={true}
          suppressMultiRangeSelection={true}
          rowSelection="multiple"
          rowMultiSelectWithClick={true}
          rowData={metadataList}
        />
      </div>
    </>
  );
};
