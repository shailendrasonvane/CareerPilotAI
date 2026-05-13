import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchResumeById, updateResume, updateActiveResumeLocally } from '../redux/slices/resumeSlice';
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
  X
} from 'lucide-react';
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

  if (!activeResume) return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
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
          <div>
            <h1 className="font-black text-gray-800 tracking-tight leading-none">{activeResume.title}</h1>
            <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">Editing Resume</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${saveLoading ? 'bg-amber-400 animate-pulse' : 'bg-green-500'}`}></div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-tighter">
              {saveLoading ? 'Saving Changes' : 'Cloud Synced'}
            </span>
          </div>
          
          <button
            onClick={handleSaveManually}
            disabled={saveLoading}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-blue-200"
          >
            <Save size={16} />
            Save Now
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden">
        {/* Left Toolbar - Sidebar */}
        <div className={`bg-white border-r flex flex-col transition-all duration-300 z-20 ${sidebarOpen ? 'w-80' : 'w-20'}`}>
          {/* Tab Navigation */}
          <div className="flex border-b">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex flex-col items-center gap-1 py-4 transition-all relative ${
                  activeTab === tab.id ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {tab.icon}
                {sidebarOpen && <span className="text-[10px] font-black uppercase tracking-widest">{tab.label}</span>}
                {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-t-full"></div>}
              </button>
            ))}
          </div>

          {/* Section Content */}
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {activeTab === 'content' && (
              <div className="p-4 flex flex-col gap-1">
                {sidebarOpen && <h3 className="px-4 py-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Resume Sections</h3>}
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all ${
                      activeSection === section.id
                        ? 'bg-blue-50 text-blue-600 shadow-sm shadow-blue-100' 
                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
                    }`}
                  >
                    <span className={`${activeSection === section.id ? 'text-blue-600' : 'text-gray-400'}`}>
                      {section.icon}
                    </span>
                    {sidebarOpen && <span className="text-sm font-bold tracking-tight">{section.label}</span>}
                  </button>
                ))}
              </div>
            )}

            {activeTab === 'templates' && (
              <div className="p-6">
                {sidebarOpen ? (
                  <>
                    <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6">Choose Template</h3>
                    <TemplateSelector 
                      selectedTemplateId={activeResume.templateId} 
                      onSelect={(val) => handleChange({ templateId: val })} 
                    />
                  </>
                ) : (
                  <div className="flex flex-col items-center gap-4 py-4 text-blue-600">
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
        <div className="flex-1 overflow-y-auto bg-gray-50/50 p-10 custom-scrollbar">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-[2rem] shadow-xl shadow-gray-200/50 border border-white p-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-4 mb-10 pb-6 border-b border-gray-50">
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
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
        <div className="w-[600px] border-l shadow-2xl z-10 flex flex-col bg-white">
          <ResumePreview data={activeResume} />
        </div>
      </main>

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
