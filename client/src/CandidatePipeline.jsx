import { useState, useEffect } from 'react';

export default function CandidatePipeline() {
  const [candidates, setCandidates] = useState([]);
  const [predictions, setPredictions] = useState({});

  useEffect(() => {
    // Load candidates who applied to company's jobs
    fetchCandidates();
  }, []);

  const predictCandidateSuccess = async (candidateId) => {
    const response = await fetch(`http://localhost:4000/predict-success/${candidateId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ companyId: 'current-company' })
    });
    const prediction = await response.json();
    setPredictions(prev => ({...prev, [candidateId]: prediction}));
  };

  return (
    <div className="candidate-pipeline">
      <h2>Candidate Success Predictor</h2>
      
      <div className="candidates-grid">
        {candidates.map(candidate => (
          <div key={candidate.id} className="candidate-card">
            <h4>{candidate.name}</h4>
            <p>{candidate.currentRole} at {candidate.currentCompany}</p>
            
            <div className="candidate-metrics">
              <div>Skill Match: {candidate.skillMatch}%</div>
              <div>Culture Fit: {candidate.cultureFit}%</div>
            </div>

            <button 
              onClick={() => predictCandidateSuccess(candidate.id)}
              className="predict-btn"
            >
              Predict Success
            </button>

            {predictions[candidate.id] && (
              <div className="prediction-result">
                <div className={`success-probability ${getProbabilityClass(predictions[candidate.id].successProbability)}`}>
                  Success Probability: {predictions[candidate.id].successProbability}%
                </div>
                <div className="risk-factors">
                  {predictions[candidate.id].riskFactors.map((risk, idx) => (
                    <div key={idx} className="risk-factor">⚠️ {risk}</div>
                  ))}
                </div>
                <div className="strengths">
                  {predictions[candidate.id].strengths.map((strength, idx) => (
                    <div key={idx} className="strength">✅ {strength}</div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}