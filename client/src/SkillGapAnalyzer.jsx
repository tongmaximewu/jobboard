import { useState, useEffect } from 'react';

export default function SkillGapAnalyzer({ jobId, jobTitle }) {
  const [userSkills, setUserSkills] = useState([]);
  const [analysis, setAnalysis] = useState(null);
  const [availableSkills, setAvailableSkills] = useState([]);

  // Load available skills
  useEffect(() => {
    fetch('http://localhost:4000/skills')
      .then(res => res.json())
      .then(setAvailableSkills);
  }, []);

  const analyzeGap = async () => {
    const response = await fetch('http://localhost:4000/analyze-skill-gap', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jobId, userSkills })
    });
    const result = await response.json();
    setAnalysis(result);
  };

  const updateSkillProficiency = (skillId, proficiency) => {
    setUserSkills(prev => {
      const filtered = prev.filter(s => s.skillId !== skillId);
      return [...filtered, { skillId, proficiency }];
    });
  };

  return (
    <div className="skill-analyzer">
      <h3>Skill Gap Analyzer: {jobTitle}</h3>
      
      <div className="skills-input">
        <h4>Rate Your Skills (1-5):</h4>
        {availableSkills.map(skill => (
          <div key={skill.id} className="skill-row">
            <label>{skill.name} ({skill.category}):</label>
            <select 
              onChange={(e) => updateSkillProficiency(skill.id, parseInt(e.target.value))}
              defaultValue="0"
            >
              <option value="0">Not Rated</option>
              {[1, 2, 3, 4, 5].map(level => (
                <option key={level} value={level}>{level} - {getProficiencyLabel(level)}</option>
              ))}
            </select>
          </div>
        ))}
      </div>

      <button onClick={analyzeGap} className="analyze-btn">
        Analyze Skill Gap
      </button>

      {analysis && (
        <div className="analysis-results">
          <div className={`match-score ${getScoreColor(analysis.matchScore)}`}>
            <h4>Match Score: {analysis.matchScore}%</h4>
          </div>
          
          <div className="skills-breakdown">
            <div className="strong-skills">
              <h5>✅ Your Strong Skills:</h5>
              {analysis.strongSkills.map(skill => (
                <div key={skill.skill} className="skill-item">
                  {skill.skill} (Importance: {skill.importance})
                </div>
              ))}
            </div>
            
            <div className="missing-skills">
              <h5>📚 Skills to Improve:</h5>
              {analysis.missingSkills.map(skill => (
                <div key={skill.skill} className="skill-item">
                  <strong>{skill.skill}</strong> (Importance: {skill.importance})
                  <div className="learning-resources">
                    {analysis.learningResources[skill.skill]?.map((resource, idx) => (
                      <a key={idx} href={resource.url} target="_blank" rel="noopener noreferrer">
                        {resource.type}: {resource.name} {resource.duration && `(${resource.duration})`}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function getProficiencyLabel(level) {
  const labels = ['Beginner', 'Basic', 'Intermediate', 'Advanced', 'Expert'];
  return labels[level - 1] || 'Unknown';
}

function getScoreColor(score) {
  if (score >= 80) return 'high-match';
  if (score >= 60) return 'medium-match';
  return 'low-match';
}