import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchResumeById, updateResume, updateActiveResumeLocally, updateResumeTitle } from '../redux/slices/resumeSlice';
import { fetchTemplates } from '../redux/slices/templateSlice';
import { 
  ChevronLeft, 
  Save, 
  User, 
  Briefcase, 
  GraduationCap, 
  Wrench, 
  FolderLock, 
  Award, 
  Globe, 
  ScrollText, 
  Layout,
  Palette,
  Eye,
  Type,
  Settings,
  Menu,
  X,
  Edit2,
  Check,
  Download,
  FileText,
  Printer
} from 'lucide-react';
import exportService from '../services/exportService';
import { toast } from 'react-hot-toast';
import debounce from 'lodash/debounce';

// Sub-components
import PersonalDetailsForm from '../components/ResumeBuilder/PersonalDetailsForm';
import ExperienceForm from '../components/ResumeBuilder/ExperienceForm';
import EducationForm from '../components/ResumeBuilder/EducationForm';
import SkillsForm from '../components/ResumeBuilder/SkillsForm';
import ProjectsForm from '../components/ResumeBuilder/ProjectsForm';
import CertificatesForm from '../components/ResumeBuilder/CertificatesForm';
import LanguagesForm from '../components/ResumeBuilder/LanguagesForm';
import AwardsForm from '../components/ResumeBuilder/AwardsForm';
import ResumePreview from '../components/ResumeBuilder/ResumePreview';
import TemplateSelector from '../components/ResumeBuilder/TemplateSelector';
import StylingControls from '../components/ResumeBuilder/StylingControls';

