import { Briefcase, Calendar, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type Experience = {
  company: string;
  position: string;
  period: string;
  location: string;
  responsibilities: string[];
};

const experiences: Experience[] = [
  {
    company: "Infosys Limited",
    position: "Technology Analyst - Software Firmware Engineer",
    period: "Oct 2022 – Present",
    location: "Greater Noida, India",
    responsibilities: [
      "Developed Python tools for server simulation and DVT testing",
      "Automated testing processes and provided Tier-2 support",
      "Designed and implemented test protocols for firmware validation",
      "Created structured test scenarios, cases, and regression suites",
      "Debugged Python scripts and developed automation tools",
      "Worked with cross-functional teams to ensure seamless development",
      "Conducted various testing including sanity, smoke, and regression testing",
      "Utilized Salesforce and Jira for defect tracking and documentation",
      "Managed version control and CI/CD processes using AccuRev, GitLab, Git Kraken, and Jenkins"
    ]
  },
  {
    company: "Tata Consultancy Services",
    position: "System Engineer – Test Analyst",
    period: "July 2019 – Sep 2022",
    location: "India",
    responsibilities: [
      "Conducted functional, automation, and regression testing",
      "Developed and enhanced automated test scripts using Selenium (Java/Python)",
      "Worked with SDLC and STLC processes using both waterfall and agile methodologies",
      "Designed and implemented QA test strategy plans (manual & automated)",
      "Used Selenium WebDriver, TestNG, Robot Framework, and CI/CD pipelines for automation",
      "Developed automation scripts using HP UFT (scriptless framework)",
      "Tracked and managed defects using Jira",
      "Trained and mentored 10+ team members, creating documentation and video tutorials"
    ]
  }
];

export default function ExperienceSection() {
  return (
    <div id="experience" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">Career Journey</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Professional Experience
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Over 5 years of experience in software development and testing
          </p>
        </div>

        <div className="mt-12 space-y-10">
          {experiences.map((experience, index) => (
            <div key={index} className="relative bg-white p-6 rounded-lg shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl">
              <div className="flex flex-col md:flex-row justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{experience.position}</h3>
                  <div className="flex items-center mt-1 text-primary-600 font-medium">
                    <Briefcase className="h-4 w-4 mr-2" />
                    <span>{experience.company}</span>
                  </div>
                </div>
                <div className="mt-2 md:mt-0">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{experience.period}</span>
                  </div>
                  <div className="flex items-center mt-1 text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{experience.location}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <h4 className="text-md font-semibold text-gray-700 mb-2">Key Responsibilities:</h4>
                <ul className="space-y-2">
                  {experience.responsibilities.map((responsibility, rIndex) => (
                    <li key={rIndex} className="flex items-start">
                      <span className="text-primary-500 mr-2">•</span>
                      <span className="text-gray-600">{responsibility}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {index === 0 && (
                <div className="absolute top-4 right-4">
                  <Badge variant="default" className="bg-primary-500">Current</Badge>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
