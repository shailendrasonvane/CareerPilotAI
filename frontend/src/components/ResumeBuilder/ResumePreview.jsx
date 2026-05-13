import React, { useRef, useState } from 'react';
import { templates } from '../../templates';
import { ZoomIn, ZoomOut, Maximize, Smartphone, Monitor, Printer } from 'lucide-react';

const ResumePreview = ({ data }) => {
  const [zoom, setZoom] = useState(0.8);
  const [viewMode, setViewMode] = useState('desktop'); // desktop, mobile
  const previewRef = useRef(null);

  if (!data) return null;

  const templateKey = data.template?.templateKey || 'modern';
  const TemplateComponent = templates[templateKey] || templates.modern;

  const styles = {
    themeColor: data.themeColor,
    fontFamily: data.fontFamily,
    fontSize: data.fontSize,
    sectionSpacing: data.sectionSpacing,
    layoutSpacing: data.layoutSpacing
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col h-full w-full bg-gray-100">
      {/* Preview Toolbar */}
      <div className="bg-white border-b px-4 py-2 flex items-center justify-between sticky top-0 z-20">
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

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
            <button 
              onClick={() => setZoom(Math.max(0.4, zoom - 0.1))}
              className="p-1.5 hover:bg-white hover:shadow-sm rounded-md transition-all text-gray-500"
            >
              <ZoomOut size={16} />
            </button>
            <span className="text-[10px] font-bold text-gray-600 w-10 text-center">
              {Math.round(zoom * 100)}%
            </span>
            <button 
              onClick={() => setZoom(Math.min(1.5, zoom + 0.1))}
              className="p-1.5 hover:bg-white hover:shadow-sm rounded-md transition-all text-gray-500"
            >
              <ZoomIn size={16} />
            </button>
          </div>

          <button 
            onClick={handlePrint}
            className="p-2 hover:bg-gray-100 rounded-lg transition-all text-gray-600"
            title="Print Resume"
          >
            <Printer size={18} />
          </button>
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 overflow-auto p-8 flex justify-center items-start custom-scrollbar">
        <div 
          className={`transition-all duration-500 ease-in-out ${viewMode === 'mobile' ? 'w-[375px]' : 'w-full max-w-[210mm]'}`}
          style={{ 
            transform: `scale(${zoom})`, 
            transformOrigin: 'top center',
          }}
        >
          <div className="shadow-2xl ring-1 ring-gray-200">
            <TemplateComponent data={data} styles={styles} />
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
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
