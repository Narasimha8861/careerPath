import { InsertMarketTrend, MarketTrend } from "@shared/schema";

// Career data structure
interface MockCareer {
  title: string;
  description: string;
  requiredSkills: {
    name: string;
    importance: number;
  }[];
  requiredEducation: string[];
  relatedInterests: string[];
  averageSalary: string;
  demandLevel: string;
  industry: string;
}

/**
 * Get mock career data for the recommendation engine
 * @returns Array of career objects
 */
export async function getMockCareers(): Promise<MockCareer[]> {
  return [
    {
      title: "Data Scientist",
      description: "Apply statistical analysis, machine learning, and data visualization techniques to extract insights from large datasets. Develop models to predict trends and support business decision-making.",
      requiredSkills: [
        { name: "Python", importance: 0.9 },
        { name: "Machine Learning", importance: 0.9 },
        { name: "SQL", importance: 0.8 },
        { name: "Statistics", importance: 0.8 },
        { name: "Data Visualization", importance: 0.7 }
      ],
      requiredEducation: ["Computer Science", "Statistics", "Mathematics", "Data Science"],
      relatedInterests: ["Technology", "Mathematics", "Research", "Analytics"],
      averageSalary: "$105,000 - $150,000",
      demandLevel: "High",
      industry: "Technology"
    },
    {
      title: "Software Engineer",
      description: "Design, develop, and maintain software applications and systems. Write clean, efficient code and collaborate with cross-functional teams to implement new features and improve existing ones.",
      requiredSkills: [
        { name: "JavaScript", importance: 0.9 },
        { name: "Python", importance: 0.7 },
        { name: "Java", importance: 0.7 },
        { name: "SQL", importance: 0.6 },
        { name: "Problem Solving", importance: 0.9 }
      ],
      requiredEducation: ["Computer Science", "Software Engineering", "Information Technology"],
      relatedInterests: ["Technology", "Software Development", "Innovation"],
      averageSalary: "$90,000 - $140,000",
      demandLevel: "High",
      industry: "Technology"
    },
    {
      title: "UX/UI Designer",
      description: "Create intuitive and engaging user experiences for digital products. Conduct user research, develop wireframes and prototypes, and collaborate with developers to implement designs.",
      requiredSkills: [
        { name: "UI/UX Design", importance: 0.9 },
        { name: "Figma", importance: 0.8 },
        { name: "User Research", importance: 0.7 },
        { name: "Wireframing", importance: 0.8 },
        { name: "HTML/CSS", importance: 0.6 }
      ],
      requiredEducation: ["Design", "Human-Computer Interaction", "Psychology"],
      relatedInterests: ["Design", "Psychology", "Technology", "Creativity"],
      averageSalary: "$80,000 - $120,000",
      demandLevel: "High",
      industry: "Technology"
    },
    {
      title: "Product Manager",
      description: "Lead product development from conception to launch. Define product vision, gather requirements, prioritize features, and coordinate with engineering, design, and marketing teams.",
      requiredSkills: [
        { name: "Product Management", importance: 0.9 },
        { name: "Communication", importance: 0.9 },
        { name: "Strategy", importance: 0.8 },
        { name: "Data Analysis", importance: 0.7 },
        { name: "Leadership", importance: 0.8 }
      ],
      requiredEducation: ["Business", "Computer Science", "Engineering"],
      relatedInterests: ["Business", "Technology", "Leadership", "Innovation"],
      averageSalary: "$100,000 - $150,000",
      demandLevel: "High",
      industry: "Technology"
    },
    {
      title: "Digital Marketing Specialist",
      description: "Create and implement marketing strategies across digital channels to increase brand awareness and drive customer acquisition. Analyze campaign performance and optimize for better results.",
      requiredSkills: [
        { name: "Digital Marketing", importance: 0.9 },
        { name: "SEO", importance: 0.8 },
        { name: "Social Media", importance: 0.8 },
        { name: "Content Creation", importance: 0.7 },
        { name: "Analytics", importance: 0.7 }
      ],
      requiredEducation: ["Marketing", "Communications", "Business"],
      relatedInterests: ["Marketing", "Media", "Creative Writing", "Analytics"],
      averageSalary: "$60,000 - $95,000",
      demandLevel: "High",
      industry: "Marketing"
    },
    {
      title: "Financial Analyst",
      description: "Analyze financial data to support business decisions. Prepare financial reports, forecasts, and budgets. Identify trends, risks, and opportunities to improve financial performance.",
      requiredSkills: [
        { name: "Financial Analysis", importance: 0.9 },
        { name: "Excel", importance: 0.8 },
        { name: "Data Analysis", importance: 0.8 },
        { name: "Accounting", importance: 0.7 },
        { name: "Financial Modeling", importance: 0.7 }
      ],
      requiredEducation: ["Finance", "Accounting", "Economics", "Business"],
      relatedInterests: ["Finance", "Economics", "Business", "Mathematics"],
      averageSalary: "$75,000 - $110,000",
      demandLevel: "Medium",
      industry: "Finance"
    },
    {
      title: "Healthcare Administrator",
      description: "Manage healthcare facilities, services, and staff. Ensure compliance with healthcare laws and regulations. Develop and implement policies to improve quality of care and operational efficiency.",
      requiredSkills: [
        { name: "Healthcare Management", importance: 0.9 },
        { name: "Leadership", importance: 0.8 },
        { name: "Communication", importance: 0.8 },
        { name: "Regulatory Compliance", importance: 0.7 },
        { name: "Budgeting", importance: 0.7 }
      ],
      requiredEducation: ["Healthcare Administration", "Public Health", "Business"],
      relatedInterests: ["Healthcare", "Management", "Policy", "Public Service"],
      averageSalary: "$80,000 - $120,000",
      demandLevel: "High",
      industry: "Healthcare"
    },
    {
      title: "Environmental Scientist",
      description: "Study environmental problems and develop solutions. Collect and analyze data to monitor environmental impacts. Prepare reports and make recommendations to minimize negative effects on the environment.",
      requiredSkills: [
        { name: "Environmental Science", importance: 0.9 },
        { name: "Data Analysis", importance: 0.8 },
        { name: "Research", importance: 0.8 },
        { name: "Report Writing", importance: 0.7 },
        { name: "Field Sampling", importance: 0.7 }
      ],
      requiredEducation: ["Environmental Science", "Biology", "Chemistry", "Geology"],
      relatedInterests: ["Environment", "Science", "Research", "Sustainability"],
      averageSalary: "$65,000 - $95,000",
      demandLevel: "Medium",
      industry: "Environmental Services"
    },
    {
      title: "Cybersecurity Analyst",
      description: "Protect computer systems and networks from cyber threats. Monitor security access, install security measures, and perform vulnerability testing. Investigate security breaches and develop security strategies.",
      requiredSkills: [
        { name: "Cybersecurity", importance: 0.9 },
        { name: "Network Security", importance: 0.8 },
        { name: "Threat Analysis", importance: 0.8 },
        { name: "Security Tools", importance: 0.7 },
        { name: "Incident Response", importance: 0.7 }
      ],
      requiredEducation: ["Computer Science", "Information Security", "IT"],
      relatedInterests: ["Technology", "Security", "Problem Solving"],
      averageSalary: "$90,000 - $130,000",
      demandLevel: "High",
      industry: "Technology"
    },
    {
      title: "Human Resources Manager",
      description: "Oversee the recruitment, hiring, and development of employees. Administer compensation and benefits programs. Handle workplace issues and ensure compliance with labor laws.",
      requiredSkills: [
        { name: "Human Resources", importance: 0.9 },
        { name: "Recruitment", importance: 0.8 },
        { name: "Communication", importance: 0.9 },
        { name: "Conflict Resolution", importance: 0.7 },
        { name: "Employee Relations", importance: 0.8 }
      ],
      requiredEducation: ["Human Resources", "Business", "Psychology"],
      relatedInterests: ["Human Resources", "Management", "Psychology", "Business"],
      averageSalary: "$70,000 - $115,000",
      demandLevel: "Medium",
      industry: "Human Resources"
    }
  ];
}

