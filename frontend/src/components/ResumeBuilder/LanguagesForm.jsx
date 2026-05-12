import React from 'react';
import { Plus, Trash2, GripVertical } from 'lucide-react';

const LanguagesForm = ({ data = [], onChange }) => {
  const proficiencyLevels = [
    'Native',
    'Fluent',
    'Professional Working',
    'Limited Working',
    'Elementary',
    'Beginner'
  ];

  const handleAdd = () => {
    const newItem = {
      id: 0,
      uiId: Date.now(),
      languageName: '',
      proficiencyLevel: 'Professional Working',
      displayOrder: data.length
    };
    onChange([...data, newItem]);
  };

  const handleUpdate = (index, field, value) => {
    const updatedData = [...data];
    updatedData[index] = { ...updatedData[index], [field]: value };
    onChange(updatedData);
  };

  const handleRemove = (index) => {
    const updatedData = data.filter((_, i) => i !== index);
    onChange(updatedData);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Languages</h2>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 text-blue-600 font-semibold hover:bg-blue-50 px-3 py-1 rounded-lg transition-colors"
        >
          <Plus size={20} />
          Add Language
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.map((lang, index) => (
          <div key={lang.uiId || lang.id || index} className="p-4 border rounded-xl relative group bg-gray-50/50 flex flex-col gap-3">
            <button
              onClick={() => handleRemove(index)}
              className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors"
            >
              <Trash2 size={18} />
            </button>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Language</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                value={lang.languageName}
                onChange={(e) => handleUpdate(index, 'languageName', e.target.value)}
                placeholder="e.g. English, French"
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Proficiency</label>
              <select
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                value={lang.proficiencyLevel || ''}
                onChange={(e) => handleUpdate(index, 'proficiencyLevel', e.target.value)}
              >
                {proficiencyLevels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LanguagesForm;
