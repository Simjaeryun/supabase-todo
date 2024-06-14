"use client";

import { AgGrid } from "@/components/AgGrid";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import EditDrawer from "./EditDrawer";
import { Database } from "@/types/supabase";
const COLUMN = [
  {
    field: "title",
    headerName: "제목",
  },
  { field: "description", headerName: "설명", minWidth: 300, flex: 1 },
  { field: "create_at", headerName: "생성일" },
  { field: "update_at", headerName: "수정일" },
  { field: "id", hide: true },
  { field: "del_yn", hide: true },
  { field: "user_id", hide: true },
  {
    field: "delete",
    headerName: "",
    cellRenderer: "cellRendererDeleteBtn",
    maxWidth: 100,
  },
  {
    field: "edit",
    headerName: "",
    cellRenderer: "cellRendererEditBtn",
    maxWidth: 100,
  },
];
export default function ToDoList({
  todoList,
}: {
  todoList: Database["public"]["Tables"]["todos"]["Row"][] | null;
}) {
  const router = useRouter();
  const onDeleteRow = async (id: number) => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("todos")
      .update({ del_yn: "Y" })
      .eq("id", id);
    if (error) {
      console.error(error);
    }

    router.refresh();
  };

  return (
    <AgGrid
      columnDefs={COLUMN}
      rowData={todoList}
      components={{
        cellRendererDeleteBtn: (params: any) => {
          return (
            <button
              onClick={() => onDeleteRow(params.data.id)}
              className="h-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none"
            >
              삭제
            </button>
          );
        },
        cellRendererEditBtn: (param: any) => <EditDrawer data={param.data} />,
      }}
    />
  );
}
