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
      <div className="mx-auto w-[210mm] shadow-none print:shadow-none resume-container">
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
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }

        .resume-container {
          padding: 0 !important;
          margin: 0 auto !important;
        }

        .resume-template-root {
          min-height: auto !important;
          height: auto !important;
          box-shadow: none !important;
        }

        /* Prevent sections and headings from being split awkwardly across pages */
        h1, h2, h3, h4, header {
          break-after: avoid;
          page-break-after: avoid;
        }

        section, .resume-section {
          break-inside: auto !important;
          page-break-inside: auto !important;
          margin-bottom: ${styles.sectionSpacing}px;
        }

        /* Prevent individual content blocks from splitting midway */
        section > div > div, 
        section li,
        .resume-item {
          break-inside: avoid !important;
          page-break-inside: avoid !important;
        }

        /* Strip double shadows from templates to ensure crisp rendering */
        .resume-container [class*="shadow-"] {
          box-shadow: none !important;
        }

        @media print {
          body * {
            visibility: hidden;
          }
          .resume-container, .resume-container * {
            visibility: visible;
          }
          .resume-container {
            position: absolute;
            left: 0;
            top: 0;
            margin: 0 !important;
            padding: 0 !important;
            width: 210mm !important;
            min-height: auto !important;
            height: auto !important;
            box-shadow: none !important;
            border: none !important;
          }

          .resume-template-root {
            min-height: auto !important;
            height: auto !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ResumePrintView;
