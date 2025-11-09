import { useState } from 'react';

export default function CareerPathSimulator() {
  const [currentRole, setCurrentRole] = useState('');
  const [targetRole, setTargetRole] = useState('');
  const [skills, setSkills] = useState([]);
  const [simulation, setSimulation] = useState(null);

  const runSimulation = async () => {
    const response = await fetch('http://localhost:4000/simulate-career-path', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        currentRole,
        targetRole,
        currentSkills: skills,
        timeline: '5 years'
      })
    });
    const result = await response.json();
    setSimulation(result);
  };

  return (
    <div className="career-simulator">
      <h2>Career Path Simulator</h2>
      <p>See where your career could go in the next 5 years</p>
      
      <div className="simulator-form">
        <input
          placeholder="Your current role"
          value={currentRole}
          onChange={(e) => setCurrentRole(e.target.value)}
        />
        <input
          placeholder="Your target role"
          value={targetRole}
          onChange={(e) => setTargetRole(e.target.value)}
        />
        <textarea
          placeholder="Your current skills (comma separated)"
          value={skills.join(', ')}
          onChange={(e) => setSkills(e.target.value.split(',').map(s => s.trim()))}
        />
        
        <button onClick={runSimulation} className="simulate-btn">
          🚀 Simulate Career Path
        </button>
      </div>

      {simulation && (
        <div className="simulation-results">
          <div className="path-visualization">
            <h3>Your Career Trajectory</h3>
            <div className="timeline">
              {simulation.path.map((step, index) => (
                <div key={index} className="timeline-step">
                  <div className="step-year">Year {step.year}</div>
                  <div className="step-role">{step.role}</div>
                  <div className="step-skills">
                    {step.skillsToLearn.join(', ')}
                  </div>
                  <div className="step-salary">
                    ${step.estimatedSalary.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="opportunities">
            <h4>💡 Alternative Paths</h4>
            {simulation.alternativePaths.map((path, idx) => (
              <div key={idx} className="alternative-path">
                <strong>{path.name}:</strong> {path.description}
                <div>Time: {path.timeline} • Salary: ${path.salary.toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}