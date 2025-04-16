import { GraduationCap, Award, Calendar, BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Education = {
  degree: string;
  institution: string;
  period: string;
  grade: string;
  specialization?: string;
};

type Certification = {
  name: string;
  issuer?: string;
  date: string;
  featured?: boolean;
};

const educationDetails: Education[] = [
  {
    degree: "MASTER OF TECHNOLOGY, ECE",
    institution: "LOVELY PROFESSIONAL UNIVERSITY",
    period: "2017-2019",
    grade: "9.04",
    specialization: "Specialization in Robotics, Automation, ML and AI"
  },
  {
    degree: "BACHELOR OF TECHNOLOGY, ECE",
    institution: "RAJASTHAN TECHNICAL UNIVERSITY",
    period: "2013-2017",
    grade: "7.00"
  }
];

const certifications: Certification[] = [
  {
    name: "Microsoft Certified – Azure AI Fundamentals",
    date: "May 2024",
    featured: true
  },
  {
    name: "Google Cloud Agentic Workshop",
    date: "Jan 2025",
    featured: true
  },
  {
    name: "Advanced Test Automation Engineer",
    issuer: "RJP Infotek Pvt. Ltd.",
    date: "Nov 2021"
  },
  {
    name: "Programming Foundations: Software Testing/QA",
    date: "Feb 2022"
  },
  {
    name: "Software Testing Foundations Test Management",
    date: "Mar 2021"
  },
  {
    name: "Agile Testing",
    date: "Mar 2021"
  },
  {
    name: "Agile Requirement Foundations",
    issuer: "IIBA",
    date: "Dec 2020"
  },
  {
    name: "Trained in Embedded IoT and VLSI Design",
    issuer: "DKOP Labs Pvt. Ltd.",
    date: "July 2018"
  },
  {
    name: "Robotic Arm Workshop",
    issuer: "RISC-LPU",
    date: "April 2018"
  },
  {
    name: "Advanced Training on Embedded IoT",
    issuer: "Xinoe",
    date: "July 2016"
  },
  {
    name: "TechnoVoltz Workshop",
    issuer: "TechFest",
    date: "Dec 2015"
  },
  {
    name: "Gargi and Balika Protsahan Award",
    issuer: "Balika Shiksha Foundation",
    date: "Feb 2012 and Jan 2014"
  }
];

const researchProjects = [
  {
    title: "Speech Recognition Implementation",
    publication: "Consilio 2019 Volume 8 Issue 9S4 (IJITEE)",
    link: "https://www.ijitee.org/wp-content/uploads/papers/v8i9S4/I11160789S419.pdf",
    date: "2019"
  },
  {
    title: "GenAI Agent – Career Assistant Conversational Agent",
    date: "April 2025"
  },
  {
    title: "Robotic Arm controlled via different devices",
    date: "Jan 2019"
  },
  {
    title: "Wi-Fi Home Automation",
    date: "Jul 2017"
  }
];

export default function EducationSection() {
  return (
    <div id="education" className="bg-gray-900">
      <div className="pt-12 sm:pt-16 lg:pt-24">
        <div className="max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto space-y-2 lg:max-w-none">
            <h2 className="text-xl font-semibold text-gray-300">Academic Background</h2>
            <p className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
              Education & Certifications
            </p>
            <p className="text-xl text-gray-300">
              My academic qualifications, professional certifications, and research work
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 pb-12 bg-gray-50 sm:mt-12 sm:pb-16 lg:mt-16 lg:pb-24">
        <div className="relative">
          <div className="absolute inset-0 h-3/4 bg-gray-900"></div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto lg:max-w-5xl">
              {/* Education Section */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
                <div className="px-6 py-8">
                  <div className="flex items-center mb-4">
                    <GraduationCap className="h-6 w-6 text-primary-600" />
                    <h3 className="ml-3 text-2xl font-bold text-gray-900">Education</h3>
                  </div>
                  
                  <div className="space-y-6">
                    {educationDetails.map((edu, index) => (
                      <div key={index} className="border-l-4 border-primary-500 pl-4 py-2">
                        <h4 className="text-lg font-bold text-gray-800">{edu.degree}</h4>
                        <p className="text-gray-600 font-medium">{edu.institution}</p>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{edu.period}</span>
                          <span className="mx-2">•</span>
                          <span>Grade: {edu.grade}</span>
                        </div>
                        {edu.specialization && (
                          <p className="text-sm text-gray-600 mt-1 italic">{edu.specialization}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Research & Projects Section */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
                <div className="px-6 py-8">
                  <div className="flex items-center mb-4">
                    <BookOpen className="h-6 w-6 text-primary-600" />
                    <h3 className="ml-3 text-2xl font-bold text-gray-900">Research & Projects</h3>
                  </div>
                  
                  <div className="space-y-4">
                    {researchProjects.map((project, index) => (
                      <div key={index} className="pb-3 border-b border-gray-200 last:border-b-0">
                        <div className="flex justify-between items-start">
                          <h4 className="text-lg font-semibold text-gray-800">{project.title}</h4>
                          <span className="text-sm text-gray-500">{project.date}</span>
                        </div>
                        {project.publication && (
                          <p className="text-sm text-gray-600">Published in: {project.publication}</p>
                        )}
                        {project.link && (
                          <a 
                            href={project.link} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-sm text-primary-600 hover:underline mt-1 inline-block"
                          >
                            View Publication
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Certifications Section */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="px-6 py-8">
                  <div className="flex items-center mb-6">
                    <Award className="h-6 w-6 text-primary-600" />
                    <h3 className="ml-3 text-2xl font-bold text-gray-900">Certifications & Trainings</h3>
                  </div>
                  
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {certifications.map((cert, index) => (
                      <div key={index} className="relative p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                        <h4 className="text-md font-semibold text-gray-800">{cert.name}</h4>
                        {cert.issuer && (
                          <p className="text-sm text-gray-600 mt-1">{cert.issuer}</p>
                        )}
                        <p className="text-sm text-gray-500 mt-2">{cert.date}</p>
                        
                        {cert.featured && (
                          <Badge className="absolute top-2 right-2 bg-primary-500">Featured</Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
