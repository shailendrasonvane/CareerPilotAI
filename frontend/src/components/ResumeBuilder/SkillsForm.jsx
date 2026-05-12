import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

const SkillsForm = ({ data = [], onChange }) => {
  const handleAdd = () => {
    const newItem = {
      id: 0,
      uiId: Date.now(),
      skillName: '',
      skillLevel: 'Beginner',
      category: 'Technical',
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
        <h2 className="text-2xl font-bold text-gray-800">Skills</h2>
        <button onClick={handleAdd} className="flex items-center gap-2 text-blue-600 font-semibold hover:bg-blue-50 px-3 py-1 rounded-lg transition-colors">
          <Plus size={20} /> Add Skill
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.map((skill, index) => (
          <div key={skill.uiId || skill.id || index} className="p-4 border rounded-xl relative bg-gray-50/50 flex gap-4 items-center">
            <div className="flex-1 space-y-3">
              <input
                type="text"
                placeholder="Skill name (e.g. React)"
                className="w-full px-3 py-1 border rounded-lg outline-none bg-white"
                value={skill.skillName}
                onChange={(e) => handleUpdate(index, 'skillName', e.target.value)}
              />
              <div className="flex gap-2">
                <select
                  className="flex-1 px-2 py-1 border rounded-lg text-xs bg-white"
                  value={skill.skillLevel}
                  onChange={(e) => handleUpdate(index, 'skillLevel', e.target.value)}
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Expert">Expert</option>
                </select>
                <select
                  className="flex-1 px-2 py-1 border rounded-lg text-xs bg-white"
                  value={skill.category}
                  onChange={(e) => handleUpdate(index, 'category', e.target.value)}
                >
                  <option value="Technical">Technical</option>
                  <option value="Soft">Soft</option>
                </select>
              </div>
            </div>
            <button onClick={() => handleRemove(index)} className="text-gray-400 hover:text-red-500 transition-colors">
              <Trash2 size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsForm;
