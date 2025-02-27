import { cn } from "@/utils/cn";
import { FiZap } from "react-icons/fi";

const Header = () => {
  return (
    <header className="glass sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="bg-primary-500 p-2 rounded-lg">
            <FiZap className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white">
            Go<span className="ml-1 gold-gradient">Shorty</span>
          </span>
        </div>
        <nav>
          <ul className="flex space-x-8">
            <li className="hidden sm:block">
              <a
                href="#features"
                className="text-gray-300 hover:text-primary-400 transition-colors"
              >
                Features
              </a>
            </li>
            <li className="hidden sm:block">
              <a
                href="#how-it-works"
                className="text-gray-300 hover:text-primary-400 transition-colors"
              >
                How It Works
              </a>
            </li>

            <li className="">
              <a
                href="https://me.gauravst.in/donate"
                target="_blank"
                className={cn(
                  "px-3 py-2 rounded-lg font-medium text-white transition-all",
                  "bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400",
                  "shadow-lg shadow-primary-500/20",
                )}
              >
                Donate
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
