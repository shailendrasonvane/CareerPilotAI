import React from 'react';

const ModernTemplate = ({ data, styles }) => {
  const { 
    themeColor = '#1e3a8a', 
    fontFamily = 'Inter, sans-serif', 
    fontSize = 'medium',
    sectionSpacing = 20,
    layoutSpacing = 40
  } = styles || {};

  const fontSizeMap = {
    small: 'text-[12px]',
    medium: 'text-[14px]',
    large: 'text-[16px]'
  };

  const bodyFontSize = fontSizeMap[fontSize] || fontSizeMap.medium;

  return (
    <div 
      className="bg-white w-full max-w-[210mm] min-h-[297mm] shadow-lg mx-auto overflow-hidden"
      style={{ fontFamily, color: '#333' }}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <header 
          className="p-12 text-white relative overflow-hidden"
          style={{ backgroundColor: themeColor }}
        >
          {/* Decorative element */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 -mr-20 -mt-20 rounded-full"></div>
          
          <div className="relative z-10">
            <h1 className="text-5xl font-black uppercase tracking-tighter leading-none mb-2">
              {data.personalDetails?.firstName} {data.personalDetails?.lastName}
            </h1>
            <p className="text-xl opacity-90 font-bold tracking-widest uppercase">{data.personalDetails?.jobTitle}</p>
            
            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-8 text-sm font-medium opacity-80">
              {data.personalDetails?.email && (
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">✉</span>
                  {data.personalDetails.email}
                </div>
              )}
              {data.personalDetails?.phone && (
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">📞</span>
                  {data.personalDetails.phone}
                </div>
              )}
              {data.personalDetails?.city && (
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">📍</span>
                  {data.personalDetails.city}, {data.personalDetails.country}
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="p-12 flex flex-col" style={{ gap: `${layoutSpacing}px` }}>
          {/* Summary */}
          {data.personalDetails?.professionalSummary && (
            <section className="animate-in fade-in slide-in-from-left duration-700">
              <div className="flex items-center gap-4 mb-4">
                <h2 className="text-xl font-black uppercase tracking-tight" style={{ color: themeColor }}>
                  About Me
                </h2>
                <div className="flex-1 h-[2px] bg-gray-100"></div>
              </div>
              <p className={`${bodyFontSize} leading-relaxed text-gray-600 font-medium whitespace-pre-wrap`}>
                {data.personalDetails.professionalSummary}
              </p>
            </section>
          )}

          <div className="grid grid-cols-3 gap-12">
            {/* Left Column (Main) */}
            <div className="col-span-2 flex flex-col" style={{ gap: `${layoutSpacing}px` }}>
              {/* Experience */}
              {data.experiences?.length > 0 && (
                <section>
                  <div className="flex items-center gap-4 mb-6">
                    <h2 className="text-xl font-black uppercase tracking-tight" style={{ color: themeColor }}>
                      Experience
                    </h2>
                    <div className="flex-1 h-[2px] bg-gray-100"></div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: `${sectionSpacing}px` }}>
                    {data.experiences.map((exp, index) => (
                      <div key={index} className="relative pl-6 border-l-2 border-gray-100 hover:border-blue-100 transition-colors">
                        <div className="absolute left-[-9px] top-1.5 w-4 h-4 rounded-full bg-white border-2" style={{ borderColor: themeColor }}></div>
                        <div className="flex justify-between items-baseline mb-1">
                          <h3 className="text-lg font-bold text-gray-800 leading-tight">{exp.position}</h3>
                          <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                            {exp.startDate && new Date(exp.startDate).getFullYear()} - {exp.isCurrentJob ? 'Present' : exp.endDate && new Date(exp.endDate).getFullYear()}
                          </span>
                        </div>
                        <div className="text-sm font-bold mb-3 uppercase tracking-wide" style={{ color: themeColor }}>{exp.companyName}</div>
                        <p className={`${bodyFontSize} text-gray-500 leading-relaxed whitespace-pre-wrap`}>{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Education */}
              {data.educations?.length > 0 && (
                <section>
                  <div className="flex items-center gap-4 mb-6">
                    <h2 className="text-xl font-black uppercase tracking-tight" style={{ color: themeColor }}>
                      Education
                    </h2>
                    <div className="flex-1 h-[2px] bg-gray-100"></div>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    {data.educations.map((edu, index) => (
                      <div key={index} className="p-5 rounded-2xl bg-gray-50 border border-gray-100 group hover:border-blue-200 transition-all">
                        <div className="text-[10px] font-black text-gray-400 uppercase mb-2">
                          {edu.startDate && new Date(edu.startDate).getFullYear()} - {edu.endDate ? new Date(edu.endDate).getFullYear() : 'Now'}
                        </div>
                        <h3 className="font-bold text-gray-800 leading-tight mb-1">{edu.degree}</h3>
                        <div className="text-xs font-bold" style={{ color: themeColor }}>{edu.institutionName}</div>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Right Column (Skills & Side Info) */}
            <div className="col-span-1 flex flex-col" style={{ gap: `${layoutSpacing}px` }}>
              {/* Skills */}
              {data.skills?.length > 0 && (
                <section>
                  <h2 className="text-xl font-black uppercase tracking-tight mb-6" style={{ color: themeColor }}>
                    Expertise
                  </h2>
                  <div className="flex flex-col gap-4">
                    {data.skills.map((skill, index) => (
                      <div key={index}>
                        <div className="flex justify-between text-[11px] font-bold uppercase mb-2 text-gray-700">
                          <span>{skill.skillName}</span>
                          <span className="text-gray-400">{skill.skillLevel}</span>
                        </div>
                        <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full transition-all duration-1000" 
                            style={{ 
                              backgroundColor: themeColor,
                              width: skill.skillLevel === 'Expert' ? '100%' : skill.skillLevel === 'Experienced' ? '75%' : '50%' 
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Projects */}
              {data.projects?.length > 0 && (
                <section>
                  <h2 className="text-xl font-black uppercase tracking-tight mb-6" style={{ color: themeColor }}>
                    Projects
                  </h2>
                  <div className="flex flex-col gap-4">
                    {data.projects.map((proj, index) => (
                      <div key={index} className="border-l-2 border-gray-100 pl-4 py-1">
                        <h3 className="text-sm font-bold text-gray-800">{proj.projectName}</h3>
                        <p className="text-[11px] text-gray-500 mt-1 line-clamp-3">{proj.description}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernTemplate;
