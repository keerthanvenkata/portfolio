export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="h-6 w-6 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
    </div>
  )
}
