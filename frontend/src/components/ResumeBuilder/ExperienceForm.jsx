import React from 'react';
import { Plus, Trash2, GripVertical } from 'lucide-react';

const ExperienceForm = ({ data = [], onChange }) => {
  const handleAdd = () => {
    const newItem = {
      id: 0,
      uiId: Date.now(), // Unique ID for React key only // Temporary ID for UI
      companyName: '',
      position: '',
      location: '',
      startDate: null,
      endDate: null,
      isCurrentJob: false,
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
        <h2 className="text-2xl font-bold text-gray-800">Work Experience</h2>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 text-blue-600 font-semibold hover:bg-blue-50 px-3 py-1 rounded-lg transition-colors"
        >
          <Plus size={20} />
          Add Experience
        </button>
      </div>

      <div className="space-y-6">
        {data.map((exp, index) => (
          <div key={exp.uiId || exp.id || index} className="p-6 border rounded-xl relative group bg-gray-50/50">
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab">
              <GripVertical size={20} className="text-gray-400" />
            </div>
            
            <button
              onClick={() => handleRemove(index)}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
            >
              <Trash2 size={20} />
            </button>

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-1">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Company Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                  value={exp.companyName}
                  onChange={(e) => handleUpdate(index, 'companyName', e.target.value)}
                />
              </div>
              <div className="col-span-1">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Position</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                  value={exp.position}
                  onChange={(e) => handleUpdate(index, 'position', e.target.value)}
                />
              </div>
              <div className="col-span-1">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Start Date</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                  value={exp.startDate?.split('T')[0] || ''}
                  onChange={(e) => handleUpdate(index, 'startDate', e.target.value)}
                />
              </div>
              <div className="col-span-1">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">End Date</label>
                <div className="flex flex-col gap-2">
                  <input
                    type="date"
                    disabled={exp.isCurrentJob}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white disabled:bg-gray-100"
                    value={exp.endDate?.split('T')[0] || ''}
                    onChange={(e) => handleUpdate(index, 'endDate', e.target.value)}
                  />
                  <label className="flex items-center gap-2 text-sm text-gray-600">
                    <input
                      type="checkbox"
                      checked={exp.isCurrentJob}
                      onChange={(e) => handleUpdate(index, 'isCurrentJob', e.target.checked)}
                    />
                    I currently work here
                  </label>
                </div>
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Description</label>
                <textarea
                  rows="4"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                  value={exp.description}
                  onChange={(e) => handleUpdate(index, 'description', e.target.value)}
                  placeholder="List your key responsibilities and achievements..."
                ></textarea>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceForm;
