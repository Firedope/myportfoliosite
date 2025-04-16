import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import MobileNav from "./mobile-nav";
import { useMediaQuery } from "@/hooks/use-mobile";
import { Menu, Download } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";

const navLinks = [
  { name: "Experience", href: "#experience" },
  { name: "Skills", href: "#skills" },
  { name: "Education", href: "#education" },
  { name: "Soft Skills", href: "#soft-skills" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [location] = useLocation();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [open, setOpen] = useState(false);
  
  const isHomePage = location === "/";
  
  const handleNavLinkClick = (path: string) => {
    if (isHomePage && path.startsWith("#")) {
      // Handle hash navigation for home page
      const id = path.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        window.scrollTo({
          top: element.offsetTop - 80,
          behavior: "smooth",
        });
      }
      setOpen(false);
    } else {
      // For other pages, navigate to home page with hash
      window.location.href = "/" + path;
    }
  };

  const handleDownloadResume = () => {
    // Create an anchor element and set the href to the resume file
    const link = document.createElement('a');
    link.href = '/assets/Resume_Kanika.pdf';
    link.setAttribute('download', 'Resume_Kanika_Bansalwal.pdf');
    
    // Append to the body
    document.body.appendChild(link);
    
    // Trigger download
    link.click();
    
    // Clean up
    document.body.removeChild(link);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-primary-600 font-extrabold text-2xl">Kanika Bansalwal</span>
              <span className="ml-2 text-gray-500 text-sm hidden sm:inline">Software & Firmware Engineer</span>
            </Link>
            
            {/* Desktop navigation */}
            {!isMobile && (
              <div className="ml-10 flex space-x-8">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="border-transparent text-gray-500 hover:text-primary-600 hover:border-primary-600 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                    onClick={(e) => {
                      if (isHomePage) {
                        e.preventDefault();
                        handleNavLinkClick(link.href);
                      }
                    }}
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Desktop buttons */}
          {!isMobile && (
            <div className="flex items-center space-x-3">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center"
                onClick={handleDownloadResume}
              >
                <Download className="mr-2 h-4 w-4" /> Download CV
              </Button>
              <Link href="#contact">
                <Button size="sm">Contact Me</Button>
              </Link>
            </div>
          )}

          {/* Mobile menu button */}
          {isMobile && (
            <div className="flex items-center">
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="p-0">
                  <MobileNav 
                    navLinks={navLinks} 
                    onLinkClick={handleNavLinkClick}
                    onOpenChange={setOpen}
                  />
                </SheetContent>
              </Sheet>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
