import { AgGridReact } from "ag-grid-react";
import React from "react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

import { firestore } from "../../modules/firebase";
import { Metadata } from "../../types";

export interface SpreadSheetProps {
  chainId: string;
  nftContractAddress: string;
  metadataList: Metadata[];
  setState: (input: any) => void;
}

export const SpreadSheet: React.FC<SpreadSheetProps> = ({ chainId, nftContractAddress, metadataList, setState }) => {
  const [gridApi, setGridApi] = React.useState<any>();
  const [, setGridColumnApi] = React.useState<any>();

  const [internalList, setInternalList] = React.useState<Metadata[]>([]);

  React.useEffect(() => {
    console.log("ok");
    setInternalList(metadataList);
  }, [metadataList, internalList]);

  const addRow = () => {
    const tokenId = gridApi.getDisplayedRowCount() + 1;
    gridApi.updateRowData({
      add: [{ tokenId: tokenId }],
      addIndex: tokenId,
    });
  };

  const saveToFirestore = async () => {
    const rowData: Metadata[] = [];
    gridApi.forEachNode((node: any) => rowData.push(node.data as Metadata));
    const batch = firestore.batch();
    for (let i = 0; i < rowData.length; i++) {
      batch.set(
        firestore
          .collection("v1")
          .doc(chainId)
          .collection("nftContract")
          .doc(nftContractAddress)
          .collection("metadata")
          .doc(rowData[i].tokenId.toString()),
        rowData[i]
      );
    }
    await batch.commit();
    setState(rowData);
  };

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
      editable: false,
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
    editable: false,
    cellRendererParams: { checkbox: true },
  };

  return (
    <>
      <div className="mb-2 flex justify-start">
        <button onClick={addRow} className="focus:outline-none p-1 px-2 text-xs border rounded-md text-gray-600 mr-2">
          Add
        </button>
        <button
          onClick={saveToFirestore}
          className="focus:outline-none p-1 px-2 text-xs border rounded-md text-gray-600 mr-2"
        >
          Save
        </button>
        <button className="focus:outline-none p-1 px-2 text-xs border rounded-md text-gray-600 mr-2">Mint</button>
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
          rowData={internalList}
        />
      </div>
    </>
  );
};
