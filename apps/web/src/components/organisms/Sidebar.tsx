import { Users2 } from "lucide-react"
import { Logo } from "../atoms/Logo"
import { NavButtons } from "../molecules/NavButton"

export const Sidebar = () => {
  return (
    <nav className="h-dvh bg-cyan-800 w-72">
      <Logo dark />
      <ul>
        <NavButtons icon={<Users2 />} label={"Employees"} link={"/employees"}></NavButtons>
      </ul>
    </nav>
  )
}