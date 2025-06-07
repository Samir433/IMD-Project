import React from 'react';

const Team = () => {
  const teamMembers = [
    {
      name: 'Dr. Parul Trivedi',
      role: 'IMD Mentor (Scientist-D)',
      description: 'Provided invaluable guidance and domain expertise throughout the project, ensuring scientific accuracy and relevance.',
      imageUrl: 'https://placehold.co/100x100/A7D3FF/000000?text=PT',
      isMentor: true,
    },
    {
      name: 'Dr. Uday Patkar',
      role: 'Internal Guide (H.O.D Computer Engineering)',
      description: 'Provided guidance and regular feedback throughout the project development.',
      imageUrl: "up.jpg",
      isMentor: true,
    },
    {
      name: 'Vedant Laxman Kulkarni',
      role: 'Backend Development & Deployment',
      description: 'Core application development and ML prediction model integration.',
      imageUrl: "vedddddddddddd.jpg",
      isMentor: false,
    },
    {
      name: 'Samir Bharat Atpadkar',
      role: 'ML Model Development',
      description: 'Machine learning model development and correlation analysis.',
      imageUrl: "sa.jpg",
      isMentor: false,
    },
    {
      name: 'Hrishikesh Dagdu Bhavar',
      role: 'UI/UX Design & Documentation',
      description: 'User interface design and project documentation.',
      imageUrl: "h.jpg",
      isMentor: false,
    },
    {
      name: 'Sanskar Prabhakar Malkhede',
      role: 'Research & Data Analysis',
      description: 'Data acquisition, analysis, and research methodologies.',
      imageUrl: "s.jpg",
      isMentor: false,
    },
  ];

  const mentors = teamMembers.filter(member => member.isMentor);
  const coreTeam = teamMembers.filter(member => !member.isMentor);

  const MemberCard = ({ member }) => (
    <div className="backdrop-blur-sm bg-gray-900/40 border border-gray-800/50 rounded-lg p-3 transition-all duration-300 flex items-start gap-3 hover:bg-gray-800/40">
      <img
        src={member.imageUrl}
        alt={member.name}
        className="w-14 h-14 rounded-full object-cover ring-2 ring-cyan-800/50 flex-shrink-0"
        onError={(e) => { 
          e.target.onerror = null; 
          e.target.src = "https://placehold.co/100x100/1F2937/CBD5E1?text=" + member.name.split(' ').map(n => n[0]).join('');
        }}
      />
      <div className="flex-1">
        <h3 className="text-base font-semibold text-white mb-0.5">{member.name}</h3>
        <p className="text-xs text-cyan-300 font-medium mb-1">{member.role}</p>
        <p className="text-xs text-gray-400 leading-relaxed">{member.description}</p>
      </div>
    </div>
  );

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-center text-cyan-300 mb-6">Meet the Team</h2>

      {/* Mentors Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-cyan-200 mb-3 border-b border-gray-800 pb-1">Mentors</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {mentors.map(member => (
            <MemberCard key={member.name} member={member} />
          ))}
        </div>
      </div>

      {/* Core Team Section */}
      <div>
        <h3 className="text-lg font-semibold text-cyan-200 mb-3 border-b border-gray-800 pb-1">Core Team</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {coreTeam.map(member => (
            <MemberCard key={member.name} member={member} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;