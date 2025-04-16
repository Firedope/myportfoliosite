import { Link } from "wouter";
import { 
  Linkedin, Mail, Phone, MapPin, 
  FileCode, Briefcase, GraduationCap, Heart, 
  Download, User 
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
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
    <footer className="bg-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <div className="flex items-center">
              <span className="text-white font-extrabold text-2xl">Kanika Bansalwal</span>
            </div>
            <p className="text-gray-300 text-base">
              Software & Firmware Engineer with expertise in technical support, testing, automation, and Python tool development.
            </p>
            <div className="flex space-x-6">
              <a href="https://www.linkedin.com/in/kanikabansalwal/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-300">
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="mailto:bansalwal1996@gmail.com" className="text-gray-400 hover:text-gray-300">
                <span className="sr-only">Email</span>
                <Mail className="h-6 w-6" />
              </a>
              <a href="tel:+919461774959" className="text-gray-400 hover:text-gray-300">
                <span className="sr-only">Phone</span>
                <Phone className="h-6 w-6" />
              </a>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  Professional
                </h3>
                <ul role="list" className="mt-4 space-y-4">
                  <li>
                    <Link href="#experience" className="text-base text-gray-300 hover:text-white flex items-center">
                      <Briefcase className="h-4 w-4 mr-2" />
                      Experience
                    </Link>
                  </li>
                  <li>
                    <Link href="#skills" className="text-base text-gray-300 hover:text-white flex items-center">
                      <FileCode className="h-4 w-4 mr-2" />
                      Skills
                    </Link>
                  </li>
                  <li>
                    <Link href="#education" className="text-base text-gray-300 hover:text-white flex items-center">
                      <GraduationCap className="h-4 w-4 mr-2" />
                      Education
                    </Link>
                  </li>
                  <li>
                    <Link href="#soft-skills" className="text-base text-gray-300 hover:text-white flex items-center">
                      <Heart className="h-4 w-4 mr-2" />
                      Soft Skills
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  Contact
                </h3>
                <ul role="list" className="mt-4 space-y-4">
                  <li>
                    <div className="text-base text-gray-300 flex items-start">
                      <MapPin className="h-4 w-4 mr-2 mt-1" />
                      <span>
                        Greater Noida, UP<br />
                        201009, India
                      </span>
                    </div>
                  </li>
                  <li>
                    <a href="mailto:bansalwal1996@gmail.com" className="text-base text-gray-300 hover:text-white flex items-center">
                      <Mail className="h-4 w-4 mr-2" />
                      bansalwal1996@gmail.com
                    </a>
                  </li>
                  <li>
                    <a href="tel:+919461774959" className="text-base text-gray-300 hover:text-white flex items-center">
                      <Phone className="h-4 w-4 mr-2" />
                      +91 946-177-4959
                    </a>
                  </li>
                  <li>
                    <Link href="#contact" className="text-base text-gray-300 hover:text-white flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      Contact Form
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                Download Resume
              </h3>
              <p className="mt-4 text-base text-gray-300">
                Get a copy of my full resume with complete details of my experience, skills, and qualifications.
              </p>
              <div className="mt-4">
                <button 
                  onClick={handleDownloadResume}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download CV
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-700 pt-8">
          <p className="text-base text-gray-400 xl:text-center">
            &copy; {currentYear} Kanika Bansalwal. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
