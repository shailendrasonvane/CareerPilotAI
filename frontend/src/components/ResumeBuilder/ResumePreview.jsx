import React, { useRef, useState, useEffect, useCallback } from 'react';
import { templates } from '../../templates';
import { ZoomIn, ZoomOut, Smartphone, Monitor, Printer, FileText, Maximize2 } from 'lucide-react';
import {
  A4_WIDTH_PX,
  A4_HEIGHT_PX,
  calculatePageCount,
  getPreviewDisplayHeight,
  measureResumeContentHeight,
  logPaginationDebug,
} from '../../utils/resumePagination';

const MOBILE_WIDTH_PX = 375;

const ResumePreview = ({ data }) => {
  const [zoom, setZoom] = useState(0.8);
  const [isAutoZoom, setIsAutoZoom] = useState(true);
  const [viewMode, setViewMode] = useState('desktop');
  const [pageCount, setPageCount] = useState(1);
  const [contentHeight, setContentHeight] = useState(A4_HEIGHT_PX);

  const measureRef = useRef(null);
  const previewRef = useRef(null);

  if (!data) return null;

  const templateKey = data.template?.templateKey || 'modern';
  const TemplateComponent = templates[templateKey] || templates.modern;

  const styles = {
    themeColor: data.themeColor,
    fontFamily: data.fontFamily,
    fontSize: data.fontSize,
    sectionSpacing: data.sectionSpacing,
    layoutSpacing: data.layoutSpacing,
  };

  const unscaledWidth = viewMode === 'mobile' ? MOBILE_WIDTH_PX : A4_WIDTH_PX;
  const displayHeight = getPreviewDisplayHeight(pageCount, contentHeight, viewMode);
  const unscaledHeight = displayHeight;

  const measureContent = useCallback(() => {
    if (!measureRef.current) return;

    const height = measureResumeContentHeight(measureRef.current);
    const pages = viewMode === 'mobile' ? 1 : calculatePageCount(height);

    setContentHeight(height);
    setPageCount(pages);
    logPaginationDebug(templateKey, measureRef.current, pages);
  }, [viewMode, templateKey]);

  useEffect(() => {
    if (!measureRef.current) return;

    measureContent();

    const resizeObserver = new ResizeObserver(() => {
      measureContent();
    });

    resizeObserver.observe(measureRef.current);

    return () => resizeObserver.disconnect();
  }, [data, viewMode, templateKey, measureContent]);

  useEffect(() => {
    if (!isAutoZoom || !previewRef.current) return;

    const calculateAutoZoom = () => {
      if (!previewRef.current) return;
      const previewWidth = previewRef.current.clientWidth;
      const padding = 64;
      const availableWidth = Math.max(200, previewWidth - padding);
      const widthToFit = viewMode === 'mobile' ? MOBILE_WIDTH_PX : A4_WIDTH_PX;
      const calculatedZoom = availableWidth / widthToFit;
      const clampedZoom = Math.max(0.4, Math.min(1.2, calculatedZoom));
      setZoom(clampedZoom);
    };

    calculateAutoZoom();

    const resizeObserver = new ResizeObserver(() => {
      calculateAutoZoom();
    });

    resizeObserver.observe(previewRef.current);

    return () => resizeObserver.disconnect();
  }, [isAutoZoom, viewMode, displayHeight]);

  const handlePrint = () => {
    window.print();
  };

  const handleZoomIn = () => {
    setIsAutoZoom(false);
    setZoom((prev) => Math.min(1.5, prev + 0.1));
  };

  const handleZoomOut = () => {
    setIsAutoZoom(false);
    setZoom((prev) => Math.max(0.4, prev - 0.1));
  };

  const handleToggleAutoZoom = () => {
    setIsAutoZoom(true);
  };

  return (
    <div className="flex flex-col h-full w-full bg-gray-100">
      <div className="bg-white border-b px-4 py-2 flex items-center justify-between sticky top-0 z-20 preview-toolbar shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setViewMode('desktop')}
              className={`p-1.5 rounded-md transition-all ${viewMode === 'desktop' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              title="Desktop View"
            >
              <Monitor size={16} />
            </button>
            <button
              onClick={() => setViewMode('mobile')}
              className={`p-1.5 rounded-md transition-all ${viewMode === 'mobile' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              title="Mobile View"
            >
              <Smartphone size={16} />
            </button>
          </div>

          {viewMode !== 'mobile' && (
            <div className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 border border-blue-100 rounded-full text-blue-600 font-bold text-[10px] uppercase tracking-wider animate-in fade-in zoom-in duration-300">
              <FileText size={12} />
              <span>
                {pageCount} {pageCount === 1 ? 'Page' : 'Pages'} (A4)
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={handleZoomOut}
              className="p-1.5 hover:bg-white hover:shadow-sm rounded-md transition-all text-gray-500"
              title="Zoom Out"
            >
              <ZoomOut size={16} />
            </button>
            <span className="text-[10px] font-bold text-gray-600 w-10 text-center select-none">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              className="p-1.5 hover:bg-white hover:shadow-sm rounded-md transition-all text-gray-500"
              title="Zoom In"
            >
              <ZoomIn size={16} />
            </button>
          </div>

          <button
            onClick={handleToggleAutoZoom}
            className={`px-3 py-1.5 text-[10px] font-black uppercase tracking-wider rounded-lg border flex items-center gap-1 transition-all ${
              isAutoZoom
                ? 'bg-blue-50 border-blue-200 text-blue-600 shadow-sm'
                : 'bg-white border-gray-200 text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
            title="Automatically Fit A4 to Screen"
          >
            <Maximize2 size={12} />
            <span>Auto</span>
          </button>

          <button
            onClick={handlePrint}
            className="p-2 hover:bg-gray-100 rounded-lg transition-all text-gray-600"
            title="Print Resume"
          >
            <Printer size={18} />
          </button>
        </div>
      </div>

      <div
        ref={previewRef}
        className="flex-1 overflow-auto p-8 custom-scrollbar bg-gray-100/50"
      >
        <div className="flex flex-col items-center justify-start min-h-full w-full">
          <div
            className="relative flex-shrink-0 transition-all duration-150 ease-out my-auto"
            style={{
              width: `${unscaledWidth * zoom}px`,
              height: `${unscaledHeight * zoom}px`,
            }}
          >
            <div
              className="shadow-2xl ring-1 ring-gray-200 resume-container bg-white overflow-visible"
              style={{
                width: `${unscaledWidth}px`,
                height: `${unscaledHeight}px`,
                transform: `scale(${zoom})`,
                transformOrigin: 'top left',
                boxSizing: 'border-box',
                position: 'absolute',
                top: 0,
                left: 0,
                flexShrink: 0,
              }}
            >
              {/* Measure natural content height — no min-h or page-based height here */}
              <div ref={measureRef} className="w-full h-auto">
                <TemplateComponent data={data} styles={styles} />
              </div>

              {viewMode !== 'mobile' &&
                Array.from({ length: pageCount - 1 }).map((_, index) => {
                  const pageNum = index + 1;
                  return (
                    <div
                      key={pageNum}
                      className="absolute left-0 right-0 border-t-2 border-dashed border-blue-500/70 z-30 pointer-events-none flex items-center justify-end"
                      style={{
                        top: `${pageNum * A4_HEIGHT_PX}px`,
                      }}
                    >
                      <span className="bg-blue-600 text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded shadow-md border border-blue-500 mr-8 -translate-y-1/2 select-none">
                        Page {pageNum} / {pageNum + 1} Break
                      </span>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .resume-container [class*="shadow-"] {
          box-shadow: none !important;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
};

export default ResumePreview;
