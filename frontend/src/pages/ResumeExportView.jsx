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

  // 1. Initialize and cleanup is_ready_for_pdf
  useEffect(() => {
    window.is_ready_for_pdf = false;
    console.log("PDF render started");

    return () => {
      window.is_ready_for_pdf = false;
      console.log("PDF render cleaned up on unmount");
    };
  }, []);

  // 2. Token setup and fetching
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (token) {
      localStorage.setItem('token', token);
    }

    if (id) {
      dispatch(fetchResumeById(id)).then(() => {
        setDataLoaded(true);
      });
    }
  }, [id, dispatch]);

  // 3. Finalize render and send ready signal after delay
  useEffect(() => {
    if (activeResume && dataLoaded && !loading) {
      console.log("PDF render completed");

      let isCleanedUp = false;
      let readyTimeout = null;
      let fallbackTimeout = null;

      const setReady = () => {
        if (!isCleanedUp && !window.is_ready_for_pdf) {
          window.is_ready_for_pdf = true;
          console.log("PDF ready signal sent");
        }
      };

      // Set a fallback hard timeout of 1500ms to guarantee pdf generation
      fallbackTimeout = setTimeout(setReady, 1500);

      if (document.fonts && document.fonts.ready) {
        document.fonts.ready
          .then(() => {
            if (!isCleanedUp) {
              clearTimeout(fallbackTimeout);
              // 1000ms rendering delay before setting ready flag
              readyTimeout = setTimeout(setReady, 1000);
            }
          })
          .catch((err) => {
            console.warn("Fonts loading failed or interrupted, resolving ready immediately", err);
            if (!isCleanedUp) {
              clearTimeout(fallbackTimeout);
              setReady();
            }
          });
      } else {
        clearTimeout(fallbackTimeout);
        readyTimeout = setTimeout(setReady, 1000);
      }

      return () => {
        isCleanedUp = true;
        if (readyTimeout) clearTimeout(readyTimeout);
        if (fallbackTimeout) clearTimeout(fallbackTimeout);
      };
    }
  }, [activeResume, dataLoaded, loading]);

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
      <div className="resume-container mx-auto pt-2" style={{ width: '210mm', minHeight: '297mm' }}>
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
          /* Extra safety margin to prevent top edge clipping */
          padding-top: 10px;
        }

        /* Prevent sections from being split awkwardly across pages */
        .resume-section {
          break-inside: avoid;
          page-break-inside: avoid;
          margin-bottom: ${styles.sectionSpacing}px;
        }

        @media print {
          html, body {
            width: 210mm;
            background: white !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          .resume-container {
            width: 210mm !important;
            box-shadow: none !important;
            border: none !important;
            margin: 0 auto !important;
            padding-top: 12px !important;
          }

          /* Ensure proper box sizing and spacing for all elements */
          * {
            box-sizing: border-box !important;
          }
        }

        @page {
          size: A4;
          margin: 6mm 0mm; /* Safe vertical margins, full horizontal bleed */
        }
      `}} />
    </div>
  );
};

export default ResumeExportView;
