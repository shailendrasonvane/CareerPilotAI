import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchResumeById } from '../redux/slices/resumeSlice';
import { templates as templateComponents } from '../templates';

const ResumeExportView = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { activeResume, loading } = useSelector((state) => state.resume);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchResumeById(id)).then(() => {
        setDataLoaded(true);
        // Signal to Puppeteer that the page is ready
        window.is_ready_for_pdf = true;
      });
    }
  }, [id, dispatch]);

  if (loading || !activeResume || !dataLoaded) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  const templateKey = activeResume.template?.templateKey || 'modern';
  const TemplateComponent = templateComponents[templateKey] || templateComponents.modern;

  const styles = {
    themeColor: activeResume.themeColor || '#0ea5e9',
    fontFamily: activeResume.fontFamily || 'Inter',
    fontSize: activeResume.fontSize || '11pt',
    sectionSpacing: activeResume.sectionSpacing || 24,
    layoutSpacing: activeResume.layoutSpacing || 24,
  };

  return (
    <div className="bg-white min-h-screen">
      {/* 
        The resume-container class is crucial for the CSS masking.
        We force A4 dimensions here for exact visual fidelity.
      */}
      <div className="resume-container mx-auto" style={{ width: '210mm', minHeight: '297mm' }}>
        <TemplateComponent data={activeResume} styles={styles} />
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Outfit:wght@400;500;600;700;800&family=Roboto:wght@400;500;700&family=Playfair+Display:wght@400;700&display=swap');
        
        body {
          margin: 0;
          padding: 0;
          background: white;
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }

        .resume-container {
          background: white;
          position: relative;
          box-sizing: border-box;
          overflow: visible;
        }

        /* Prevent sections from being split awkwardly across pages */
        .resume-section {
          break-inside: avoid;
          page-break-inside: avoid;
          margin-bottom: ${styles.sectionSpacing}px;
        }

        @page {
          size: A4;
          margin: 0;
        }
      `}} />
    </div>
  );
};

export default ResumeExportView;
