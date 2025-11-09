import { useState, useEffect } from 'react';

export default function CompanyAnalytics() {
  const [analytics, setAnalytics] = useState(null);
  const [timeRange, setTimeRange] = useState('30d');

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const fetchAnalytics = async () => {
    // Using mock company ID - in real app, this would be dynamic
    const response = await fetch(`http://localhost:4000/company-analytics/company-123?range=${timeRange}`);
    const data = await response.json();
    setAnalytics(data);
  };

  if (!analytics) return <div>Loading analytics...</div>;

  return (
    <div className="company-analytics">
      <div className="analytics-header">
        <h2>Company Analytics Dashboard</h2>
        <select 
          value={timeRange} 
          onChange={(e) => setTimeRange(e.target.value)}
          className="time-range-selector"
        >
          <option value="7d">Last 7 Days</option>
          <option value="30d">Last 30 Days</option>
          <option value="90d">Last 90 Days</option>
        </select>
      </div>

      <div className="metrics-grid">
        {/* Hiring Metrics */}
        <div className="metric-card">
          <h3>📊 Hiring Metrics</h3>
          <div className="metric-value">{analytics.hiringMetrics.totalApplications}</div>
          <div className="metric-label">Total Applications</div>
          <div className="metric-sub">
            <span>Interview Rate: {analytics.hiringMetrics.interviewRate}</span>
            <span>Offer Acceptance: {analytics.hiringMetrics.offerAcceptance}</span>
          </div>
        </div>

        {/* Candidate Quality */}
        <div className="metric-card">
          <h3>⭐ Candidate Quality</h3>
          <div className="metric-value">{analytics.candidateQuality.averageSkillMatch}%</div>
          <div className="metric-label">Average Skill Match</div>
          <div className="metric-sub">
            <span>Culture Fit: {analytics.candidateQuality.cultureFitScore}%</span>
            <span>Diversity Score: {analytics.candidateQuality.diversityScore}%</span>
          </div>
        </div>

        {/* Time to Hire */}
        <div className="metric-card">
          <h3>⏱️ Time to Hire</h3>
          <div className="metric-value">{analytics.timeToHire.averageDays} days</div>
          <div className="metric-label">Average Time to Hire</div>
          <div className="metric-sub">
            <span>Industry Avg: {analytics.timeToHire.industryAverage} days</span>
            <span className={`trend ${analytics.timeToHire.trend}`}>
              Trend: {analytics.timeToHire.trend}
            </span>
          </div>
        </div>

        {/* Diversity Metrics */}
        <div className="metric-card">
          <h3>🌈 Diversity Metrics</h3>
          <div className="metric-value">{analytics.diversityMetrics.genderDiversity}</div>
          <div className="metric-label">Gender Diversity</div>
          <div className="metric-sub">
            <span>{analytics.diversityMetrics.ethnicDiversity}</span>
            <span>{analytics.diversityMetrics.departmentDistribution}</span>
          </div>
        </div>
      </div>

      {/* Competitor Benchmarks */}
      <div className="benchmarks-section">
        <h3>📈 Competitor Benchmarks</h3>
        <div className="benchmark-comparison">
          <div className="benchmark-item">
            <div className="benchmark-label">Your Time to Hire</div>
            <div className="benchmark-value">{analytics.competitorBenchmarks.yourTimeToHire} days</div>
          </div>
          <div className="benchmark-item">
            <div className="benchmark-label">Industry Average</div>
            <div className="benchmark-value">{analytics.competitorBenchmarks.industryAverage} days</div>
          </div>
          <div className="benchmark-item">
            <div className="benchmark-label">Top Performers</div>
            <div className="benchmark-value">{analytics.competitorBenchmarks.topPerformers} days</div>
          </div>
        </div>
      </div>

      {/* Improvement Suggestions */}
      <div className="suggestions-section">
        <h3>💡 Improvement Opportunities</h3>
        <div className="suggestions-grid">
          <div className="suggestion-card">
            <h4>Reduce Time to Hire</h4>
            <p>Streamline interview process by implementing one-way video interviews for initial screening.</p>
            <div className="impact">Potential impact: -7 days</div>
          </div>
          <div className="suggestion-card">
            <h4>Improve Diversity</h4>
            <p>Partner with organizations focused on underrepresented groups in tech.</p>
            <div className="impact">Potential impact: +15% diversity</div>
          </div>
          <div className="suggestion-card">
            <h4>Enhance Candidate Experience</h4>
            <p>Provide faster feedback and clearer communication throughout the process.</p>
            <div className="impact">Potential impact: +10% offer acceptance</div>
          </div>
        </div>
      </div>
    </div>
  );
}