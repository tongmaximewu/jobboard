import { useState } from 'react';

export default function SmartJobPost() {
  const [jobData, setJobData] = useState({
    title: '',
    description: '',
    requirements: '',
    skills: []
  });
  const [optimization, setOptimization] = useState(null);

  const analyzeJobPost = async () => {
    const response = await fetch('http://localhost:4000/analyze-job-post', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(jobData)
    });
    const analysis = await response.json();
    setOptimization(analysis);
  };

  return (
    <div className="smart-job-post">
      <h2>AI Job Post Optimizer</h2>
      
      <div className="job-form">
        <input
          placeholder="Job Title"
          value={jobData.title}
          onChange={(e) => setJobData({...jobData, title: e.target.value})}
        />
        <textarea
          placeholder="Job Description"
          value={jobData.description}
          onChange={(e) => setJobData({...jobData, description: e.target.value})}
          rows="6"
        />
        <textarea
          placeholder="Requirements"
          value={jobData.requirements}
          onChange={(e) => setJobData({...jobData, requirements: e.target.value})}
          rows="4"
        />
        
        <button onClick={analyzeJobPost} className="analyze-btn">
          🪄 Analyze & Optimize
        </button>
      </div>

      {optimization && (
        <div className="optimization-results">
          <div className="score-card">
            <h3>Job Post Score: {optimization.overallScore}/100</h3>
            <div className="score-breakdown">
              <div>Clarity: {optimization.clarityScore}%</div>
              <div>Inclusivity: {optimization.inclusivityScore}%</div>
              <div>Attractiveness: {optimization.attractivenessScore}%</div>
            </div>
          </div>

          <div className="suggestions">
            <h4>🤖 AI Suggestions:</h4>
            {optimization.suggestions.map((suggestion, index) => (
              <div key={index} className="suggestion">
                <strong>{suggestion.type}:</strong> {suggestion.message}
                {suggestion.replacement && (
                  <div className="replacement">
                    Replace: "{suggestion.original}" → "{suggestion.replacement}"
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="bias-alerts">
            <h4>🚨 Bias Alerts:</h4>
            {optimization.biasAlerts.map((alert, index) => (
              <div key={index} className="alert">
                {alert.message} - <em>Impact: {alert.impact}</em>
              </div>
            ))}
          </div>

          <button className="publish-btn" onClick={() => publishJob(optimization.optimizedVersion)}>
            Publish Optimized Version
          </button>
        </div>
      )}
    </div>
  );
}