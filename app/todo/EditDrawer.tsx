import Drawer from "@/components/Drawer";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useRef } from "react";
export default function EditDrawer(param: {
  data: { title: string; description: string; id: number };
}) {
  const router = useRouter();
  const titleRef: any = useRef();
  const descRef: any = useRef();
  const onEditRow = async () => {
    if (titleRef.current) console.log("delete");
    console.log(titleRef.current?.value);
    const supabase = createClient();
    const { data, error } = await supabase
      .from("todos")
      .update({
        update_dt: new Date().toISOString(),
        title: titleRef.current?.value,
        description: descRef.current?.value,
      })
      .eq("id", param.data.id);
    if (error) {
      console.error(error);
    }
    router.refresh();
  };
  return (
    <Drawer
      buttonText="편집"
      buttonComponent={
        <button className=" h-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none">
          편집
        </button>
      }
      title={"편집"}
    >
      <div className="min-h-[500px] flex flex-col">
        <div>
          <label>제목</label>
        </div>
        <input
          ref={titleRef}
          type="text"
          defaultValue={param.data.title}
          placeholder="Title"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
        <div>
          <label>설명</label>
        </div>
        <textarea
          ref={descRef}
          defaultValue={param.data.description}
          className=" flex-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
      </div>
      <button className="" onClick={onEditRow}>
        저장
      </button>
    </Drawer>
  );
}
