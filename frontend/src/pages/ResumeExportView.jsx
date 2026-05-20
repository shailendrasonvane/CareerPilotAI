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
      <div className="resume-container mx-auto" style={{ width: '210mm' }}>
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

        /* Strip double shadows from templates to ensure crisp PDF rendering */
        .resume-container [class*="shadow-"] {
          box-shadow: none !important;
        }

        @media print {
          html, body {
            width: 210mm;
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          .resume-container {
            width: 210mm !important;
            min-height: auto !important;
            height: auto !important;
            box-shadow: none !important;
            border: none !important;
            margin: 0 auto !important;
            padding: 0 !important;
          }

          .resume-template-root {
            min-height: auto !important;
            height: auto !important;
          }

          /* Ensure proper box sizing and spacing for all elements */
          * {
            box-sizing: border-box !important;
          }
        }

        @page {
          size: A4;
          margin: 0; /* Zero margin to remove the top white space band entirely */
        }
      `}} />
    </div>
  );
};

export default ResumeExportView;
