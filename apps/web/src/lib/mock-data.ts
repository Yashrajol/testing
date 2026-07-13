// Realistic mock data for VEDHKRIT demo
const firstNames = ["Aarav", "Vivaan", "Aditya", "Vihaan", "Arjun", "Sai", "Reyansh", "Ayaan", "Krishna", "Ishaan", "Aanya", "Diya", "Saanvi", "Aadhya", "Pari", "Anika", "Navya", "Riya", "Myra", "Sara", "Kabir", "Dhruv", "Ansh", "Veer", "Ira", "Kiara", "Nisha", "Tara", "Arnav", "Rohan", "Meera", "Zoya", "Advait", "Kiaan", "Aaradhya", "Anaya", "Mira", "Tanvi", "Shaurya", "Yuvraj"];
const lastNames = ["Sharma", "Verma", "Patel", "Reddy", "Iyer", "Nair", "Kapoor", "Mehta", "Joshi", "Gupta", "Singh", "Kumar", "Khan", "Bose", "Das", "Rao", "Pillai", "Banerjee", "Chopra", "Malhotra"];
const schools = ["Delhi Public School", "DAV Public School", "Kendriya Vidyalaya", "Ryan International", "Modern School", "Bal Bharati", "Springdales", "Sanskriti School", "Vasant Valley", "Step by Step", "The Heritage School", "Pathways World", "Shiv Nadar School", "Lotus Valley", "Amity International", "Mayo College", "Doon School", "Welham", "Genesis Global", "Inventure Academy"];
const subjects = ["Mathematics", "Science", "English", "Social Studies", "Hindi", "Computer Science", "Physics", "Chemistry", "Biology", "Economics"];
const skills = ["Critical Thinking", "Communication", "Collaboration", "Creativity", "Leadership", "Problem Solving", "Digital Literacy", "Emotional Intelligence", "Time Management", "Adaptability"];
const careers = ["Software Engineer", "Data Scientist", "Doctor", "Architect", "Civil Servant", "Entrepreneur", "Designer", "Researcher", "Lawyer", "Psychologist", "Chartered Accountant", "UX Designer", "Product Manager", "Biotech Researcher", "Aerospace Engineer"];
const stages = ["Discover", "Explore", "Align", "Prepare", "Achieve"] as const;

function seed(i: number) { return ((i * 9301 + 49297) % 233280) / 233280; }
function pick<T>(arr: T[], i: number): T { return arr[Math.floor(seed(i) * arr.length)]; }

export const students = Array.from({ length: 500 }, (_, i) => {
  const grade = 6 + Math.floor(seed(i + 1) * 7);
  return {
    id: `STU${String(i + 1).padStart(4, "0")}`,
    name: `${pick(firstNames, i + 1)} ${pick(lastNames, i + 7)}`,
    grade,
    section: ["A", "B", "C", "D"][Math.floor(seed(i + 3) * 4)],
    school: pick(schools, i + 5),
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`,
    growthScore: Math.round(60 + seed(i + 11) * 38),
    academic: Math.round(55 + seed(i + 13) * 42),
    skills: Math.round(50 + seed(i + 17) * 45),
    wellbeing: Math.round(60 + seed(i + 19) * 35),
    careerReadiness: Math.round(45 + seed(i + 23) * 50),
    attendance: Math.round(80 + seed(i + 29) * 19),
    riskLevel: seed(i + 31) > 0.85 ? "high" : seed(i + 31) > 0.6 ? "medium" : "low",
    stage: stages[Math.floor(seed(i + 37) * 5)],
    careerInterest: pick(careers, i + 41),
    parentName: `${pick(firstNames, i + 43)} ${pick(lastNames, i + 7)}`,
    mentorId: `MEN${String(1 + Math.floor(seed(i + 47) * 50)).padStart(3, "0")}`,
  };
});

export const mentors = Array.from({ length: 50 }, (_, i) => ({
  id: `MEN${String(i + 1).padStart(3, "0")}`,
  name: `${pick(firstNames, i + 100)} ${pick(lastNames, i + 200)}`,
  expertise: pick(["STEM", "Humanities", "Career Counseling", "Wellbeing", "Leadership", "Arts"], i + 50),
  rating: Math.round((4 + seed(i + 51) * 1) * 10) / 10,
  students: 8 + Math.floor(seed(i + 53) * 15),
  sessions: 50 + Math.floor(seed(i + 57) * 200),
  avatar: `https://api.dicebear.com/7.x/personas/svg?seed=${i + 200}`,
}));

export const schoolList = Array.from({ length: 20 }, (_, i) => ({
  id: `SCH${String(i + 1).padStart(3, "0")}`,
  name: schools[i],
  city: ["Delhi", "Mumbai", "Bangalore", "Mumbai", "Pune", "Chennai", "Kolkata", "Ahmedabad"][Math.floor(seed(i + 60) * 8)],
  students: 200 + Math.floor(seed(i + 61) * 1800),
  teachers: 20 + Math.floor(seed(i + 63) * 80),
  plan: ["Starter", "Growth", "Enterprise"][Math.floor(seed(i + 65) * 3)],
  revenue: Math.round((50 + seed(i + 67) * 450) * 1000),
  status: seed(i + 69) > 0.1 ? "active" : "trial",
}));

