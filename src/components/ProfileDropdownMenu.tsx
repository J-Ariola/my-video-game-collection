import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
 } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { CircleUserRound } from "lucide-react"
import { cn } from "@/lib/utils";

interface Props {
  className?: string
}

const ProfileDropDownMenu:React.FC<Props>= ({className}) => {
  return (
    <div className={cn(className)}>
      <DropdownMenu>
        <DropdownMenuTrigger className="rounded-full" asChild>
          <Button variant="ghost" size="icon" className="[&_svg]:size-8">
            <CircleUserRound />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>  
          <DropdownMenuSeparator/>
          <DropdownMenuGroup>
            <DropdownMenuItem>
              Profile
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default ProfileDropDownMenu;