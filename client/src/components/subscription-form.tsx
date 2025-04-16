import { Card, CardContent } from "@/components/ui/card";
import { Brain, Users, Clock, Lightbulb, Target, MessageSquare } from "lucide-react";

type SoftSkill = {
  name: string;
  description: string;
  icon: React.ReactNode;
};

const softSkills: SoftSkill[] = [
  {
    name: "Analytical Thinking",
    description: "Strong ability to analyze complex problems, identify patterns, and develop effective solutions.",
    icon: <Brain className="h-8 w-8" />
  },
  {
    name: "Team Collaboration",
    description: "Experience working effectively in cross-functional teams, sharing knowledge, and contributing to collective goals.",
    icon: <Users className="h-8 w-8" />
  },
  {
    name: "Time Management",
    description: "Excellent at prioritizing tasks, meeting deadlines, and efficiently allocating resources.",
    icon: <Clock className="h-8 w-8" />
  },
  {
    name: "Innovation",
    description: "Creative problem-solver who consistently explores new approaches and technologies.",
    icon: <Lightbulb className="h-8 w-8" />
  },
  {
    name: "Detail-Oriented",
    description: "Meticulous attention to detail, ensuring high-quality results in all aspects of work.",
    icon: <Target className="h-8 w-8" />
  },
  {
    name: "Communication",
    description: "Clear and effective communication skills, both written and verbal, with technical and non-technical stakeholders.",
    icon: <MessageSquare className="h-8 w-8" />
  }
];

const additionalSkills = [
  "Highly motivated and dedicated",
  "Quick learner with proven ability to build and manage teams",
  "Strong problem-solving capabilities",
  "Always striving for new technologies",
  "Adaptive, innovative, supportive, and cooperative",
  "Great attention to detail and research",
  "Logical and critical thinking",
  "Takes initiative to meet objectives without being asked"
];

export default function SoftSkillsSection() {
  return (
    <div id="soft-skills" className="bg-gray-50 py-16 sm:py-24">
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">Personal Attributes</h2>
            <p className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Soft Skills & Qualities
            </p>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Beyond technical expertise, these are the interpersonal abilities that make me an effective team member and contributor.
            </p>
          </div>

          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {softSkills.map((skill, index) => (
              <Card key={index} className="shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary-100 text-primary-600">
                      {skill.icon}
                    </div>
                    <h3 className="ml-4 text-xl font-bold text-gray-900">{skill.name}</h3>
                  </div>
                  <p className="text-gray-600">{skill.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Additional Professional Qualities</h3>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
              {additionalSkills.map((skill, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-primary-500 mt-1"></div>
                  <p className="ml-3 text-gray-600">{skill}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
