import { Input } from "./ui/input";
import { CircleUserRound, Search } from "lucide-react"

interface NewHeaderProps {

}

export default function NewHeader(props: NewHeaderProps): React.JSX.Element {
  return (
    <header className="min-h-fit">
      <div className="bg-primary flex p-2">
        <h1 className="text-primary-foreground text-lg text-nowrap">
          My Video Game Collection
        </h1>
        <Input type="search" placeholder="Search..." className="justify-self-center lg:w-1/3">
          
        </Input>
        <div className="px-2">
          <CircleUserRound className="w-8 h-8"/>
        </div>
      </div>
    </header>
  )
}