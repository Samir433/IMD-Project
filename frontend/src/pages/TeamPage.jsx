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
    <div className="bg-white border border-gray-200 rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-all duration-300 h-full">
      <img
        src={member.imageUrl}
        alt={member.name}
        className="w-20 h-20 rounded-full object-cover mx-auto mb-4 ring-2 ring-blue-200"
        onError={(e) => { 
          e.target.onerror = null; 
          e.target.src = "https://placehold.co/100x100/E5E7EB/6B7280?text=" + member.name.split(' ').map(n => n[0]).join('');
        }}
      />
      <h3 className="text-lg font-semibold text-gray-800 mb-1">{member.name}</h3>
      <p className="text-sm text-blue-600 font-medium mb-3">{member.role}</p>
      <p className="text-sm text-gray-600 leading-relaxed">{member.description}</p>
    </div>
  );

  return (
         <div className="p-6 md:p-10">
       <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">Meet the Team</h2>

             {/* Mentors Section */}
       <div>
         <h3 className="text-2xl font-semibold text-blue-700 mb-4">Mentors</h3>
         <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
           {mentors.map(member => (
             <MemberCard key={member.name} member={member} />
           ))}
         </div>
       </div>

       {/* Core Team Section */}
       <div className="mt-12">
         <h3 className="text-2xl font-semibold text-blue-700 mb-4">Core Team</h3>
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