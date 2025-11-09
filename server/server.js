import express from "express";
import cors from "cors";
import { openDb } from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());

// ===== EXISTING ROUTES =====

app.get("/jobs", async (req, res) => {
  try {
    const db = await openDb();
    const { q } = req.query;
    const jobs = q
      ? await db.all("SELECT * FROM jobs WHERE title LIKE ? OR company LIKE ?", [`%${q}%`, `%${q}%`])
      : await db.all("SELECT * FROM jobs ORDER BY date_posted DESC");
    res.json(jobs);
  } catch (error) {
    console.error("Jobs fetch error:", error);
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
});

app.post("/jobs", async (req, res) => {
  try {
    const db = await openDb();
    const { title, company, location, description } = req.body;
    await db.run("INSERT INTO jobs (title, company, location, description) VALUES (?, ?, ?, ?)",
                 [title, company, location, description]);
    res.json({ success: true });
  } catch (error) {
    console.error("Job creation error:", error);
    res.status(500).json({ error: "Failed to create job" });
  }
});

app.delete("/jobs/:id", async (req, res) => {
  try {
    const db = await openDb();
    const { id } = req.params;
    await db.run("DELETE FROM jobs WHERE id = ?", [id]);
    res.json({ success: true });
  } catch (error) {
    console.error("Job deletion error:", error);
    res.status(500).json({ error: "Failed to delete job" });
  }
});

// ===== EMPLOYER ROUTES =====

// AI Job Post Analysis
app.post("/analyze-job-post", async (req, res) => {
  try {
    const { title, description, requirements } = req.body;
    
    // Mock analysis
    const clarityScore = Math.min(100, Math.floor(Math.random() * 30) + 70);
    const inclusivityScore = Math.min(100, Math.floor(Math.random() * 40) + 60);
    const attractivenessScore = Math.min(100, Math.floor(Math.random() * 35) + 65);
    const overallScore = Math.round((clarityScore + inclusivityScore + attractivenessScore) / 3);
    
    res.json({
      overallScore,
      clarityScore,
      inclusivityScore,
      attractivenessScore,
      suggestions: [
        {
          type: "Clarity",
          message: "Consider breaking the description into bullet points",
          original: "We need someone who can do many things",
          replacement: "Key responsibilities include: • Task 1 • Task 2 • Task 3"
        }
      ],
      biasAlerts: [
        {
          message: "Consider removing 'rockstar' and 'ninja' terms",
          impact: "May discourage qualified candidates"
        }
      ],
      optimizedVersion: "Optimized job description would appear here..."
    });
  } catch (error) {
    console.error("Job post analysis error:", error);
    res.status(500).json({ error: "Analysis failed" });
  }
});

// Candidate Success Prediction
app.post("/predict-success/:candidateId", async (req, res) => {
  try {
    const { candidateId } = req.params;
    
    res.json({
      successProbability: Math.floor(Math.random() * 40) + 60,
      riskFactors: ["Limited experience with specific technology", "May need ramp-up time"],
      strengths: ["Strong problem-solving skills", "Good cultural fit", "Fast learner"],
      recommendedRole: "The applied role seems appropriate",
      timeline: "3-6 months to full productivity"
    });
  } catch (error) {
    console.error("Prediction error:", error);
    res.status(500).json({ error: "Prediction failed" });
  }
});

// Team Composition Optimization
app.post("/optimize-team-composition", async (req, res) => {
  try {
    const { team, companyCulture } = req.body;
    
    res.json({
      synergyScore: Math.floor(Math.random() * 30) + 70,
      missingWorkStyles: ["Strategic Thinker", "Detail-Oriented Organizer"],
      hiringRecommendations: [
        {
          workStyle: "Strategic Thinker",
          complementarySkills: ["Systems thinking", "Long-term planning"],
          expectedImpact: "Improve project roadmap clarity"
        }
      ],
      potentialConflicts: ["Potential communication style differences"],
      improvementStrategies: ["Regular team retrospectives", "Clear role definitions"]
    });
  } catch (error) {
    console.error("Team optimization error:", error);
    res.status(500).json({ error: "Optimization failed" });
  }
});

// Company Analytics Dashboard
app.get("/company-analytics/:companyId", async (req, res) => {
  try {
    const { companyId } = req.params;
    
    const analytics = {
      hiringMetrics: {
        totalApplications: 154,
        interviewRate: "32%",
        offerAcceptance: "78%",
        timeToFill: "28 days"
      },
      candidateQuality: {
        averageSkillMatch: 76,
        cultureFitScore: 82,
        diversityScore: 65
      },
      timeToHire: {
        averageDays: 28,
        industryAverage: 35,
        trend: "improving"
      },
      diversityMetrics: {
        genderDiversity: "42% women",
        ethnicDiversity: "35% underrepresented groups",
        departmentDistribution: "Engineering: 25% diverse"
      },
      competitorBenchmarks: {
        yourTimeToHire: 28,
        industryAverage: 35,
        topPerformers: 21
      }
    };
    
    res.json(analytics);
  } catch (error) {
    console.error("Analytics error:", error);
    res.status(500).json({ error: "Analytics failed" });
  }
});

// ===== JOB SEEKER ROUTES =====

// Career Path Simulation
app.post("/simulate-career-path", async (req, res) => {
  try {
    const { currentRole, targetRole, currentSkills, timeline } = req.body;
    
    res.json({
      path: [
        { year: 1, role: "Junior Developer", skillsToLearn: ["Advanced React", "Node.js"], estimatedSalary: 75000 },
        { year: 2, role: "Mid-level Developer", skillsToLearn: ["System Design", "AWS"], estimatedSalary: 95000 },
        { year: 3, role: "Senior Developer", skillsToLearn: ["Team Leadership", "Architecture"], estimatedSalary: 120000 },
        { year: 5, role: "Tech Lead", skillsToLearn: ["Project Management", "Stakeholder Communication"], estimatedSalary: 150000 }
      ],
      alternativePaths: [
        { name: "Management Track", description: "Move into engineering management", timeline: "4-6 years", salary: 160000 },
        { name: "Specialist Track", description: "Become a domain expert", timeline: "3-5 years", salary: 140000 }
      ],
      skillInvestments: ["Advanced React", "Node.js", "System Design", "AWS", "Team Leadership", "Architecture"],
      marketTrends: ["AI/ML integration", "Remote work specialization", "Cloud computing"],
      riskFactors: ["Technology obsolescence", "Market saturation", "Economic downturns"]
    });
  } catch (error) {
    console.error("Career simulation error:", error);
    res.status(500).json({ error: "Simulation failed" });
  }
});

// Culture Match Analysis
app.post("/analyze-culture-match", async (req, res) => {
  try {
    const { preferences } = req.body;
    
    res.json({
      workStyleProfile: "Collaborative Innovator",
      topCompanies: [
        {
          id: 1,
          name: "Tech Innovators Inc",
          matchScore: 87,
          workCulture: "Collaborative & Innovative",
          coreValues: ["Transparency", "Growth", "Work-Life Balance"],
          communicationStyle: "Balanced Async/Sync",
          insights: ["Strong mentorship culture", "Flexible work arrangements"]
        },
        {
          id: 2,
          name: "Digital Solutions Co",
          matchScore: 78,
          workCulture: "Structured & Efficient",
          coreValues: ["Excellence", "Reliability", "Teamwork"],
          communicationStyle: "Regular structured meetings",
          insights: ["Clear career progression", "Stable environment"]
        }
      ],
      topMatch: { score: 87 },
      improvementSuggestions: ["Consider more flexible work arrangements", "Improve communication transparency"]
    });
  } catch (error) {
    console.error("Culture match error:", error);
    res.status(500).json({ error: "Culture analysis failed" });
  }
});

// Negotiation Coaching
app.post("/negotiation-coach", async (req, res) => {
  try {
    const { offer, market } = req.body;
    
    res.json({
      confidenceScore: 85,
      talkingPoints: [
        { category: "Market Rate", message: "Based on market data, you're 15% below average for this role" },
        { category: "Your Value", message: "Highlight your specific achievements and skills" },
        { category: "Growth Potential", message: "Emphasize your long-term value to the company" }
      ],
      targets: {
        "Base Salary": "$95,000 - $105,000",
        "Signing Bonus": "$5,000 - $10,000", 
        "Equity": "Additional 0.1%",
        "Vacation": "+5 days",
        "Professional Development": "$3,000 annual budget"
      },
      walkAwayPoints: ["Below $85,000 base", "Less than 15 days PTO", "No growth opportunities"],
      practiceScenarios: [
        {
          challenge: "That's above our budget for this role",
          response: "I understand budget constraints. Could we discuss alternative compensation like additional equity or a performance bonus?"
        },
        {
          challenge: "We don't typically offer signing bonuses",
          response: "I appreciate that. Would you consider a higher base salary or additional vacation time instead?"
        }
      ]
    });
  } catch (error) {
    console.error("Negotiation coach error:", error);
    res.status(500).json({ error: "Coaching failed" });
  }
});

// Skills Future-Proofing
app.post("/future-proof-skills", async (req, res) => {
  try {
    const { currentSkills, industry, goals } = req.body;
    
    res.json({
      atRiskSkills: ["jQuery", "Flash", "Basic CRUD operations", "Traditional data centers"],
      emergingSkills: ["AI Integration", "Blockchain", "Quantum Computing Basics", "Edge Computing"],
      stableSkills: ["Problem Solving", "Communication", "JavaScript Fundamentals", "System Design"],
      learningPath: [
        "Learn cloud computing fundamentals (3 months)",
        "Study AI/ML basics (6 months)", 
        "Practice system design (ongoing)",
        "Master one modern framework deeply (4 months)"
      ],
      marketValue: "+25% salary potential with future skills",
      prioritySkills: ["Cloud Architecture", "Machine Learning", "DevOps", "Security"]
    });
  } catch (error) {
    console.error("Skills analysis error:", error);
    res.status(500).json({ error: "Skills analysis failed" });
  }
});

// Get all skills for gap analysis
app.get("/skills", async (req, res) => {
  try {
    const skills = [
      { id: 1, name: "React", category: "Frontend" },
      { id: 2, name: "JavaScript", category: "Frontend" },
      { id: 3, name: "Node.js", category: "Backend" },
      { id: 4, name: "Python", category: "Backend" },
      { id: 5, name: "SQL", category: "Database" },
      { id: 6, name: "AWS", category: "Cloud" },
      { id: 7, name: "Docker", category: "DevOps" },
      { id: 8, name: "Git", category: "Tools" },
      { id: 9, name: "TypeScript", category: "Frontend" },
      { id: 10, name: "MongoDB", category: "Database" }
    ];
    
    res.json(skills);
  } catch (error) {
    console.error("Skills fetch error:", error);
    res.status(500).json({ error: "Failed to fetch skills" });
  }
});

// Analyze skill gap for a specific job
app.post("/analyze-skill-gap", async (req, res) => {
  try {
    const { jobId, userSkills } = req.body;
    
    const analysis = {
      matchScore: Math.floor(Math.random() * 40) + 60,
      strongSkills: [
        { skill: "React", importance: 3, userProficiency: 4 },
        { skill: "JavaScript", importance: 3, userProficiency: 5 },
        { skill: "Git", importance: 2, userProficiency: 4 }
      ],
      missingSkills: [
        { skill: "Node.js", importance: 2, userProficiency: 2 },
        { skill: "AWS", importance: 1, userProficiency: 1 },
        { skill: "Docker", importance: 1, userProficiency: 0 }
      ],
      learningResources: {
        "Node.js": [
          { type: "Course", name: "Node.js Official Documentation", url: "https://nodejs.org/docs" },
          { type: "Project", name: "Build a REST API", duration: "8 hours" }
        ],
        "AWS": [
          { type: "Course", name: "AWS Cloud Practitioner", url: "https://aws.amazon.com/training/" },
          { type: "Tutorial", name: "Deploy a simple app to EC2", duration: "3 hours" }
        ],
        "Docker": [
          { type: "Course", name: "Docker Getting Started", url: "https://docs.docker.com/get-started/" },
          { type: "Practice", name: "Containerize a web application", duration: "4 hours" }
        ]
      }
    };
    
    res.json(analysis);
  } catch (error) {
    console.error("Skill gap analysis error:", error);
    res.status(500).json({ error: "Skill analysis failed" });
  }
});

// Start the server
app.listen(4000, () => console.log("✅ Server running on http://localhost:4000"));