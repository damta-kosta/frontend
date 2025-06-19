export default function RightSideBar() {
  return (
    <div className={"sticky top-0 col-span-1 hidden h-screen p-5 lg:block"}>
      <div className={"flex flex-col rounded-xl border p-5"}>
        <div>
          <p className={"font-bold"}>모임명</p>
          <p>모임 설명 한줄</p>
        </div>
      </div>
    </div>
  );
}
