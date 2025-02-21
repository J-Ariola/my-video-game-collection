
import { CircleUserRound } from "lucide-react"
import SearchBar from "@/components/SearchBar"

interface Props {

}

const NewHeader:React.FC<Props> = (): React.JSX.Element => {
  return (
    <header className="min-h-fit">
      <div className="bg-primary flex p-2">
        <h1 className="text-primary-foreground text-lg text-nowrap">
          My Video Game Collection
        </h1>
        <SearchBar className="lg:w-1/3"/>
        <div className="px-2">
          <CircleUserRound className="w-8 h-8"/>
        </div>
      </div>
    </header>
  )
}

export default NewHeader;