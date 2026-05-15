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

  const handleDuplicate = async (id) => {
    const result = await dispatch(duplicateResume(id));
    if (duplicateResume.rejected.match(result)) {
      alert(result.payload || 'Failed to duplicate resume. Please try again.');
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this resume?')) {
      dispatch(deleteResume(id));
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">My Resumes</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium mt-2 text-lg">Manage and build your professional resumes</p>
        </div>
        <button
          onClick={() => setIsCreating(true)}
          className="btn-primary py-3 px-6 text-lg"
        >
          <Plus size={24} strokeWidth={3} />
          Create New Resume
        </button>
      </div>

      {isCreating && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
          <div className="glass-card p-8 w-full max-w-md animate-in zoom-in duration-300">
            <h2 className="text-2xl font-black mb-6 text-slate-900 dark:text-white">Create New Resume</h2>
            <form onSubmit={handleCreate}>
              <div className="space-y-4">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Resume Title</label>
                <input
                  type="text"
                  placeholder="e.g. Senior Software Engineer"
                  className="input-field"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  autoFocus
                />
              </div>
              <div className="flex gap-4 mt-8">
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary flex-1"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex flex-col justify-center items-center h-96 gap-4">
          <div className="w-16 h-16 border-4 border-primary-100 border-t-primary-600 rounded-full animate-spin"></div>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Loading Resumes...</p>
        </div>
      ) : resumes.length === 0 ? (
        <div className="text-center py-24 glass-card border-2 border-dashed border-slate-200 dark:border-slate-800">
          <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <FileText size={40} className="text-slate-400" />
          </div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">No resumes yet</h3>
          <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-xs mx-auto font-medium">Start building your first professional resume today with CareerPilot AI.</p>
          <button
            onClick={() => setIsCreating(true)}
            className="btn-primary mx-auto"
          >
            <Plus size={20} strokeWidth={3} />
            Create First Resume
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resumes.map((resume) => (
            <div
              key={resume.id}
              className="group glass-card hover:shadow-indigo transition-all duration-500 overflow-hidden flex flex-col border-white/50 dark:border-slate-800/50"
            >
              <div 
                className="h-56 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-center relative cursor-pointer group-hover:bg-primary-50/30 dark:group-hover:bg-primary-900/10 transition-colors"
                onClick={() => navigate(`/resume/builder/${resume.id}`)}
              >
                <div className="w-16 h-20 bg-white dark:bg-slate-700 rounded-lg shadow-sm flex items-center justify-center group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500 border border-slate-100 dark:border-slate-600">
                   <FileText size={32} className="text-primary-400" />
                </div>
                
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <div className="flex gap-2">
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleDuplicate(resume.id); }}
                      className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:text-primary-600 dark:hover:text-primary-400 transition-colors border border-slate-100 dark:border-slate-700"
                      title="Duplicate"
                    >
                      <Copy size={18} />
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleDelete(resume.id); }}
                      className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:text-red-600 transition-colors border border-slate-100 dark:border-slate-700"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-6 flex-1 bg-white dark:bg-slate-900/50">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-black text-xl text-slate-900 dark:text-white truncate group-hover:text-primary-600 transition-colors">{resume.title}</h3>
                    <p className="text-sm font-bold text-slate-400 mt-1 uppercase tracking-tighter">
                      {new Date(resume.updatedDate || resume.createdDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                  {resume.isDefault && (
                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-[10px] font-black rounded-full uppercase tracking-widest border border-green-200 dark:border-green-800/50">
                      DEFAULT
                    </span>
                  )}
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => navigate(`/resume/builder/${resume.id}`)}
                    className="flex-1 btn-secondary py-2"
                  >
                    <Edit3 size={18} />
                    Open Editor
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
