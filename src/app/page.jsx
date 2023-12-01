import Panel from "@/components/Panel"

export default function MainPage() {
  return (
    <div className="flex items-center justify-evenly mt-14">
      <Panel title='TO DO'/>
      <Panel title='IN PROGRESS'/>
      <Panel title='DONE'/>
    </div>
  )
}