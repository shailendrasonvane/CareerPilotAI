import React from 'react';

const MinimalTemplate = ({ data, styles }) => {
  const { 
    themeColor = '#4b5563', 
    fontFamily = 'Outfit, sans-serif', 
    fontSize = 'medium',
    sectionSpacing = 15,
    layoutSpacing = 25
  } = styles || {};

  const fontSizeMap = {
    small: 'text-[11px]',
    medium: 'text-[13px]',
    large: 'text-[15px]'
  };

  const bodyFontSize = fontSizeMap[fontSize] || fontSizeMap.medium;

  return (
    <div 
      className="resume-template-root bg-white w-full max-w-[210mm] h-auto mx-auto p-16 box-border"
      style={{ fontFamily, color: '#374151' }}
    >
      {/* Header - Minimalist & Airy */}
      <header className="mb-20">
        <h1 className="text-5xl font-extralight tracking-tight text-gray-900 leading-none">
          <span className="font-bold">{data.personalDetails?.firstName}</span> {data.personalDetails?.lastName}
        </h1>
        <div className="flex items-center gap-4 mt-4">
          <p className="text-xl text-gray-400 font-light tracking-[0.1em] uppercase">{data.personalDetails?.jobTitle}</p>
          <div className="flex-1 h-[1px] bg-gray-100"></div>
        </div>
        
        <div className="mt-8 flex gap-8 text-[11px] text-gray-400 font-medium uppercase tracking-widest">
          {data.personalDetails?.email && <span>{data.personalDetails.email}</span>}
          {data.personalDetails?.phone && <span>{data.personalDetails.phone}</span>}
          {data.personalDetails?.city && (
            <span>{data.personalDetails.city}, {data.personalDetails.country}</span>
          )}
        </div>
      </header>

      <div className="flex flex-col" style={{ gap: `${layoutSpacing}px` }}>
        {/* Experience */}
        {data.experiences?.length > 0 && (
          <section>
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-8">
              Experience
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: `${sectionSpacing * 1.5}px` }}>
              {data.experiences.map((exp, index) => (
                <div key={index} className="grid grid-cols-6 gap-8">
                  <div className="col-span-1 text-[11px] text-gray-300 pt-1 font-bold uppercase tracking-tighter">
                    {exp.startDate && new Date(exp.startDate).getFullYear()} — {exp.isCurrentJob ? 'Now' : exp.endDate && new Date(exp.endDate).getFullYear()}
                  </div>
                  <div className="col-span-5">
                    <h3 className="text-base font-bold text-gray-900 mb-1">{exp.position}</h3>
                    <div className="text-sm font-medium text-gray-400 mb-4">{exp.companyName}</div>
                    <p className={`${bodyFontSize} text-gray-500 leading-relaxed font-light text-justify whitespace-pre-wrap`}>
                      {exp.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {data.educations?.length > 0 && (
          <section>
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-8 mt-10">
              Education
            </h2>
            <div className="grid grid-cols-2 gap-x-12 gap-y-8">
              {data.educations.map((edu, index) => (
                <div key={index} className="flex flex-col gap-1">
                  <div className="text-[10px] text-gray-300 font-bold uppercase">
                    {edu.startDate && new Date(edu.startDate).getFullYear()} — {edu.endDate ? new Date(edu.endDate).getFullYear() : 'Now'}
                  </div>
                  <h3 className="font-bold text-gray-800">{edu.degree}</h3>
                  <div className="text-sm text-gray-400">{edu.institutionName}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills - Simple List */}
        {data.skills?.length > 0 && (
          <section>
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-6 mt-10">
              Expertise
            </h2>
            <div className="flex flex-wrap gap-x-10 gap-y-4 w-full min-w-0">
              {data.skills.map((skill, index) => (
                <div key={index} className="group min-w-0 max-w-full">
                  <span className={`${bodyFontSize} font-medium text-gray-600 truncate block`} title={skill.skillName}>{skill.skillName}</span>
                  <div className="h-0.5 w-0 group-hover:w-full bg-blue-600 transition-all duration-300"></div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Languages */}
        {data.languages?.length > 0 && (
          <section>
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-6 mt-10">
              Languages
            </h2>
            <div className="flex flex-wrap gap-x-8 gap-y-3 w-full min-w-0">
              {data.languages.map((lang, index) => (
                <div key={index} className="group flex items-center gap-1.5 min-w-0">
                  <span className={`${bodyFontSize} font-semibold text-gray-700 truncate`} title={lang.languageName}>{lang.languageName}</span>
                  <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider whitespace-nowrap flex-shrink-0">({lang.proficiencyLevel})</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default MinimalTemplate;
