import PanelSkeleton from '@/components/Skeleton';

export default function Loading() {
  return (
    <div className="flex items-center justify-evenly mt-14 max-w-screen-2xl px-6 mx-auto w-full">
      <PanelSkeleton title='TO DO' tasks={3}/>
      <PanelSkeleton title='IN PROGRESS' tasks={3}/>
      <PanelSkeleton title='DONE' tasks={3}/>
    </div>
  )
}