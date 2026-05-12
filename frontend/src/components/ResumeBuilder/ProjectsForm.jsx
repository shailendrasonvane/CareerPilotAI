import React from 'react';
import { Plus, Trash2, GripVertical, Globe, Link } from 'lucide-react';

const ProjectsForm = ({ data = [], onChange }) => {
  const handleAdd = () => {
    const newItem = {
      id: 0,
      uiId: Date.now(),
      projectName: '',
      technologies: '',
      projectUrl: '',
      gitHubUrl: '',
      description: '',
      startDate: null,
      endDate: null,
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
        <h2 className="text-2xl font-bold text-gray-800">Projects</h2>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 text-blue-600 font-semibold hover:bg-blue-50 px-3 py-1 rounded-lg transition-colors"
        >
          <Plus size={20} />
          Add Project
        </button>
      </div>

      <div className="space-y-6">
        {data.map((project, index) => (
          <div key={project.uiId || project.id || index} className="p-6 border rounded-xl relative group bg-gray-50/50">
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
              <div className="col-span-2">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Project Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                  value={project.projectName}
                  onChange={(e) => handleUpdate(index, 'projectName', e.target.value)}
                  placeholder="e.g. CareerPilot AI"
                />
              </div>
              
              <div className="col-span-2">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Technologies Used</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                  value={project.technologies}
                  onChange={(e) => handleUpdate(index, 'technologies', e.target.value)}
                  placeholder="e.g. React, Node.js, PostgreSQL"
                />
              </div>

              <div className="col-span-1">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1 flex items-center gap-1">
                  <Globe size={12} /> Project URL
                </label>
                <input
                  type="url"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                  value={project.projectUrl || ''}
                  onChange={(e) => handleUpdate(index, 'projectUrl', e.target.value)}
                  placeholder="https://..."
                />
              </div>

              <div className="col-span-1">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1 flex items-center gap-1">
                  <Link size={12} /> GitHub URL
                </label>
                <input
                  type="url"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                  value={project.gitHubUrl || ''}
                  onChange={(e) => handleUpdate(index, 'gitHubUrl', e.target.value)}
                  placeholder="https://github.com/..."
                />
              </div>

              <div className="col-span-1">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Start Date</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                  value={project.startDate?.split('T')[0] || ''}
                  onChange={(e) => handleUpdate(index, 'startDate', e.target.value)}
                />
              </div>

              <div className="col-span-1">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">End Date</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                  value={project.endDate?.split('T')[0] || ''}
                  onChange={(e) => handleUpdate(index, 'endDate', e.target.value)}
                />
              </div>

              <div className="col-span-2">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Description</label>
                <textarea
                  rows="3"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                  value={project.description || ''}
                  onChange={(e) => handleUpdate(index, 'description', e.target.value)}
                  placeholder="Describe your project, your role, and the impact..."
                ></textarea>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsForm;
