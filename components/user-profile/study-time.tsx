import { Clock } from "lucide-react"

export default function StudyTime() {
  return (
    <div className="bg-[#111827] rounded-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="h-5 w-5 text-gray-400" />
        <h2 className="text-xl font-bold">Study Time</h2>
      </div>

      <div className="mb-4">
        <div className="text-3xl font-bold">42h 18m</div>
        <p className="text-sm text-gray-400">Total learning time</p>
      </div>

      <div className="grid grid-cols-2">
        <div>
          <p className="text-sm text-gray-400">This week</p>
          <p className="text-sm text-gray-400">Daily average</p>
        </div>
        <div className="text-right">
          <p className="text-sm">5h 22m</p>
          <p className="text-sm">45m</p>
        </div>
      </div>
    </div>
  )
}

