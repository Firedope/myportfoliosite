import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Download, Mail } from "lucide-react";

interface MobileNavProps {
  navLinks: { name: string; href: string }[];
  onLinkClick: (href: string) => void;
  onOpenChange: (open: boolean) => void;
}

export default function MobileNav({ navLinks, onLinkClick, onOpenChange }: MobileNavProps) {
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
    
    // Close the mobile menu
    onOpenChange(false);
  };

  return (
    <div className="flex h-full flex-col">
      <SheetHeader className="border-b px-6 py-4">
        <SheetTitle>Kanika Bansalwal</SheetTitle>
        <p className="text-sm text-gray-500">Software & Firmware Engineer</p>
      </SheetHeader>
      <ScrollArea className="flex-1">
        <div className="px-6 py-2">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="py-3 text-base font-medium text-gray-600 hover:text-primary-600"
                onClick={(e) => {
                  e.preventDefault();
                  onLinkClick(link.href);
                }}
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>
      </ScrollArea>
      <div className="border-t p-6 space-y-4">
        <Button
          variant="outline"
          className="w-full flex items-center justify-center"
          onClick={handleDownloadResume}
        >
          <Download className="mr-2 h-4 w-4" /> Download CV
        </Button>
        <Button
          className="w-full flex items-center justify-center"
          onClick={() => {
            onLinkClick("#contact");
          }}
        >
          <Mail className="mr-2 h-4 w-4" /> Contact Me
        </Button>
      </div>
    </div>
  );
}
