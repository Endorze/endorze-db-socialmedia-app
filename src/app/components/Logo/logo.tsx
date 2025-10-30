import Link from "next/link"

const Logo = () => {
  return (
    <Link href="/"><img className="max-w-[36px] h-auto" src={"/ei.png"}/></Link>
  )
}

export default Logo;