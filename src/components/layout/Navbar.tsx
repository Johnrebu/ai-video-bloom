
import { Button } from "@/components/ui/button";
import { Video } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/30 backdrop-blur-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Video className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl text-gradient">Bloom</span>
        </Link>
        
        <div className="flex gap-4">
          <Link to="/generate">
            <Button variant="secondary" size="sm">Generate Videos</Button>
          </Link>
          <Link to="/history">
            <Button variant="outline" size="sm">History</Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
