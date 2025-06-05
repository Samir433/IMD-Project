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
      role: 'Internal Guide (H.O.D Computer Engineering Department)',
      description: 'Provided guidance and regular feedback throughout the project.',
      imageUrl: "up.jpg",
      isMentor: true,
    },
    {
      name: 'Vedant Laxman Kulkarni',
      role: 'Backend Development and Deployment',
      description: 'Responsible for the core application development and integration of ML prediction models.',
      imageUrl: "vedddddddddddd.jpg",
      isMentor: false,
    },
    {
      name: 'Samir Bharat Atpadkar',
      role: 'ML Model Development and Correlation',
      description: 'Contributed in building ML model.',
      imageUrl: "sa.jpg",
      isMentor: false,
    },
    {
      name: 'Hrishikesh Dagdu Bhavar',
      role: 'UI/UX Design & Documentation Contributor',
      description: 'Focused on the user interface and contributed in documentation.',
      imageUrl: "h.jpg",
      isMentor: false,
    },
    {
      name: 'Sanskar Prabhakar Malkhede',
      role: 'Research & Data Analysis Contributor',
      description: 'Contributed significantly to data acquisition, analysis, and research methodologies supporting the AI model.',
      imageUrl: "s.jpg",
      isMentor: false,
    },
  ];

  const mentors = teamMembers.filter(member => member.isMentor);
  const coreTeam = teamMembers.filter(member => !member.isMentor);

  const MemberCard = ({ member }) => (
    <div className="bg-white border border-blue-100 rounded-xl shadow-md p-6 flex flex-col items-center text-center transition-transform transform hover:shadow-lg duration-300 ease-in-out h-full">
      <img
        src={member.imageUrl}
        alt={member.name}
        className="w-24 h-24 rounded-full object-cover mb-4 ring-2 ring-blue-400 ring-offset-2"
        onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/100x100?text=IMG" }}
      />
      <h3 className="text-xl font-bold text-blue-800">{member.name}</h3>
      <p className="text-sm text-gray-600 font-medium mt-1">{member.role}</p>
      <p className="text-sm text-gray-500 mt-2">{member.description}</p>
    </div>
  );

  return (
    <div className="p-6 md:p-10">
      <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">Meet the Team</h2>

      {/* Mentors */}
      <div>
        <h3 className="text-2xl font-semibold text-blue-700 mb-4">Mentors</h3>
        <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
          {mentors.map(member => (
            <MemberCard key={member.name} member={member} />
          ))}
        </div>
      </div>

      {/* Core Team */}
      <div className="mt-12">
        <h3 className="text-2xl font-semibold text-blue-700 mb-4">Core Team</h3>
        {/* Changed from lg:grid-cols-3 to md:grid-cols-2 for a 2-column layout */}
        <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
          {coreTeam.map(member => (
            <MemberCard key={member.name} member={member} />
          ))}
        </div>
      </div>
    </div>
  );
 };

 export default Team;