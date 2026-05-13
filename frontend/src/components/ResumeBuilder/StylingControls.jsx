import React from 'react';
import { Type, Palette, MoveVertical, Layout } from 'lucide-react';

const StylingControls = ({ styles, onChange }) => {
  const { 
    themeColor = '#1e3a8a', 
    fontFamily = 'Inter, sans-serif', 
    fontSize = 'medium',
    sectionSpacing = 20,
    layoutSpacing = 40
  } = styles || {};

  const colors = [
    { name: 'Navy', value: '#1e3a8a' },
    { name: 'Emerald', value: '#059669' },
    { name: 'Rose', value: '#e11d48' },
    { name: 'Indigo', value: '#4f46e5' },
    { name: 'Slate', value: '#334155' },
    { name: 'Black', value: '#000000' },
    { name: 'Violet', value: '#7c3aed' },
    { name: 'Amber', value: '#d97706' },
  ];

  const fonts = [
    { name: 'Modern Sans', value: 'Inter, sans-serif' },
    { name: 'Professional Serif', value: 'Georgia, serif' },
    { name: 'Clean Outfit', value: 'Outfit, sans-serif' },
    { name: 'Classic Arial', value: 'Arial, sans-serif' },
    { name: 'Elegant Montserrat', value: 'Montserrat, sans-serif' },
  ];

  const handleStyleChange = (key, value) => {
    onChange({ ...styles, [key]: value });
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Theme Color */}
      <section>
        <div className="flex items-center gap-2 mb-4 text-gray-800">
          <Palette size={18} className="text-blue-600" />
          <h3 className="font-bold text-sm">Theme Color</h3>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {colors.map((color) => (
            <button
              key={color.value}
              onClick={() => handleStyleChange('themeColor', color.value)}
              className={`w-full aspect-square rounded-lg border-2 transition-all ${
                themeColor === color.value ? 'border-blue-600 scale-110 shadow-md' : 'border-transparent'
              }`}
              style={{ backgroundColor: color.value }}
              title={color.name}
            />
          ))}
        </div>
      </section>

      {/* Typography */}
      <section>
        <div className="flex items-center gap-2 mb-4 text-gray-800">
          <Type size={18} className="text-blue-600" />
          <h3 className="font-bold text-sm">Typography</h3>
        </div>
        <div className="flex flex-col gap-2">
          {fonts.map((font) => (
            <button
              key={font.value}
              onClick={() => handleStyleChange('fontFamily', font.value)}
              className={`text-left px-4 py-3 rounded-xl border-2 transition-all text-sm ${
                fontFamily === font.value 
                  ? 'border-blue-600 bg-blue-50 font-bold' 
                  : 'border-gray-100 hover:border-gray-200'
              }`}
              style={{ fontFamily: font.value }}
            >
              {font.name}
            </button>
          ))}
        </div>
      </section>

      {/* Font Size */}
      <section>
        <div className="flex items-center gap-2 mb-4 text-gray-800">
          <Layout size={18} className="text-blue-600" />
          <h3 className="font-bold text-sm">Font Size</h3>
        </div>
        <div className="flex bg-gray-100 p-1 rounded-xl">
          {['small', 'medium', 'large'].map((size) => (
            <button
              key={size}
              onClick={() => handleStyleChange('fontSize', size)}
              className={`flex-1 py-2 rounded-lg text-xs font-bold capitalize transition-all ${
                fontSize === size ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </section>

      {/* Spacing */}
      <section>
        <div className="flex items-center gap-2 mb-4 text-gray-800">
          <MoveVertical size={18} className="text-blue-600" />
          <h3 className="font-bold text-sm">Spacing</h3>
        </div>
        
        <div className="space-y-6">
          <div>
            <div className="flex justify-between text-[10px] font-bold uppercase text-gray-400 mb-2">
              <span>Section Spacing</span>
              <span>{sectionSpacing}px</span>
            </div>
            <input 
              type="range" 
              min="10" 
              max="50" 
              value={sectionSpacing} 
              onChange={(e) => handleStyleChange('sectionSpacing', parseInt(e.target.value))}
              className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          <div>
            <div className="flex justify-between text-[10px] font-bold uppercase text-gray-400 mb-2">
              <span>Layout Padding</span>
              <span>{layoutSpacing}px</span>
            </div>
            <input 
              type="range" 
              min="20" 
              max="100" 
              value={layoutSpacing} 
              onChange={(e) => handleStyleChange('layoutSpacing', parseInt(e.target.value))}
              className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default StylingControls;
