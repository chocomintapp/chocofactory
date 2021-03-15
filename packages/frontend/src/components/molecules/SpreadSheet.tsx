import { AgGridReact } from "ag-grid-react";
import React from "react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

import { Metadata } from "../../types";

export interface SpreadSheetProps {
  metadataList: Metadata[];
}

export const SpreadSheet: React.FC<SpreadSheetProps> = ({ metadataList }) => {
  const [, setGridApi] = React.useState(null);
  const [, setGridColumnApi] = React.useState(null);

  const onGridReady = (params: any) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };

  const columnDefs = [
    {
      field: "token_id",
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
      field: "animation_url",
    },
    {
      field: "ipfs_hash",
    },
  ];

  const defaultColDef = {
    sortable: true,
    editable: true,
  };

  const autoGroupColumnDef = {
    headerName: "token_id",
    field: "token_id",
    cellRendererParams: { checkbox: true },
  };

  return (
    <div className="ag-theme-alpine w-full" style={{ height: 400 }}>
      <AgGridReact
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        autoGroupColumnDef={autoGroupColumnDef}
        onGridReady={onGridReady}
        undoRedoCellEditing={true}
        pagination={true}
        paginationAutoPageSize={true}
        rowSelection="multiple"
        rowMultiSelectWithClick={true}
        suppressRowClickSelection={true}
        rowData={metadataList}
      />
    </div>
  );
};
