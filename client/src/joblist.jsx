import { useState } from 'react';
import SkillGapAnalyzer from './SkillGapAnalyzer.jsx';

export default function JobList({ jobs, onDelete }) {
  const [analyzingJob, setAnalyzingJob] = useState(null);
  const [viewingJob, setViewingJob] = useState(null);

  if (!jobs.length) return <p>No jobs found. Try a different search or add a new job!</p>;
  
  const handleDelete = async (id) => {
    await fetch(`http://localhost:4000/jobs/${id}`, {
      method: 'DELETE',
    });
    onDelete();
  };

  return (
    <div className="job-list-container">
      <div className="jobs-stats">
        Found {jobs.length} job{jobs.length !== 1 ? 's' : ''}
      </div>
      
      <div className="jobs-grid">
        {jobs.map(job => (
          <div key={job.id} className="job-card">
            <div className="job-header">
              <h3 onClick={() => setViewingJob(viewingJob?.id === job.id ? null : job)}>
                {job.title}
              </h3>
              <div className="job-meta">
                <span className="company">{job.company}</span>
                <span className="location">{job.location}</span>
                <span className="date">
                  {new Date(job.date_posted).toLocaleDateString()}
                </span>
              </div>
            </div>

            {viewingJob?.id === job.id && (
              <div className="job-details">
                <p className="description">{job.description}</p>
                
                <div className="job-actions">
                  <button 
                    onClick={() => handleDelete(job.id)}
                    className="delete-btn"
                  >
                    🗑️ Delete
                  </button>
                  
                  <button 
                    onClick={() => setAnalyzingJob(analyzingJob?.id === job.id ? null : job)}
                    className="analyze-btn"
                  >
                    {analyzingJob?.id === job.id ? '❌ Close' : '📊 Analyze Fit'}
                  </button>

                  <button className="save-btn">
                    💾 Save Job
                  </button>

                  <button className="apply-btn">
                    ⚡ Quick Apply
                  </button>
                </div>

                {analyzingJob?.id === job.id && (
                  <div className="analysis-section">
                    <SkillGapAnalyzer 
                      jobId={job.id} 
                      jobTitle={job.title}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}