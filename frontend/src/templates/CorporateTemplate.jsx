import React from 'react';

const CorporateTemplate = ({ data, styles }) => {
  const { 
    themeColor = '#000000', 
    fontFamily = 'Georgia, serif', 
    fontSize = 'medium',
    sectionSpacing = 15,
    layoutSpacing = 30
  } = styles || {};

  const fontSizeMap = {
    small: 'text-[11px]',
    medium: 'text-[13px]',
    large: 'text-[15px]'
  };

  const bodyFontSize = fontSizeMap[fontSize] || fontSizeMap.medium;

  return (
    <div 
      className="resume-template-root bg-white w-full max-w-[210mm] h-auto mx-auto box-border border-t-[12px] px-[25mm] pt-[22mm] pb-[18mm]"
      style={{ fontFamily, color: '#1a1a1a', borderColor: themeColor }}
    >
      {/* Header - Centered & Elegant */}
      <header className="text-center mb-8 border-b border-gray-100 pb-8">
        <h1 className="text-4xl font-serif font-bold uppercase tracking-[0.2em] mb-4 leading-tight">
          {data.personalDetails?.firstName} {data.personalDetails?.lastName}
        </h1>
        <p className="text-xl font-serif italic text-gray-500 mb-5 tracking-wide">{data.personalDetails?.jobTitle}</p>
        
        <div className="flex justify-center flex-wrap gap-x-6 gap-y-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
          {data.personalDetails?.email && <span>{data.personalDetails.email}</span>}
          {data.personalDetails?.phone && <span>{data.personalDetails.phone}</span>}
          {data.personalDetails?.city && <span>{data.personalDetails.city}, {data.personalDetails.country}</span>}
        </div>
      </header>

      <div className="flex flex-col [&>section:last-child]:mb-0" style={{ gap: `${layoutSpacing}px` }}>
        {/* Summary */}
        {data.personalDetails?.professionalSummary && (
          <section>
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 mb-4 text-center">
              Executive Summary
            </h2>
            <p className={`${bodyFontSize} text-gray-700 text-justify leading-relaxed font-serif`}>
              {data.personalDetails.professionalSummary?.trim()}
            </p>
          </section>
        )}

        {/* Experience */}
        {data.experiences?.length > 0 && (
          <section>
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 mb-6 flex items-center gap-4">
              <span className="flex-1 h-px min-h-0 max-h-px shrink bg-gray-100" aria-hidden="true" />
              Professional Experience
              <span className="flex-1 h-px min-h-0 max-h-px shrink bg-gray-100" aria-hidden="true" />
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: `${sectionSpacing}px` }}>
              {data.experiences.map((exp, index) => (
                <div key={index}>
                  <div className="flex justify-between font-bold text-gray-900 mb-1">
                    <span className="text-base font-serif">{exp.position}</span>
                    <span className="text-xs font-serif italic text-gray-500">
                      {exp.startDate && new Date(exp.startDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short' })} – 
                      {exp.isCurrentJob ? ' PRESENT' : exp.endDate && new Date(exp.endDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short' })}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold text-xs uppercase tracking-widest mb-3" style={{ color: themeColor }}>
                    <span>{exp.companyName}</span>
                    <span className="font-normal text-gray-400">{exp.location}</span>
                  </div>
                  {exp.description?.trim() && (
                    <p className={`${bodyFontSize} text-gray-700 text-justify leading-relaxed whitespace-pre-wrap font-serif`}>
                      {exp.description.trim()}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {data.educations?.length > 0 && (
          <section>
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 mb-6 flex items-center gap-4">
              <span className="flex-1 h-px min-h-0 max-h-px shrink bg-gray-100" aria-hidden="true" />
              Education & Credentials
              <span className="flex-1 h-px min-h-0 max-h-px shrink bg-gray-100" aria-hidden="true" />
            </h2>
            <div className="grid grid-cols-2 gap-8">
              {data.educations.map((edu, index) => (
                <div key={index}>
                  <h3 className="font-bold text-gray-900 font-serif">{edu.institutionName}</h3>
                  <div className="text-sm italic mb-1" style={{ color: themeColor }}>
                    {edu.degree} in {edu.fieldOfStudy}
                  </div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                    Graduated {edu.endDate ? new Date(edu.endDate).getFullYear() : 'Present'}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills - Grid */}
        {data.skills?.length > 0 && (
          <section>
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 mb-4 text-center">
              Core Competencies
            </h2>
            <div className="grid grid-cols-4 gap-4 text-center border-y border-gray-50 py-5">
              {data.skills.map((skill, index) => (
                <div key={index} className="flex flex-col gap-1">
                  <span className={`${bodyFontSize} font-bold text-gray-800`}>{skill.skillName}</span>
                  <span className="text-[9px] uppercase tracking-widest text-gray-400 font-bold">{skill.skillLevel}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Languages — no extra mt-8; flex gap handles spacing */}
        {data.languages?.length > 0 && (
          <section>
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 mb-4 text-center">
              Languages
            </h2>
            <div className="flex justify-center flex-wrap gap-x-8 gap-y-2 pt-2 pb-0 w-full min-w-0">
              {data.languages.map((lang, index) => (
                <div key={index} className="flex items-center gap-1.5 text-sm font-serif min-w-0">
                  <span className="font-bold text-gray-800 truncate" title={lang.languageName}>{lang.languageName}</span>
                  <span className="text-[9px] text-gray-400 italic uppercase whitespace-nowrap flex-shrink-0">({lang.proficiencyLevel})</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default CorporateTemplate;
