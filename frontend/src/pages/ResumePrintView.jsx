import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchResumeById } from '../redux/slices/resumeSlice';
import { templates } from '../templates';
import { Loader2 } from 'lucide-react';

const ResumePrintView = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const resumeState = useSelector((state) => state.resume);
  const resume = resumeState?.activeResume;
  const isResumeLoading = resumeState?.loading;

  useEffect(() => {
    if (id) {
      dispatch(fetchResumeById(id));
    }
  }, [id, dispatch]);

  if (isResumeLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-10 h-10 animate-spin text-primary-600" />
      </div>
    );
  }

  if (!resume) return <div className="p-10 text-center">Resume not found</div>;

  const templateKey = resume.template?.templateKey || 'modern';
  const TemplateComponent = templates[templateKey] || templates.modern;

  const styles = {
    themeColor: resume.themeColor,
    fontFamily: resume.fontFamily,
    fontSize: resume.fontSize,
    sectionSpacing: resume.sectionSpacing,
    layoutSpacing: resume.layoutSpacing
  };

  return (
    <div className="bg-white min-h-screen no-print-bg">
      <div className="mx-auto w-[210mm] min-h-[297mm] shadow-none print:shadow-none resume-container">
        <TemplateComponent data={resume} styles={styles} />
      </div>
      
      <style>{`
        @page {
          size: A4;
          margin: 0;
        }
        body {
          margin: 0;
          background: white;
        }
        @media print {
          .no-print {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ResumePrintView;
