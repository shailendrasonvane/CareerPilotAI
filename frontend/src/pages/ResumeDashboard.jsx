import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchResumes, createResume, duplicateResume, deleteResume } from '../redux/slices/resumeSlice';
import { Plus, FileText, MoreVertical, Copy, Trash2, Edit3, Loader2 } from 'lucide-react';

const ResumeDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { resumes, loading } = useSelector((state) => state.resume);
  const [isCreating, setIsCreating] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  useEffect(() => {
    dispatch(fetchResumes());
  }, [dispatch]);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    
    const result = await dispatch(createResume({ title: newTitle }));
    if (createResume.fulfilled.match(result)) {
      setIsCreating(false);
      setNewTitle('');
      navigate(`/resume/builder/${result.payload.id}`);
    }
  };

  const handleDuplicate = (id) => {
    dispatch(duplicateResume(id));
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this resume?')) {
      dispatch(deleteResume(id));
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Resumes</h1>
          <p className="text-gray-600">Manage and build your professional resumes</p>
        </div>
        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all shadow-md"
        >
          <Plus size={20} />
          Create New Resume
        </button>
      </div>

      {isCreating && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Create New Resume</h2>
            <form onSubmit={handleCreate}>
              <input
                type="text"
                placeholder="Resume Title (e.g. Software Engineer)"
                className="w-full px-4 py-2 border rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 outline-none"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                autoFocus
              />
              <div className="flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="animate-spin text-blue-600" size={40} />
        </div>
      ) : resumes.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
          <FileText size={64} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-medium text-gray-900">No resumes yet</h3>
          <p className="text-gray-500 mb-6">Start building your first professional resume today!</p>
          <button
            onClick={() => setIsCreating(true)}
            className="text-blue-600 font-semibold hover:underline"
          >
            + Create your first resume
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumes.map((resume) => (
            <div
              key={resume.id}
              className="group bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all overflow-hidden flex flex-col"
            >
              <div 
                className="h-48 bg-gray-100 flex items-center justify-center relative cursor-pointer group-hover:bg-gray-50 transition-colors"
                onClick={() => navigate(`/resume/builder/${resume.id}`)}
              >
                <FileText size={48} className="text-gray-300 group-hover:text-blue-200 transition-colors" />
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex gap-2">
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleDuplicate(resume.id); }}
                      className="p-2 bg-white rounded-full shadow hover:text-blue-600"
                      title="Duplicate"
                    >
                      <Copy size={16} />
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleDelete(resume.id); }}
                      className="p-2 bg-white rounded-full shadow hover:text-red-600"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-4 flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900 truncate">{resume.title}</h3>
                    <p className="text-sm text-gray-500">
                      Updated {new Date(resume.updatedDate || resume.createdDate).toLocaleDateString()}
                    </p>
                  </div>
                  {resume.isDefault && (
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                      DEFAULT
                    </span>
                  )}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100 flex gap-2">
                  <button
                    onClick={() => navigate(`/resume/builder/${resume.id}`)}
                    className="flex-1 flex items-center justify-center gap-2 py-2 text-blue-600 font-medium hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit3 size={16} />
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResumeDashboard;
