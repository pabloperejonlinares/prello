import Task from "./Task"

export default function Panel(props) {
  return (
    <div className="flex flex-col gap-3 basis-1/5 h-[35rem] bg-blue-300">
      <h2 className="font-bold text-center mt-3">{props.title}</h2>
      <div className="flex flex-col items-center gap-3">
        <Task title='Task 1' description='Description 1'/>
        <Task title='Task 1' description='Description 1'/>
        <Task title='Task 1' description='Description 1'/>
      </div>
    </div>
  )
}