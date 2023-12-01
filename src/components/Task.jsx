export default function Task(props) {
  return (
    <div className="flex flex-col items-center w-5/6 py-4 rounded shadow-md bg-white">
      <h3 className="font-semibold">{props.title}</h3>
      <p className="text-xs">{props.description}</p>
    </div>
  )
}