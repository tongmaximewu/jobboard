import { useState, useEffect } from 'react';
import CompanyAnalytics from './CompanyAnalytics.jsx';
import SmartJobPost from './SmartJobPost.jsx';
import CandidatePipeline from './CandidatePipeline.jsx';
import TeamCultureBuilder from './TeamCultureBuilder.jsx';

export default function EmployerMode() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [companyData, setCompanyData] = useState(null);

  return (
    <div className="employer-mode">
      <nav className="employer-nav">
        <button 
          className={activeTab === 'dashboard' ? 'active' : ''}
          onClick={() => setActiveTab('dashboard')}
        >
          📊 Dashboard
        </button>
        <button 
          className={activeTab === 'post-job' ? 'active' : ''}
          onClick={() => setActiveTab('post-job')}
        >
          📝 Smart Job Post
        </button>
        <button 
          className={activeTab === 'pipeline' ? 'active' : ''}
          onClick={() => setActiveTab('pipeline')}
        >
          🔄 Candidate Pipeline
        </button>
        <button 
          className={activeTab === 'culture' ? 'active' : ''}
          onClick={() => setActiveTab('culture')}
        >
          🏢 Culture Builder
        </button>
      </nav>

      <div className="employer-content">
        {activeTab === 'dashboard' && <CompanyAnalytics />}
        {activeTab === 'post-job' && <SmartJobPost />}
        {activeTab === 'pipeline' && <CandidatePipeline />}
        {activeTab === 'culture' && <TeamCultureBuilder />}
      </div>
    </div>
  );
}