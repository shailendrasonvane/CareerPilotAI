import React from 'react';

const ResumePreview = ({ data }) => {
  if (!data) return null;

  return (
    <div className="bg-white w-full max-w-[210mm] h-auto min-h-[297mm] shadow-2xl p-[15mm] pb-[20mm] flex flex-col gap-5 text-gray-800 leading-tight origin-top transform scale-[0.85] mb-10">
      {/* Header */}
      <div className="border-b-4 border-blue-600 pb-6">
        <h1 className="text-4xl font-extrabold text-blue-900 uppercase tracking-tight">
          {data.personalDetails?.firstName} {data.personalDetails?.lastName}
        </h1>
        <p className="text-lg text-blue-600 font-semibold mt-0.5">{data.personalDetails?.jobTitle}</p>
        
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-xs text-gray-600">
          {data.personalDetails?.email && <span>{data.personalDetails.email}</span>}
          {data.personalDetails?.phone && <span>{data.personalDetails.phone}</span>}
          {data.personalDetails?.city && (
            <span>{data.personalDetails.city}, {data.personalDetails.country}</span>
          )}
        </div>
      </div>

      {/* Summary */}
      {data.personalDetails?.professionalSummary && (
        <section>
          <h2 className="text-lg font-bold text-blue-900 uppercase border-b border-gray-200 mb-2">Profile</h2>
          <p className="text-sm text-gray-700 whitespace-pre-wrap">{data.personalDetails.professionalSummary}</p>
        </section>
      )}

      {/* Experience */}
        <section>
          <h2 className="text-md font-bold text-blue-900 uppercase border-b border-gray-200 mb-2 tracking-wide">Experience</h2>
          <div className="space-y-3">
            {data.experiences.map((exp, index) => (
              <div key={index}>
                <div className="flex justify-between font-bold text-xs text-gray-800">
                  <span>{exp.companyName}</span>
                  <span className="text-[10px] text-gray-500">
                    {new Date(exp.startDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short' })} - 
                    {exp.isCurrentJob ? ' Present' : ` ${new Date(exp.endDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short' })}`}
                  </span>
                </div>
                <div className="text-xs italic text-blue-600 mb-0.5">{exp.position}</div>
                <p className="text-[10px] text-gray-600 whitespace-pre-wrap leading-normal">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>

      {/* Skills */}
      {data.skills?.length > 0 && (
        <section>
          <h2 className="text-md font-bold text-blue-900 uppercase border-b border-gray-200 mb-2 tracking-wide">Skills</h2>
          <div className="flex flex-wrap gap-1.5">
            {data.skills.map((skill, index) => (
              <span key={index} className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-[10px] font-semibold border border-blue-100">
                {skill.skillName} {skill.skillLevel && `(${skill.skillLevel})`}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {data.educations?.length > 0 && (
        <section>
          <h2 className="text-md font-bold text-blue-900 uppercase border-b border-gray-200 mb-2 tracking-wide">Education</h2>
          <div className="space-y-2">
            {data.educations.map((edu, index) => (
              <div key={index}>
                <div className="flex justify-between font-bold text-xs text-gray-800">
                  <span>{edu.institutionName}</span>
                  <span className="text-[10px] text-gray-500">
                    {new Date(edu.startDate).getFullYear()} - {edu.endDate ? new Date(edu.endDate).getFullYear() : 'Present'}
                  </span>
                </div>
                <div className="text-[11px] text-blue-600">{edu.degree} in {edu.fieldOfStudy}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {data.projects?.length > 0 && (
        <section>
          <h2 className="text-md font-bold text-blue-900 uppercase border-b border-gray-200 mb-2 tracking-wide">Projects</h2>
          <div className="space-y-3">
            {data.projects.map((project, index) => (
              <div key={index}>
                <div className="flex justify-between font-bold text-xs text-gray-800">
                  <span>{project.projectName}</span>
                  <span className="text-[10px] text-gray-500">
                    {project.startDate && new Date(project.startDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short' })}
                    {project.endDate && ` - ${new Date(project.endDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short' })}`}
                  </span>
                </div>
                {project.technologies && <div className="text-[10px] text-blue-600 font-medium mb-0.5">{project.technologies}</div>}
                <p className="text-[10px] text-gray-600 whitespace-pre-wrap leading-tight">{project.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certificates & Awards */}
      <div className="grid grid-cols-2 gap-x-8 gap-y-4">
        {data.certificates?.length > 0 && (
          <section className="col-span-1">
            <h2 className="text-md font-bold text-blue-900 uppercase border-b border-gray-200 mb-1.5 tracking-wide">Certifications</h2>
            <div className="space-y-1.5">
              {data.certificates.map((cert, index) => (
                <div key={index}>
                  <div className="text-xs font-bold text-gray-800 leading-tight">{cert.certificateName}</div>
                  <div className="text-[9px] text-gray-500">{cert.issuingOrganization} | {cert.issueDate && new Date(cert.issueDate).getFullYear()}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.awards?.length > 0 && (
          <section className="col-span-1">
            <h2 className="text-md font-bold text-blue-900 uppercase border-b border-gray-200 mb-1.5 tracking-wide">Awards</h2>
            <div className="space-y-1.5">
              {data.awards.map((award, index) => (
                <div key={index}>
                  <div className="text-xs font-bold text-gray-800 leading-tight">{award.awardTitle}</div>
                  <div className="text-[9px] text-gray-500">{award.organization} | {award.awardDate && new Date(award.awardDate).getFullYear()}</div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Languages */}
      {data.languages?.length > 0 && (
        <section>
          <h2 className="text-md font-bold text-blue-900 uppercase border-b border-gray-200 mb-1.5 tracking-wide">Languages</h2>
          <div className="flex flex-wrap gap-x-5 gap-y-1">
            {data.languages.map((lang, index) => (
              <div key={index} className="text-xs">
                <span className="font-bold text-gray-800">{lang.languageName}:</span> <span className="text-gray-500 italic text-[11px]">{lang.proficiencyLevel}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ResumePreview;
