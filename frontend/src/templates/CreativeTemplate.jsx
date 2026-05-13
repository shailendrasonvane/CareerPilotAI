import React from 'react';

const CreativeTemplate = ({ data, styles }) => {
  const { 
    themeColor = '#8b5cf6', 
    fontFamily = 'Montserrat, sans-serif', 
    fontSize = 'medium',
    sectionSpacing = 20,
    layoutSpacing = 35
  } = styles || {};

  const fontSizeMap = {
    small: 'text-[11px]',
    medium: 'text-[13px]',
    large: 'text-[15px]'
  };

  const bodyFontSize = fontSizeMap[fontSize] || fontSizeMap.medium;

  return (
    <div 
      className="bg-white w-full max-w-[210mm] min-h-[297mm] shadow-lg mx-auto flex overflow-hidden border-[8px]"
      style={{ fontFamily, color: '#1f2937', borderColor: '#f3f4f6' }}
    >
      {/* Left Column - Dynamic Sidebar */}
      <aside 
        className="w-[240px] text-white p-10 flex flex-col gap-12 relative overflow-hidden"
        style={{ backgroundColor: themeColor }}
      >
        {/* Abstract background shapes */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full border-[20px] border-white"></div>
          <div className="absolute bottom-20 -right-20 w-60 h-60 rounded-full border-[40px] border-white"></div>
        </div>

        <div className="flex flex-col items-center text-center relative z-10">
          <div className="relative group mb-8">
            {data.personalDetails?.profileImageUrl ? (
              <img 
                src={data.personalDetails.profileImageUrl} 
                alt="Profile" 
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-2xl transition-transform group-hover:scale-105"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-white/20 border-4 border-white flex items-center justify-center text-5xl font-black shadow-2xl">
                {data.personalDetails?.firstName?.[0]}
              </div>
            )}
            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
              <span className="text-xl" style={{ color: themeColor }}>✨</span>
            </div>
          </div>

          <h1 className="text-3xl font-black uppercase leading-none tracking-tighter mb-4">
            {data.personalDetails?.firstName}<br/>{data.personalDetails?.lastName}
          </h1>
          <div className="h-1.5 w-10 bg-white rounded-full mb-4"></div>
          <p className="text-xs font-bold tracking-[0.2em] uppercase opacity-80">{data.personalDetails?.jobTitle}</p>
        </div>

        <section className="relative z-10">
          <h2 className="text-[10px] font-black uppercase tracking-[0.4em] mb-6 opacity-60 border-b border-white/10 pb-2">Reach Me</h2>
          <div className="flex flex-col gap-5 text-[11px] font-medium">
            {data.personalDetails?.phone && <div className="flex items-center gap-3"><span className="opacity-60 text-lg">📱</span> {data.personalDetails.phone}</div>}
            {data.personalDetails?.email && <div className="flex items-center gap-3"><span className="opacity-60 text-lg">✉</span> {data.personalDetails.email}</div>}
            {data.personalDetails?.city && <div className="flex items-center gap-3"><span className="opacity-60 text-lg">📍</span> {data.personalDetails.city}</div>}
          </div>
        </section>

        {data.skills?.length > 0 && (
          <section className="relative z-10">
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] mb-6 opacity-60 border-b border-white/10 pb-2">Expertise</h2>
            <div className="flex flex-col gap-5">
              {data.skills.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between text-[10px] uppercase font-bold mb-2">
                    <span>{skill.skillName}</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-white rounded-full transition-all duration-1000" 
                      style={{ width: skill.skillLevel === 'Expert' ? '100%' : skill.skillLevel === 'Experienced' ? '75%' : '50%' }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </aside>

      {/* Right Column - Main Content */}
      <main className="flex-1 p-16 flex flex-col" style={{ gap: `${layoutSpacing}px` }}>
        {/* Profile */}
        {data.personalDetails?.professionalSummary && (
          <section className="animate-in fade-in slide-in-from-right duration-700">
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-6 flex items-center gap-3">
              <span className="w-2 h-8 rounded-full" style={{ backgroundColor: themeColor }}></span>
              Hello!
            </h2>
            <p className={`${bodyFontSize} leading-relaxed text-gray-500 font-medium text-lg italic`}>
              "{data.personalDetails.professionalSummary}"
            </p>
          </section>
        )}

        {/* Experience */}
        {data.experiences?.length > 0 && (
          <section>
            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-gray-300 mb-10">Work Path</h2>
            <div className="space-y-12">
              {data.experiences.map((exp, index) => (
                <div key={index} className="flex gap-8 group">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-lg shadow-xl shadow-gray-100 border transition-all group-hover:rotate-12" style={{ color: themeColor, borderColor: '#f3f4f6' }}>
                      💼
                    </div>
                    <div className="flex-1 w-[2px] bg-gray-50 mt-4"></div>
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="flex justify-between items-baseline mb-2">
                      <h3 className="text-xl font-black text-gray-800 leading-tight uppercase tracking-tight">{exp.position}</h3>
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 bg-gray-50 text-gray-400 rounded-full">
                        {exp.startDate && new Date(exp.startDate).getFullYear()} - {exp.isCurrentJob ? 'Now' : exp.endDate && new Date(exp.endDate).getFullYear()}
                      </span>
                    </div>
                    <div className="text-sm font-bold mb-4 uppercase tracking-widest" style={{ color: themeColor }}>{exp.companyName}</div>
                    <p className={`${bodyFontSize} text-gray-500 leading-relaxed font-medium`}>{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {data.educations?.length > 0 && (
          <section>
            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-gray-300 mb-8 mt-6">Learning</h2>
            <div className="grid grid-cols-2 gap-6">
              {data.educations.map((edu, index) => (
                <div key={index} className="p-6 rounded-[2rem] bg-gray-50 border border-transparent hover:border-white hover:shadow-2xl transition-all">
                  <div className="text-[10px] font-black text-gray-300 uppercase mb-3 tracking-widest">
                    {edu.startDate && new Date(edu.startDate).getFullYear()} - {edu.endDate ? new Date(edu.endDate).getFullYear() : 'Now'}
                  </div>
                  <h3 className="font-bold text-gray-800 leading-tight mb-2 uppercase">{edu.degree}</h3>
                  <div className="text-xs font-bold" style={{ color: themeColor }}>{edu.institutionName}</div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default CreativeTemplate;
