import { useState } from 'react';

export default function CultureMatchAnalyzer() {
  const [workPreferences, setWorkPreferences] = useState({
    workStyle: '',
    communication: '',
    feedback: '',
    autonomy: '',
    workHours: ''
  });
  const [matchResults, setMatchResults] = useState(null);

  const analyzeCultureMatch = async () => {
    const response = await fetch('http://localhost:4000/analyze-culture-match', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ preferences: workPreferences })
    });
    const results = await response.json();
    setMatchResults(results);
  };

  return (
    <div className="culture-matcher">
      <h2>Company Culture Match Analyzer</h2>
      <p>Find companies that match your work style and values</p>
      
      <div className="preferences-form">
        {Object.keys(workPreferences).map(preference => (
          <div key={preference} className="preference-field">
            <label>{preference.replace(/([A-Z])/g, ' $1').toUpperCase()}:</label>
            <select
              value={workPreferences[preference]}
              onChange={(e) => setWorkPreferences({
                ...workPreferences, 
                [preference]: e.target.value
              })}
            >
              <option value="">Select preference...</option>
              {getPreferenceOptions(preference).map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        ))}
        
        <button onClick={analyzeCultureMatch} className="analyze-culture-btn">
          🔍 Find Culture Matches
        </button>
      </div>

      {matchResults && (
        <div className="culture-results">
          <div className="match-summary">
            <h3>Your Work Style: {matchResults.workStyleProfile}</h3>
            <div className="compatibility-score">
              Best Match Compatibility: {matchResults.topMatch.score}%
            </div>
          </div>

          <div className="company-matches">
            <h4>🏢 Top Company Matches</h4>
            {matchResults.topCompanies.map(company => (
              <div key={company.id} className="company-match">
                <div className="company-header">
                  <strong>{company.name}</strong>
                  <span className="match-score">{company.matchScore}% match</span>
                </div>
                <div className="company-details">
                  <div>Work Style: {company.workCulture}</div>
                  <div>Values: {company.coreValues.join(', ')}</div>
                  <div>Communication: {company.communicationStyle}</div>
                </div>
                <div className="culture-insights">
                  {company.insights.map((insight, idx) => (
                    <div key={idx} className="insight">💡 {insight}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function getPreferenceOptions(preference) {
  const options = {
    workStyle: [
      { value: 'collaborative', label: 'Highly Collaborative' },
      { value: 'independent', label: 'Independent Work' },
      { value: 'hybrid', label: 'Mix of Both' }
    ],
    communication: [
      { value: 'async', label: 'Mostly Async (Slack, Email)' },
      { value: 'sync', label: 'Regular Meetings' },
      { value: 'balanced', label: 'Balanced Approach' }
    ],
    feedback: [
      { value: 'regular', label: 'Regular Structured Feedback' },
      { value: 'informal', label: 'Informal Continuous Feedback' },
      { value: 'minimal', label: 'Minimal Feedback' }
    ],
    autonomy: [
      { value: 'high', label: 'High Autonomy' },
      { value: 'moderate', label: 'Moderate Guidance' },
      { value: 'structured', label: 'Structured Environment' }
    ],
    workHours: [
      { value: 'flexible', label: 'Flexible Hours' },
      { value: 'standard', label: 'Standard 9-5' },
      { value: 'results', label: 'Results-Oriented' }
    ]
  };
  return options[preference] || [];
}