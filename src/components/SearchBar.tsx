import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

const SearchBar:React.FC<Props> = ({className}):JSX.Element => {
  return (
    <div className={cn("relative", className)}>
      <Search className="absolute h-10 left-2"/>
      <Input type="search" placeholder="Search..." className="justify-self-center pl-10"/>
    </div>
  )
}

export default SearchBar;