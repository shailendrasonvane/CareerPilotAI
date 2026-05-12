import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchResumeById, updateResume, updateActiveResumeLocally } from '../redux/slices/resumeSlice';
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
  PlusCircle,
  Eye
} from 'lucide-react';
import debounce from 'lodash/debounce';

// Sub-components (to be created)
import PersonalDetailsForm from '../components/ResumeBuilder/PersonalDetailsForm';
import ExperienceForm from '../components/ResumeBuilder/ExperienceForm';
import EducationForm from '../components/ResumeBuilder/EducationForm';
import SkillsForm from '../components/ResumeBuilder/SkillsForm';
import ProjectsForm from '../components/ResumeBuilder/ProjectsForm';
import CertificatesForm from '../components/ResumeBuilder/CertificatesForm';
import LanguagesForm from '../components/ResumeBuilder/LanguagesForm';
import AwardsForm from '../components/ResumeBuilder/AwardsForm';
import ResumePreview from '../components/ResumeBuilder/ResumePreview';

const ResumeBuilder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { activeResume, saveLoading } = useSelector((state) => state.resume);
  const [activeSection, setActiveSection] = useState('personal');

  useEffect(() => {
    dispatch(fetchResumeById(id));
  }, [id, dispatch]);

  // Debounced autosave
  const debouncedSave = useCallback(
    debounce((data) => {
      dispatch(updateResume({ id, data }));
    }, 2000),
    [id, dispatch]
  );

  const handleChange = (newData) => {
    dispatch(updateActiveResumeLocally(newData));
    // Trigger autosave logic if needed
  };

  const handleSaveManually = () => {
    dispatch(updateResume({ id, data: activeResume }));
  };

  if (!activeResume) return (
    <div className="h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  const sections = [
    { id: 'personal', label: 'Personal Details', icon: <User size={20} /> },
    { id: 'experience', label: 'Work Experience', icon: <Briefcase size={20} /> },
    { id: 'education', label: 'Education', icon: <GraduationCap size={20} /> },
    { id: 'skills', label: 'Skills', icon: <Wrench size={20} /> },
    { id: 'projects', label: 'Projects', icon: <FolderLock size={20} /> },
    { id: 'certificates', label: 'Certificates', icon: <ScrollText size={20} /> },
    { id: 'languages', label: 'Languages', icon: <Globe size={20} /> },
    { id: 'awards', label: 'Awards', icon: <Award size={20} /> },
  ];

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b px-6 py-3 flex items-center justify-between shadow-sm z-10">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/resumes')}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="h-8 w-[1px] bg-gray-200"></div>
          <h1 className="font-bold text-lg text-gray-800">{activeResume.title}</h1>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500 italic">
            {saveLoading ? 'Saving...' : 'All changes saved'}
          </span>
          <button
            onClick={handleSaveManually}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all shadow-md"
          >
            <Save size={18} />
            Save Now
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Section Navigation */}
        <div className="w-64 bg-white border-r flex flex-col overflow-y-auto">
          <div className="p-4 flex flex-col gap-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeSection === section.id 
                    ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600 font-semibold' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {section.icon}
                {section.label}
              </button>
            ))}
          </div>
        </div>

        {/* Middle - Form Editor */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border p-8">
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
            
            {/* Other sections would follow similar pattern */}
            {!['personal', 'experience', 'education', 'skills', 'projects', 'certificates', 'languages', 'awards'].includes(activeSection) && (
              <div className="text-center py-20">
                <PlusCircle size={48} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium">{activeSection.charAt(0).toUpperCase() + activeSection.slice(1)} Module</h3>
                <p className="text-gray-500">Coming soon in this phase...</p>
              </div>
            )}
          </div>
        </div>

        {/* Right - Live Preview Placeholder */}
        <div className="w-[500px] bg-gray-200 border-l overflow-hidden flex flex-col">
          <div className="bg-gray-100 p-4 border-b flex items-center justify-between">
            <span className="font-semibold flex items-center gap-2 text-gray-700">
              <Eye size={18} />
              Resume Preview
            </span>
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-8 flex justify-center">
            <ResumePreview data={activeResume} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResumeBuilder;
