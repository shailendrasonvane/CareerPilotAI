import React from 'react';

const ResumePreview = ({ data }) => {
  if (!data) return null;

  return (
    <div className="bg-white w-full max-w-[210mm] min-h-[297mm] shadow-2xl p-[20mm] flex flex-col gap-6 text-gray-800 leading-relaxed origin-top transform scale-[0.8]">
      {/* Header */}
      <div className="border-b-4 border-blue-600 pb-6">
        <h1 className="text-4xl font-extrabold text-blue-900 uppercase tracking-tight">
          {data.personalDetails?.firstName} {data.personalDetails?.lastName}
        </h1>
        <p className="text-xl text-blue-600 font-semibold mt-1">{data.personalDetails?.jobTitle}</p>
        
        <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 text-sm text-gray-600">
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
      {data.experiences?.length > 0 && (
        <section>
          <h2 className="text-lg font-bold text-blue-900 uppercase border-b border-gray-200 mb-3">Experience</h2>
          <div className="space-y-4">
            {data.experiences.map((exp, index) => (
              <div key={index}>
                <div className="flex justify-between font-bold text-sm text-gray-800">
                  <span>{exp.companyName}</span>
                  <span>
                    {new Date(exp.startDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short' })} - 
                    {exp.isCurrentJob ? ' Present' : ` ${new Date(exp.endDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short' })}`}
                  </span>
                </div>
                <div className="text-sm italic text-blue-600 mb-1">{exp.position}</div>
                <p className="text-xs text-gray-600 whitespace-pre-wrap">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {data.skills?.length > 0 && (
        <section>
          <h2 className="text-lg font-bold text-blue-900 uppercase border-b border-gray-200 mb-2">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <span key={index} className="px-3 py-1 bg-blue-50 text-blue-700 rounded text-xs font-semibold border border-blue-100">
                {skill.skillName} {skill.skillLevel && `(${skill.skillLevel})`}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {data.educations?.length > 0 && (
        <section>
          <h2 className="text-lg font-bold text-blue-900 uppercase border-b border-gray-200 mb-3">Education</h2>
          <div className="space-y-3">
            {data.educations.map((edu, index) => (
              <div key={index}>
                <div className="flex justify-between font-bold text-sm text-gray-800">
                  <span>{edu.institutionName}</span>
                  <span>
                    {new Date(edu.startDate).getFullYear()} - {edu.endDate ? new Date(edu.endDate).getFullYear() : 'Present'}
                  </span>
                </div>
                <div className="text-sm text-blue-600">{edu.degree} in {edu.fieldOfStudy}</div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ResumePreview;
