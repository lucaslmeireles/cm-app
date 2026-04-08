export const Logo = ({ dark = false }) => {
  return (
    <div className={`flex items-center gap-2 p-4 ${dark ? "text-white" : "text-gray-800"}`}>
      <h1 className="font-light text-xl"><span className="font-bold">CM</span>APP</h1>
    </div>
  )
}