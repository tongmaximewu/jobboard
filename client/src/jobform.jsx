import { useState } from 'react';

export default function JobForm({ onSubmit }) {
  // Form state management
  const [form, setForm] = useState({ 
    title: '', 
    company: '', 
    location: '', 
    description: '' 
  });

  // Handle form submission
  const handleSubmit = async e => {
    e.preventDefault();
    
    // Send POST request to create new job
    await fetch('http://localhost:4000/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    
    // Reset form fields after submission
    setForm({ title: '', company: '', location: '', description: '' });
    
    // Notify parent component to refresh job list
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add a Job</h2>
      
      {/* Dynamically render input fields for each form property */}
      {Object.keys(form).map((key) => (
        <input
          key={key}
          placeholder={key} // Use field name as placeholder
          value={form[key]}
          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
        />
      ))}
      
      <button type="submit">Add Job</button>
    </form>
  );
}