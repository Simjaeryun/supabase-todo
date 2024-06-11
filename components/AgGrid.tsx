"use client";

import { ColDef, ColGroupDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import { AgGridReact, AgGridReactProps } from "ag-grid-react";

interface MyAgGridProps extends AgGridReactProps {
  columnDefs: (ColDef | ColGroupDef)[];
  setAgGridApi?: React.Dispatch<React.SetStateAction<any>>;
}

// /board에서는 적용 번호 적용 안되게 만들기
export function AgGrid({ setAgGridApi, columnDefs, ...props }: MyAgGridProps) {
  const column: (ColDef | ColGroupDef)[] = [
    {
      field: "",
      headerName: "번호",
      minWidth: 80,
      maxWidth: 80,
      valueFormatter: params => {
        return `${Number(params.node?.rowIndex) + 1}`;
      },
      cellStyle: {
        display: "flex",
        justifyContent: "center",
      },
    },

    ...columnDefs,
  ];

  return (
    <div className="ag-theme-quartz flex-1">
      <AgGridReact
        onGridReady={params => {
          setAgGridApi && setAgGridApi(params.api);
        }}
        pagination={true}
        paginationAutoPageSize={true}
        suppressAggFuncInHeader={true}
        rowHeight={props.rowHeight ? props.rowHeight : 55}
        columnDefs={column}
        noRowsOverlayComponent={() => {
          return (
            <div className="flex flex-col items-center gap-[14px]">
              <p className="text-[#b4b6b4] text-[14px]">
                데이터가 존재하지 않습니다!
              </p>
            </div>
          );
        }}
        {...props}
      />
    </div>
  );
}
