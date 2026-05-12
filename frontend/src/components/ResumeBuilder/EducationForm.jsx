import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

const EducationForm = ({ data = [], onChange }) => {
  const handleAdd = () => {
    const newItem = {
      id: 0,
      uiId: Date.now(),
      institutionName: '',
      degree: '',
      fieldOfStudy: '',
      startDate: null,
      endDate: null,
      grade: '',
      description: '',
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
        <h2 className="text-2xl font-bold text-gray-800">Education</h2>
        <button onClick={handleAdd} className="flex items-center gap-2 text-blue-600 font-semibold hover:bg-blue-50 px-3 py-1 rounded-lg transition-colors">
          <Plus size={20} /> Add Education
        </button>
      </div>

      <div className="space-y-6">
        {data.map((edu, index) => (
          <div key={edu.uiId || edu.id || index} className="p-6 border rounded-xl relative bg-gray-50/50">
            <button onClick={() => handleRemove(index)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors">
              <Trash2 size={20} />
            </button>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Institution Name</label>
                <input type="text" className="w-full px-3 py-2 border rounded-lg outline-none bg-white" value={edu.institutionName} onChange={(e) => handleUpdate(index, 'institutionName', e.target.value)} />
              </div>
              <div className="col-span-1">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Degree</label>
                <input type="text" className="w-full px-3 py-2 border rounded-lg outline-none bg-white" value={edu.degree} onChange={(e) => handleUpdate(index, 'degree', e.target.value)} />
              </div>
              <div className="col-span-1">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Field of Study</label>
                <input type="text" className="w-full px-3 py-2 border rounded-lg outline-none bg-white" value={edu.fieldOfStudy} onChange={(e) => handleUpdate(index, 'fieldOfStudy', e.target.value)} />
              </div>
              <div className="col-span-1">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Start Date</label>
                <input type="date" className="w-full px-3 py-2 border rounded-lg outline-none bg-white" value={edu.startDate?.split('T')[0] || ''} onChange={(e) => handleUpdate(index, 'startDate', e.target.value)} />
              </div>
              <div className="col-span-1">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">End Date</label>
                <input type="date" className="w-full px-3 py-2 border rounded-lg outline-none bg-white" value={edu.endDate?.split('T')[0] || ''} onChange={(e) => handleUpdate(index, 'endDate', e.target.value)} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EducationForm;