// Time-series helpers
export const monthlyGrowth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((m, i) => ({
  month: m,
  academic: 60 + Math.round(seed(i + 1) * 30),
  skills: 55 + Math.round(seed(i + 3) * 35),
  wellbeing: 65 + Math.round(seed(i + 5) * 28),
  career: 50 + Math.round(seed(i + 7) * 40),
}));

export const radarData = [
  { dimension: "Academic", score: 82, benchmark: 70 },
  { dimension: "Aptitude", score: 76, benchmark: 68 },
  { dimension: "Skills", score: 88, benchmark: 72 },
  { dimension: "Behaviour", score: 79, benchmark: 75 },
  { dimension: "Wellbeing", score: 85, benchmark: 78 },
  { dimension: "Career", score: 73, benchmark: 65 },
];

export const skillBreakdown = skills.slice(0, 8).map((s, i) => ({
  skill: s,
  score: 50 + Math.round(seed(i + 90) * 45),
}));

export const subjectScores = subjects.slice(0, 6).map((s, i) => ({
  subject: s,
  score: 60 + Math.round(seed(i + 110) * 35),
  class_avg: 55 + Math.round(seed(i + 113) * 25),
}));

export const careerMatches = careers.slice(0, 6).map((c, i) => ({
  career: c,
  match: 60 + Math.round(seed(i + 130) * 38),
}));

export const platformRevenue = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((m, i) => ({
  month: m,
  mrr: Math.round(50000 + i * 8200 + seed(i + 200) * 12000),
  users: Math.round(2000 + i * 450 + seed(i + 210) * 800),
}));

export const ildfStages = [
  { stage: "Discover", desc: "Self-awareness, identifying passions and innate strengths.", color: "#3b82f6", students: 142 },
  { stage: "Explore", desc: "Hands-on exposure to careers, domains and real-world challenges.", color: "#06b6d4", students: 118 },
  { stage: "Align", desc: "Match strengths with academic streams & long-term goals.", color: "#10b981", students: 96 },
  { stage: "Prepare", desc: "Skill-building, portfolios, internships and entrance prep.", color: "#84cc16", students: 84 },
  { stage: "Achieve", desc: "Outcomes — admissions, placements, ventures, mastery.", color: "#f59e0b", students: 60 },
];

export const upcomingSessions = Array.from({ length: 6 }, (_, i) => ({
  id: i,
  topic: ["Career Roadmap Review", "Aptitude Debrief", "College Shortlisting", "Skill Goal Check-in", "Wellbeing Conversation", "Portfolio Review"][i],
  mentor: mentors[i].name,
  date: ["Today, 4:00 PM", "Tomorrow, 10:00 AM", "Wed, 2:30 PM", "Thu, 5:00 PM", "Fri, 11:00 AM", "Sat, 9:00 AM"][i],
  stage: stages[i % 5],
}));

export const notifications = [
  { id: 1, type: "success", text: "New aptitude report ready for review", time: "2m ago" },
  { id: 2, type: "info", text: "Mentor session scheduled for tomorrow", time: "1h ago" },
  { id: 3, type: "warning", text: "Math assessment due in 2 days", time: "3h ago" },
  { id: 4, type: "success", text: "You earned the 'Critical Thinker' badge", time: "Yesterday" },
];

export const badges = [
  { name: "Critical Thinker", icon: "🧠", earned: true },
  { name: "Team Player", icon: "🤝", earned: true },
  { name: "Innovator", icon: "💡", earned: true },
  { name: "Communicator", icon: "🎤", earned: false },
  { name: "Leader", icon: "🏆", earned: false },
  { name: "Researcher", icon: "🔬", earned: true },
];

export const goals = [
  { goal: "Improve Math score to 90%", progress: 72, due: "Mar 30" },
  { goal: "Complete Python Beginner course", progress: 88, due: "Apr 5" },
  { goal: "Read 4 books this quarter", progress: 50, due: "Apr 15" },
  { goal: "Submit science project", progress: 35, due: "Apr 22" },
];

export const assessments = [
  { name: "Academic Diagnostic", type: "Academic", duration: "60 min", status: "Completed", score: 84 },
  { name: "DBDA Aptitude Battery", type: "Aptitude", duration: "90 min", status: "Completed", score: 78 },
  { name: "21st Century Skills", type: "Skills", duration: "45 min", status: "In Progress", score: null },
  { name: "Behavioural Profiler", type: "Behaviour", duration: "30 min", status: "Not Started", score: null },
  { name: "Wellbeing Index", type: "Wellbeing", duration: "20 min", status: "Completed", score: 88 },
  { name: "Career Readiness Index", type: "Career", duration: "50 min", status: "Completed", score: 73 },
];