const ResumeBuilder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { activeResume, saveLoading } = useSelector((state) => state.resume);
  const { templates } = useSelector((state) => state.template);
  const [activeTab, setActiveTab] = useState('content'); // content, templates, design
  const [activeSection, setActiveSection] = useState('personal');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    dispatch(fetchResumeById(id));
    dispatch(fetchTemplates());
  }, [id, dispatch]);

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    if (activeResume) {
      setEditedTitle(activeResume.title);
    }
  }, [activeResume?.title]);

  const handleTitleSave = () => {
    const trimmedTitle = editedTitle.trim();
    if (trimmedTitle && trimmedTitle !== activeResume.title) {
      if (trimmedTitle.length > 100) {
        alert('Title must be less than 100 characters');
        setEditedTitle(activeResume.title);
        setIsEditingTitle(false);
        return;
      }
      dispatch(updateResumeTitle({ id, title: trimmedTitle }));
    } else {
      setEditedTitle(activeResume.title);
    }
    setIsEditingTitle(false);
  };

  const handleTitleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleTitleSave();
    } else if (e.key === 'Escape') {
      setEditedTitle(activeResume.title);
      setIsEditingTitle(false);
    }
  };

  // Debounced autosave
  const debouncedSave = useCallback(
    debounce((data) => {
      dispatch(updateResume({ id, data }));
    }, 2000),
    [id, dispatch]
  );

  const handleChange = (newData) => {
    console.log('[BUILDER] handleChange triggered with:', newData);
    
    // If templateId changed, we also want to update the template object locally for instant preview
    if (newData.templateId) {
      const selectedTemplate = templates.find(t => t.id === newData.templateId);
      console.log('[BUILDER] New Template Selected:', selectedTemplate?.templateKey);
      if (selectedTemplate) {
        newData.template = selectedTemplate;
      }
    }
    
    dispatch(updateActiveResumeLocally(newData));
    
    // For autosave, we send the updated resume state
    const updatedResume = { ...activeResume, ...newData };
    console.log('[BUILDER] Sending for Autosave:', updatedResume.template?.templateKey);
    debouncedSave(updatedResume);
  };

  const handleSaveManually = () => {
    dispatch(updateResume({ id, data: activeResume }));
  };

  const handleExport = async (type) => {
    setIsExporting(true);
    const toastId = toast.loading(`Generating your ${type.toUpperCase()}...`);
    
    try {
      let data;
      if (type === 'pdf') {
        data = await exportService.exportPdf(id);
      } else {
        data = await exportService.exportDocx(id);
      }

      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = url;
      const fileName = `${activeResume.personalDetails.firstName}_${activeResume.personalDetails.lastName}_Resume.${type}`;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      
      toast.success(`${type.toUpperCase()} exported successfully!`, { id: toastId });
    } catch (error) {
      console.error('Export failed:', error);
      toast.error(`Failed to export ${type.toUpperCase()}: ${error.message || 'Please try again.'}`, { id: toastId });
    } finally {
      setIsExporting(false);
    }
  };

  if (!activeResume) return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        <p className="text-gray-500 font-medium">Loading your career pilot...</p>
      </div>
    </div>
  );

  const sections = [
    { id: 'personal', label: 'Personal', icon: <User size={18} /> },
    { id: 'experience', label: 'Experience', icon: <Briefcase size={18} /> },
    { id: 'education', label: 'Education', icon: <GraduationCap size={18} /> },
    { id: 'skills', label: 'Skills', icon: <Wrench size={18} /> },
    { id: 'projects', label: 'Projects', icon: <FolderLock size={18} /> },
    { id: 'certificates', label: 'Certificates', icon: <ScrollText size={18} /> },
    { id: 'languages', label: 'Languages', icon: <Globe size={18} /> },
    { id: 'awards', label: 'Awards', icon: <Award size={18} /> },
  ];

  const tabs = [
    { id: 'content', label: 'Content', icon: <Type size={18} /> },
    { id: 'templates', label: 'Templates', icon: <Layout size={18} /> },
    { id: 'design', label: 'Design', icon: <Palette size={18} /> },
  ];

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden font-sans">
      {/* Header */}
      <header className="bg-white border-b px-6 py-3 flex items-center justify-between shadow-sm z-30">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/resumes')}
            className="p-2 hover:bg-gray-100 rounded-full transition-all text-gray-500 hover:text-gray-800"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="h-6 w-[1px] bg-gray-200"></div>
          <div className="flex flex-col">
            {isEditingTitle ? (
              <div className="flex items-center gap-2 group">
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  onBlur={handleTitleSave}
                  onKeyDown={handleTitleKeyDown}
                  autoFocus
                  maxLength={100}
                  className="font-black text-gray-800 tracking-tight leading-none border-b-2 border-primary-500 outline-none bg-primary-50/50 px-1 py-0.5 rounded-sm transition-all min-w-[200px]"
                />
                <Check size={14} className="text-primary-600 animate-in fade-in zoom-in duration-300" />
              </div>
            ) : (
              <div 
                className="group flex items-center gap-2 cursor-pointer"
                onClick={() => setIsEditingTitle(true)}
              >
                <h1 className="font-black text-gray-800 tracking-tight leading-none group-hover:text-primary-600 transition-colors">
                  {activeResume.title}
                </h1>
                <Edit2 size={14} className="text-gray-300 group-hover:text-primary-500 opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0" />
              </div>
            )}
            <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">Editing Resume</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${saveLoading ? 'bg-amber-400 animate-pulse' : 'bg-green-500'}`}></div>
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
              {saveLoading ? 'Saving' : 'Synced'}
            </span>
          </div>

          <div className="h-6 w-[1px] bg-gray-100 mx-2"></div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => handleExport('pdf')}
              disabled={isExporting}
              className="flex items-center gap-2 bg-slate-900 hover:bg-black disabled:bg-slate-400 text-white px-4 py-2 rounded-lg font-bold text-xs transition-all shadow-sm"
            >
              <Download size={14} />
              PDF
            </button>
            <button
              onClick={() => handleExport('docx')}
              disabled={isExporting}
              className="flex items-center gap-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 px-4 py-2 rounded-lg font-bold text-xs transition-all"
            >
              <FileText size={14} />
              DOCX
            </button>
            <button
              onClick={() => window.open(`/resume/export/${id}`, '_blank')}
              className="flex items-center gap-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 px-4 py-2 rounded-lg font-bold text-xs transition-all"
            >
              <Printer size={14} />
              PRINT
            </button>
          </div>

          <div className="h-6 w-[1px] bg-gray-100 mx-2"></div>
          
          <button
            onClick={handleSaveManually}
            disabled={saveLoading}
            className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-300 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-primary-200"
          >
            <Save size={16} />
            Save Now
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden">
        {/* Left Toolbar - Sidebar */}
        <div className={`bg-white border-r flex flex-col transition-all duration-300 z-20 builder-sidebar ${sidebarOpen ? 'w-80' : 'w-20'}`}>
          {/* Tab Navigation */}
          <div className="flex border-b">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex flex-col items-center gap-1 py-4 transition-all relative ${
                  activeTab === tab.id ? 'text-primary-600' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {tab.icon}
                {sidebarOpen && <span className="text-[10px] font-black uppercase tracking-widest">{tab.label}</span>}
                {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary-600 rounded-t-full"></div>}
              </button>
            ))}
          </div>

          {/* Section Content */}
          <div className="flex-1 min-w-0 overflow-y-auto overflow-x-hidden custom-scrollbar">
            {activeTab === 'content' && (
              <div className="p-4 flex flex-col gap-1">
                {sidebarOpen && <h3 className="px-4 py-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Resume Sections</h3>}
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all ${
                      activeSection === section.id
                        ? 'bg-primary-50 text-primary-600 shadow-sm shadow-primary-100' 
                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
                    }`}
                  >
                    <span className={`${activeSection === section.id ? 'text-primary-600' : 'text-gray-400'}`}>
                      {section.icon}
                    </span>
                    {sidebarOpen && <span className="text-sm font-bold tracking-tight">{section.label}</span>}
                  </button>
                ))}
              </div>
            )}

            {activeTab === 'templates' && (
              <div className="p-4 min-w-0">
                {sidebarOpen ? (
                  <>
                    <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Choose Template</h3>
                    <TemplateSelector 
                      selectedTemplateId={activeResume.templateId} 
                      onSelect={(val) => handleChange({ templateId: val })} 
                    />
                  </>
                ) : (
                  <div className="flex flex-col items-center gap-4 py-4 text-primary-600">
                    <Layout size={24} />
                  </div>
                )}
              </div>
            )}

            {activeTab === 'design' && (
              <div className="p-6">
                {sidebarOpen ? (
                  <>
                    <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6">Customize Styles</h3>
                    <StylingControls 
                      styles={{
                        themeColor: activeResume.themeColor,
                        fontFamily: activeResume.fontFamily,
                        fontSize: activeResume.fontSize,
                        sectionSpacing: activeResume.sectionSpacing,
                        layoutSpacing: activeResume.layoutSpacing
                      }}
                      onChange={(val) => handleChange(val)}
                    />
                  </>
                ) : (
                  <div className="flex flex-col items-center gap-4 py-4 text-blue-600">
                    <Palette size={24} />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Toggle Sidebar */}
          <div className="p-4 border-t">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="w-full flex items-center justify-center p-2 hover:bg-gray-100 rounded-lg text-gray-400 transition-all"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Middle - Editor (Always visible now, tabs only change sidebar) */}
        <div className="w-[620px] flex-shrink-0 border-r overflow-y-auto bg-gray-50/50 p-10 custom-scrollbar editor-panel">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-[2rem] shadow-xl shadow-gray-200/50 border border-white p-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-4 mb-10 pb-6 border-b border-gray-50">
                <div className="w-12 h-12 bg-primary-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary-200">
                  {sections.find(s => s.id === activeSection)?.icon}
                </div>
                <div>
                  <h2 className="text-2xl font-black text-gray-800 tracking-tight">
                    {sections.find(s => s.id === activeSection)?.label}
                  </h2>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Configure section content</p>
                </div>
              </div>

              {activeSection === 'personal' && (
                <PersonalDetailsForm 
                  data={activeResume.personalDetails} 
                  onChange={(val) => handleChange({ personalDetails: val })} 
                />
              )}
              {activeSection === 'experience' && (
                <ExperienceForm 
                  data={activeResume.experiences} 
                  onChange={(val) => handleChange({ experiences: val })} 
                />
              )}
              {activeSection === 'education' && (
                <EducationForm 
                  data={activeResume.educations} 
                  onChange={(val) => handleChange({ educations: val })} 
                />
              )}
              {activeSection === 'skills' && (
                <SkillsForm 
                  data={activeResume.skills} 
                  onChange={(val) => handleChange({ skills: val })} 
                />
              )}
              {activeSection === 'projects' && (
                <ProjectsForm 
                  data={activeResume.projects} 
                  onChange={(val) => handleChange({ projects: val })} 
                />
              )}
              {activeSection === 'certificates' && (
                <CertificatesForm 
                  data={activeResume.certificates} 
                  onChange={(val) => handleChange({ certificates: val })} 
                />
              )}
              {activeSection === 'languages' && (
                <LanguagesForm 
                  data={activeResume.languages} 
                  onChange={(val) => handleChange({ languages: val })} 
                />
              )}
              {activeSection === 'awards' && (
                <AwardsForm 
                  data={activeResume.awards} 
                  onChange={(val) => handleChange({ awards: val })} 
                />
              )}
            </div>
          </div>
        </div>

        {/* Right - Live Preview */}
        <div className="flex-1 z-10 flex flex-col bg-white">
          <ResumePreview data={activeResume} />
        </div>
      </main>
      
      {/* Export Loading Overlay */}
      {isExporting && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] flex items-center justify-center animate-in fade-in duration-300">
          <div className="bg-white p-8 rounded-3xl shadow-2xl flex flex-col items-center gap-6 max-w-sm w-full mx-4 border border-white/20 animate-in zoom-in-95 duration-300">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-primary-100 rounded-full"></div>
              <div className="w-16 h-16 border-4 border-primary-600 rounded-full border-t-transparent animate-spin absolute top-0 left-0"></div>
              <Download className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-primary-600" size={24} />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-black text-slate-800 tracking-tight">Generating Document</h3>
              <p className="text-slate-500 text-sm font-medium mt-2">We're crafting your professional resume with pixel-perfect precision. This will only take a moment.</p>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="bg-primary-600 h-full animate-progress rounded-full"></div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}</style>
    </div>
  );
};

export default ResumeBuilder;
