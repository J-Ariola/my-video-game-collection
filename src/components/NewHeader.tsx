
import SearchBar from "@/components/SearchBar"
import ProfileDropDownMenu from "./ProfileDropdownMenu";

interface Props {

}

//TODO: Perfectly center the search bar relative to the screen with
const NewHeader:React.FC<Props> = (): React.JSX.Element => {
  return (
    <header className="min-h-fit">
      <div className="bg-primary flex items-center p-2 w-full">
        <h1 className="text-primary-foreground text-lg text-nowrap">
          My Video Game Collection
        </h1>
        <div className="flex-1 flex justify-center">
          <SearchBar className="lg:w-96"/>
        </div>
        <ProfileDropDownMenu className=""/>
      </div>
    </header>
  )
}

export default NewHeader;