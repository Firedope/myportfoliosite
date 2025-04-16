import { Button } from "@/components/ui/button";
import { scrollToElement } from "@/lib/utils";
import { Download, Mail, Linkedin, PhoneCall } from "lucide-react";

export default function HeroSection() {
  return (
    <div className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <svg
            className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>

          <div className="relative pt-6 px-4 sm:px-6 lg:px-8"></div>

          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">KANIKA</span>{" "}
                <span className="block text-primary-600 xl:inline">BANSALWAL</span>
              </h1>
              <h2 className="mt-2 text-2xl font-semibold text-gray-700">Software & Firmware Engineer</h2>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Experienced professional with expertise in technical support, firmware testing, automation testing, 
                and Python tool development. Adept at understanding business requirements, developing test scripts, and debugging.
              </p>
              
              <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center text-sm text-gray-600 space-y-2 sm:space-y-0 sm:space-x-6">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-primary-600" />
                  <a href="mailto:bansalwal1996@gmail.com" className="hover:text-primary-600">bansalwal1996@gmail.com</a>
                </div>
                <div className="flex items-center">
                  <PhoneCall className="h-4 w-4 mr-2 text-primary-600" />
                  <a href="tel:+919461774959" className="hover:text-primary-600">+91 946-177-4959</a>
                </div>
                <div className="flex items-center">
                  <Linkedin className="h-4 w-4 mr-2 text-primary-600" />
                  <a href="https://www.linkedin.com/in/kanikabansalwal/" target="_blank" rel="noopener noreferrer" className="hover:text-primary-600">LinkedIn Profile</a>
                </div>
              </div>
              
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Button 
                    className="w-full flex items-center justify-center px-8 py-3 text-base font-medium md:py-4 md:text-lg md:px-10" 
                    onClick={() => scrollToElement("experience")}
                  >
                    View Experience
                  </Button>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Button 
                    variant="outline" 
                    className="w-full flex items-center justify-center px-8 py-3 text-base font-medium md:py-4 md:text-lg md:px-10" 
                    onClick={() => {}}
                  >
                    <Download className="mr-2 h-4 w-4" /> Download Resume
                  </Button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
          src="https://images.unsplash.com/photo-1614624532983-4ce03382d63d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80"
          alt="Professional workspace with computer and engineering tools"
        />
      </div>
    </div>
  );
}