/**
 * Get mock market trends data
 * @returns Array of market trend objects
 */
export async function getMarketTrends(): Promise<MarketTrend[]> {
  const trends: MarketTrend[] = [
    {
      id: 1,
      industry: "Artificial Intelligence",
      growth: "Growing",
      demand: "High",
      timestamp: new Date()
    },
    {
      id: 2,
      industry: "Healthcare Technology",
      growth: "Growing",
      demand: "High",
      timestamp: new Date()
    },
    {
      id: 3,
      industry: "Renewable Energy",
      growth: "Growing",
      demand: "High",
      timestamp: new Date()
    },
    {
      id: 4,
      industry: "Cybersecurity",
      growth: "Growing",
      demand: "High",
      timestamp: new Date()
    },
    {
      id: 5,
      industry: "E-commerce",
      growth: "Growing",
      demand: "High",
      timestamp: new Date()
    },
    {
      id: 6,
      industry: "Financial Technology",
      growth: "Growing",
      demand: "High",
      timestamp: new Date()
    },
    {
      id: 7,
      industry: "Digital Marketing",
      growth: "Growing",
      demand: "Medium",
      timestamp: new Date()
    },
    {
      id: 8,
      industry: "Education Technology",
      growth: "Growing",
      demand: "Medium",
      timestamp: new Date()
    },
    {
      id: 9,
      industry: "Cloud Computing",
      growth: "Growing",
      demand: "High",
      timestamp: new Date()
    },
    {
      id: 10,
      industry: "Data Science",
      growth: "Growing",
      demand: "High",
      timestamp: new Date()
    },
    {
      id: 11,
      industry: "Telecommunications",
      growth: "Stable",
      demand: "Medium",
      timestamp: new Date()
    },
    {
      id: 12,
      industry: "Manufacturing",
      growth: "Stable",
      demand: "Medium",
      timestamp: new Date()
    },
    {
      id: 13,
      industry: "Hospitality",
      growth: "Stable",
      demand: "Medium",
      timestamp: new Date()
    },
    {
      id: 14,
      industry: "Retail (Traditional)",
      growth: "Declining",
      demand: "Low",
      timestamp: new Date()
    },
    {
      id: 15,
      industry: "Print Media",
      growth: "Declining",
      demand: "Low",
      timestamp: new Date()
    }
  ];
  
  return trends;
}
