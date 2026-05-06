import { Link } from "react-router";
import { PlusIcon, CircleUser } from "lucide-react";

const Navbar = () => {
  return (
    <header className="border-base-content/10">
      <div className="p-4 mx-auto max-w-6xl">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-primary font-mono tracking-tight">
            Todolister
          </h1>
          <div className="flex gap-3 sm:gap-8 h-full">
            <div className="items-center">
              <Link to={"/create"} className="btn btn-primary">
                <PlusIcon className="size-5" />
                <span calssName="sm:text-base text-xs">New Task</span>
              </Link>
            </div>
            <div>
              <Link to={"/profile"}>
                <CircleUser className="size-10 mt-1 text-green-500" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
