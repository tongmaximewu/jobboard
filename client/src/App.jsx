import { useState, useEffect } from 'react';
import JobSeekerMode from './JobSeekerMode.jsx';
import EmployerMode from './EmployerMode.jsx';
import './style.css';

export default function App() {
  const [currentMode, setCurrentMode] = useState('jobseeker');
  const [user, setUser] = useState(null);

  return (
    <div className="app">
      {/* Mode Toggle Header */}
      <header className="app-header">
        <h1>🚀 TalentBridge</h1>
        <div className="mode-toggle">
          <button 
            className={currentMode === 'jobseeker' ? 'active' : ''}
            onClick={() => setCurrentMode('jobseeker')}
          >
            🔍 Job Seeker Mode
          </button>
          <button 
            className={currentMode === 'employer' ? 'active' : ''}
            onClick={() => setCurrentMode('employer')}
          >
            💼 Employer Mode
          </button>
        </div>
      </header>

      {/* Render Current Mode */}
      {currentMode === 'jobseeker' ? (
        <JobSeekerMode />
      ) : (
        <EmployerMode />
      )}
    </div>
  );
}