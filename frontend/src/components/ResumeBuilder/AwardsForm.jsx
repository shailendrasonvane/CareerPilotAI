import React from 'react';
import { Plus, Trash2, GripVertical } from 'lucide-react';

const AwardsForm = ({ data = [], onChange }) => {
  const handleAdd = () => {
    const newItem = {
      id: 0,
      uiId: Date.now(),
      awardTitle: '',
      organization: '',
      awardDate: null,
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
        <h2 className="text-2xl font-bold text-gray-800">Awards & Honors</h2>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 text-blue-600 font-semibold hover:bg-blue-50 px-3 py-1 rounded-lg transition-colors"
        >
          <Plus size={20} />
          Add Award
        </button>
      </div>

      <div className="space-y-6">
        {data.map((award, index) => (
          <div key={award.uiId || award.id || index} className="p-6 border rounded-xl relative group bg-gray-50/50">
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
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Award Title</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                  value={award.awardTitle}
                  onChange={(e) => handleUpdate(index, 'awardTitle', e.target.value)}
                  placeholder="e.g. Employee of the Month"
                />
              </div>
              
              <div className="col-span-1">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Organization</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                  value={award.organization}
                  onChange={(e) => handleUpdate(index, 'organization', e.target.value)}
                  placeholder="e.g. Acme Corp"
                />
              </div>

              <div className="col-span-1">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Date Received</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                  value={award.awardDate?.split('T')[0] || ''}
                  onChange={(e) => handleUpdate(index, 'awardDate', e.target.value)}
                />
              </div>

              <div className="col-span-2">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Description</label>
                <textarea
                  rows="2"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                  value={award.description || ''}
                  onChange={(e) => handleUpdate(index, 'description', e.target.value)}
                  placeholder="Briefly describe what this award was for..."
                ></textarea>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AwardsForm;
