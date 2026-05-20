import React from 'react';
import { useSelector } from 'react-redux';
import { Check } from 'lucide-react';

const TemplateSelector = ({ selectedTemplateId, onSelect }) => {
  const { templates, loading } = useSelector((state) => state.template);

  if (loading) {
    return (
      <div className="template-gallery grid grid-cols-2 gap-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="template-card template-card--skeleton flex flex-col rounded-xl border border-gray-100 overflow-hidden">
            <div className="aspect-[3/4] bg-gray-100 animate-pulse" />
            <div className="h-14 bg-gray-50 animate-pulse" />
          </div>
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
    <div className="template-gallery min-w-0 w-full">
      <div className="grid grid-cols-2 gap-3 auto-rows-fr">
        {templates.map((template) => {
          const isSelected = selectedTemplateId === template.id;

          return (
            <button
              key={template.id}
              type="button"
              onClick={() => onSelect(template.id)}
              aria-pressed={isSelected}
              aria-label={`Select ${template.templateName} template`}
              className={`template-card group relative flex flex-col h-full w-full min-w-0 overflow-hidden text-left rounded-xl border-2 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
                isSelected
                  ? 'border-blue-600 ring-2 ring-blue-100 shadow-lg'
                  : 'border-gray-100 hover:border-gray-200 hover:shadow-md'
              }`}
            >
              {/* Thumbnail */}
              <div className="template-card__thumb relative aspect-[3/4] w-full shrink-0 overflow-hidden rounded-t-[10px] bg-gray-50">
                {template.previewImageUrl ? (
                  <img
                    src={template.previewImageUrl}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
                    loading="lazy"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-3 text-center">
                    <div className="w-10 h-14 bg-white shadow-sm border rounded flex flex-col gap-1 p-1">
                      <div className="w-full h-1 bg-gray-200" />
                      <div className="w-2/3 h-1 bg-gray-100" />
                      <div className="w-full h-1 bg-gray-200" />
                    </div>
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tight leading-tight">
                      Preview Soon
                    </span>
                  </div>
                )}

                <div
                  className={`absolute inset-0 bg-blue-600/10 transition-opacity pointer-events-none ${
                    isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`}
                />

                {isSelected && (
                  <div
                    className="absolute top-2 right-2 bg-blue-600 text-white p-1 rounded-full shadow-md z-10"
                    aria-hidden="true"
                  >
                    <Check size={12} strokeWidth={3} />
                  </div>
                )}
              </div>

              {/* Label */}
              <div className="template-card__label flex flex-col items-center justify-center gap-1 px-2 py-2.5 min-h-[3.5rem] bg-white rounded-b-[10px] border-t border-gray-50">
                <h3
                  className={`template-card__name w-full text-center text-[11px] font-inter font-bold leading-snug tracking-tight transition-colors ${
                    isSelected ? 'text-blue-600' : 'text-gray-700 group-hover:text-gray-900'
                  }`}
                >
                  {template.templateName}
                </h3>
                {template.isPremium && (
                  <span className="text-[9px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded font-black uppercase leading-none shrink-0">
                    Premium
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TemplateSelector;
