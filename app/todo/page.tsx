import { createClient } from "@/utils/supabase/server";
import InputFormWithSupabase from "./InputForm";
import ToDoList from "./TodoList";

export default async function TodoPage() {
  const supabase = createClient();

  const { data: todoList, error } = await supabase
    .from("todos")
    .select("*")
    .not("del_yn", "eq", "Y")
    .order("create_dt", { ascending: false });
  console.log(todoList);
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
