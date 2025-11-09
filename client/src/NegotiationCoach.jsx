import { useState } from 'react';

export default function NegotiationCoach() {
  const [offer, setOffer] = useState({
    baseSalary: '',
    bonus: '',
    equity: '',
    benefits: ''
  });
  const [coaching, setCoaching] = useState(null);

  const getNegotiationCoaching = async () => {
    const response = await fetch('http://localhost:4000/negotiation-coach', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ offer, market: 'tech' }) // Could be dynamic
    });
    const coach = await response.json();
    setCoaching(coach);
  };

  return (
    <div className="negotiation-coach">
      <h2>AI Negotiation Coach</h2>
      <p>Get personalized negotiation strategies for your job offer</p>
      
      <div className="offer-input">
        <h4>Enter Your Offer Details:</h4>
        {Object.keys(offer).map(field => (
          <input
            key={field}
            placeholder={field.replace(/([A-Z])/g, ' $1').toUpperCase()}
            value={offer[field]}
            onChange={(e) => setOffer({...offer, [field]: e.target.value})}
          />
        ))}
        
        <button onClick={getNegotiationCoaching} className="coach-btn">
          🎯 Get Negotiation Strategy
        </button>
      </div>

      {coaching && (
        <div className="coaching-results">
          <div className="strategy-overview">
            <h3>Recommended Negotiation Strategy</h3>
            <div className="confidence-score">
              Confidence: {coaching.confidenceScore}%
            </div>
          </div>

          <div className="talking-points">
            <h4>🗣️ Key Talking Points</h4>
            {coaching.talkingPoints.map((point, idx) => (
              <div key={idx} className="talking-point">
                <strong>{point.category}:</strong> {point.message}
              </div>
            ))}
          </div>

          <div className="target-numbers">
            <h4>🎯 Target Numbers</h4>
            <div className="target-grid">
              {Object.keys(coaching.targets).map(key => (
                <div key={key} className="target-item">
                  <div className="target-label">{key}:</div>
                  <div className="target-value">{coaching.targets[key]}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="practice-scenarios">
            <h4>🏋️ Practice Scenarios</h4>
            {coaching.practiceScenarios.map((scenario, idx) => (
              <div key={idx} className="scenario">
                <div className="scenario-prompt">
                  <strong>If they say:</strong> "{scenario.challenge}"
                </div>
                <div className="scenario-response">
                  <strong>You respond:</strong> "{scenario.response}"
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}