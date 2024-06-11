import { createClient } from "@/utils/supabase/server";
import InputFormWithSupabase from "./InputForm";
import ToDoList from "./TodoList";

export default async function TodoPage() {
  const supabase = createClient();

  const {
    data: todoList,
    error,
  }: {
    data?:
      | {
          title: string;
          description: string;
          create_at: string;
          update_at: string;
          id: number;
          del_yn: boolean;
          user_id: string;
        }[]
      | null;
    error?: any;
  } = await supabase
    .from("todoList")
    .select("*")
    .not("del_yn", "eq", "Y")
    .order("created_at", { ascending: false });

  return (
    <>
      <div className="w-full p-5 sticky top-0  bg-[#ddddddc9]">
        <InputFormWithSupabase />
      </div>
      <div className="flex-1 w-full flex">
        <ToDoList todoList={todoList} />
      </div>
    </>
  );
}
