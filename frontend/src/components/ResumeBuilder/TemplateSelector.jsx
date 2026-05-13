import React from 'react';
import { useSelector } from 'react-redux';
import { Check } from 'lucide-react';

const TemplateSelector = ({ selectedTemplateId, onSelect }) => {
  const { templates, loading } = useSelector((state) => state.template);

  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="aspect-[3/4] bg-gray-100 animate-pulse rounded-lg"></div>
        ))}
      </div>
    );
  }

  if (!templates || templates.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-400 text-sm">No templates available.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-6">
      {templates.map((template) => (
        <div 
          key={template.id}
          onClick={() => onSelect(template.id)}
          className={`group relative cursor-pointer rounded-xl overflow-hidden border-2 transition-all duration-300 ${
            selectedTemplateId === template.id 
              ? 'border-blue-600 ring-2 ring-blue-100 shadow-lg' 
              : 'border-transparent hover:border-gray-200 hover:shadow-md'
          }`}
        >
          {/* Template Preview Placeholder / Image */}
          <div className="aspect-[3/4] bg-gray-50 flex items-center justify-center overflow-hidden">
            {template.previewImageUrl ? (
              <img src={template.previewImageUrl} alt={template.templateName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            ) : (
              <div className="flex flex-col items-center gap-2 p-4 text-center">
                <div className="w-12 h-16 bg-white shadow-sm border rounded flex flex-col gap-1 p-1">
                  <div className="w-full h-1 bg-gray-200"></div>
                  <div className="w-2/3 h-1 bg-gray-100"></div>
                  <div className="w-full h-1 bg-gray-200"></div>
                </div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Preview Coming Soon</span>
              </div>
            )}
            
            {/* Overlay */}
            <div className={`absolute inset-0 bg-blue-600/10 transition-opacity ${selectedTemplateId === template.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></div>
          </div>

          {/* Label */}
          <div className="p-3 bg-white flex items-center justify-between">
            <div>
              <h3 className={`text-xs font-bold transition-colors ${selectedTemplateId === template.id ? 'text-blue-600' : 'text-gray-700'}`}>
                {template.templateName}
              </h3>
              {template.isPremium && (
                <span className="text-[9px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded font-black uppercase">Premium</span>
              )}
            </div>
            {selectedTemplateId === template.id && (
              <div className="bg-blue-600 text-white p-1 rounded-full shadow-sm">
                <Check size={12} />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TemplateSelector;
