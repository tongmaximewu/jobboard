import { useState } from 'react';

export default function TeamCultureBuilder() {
  const [currentTeam, setCurrentTeam] = useState([]);
  const [optimization, setOptimization] = useState(null);

  const analyzeTeamComposition = async () => {
    const response = await fetch('http://localhost:4000/optimize-team-composition', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ team: currentTeam, companyCulture: 'current-culture' })
    });
    const result = await response.json();
    setOptimization(result);
  };

  return (
    <div className="team-optimizer">
      <h2>Team Composition Optimizer</h2>
      
      <div className="current-team">
        <h4>Current Team Members</h4>
        {currentTeam.map(member => (
          <div key={member.id} className="team-member">
            {member.name} - {member.workStyle} work style
          </div>
        ))}
      </div>

      <button onClick={analyzeTeamComposition} className="optimize-btn">
        Optimize Team Composition
      </button>

      {optimization && (
        <div className="optimization-result">
          <div className="team-score">
            Team Synergy Score: {optimization.synergyScore}/100
          </div>
          
          <div className="gaps">
            <h4>Missing Work Styles:</h4>
            {optimization.missingWorkStyles.map(style => (
              <div key={style} className="missing-style">
                🔍 Need: {style} - {getWorkStyleDescription(style)}
              </div>
            ))}
          </div>

          <div className="recommendations">
            <h4>Hiring Recommendations:</h4>
            {optimization.hiringRecommendations.map(rec => (
              <div key={rec.workStyle} className="recommendation">
                <strong>Look for:</strong> {rec.workStyle}
                <div>Ideal skills: {rec.complementarySkills.join(', ')}</div>
                <div>Expected impact: {rec.expectedImpact}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}