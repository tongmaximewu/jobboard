import { useState, useEffect } from 'react';
import JobList from './JobList.jsx';
import JobForm from './JobForm.jsx';
import SkillGapAnalyzer from './SkillGapAnalyzer.jsx';
import CareerPathSimulator from './CareerPathSimulator.jsx';
import CultureMatchAnalyzer from './CultureMatchAnalyzer.jsx';
import NegotiationCoach from './NegotiationCoach.jsx';

export default function JobSeekerMode() {
  const [jobs, setJobs] = useState([]);
  const [query, setQuery] = useState('');
  const [activeFeature, setActiveFeature] = useState('job-search');

  const fetchJobs = () => {
    fetch(`http://localhost:4000/jobs?q=${query}`)
      .then(res => res.json())
      .then(setJobs);
  };

  useEffect(() => {
    fetchJobs();
  }, [query]);

  const handleFormSubmit = () => {
    fetchJobs();
  };

  return (
    <div className="jobseeker-mode">
      {/* Feature Navigation */}
      <nav className="feature-nav">
        <button 
          className={activeFeature === 'job-search' ? 'active' : ''}
          onClick={() => setActiveFeature('job-search')}
        >
          🔍 Job Search
        </button>
        <button 
          className={activeFeature === 'skill-gap' ? 'active' : ''}
          onClick={() => setActiveFeature('skill-gap')}
        >
          📚 Skill Analyzer
        </button>
        <button 
          className={activeFeature === 'career-path' ? 'active' : ''}
          onClick={() => setActiveFeature('career-path')}
        >
          🗺️ Career Simulator
        </button>
        <button 
          className={activeFeature === 'culture-match' ? 'active' : ''}
          onClick={() => setActiveFeature('culture-match')}
        >
          🏢 Culture Match
        </button>
        <button 
          className={activeFeature === 'negotiation' ? 'active' : ''}
          onClick={() => setActiveFeature('negotiation')}
        >
          💰 Negotiation Coach
        </button>
      </nav>

      <div className="feature-content">
        {activeFeature === 'job-search' && (
          <div className="job-search-section">
            <div className="search-header">
              <input
                placeholder="Search jobs by title, company, or skills..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="search-input"
              />
              <button onClick={fetchJobs} className="refresh-btn">
                🔄 Refresh
              </button>
            </div>
            
            <JobList jobs={jobs} onDelete={fetchJobs} />
            <JobForm onSubmit={handleFormSubmit} />
          </div>
        )}

        {activeFeature === 'skill-gap' && (
          <SkillGapAnalyzer />
        )}

        {activeFeature === 'career-path' && (
          <CareerPathSimulator />
        )}

        {activeFeature === 'culture-match' && (
          <CultureMatchAnalyzer />
        )}

        {activeFeature === 'negotiation' && (
          <NegotiationCoach />
        )}
      </div>
    </div>
  );
}