import Link from "next/link"

export const NavButtons = ({ Icon, label, link }) => {
  return (
    <Link href={link}>
      <div>
        <Icon />
        <span>{label}</span>
      </div>
    </Link>

  )

}