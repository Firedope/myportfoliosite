import { 
  Code, Database, FileCode, Cpu, Server, 
  GitBranch, BugPlay, Gauge, Wrench, BrainCircuit 
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";

type SkillCategory = {
  name: string;
  icon: React.ReactNode;
  skills: Skill[];
};

type Skill = {
  name: string;
  proficiency: number; // 0-100
};

const skillCategories: SkillCategory[] = [
  {
    name: "Programming & Scripting",
    icon: <Code className="h-6 w-6" />,
    skills: [
      { name: "Python", proficiency: 90 },
      { name: "Java", proficiency: 75 },
      { name: "C", proficiency: 70 },
      { name: "SQL", proficiency: 85 }
    ]
  },
  {
    name: "Testing & Automation",
    icon: <BugPlay className="h-6 w-6" />,
    skills: [
      { name: "Selenium (Java/Python)", proficiency: 90 },
      { name: "TestNG", proficiency: 80 },
      { name: "Robot Framework", proficiency: 85 },
      { name: "HP UFT", proficiency: 80 }
    ]
  },
  {
    name: "Development Tools & Platforms",
    icon: <Wrench className="h-6 w-6" />,
    skills: [
      { name: "GitLab", proficiency: 85 },
      { name: "Jenkins", proficiency: 80 },
      { name: "CI/CD Pipelines", proficiency: 85 },
      { name: "Jira", proficiency: 90 },
      { name: "Salesforce", proficiency: 75 },
      { name: "AccuRev", proficiency: 70 }
    ]
  },
  {
    name: "Databases & Query Tools",
    icon: <Database className="h-6 w-6" />,
    skills: [
      { name: "SQL", proficiency: 85 },
      { name: "DBMS", proficiency: 80 },
      { name: "RDBMS", proficiency: 80 },
      { name: "Oracle", proficiency: 75 },
      { name: "Toad for Oracle", proficiency: 70 }
    ]
  },
  {
    name: "Advanced Technologies",
    icon: <BrainCircuit className="h-6 w-6" />,
    skills: [
      { name: "GenAI", proficiency: 75 },
      { name: "Agents", proficiency: 70 },
      { name: "Machine Learning", proficiency: 75 },
      { name: "Neural Networks", proficiency: 70 },
      { name: "IoT", proficiency: 80 },
      { name: "Robotics", proficiency: 75 }
    ]
  }
];

export default function SkillsSection() {
  return (
    <div id="skills" className="bg-gray-50 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-primary-600 tracking-wide uppercase">Technical Expertise</h2>
          <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Skills & Competencies
          </p>
          <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
            A comprehensive overview of my technical abilities and proficiencies
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, index) => (
            <Card key={index} className="shadow-lg hover:shadow-xl transition-all duration-300 border-0">
              <CardContent className="p-6">
                <div className="flex items-center mb-6">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-100 text-primary-600">
                    {category.icon}
                  </div>
                  <h3 className="ml-4 text-lg font-bold text-gray-900">{category.name}</h3>
                </div>
                
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                        <span className="text-xs font-medium text-gray-500">{skill.proficiency}%</span>
                      </div>
                      <Progress value={skill.proficiency} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Constantly expanding my skill set through continuous learning and professional development
          </p>
        </div>
      </div>
    </div>
  );
}
