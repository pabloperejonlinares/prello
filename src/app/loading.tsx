import { PanelSkeleton } from '@/components';

export default function Loading() {
  return (
    <div className="flex items-center justify-evenly mt-14 max-w-screen-2xl px-6 mx-auto w-full">
      <PanelSkeleton title='TO DO'/>
      <PanelSkeleton title='IN PROGRESS'/>
      <PanelSkeleton title='DONE'/>
    </div>
  )
}