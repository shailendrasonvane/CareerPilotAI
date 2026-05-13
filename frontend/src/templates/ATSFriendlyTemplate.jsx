import React from 'react';

const ATSFriendlyTemplate = ({ data, styles }) => {
  const { 
    themeColor = '#000000', 
    fontFamily = 'Arial, sans-serif', 
    fontSize = 'medium',
    sectionSpacing = 12,
    layoutSpacing = 20
  } = styles || {};

  const fontSizeMap = {
    small: 'text-[10pt]',
    medium: 'text-[11pt]',
    large: 'text-[12pt]'
  };

  const bodyFontSize = fontSizeMap[fontSize] || fontSizeMap.medium;

  return (
    <div 
      className="bg-white w-full max-w-[210mm] min-h-[297mm] shadow-lg mx-auto p-[1in]"
      style={{ fontFamily, color: '#000', lineHeight: '1.4' }}
    >
      {/* Header - ATS Compliant (No tables, no graphics) */}
      <header className="text-center mb-8 border-b-2 border-black pb-6">
        <h1 className="text-[24pt] font-bold uppercase tracking-tight mb-2">
          {data.personalDetails?.firstName} {data.personalDetails?.lastName}
        </h1>
        <div className="flex justify-center flex-wrap gap-x-3 text-[11pt]">
          {data.personalDetails?.city && <span>{data.personalDetails.city}, {data.personalDetails.country}</span>}
          {data.personalDetails?.phone && <span>| {data.personalDetails.phone}</span>}
          {data.personalDetails?.email && <span>| {data.personalDetails.email}</span>}
        </div>
        {data.personalDetails?.linkedinUrl && (
          <div className="text-[11pt] mt-1 font-bold">{data.personalDetails.linkedinUrl}</div>
        )}
      </header>

      <div className="flex flex-col" style={{ gap: `${layoutSpacing}px` }}>
        {/* Profile */}
        {data.personalDetails?.professionalSummary && (
          <section>
            <h2 className="text-[14pt] font-bold uppercase border-b border-gray-300 mb-3 pb-1 tracking-widest">Summary</h2>
            <p className={`${bodyFontSize} text-justify leading-normal`}>
              {data.personalDetails.professionalSummary}
            </p>
          </section>
        )}

        {/* Experience */}
        {data.experiences?.length > 0 && (
          <section>
            <h2 className="text-[14pt] font-bold uppercase border-b border-gray-300 mb-5 pb-1 tracking-widest">Professional Experience</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: `${sectionSpacing * 1.5}px` }}>
              {data.experiences.map((exp, index) => (
                <div key={index}>
                  <div className="flex justify-between font-bold text-[12pt]">
                    <span>{exp.companyName}</span>
                    <span className="font-normal uppercase text-gray-600">
                      {exp.startDate && new Date(exp.startDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short' }).toUpperCase()} – 
                      {exp.isCurrentJob ? ' PRESENT' : exp.endDate && new Date(exp.endDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short' }).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex justify-between italic text-[11pt] mb-2 font-semibold">
                    <span>{exp.position}</span>
                    <span className="font-normal not-italic text-gray-500">{exp.location}</span>
                  </div>
                  <p className={`${bodyFontSize} text-justify whitespace-pre-wrap leading-relaxed`}>
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {data.educations?.length > 0 && (
          <section>
            <h2 className="text-[14pt] font-bold uppercase border-b border-gray-300 mb-4 pb-1 tracking-widest">Education</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: `${sectionSpacing}px` }}>
              {data.educations.map((edu, index) => (
                <div key={index}>
                  <div className="flex justify-between font-bold text-[12pt]">
                    <span>{edu.institutionName}</span>
                    <span className="font-normal text-gray-600">{edu.endDate ? new Date(edu.endDate).getFullYear() : 'PRESENT'}</span>
                  </div>
                  <div className="text-[11pt] italic font-semibold">{edu.degree} in {edu.fieldOfStudy}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills - Technical focus for ATS */}
        {data.skills?.length > 0 && (
          <section>
            <h2 className="text-[14pt] font-bold uppercase border-b border-gray-300 mb-3 pb-1 tracking-widest">Technical Skills</h2>
            <div className={`${bodyFontSize} leading-relaxed`}>
              {data.skills.map((s, i) => (
                <React.Fragment key={i}>
                  <span className="font-bold">{s.skillName}</span> ({s.skillLevel}){i < data.skills.length - 1 ? ', ' : ''}
                </React.Fragment>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ATSFriendlyTemplate;
