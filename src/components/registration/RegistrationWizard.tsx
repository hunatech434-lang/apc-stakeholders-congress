'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Building2, 
  MapPin, 
  Users, 
  Layers, 
  Vote, 
  ShieldCheck, 
  HelpCircle, 
  UploadCloud, 
  FileCheck2, 
  CheckCircle2, 
  ArrowLeft, 
  ArrowRight, 
  Save, 
  AlertCircle, 
  MessageCircle,
  ExternalLink,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { submitForumRegistration, RegistrationResult } from '@/app/actions/registerForum';

interface Lga {
  id: number;
  name: string;
  senatorialDistrict?: { name: string };
}

interface Ward {
  id: number;
  name: string;
  code?: string;
}

const STEPS = [
  { id: 1, title: 'Forum Details', icon: Building2 },
  { id: 2, title: 'Jurisdiction', icon: MapPin },
  { id: 3, title: 'Leadership', icon: Users },
  { id: 4, title: 'Capacity', icon: Layers },
  { id: 5, title: 'Track Record', icon: Vote },
  { id: 6, title: 'Declarations', icon: ShieldCheck },
  { id: 7, title: 'Support', icon: HelpCircle },
  { id: 8, title: 'Documents', icon: UploadCloud },
  { id: 9, title: 'Review', icon: FileCheck2 },
  { id: 10, title: 'Complete', icon: CheckCircle2 },
];

const KEY_ACTIVITIES = [
  'Voter Mobilization',
  'Polling Unit Canvassing',
  'Sensitization / Awareness',
  'Community Outreach',
  'Media / Publicity & Digital Campaigns',
  'Logistics / Security Assistance',
  'Youth & Women Empowerment',
  'Party Event Organization',
];

const SUPPORT_TYPES = [
  'Branded Campaign Materials (T-shirts, Caps, Banners)',
  'Voter Education Literature & Flyers',
  'Training & Canvassing Workshops',
  'Mobility & Logistics Support',
  'Secretariat Meeting Spaces',
  'Media & Digital Campaign Tools',
];

const COVERAGE_OPTIONS = [
  'Kwara Central',
  'Kwara North',
  'Kwara South',
  'Kwara State at Large',
];

export default function RegistrationWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [lgas, setLgas] = useState<Lga[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);
  const [loadingGeo, setLoadingGeo] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<RegistrationResult | null>(null);
  const [uploadingField, setUploadingField] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    // Step 1
    name: '',
    acronym: '',
    motto: '',
    yearEstablished: 2023,
    areaOfCoverage: 'Kwara State at Large',
    selectedCoverages: ['Kwara State at Large'] as string[],

    // Step 2
    lgaId: 1,
    selectedLgaIds: [1] as number[],
    isAllLgas: false,
    wardId: null as number | null,
    wardName: '',
    isAllWards: true,
    officeAddress: '',
    meetingVenue: '',

    // Step 3
    coordinatorName: '',
    coordinatorPhone: '',
    coordinatorEmail: '',
    coordinatorPassportUrl: '',
    secretaryName: '',
    secretaryPhone: '',
    forumEmail: '',
    socialMediaHandles: '',

    // Step 4
    totalStrength: 100,
    keyActivities: ['Voter Mobilization', 'Sensitization / Awareness'] as string[],
    otherActivity: '',
    hasWhatsappGroup: true,
    whatsappGroupLink: '',
    additionalCapacityInfo: '',

    // Step 5
    previousElectionActivity: 'Both 2019 and 2023' as '2023' | '2019' | 'Both 2019 and 2023' | 'This is our first time',
    rolePlayedLastElection: '',
    leaderSponsorAlignment: '',

    // Step 6
    commitWork2027: true,
    agreeWithCongress: true,
    declarationConfirmed: true,
    consentDataProcessing: true,

    // Step 7
    supportNeeded: ['Branded Campaign Materials (T-shirts, Caps, Banners)', 'Training & Canvassing Workshops'] as string[],
    willingAttendMeetings: 'Yes' as 'Yes' | 'No' | 'Maybe',

    // Step 8
    resolutionLetterUrl: '',
    supportingDocumentUrl: '',
  });

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // 1. Load LGAs on mount
  useEffect(() => {
    async function loadLgas() {
      try {
        setLoadingGeo(true);
        const res = await fetch('/api/geography?type=lgas');
        const data = await res.json();
        if (data.lgas) {
          setLgas(data.lgas);
          if (data.lgas.length > 0 && !formData.lgaId) {
            setFormData((prev) => ({
              ...prev,
              lgaId: data.lgas[0].id,
              selectedLgaIds: [data.lgas[0].id],
            }));
          }
        }
      } catch (err) {
        console.error('Failed to load LGAs:', err);
      } finally {
        setLoadingGeo(false);
      }
    }
    loadLgas();
  }, []);

  // 2. Load Wards when primary LGA changes
  useEffect(() => {
    async function loadWards() {
      if (!formData.lgaId) return;
      try {
        const res = await fetch(`/api/geography?type=wards&lgaId=${formData.lgaId}`);
        const data = await res.json();
        if (data.wards) {
          setWards(data.wards);
        }
      } catch (err) {
        console.error('Failed to load Wards:', err);
      }
    }
    loadWards();
  }, [formData.lgaId]);

  // 3. Draft Auto-Save in localStorage
  useEffect(() => {
    const saved = localStorage.getItem('apc_forum_reg_draft');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setFormData((prev) => ({ ...prev, ...parsed }));
      } catch (e) {}
    }
  }, []);

  const updateFormData = (fields: Partial<typeof formData>) => {
    setFormData((prev) => {
      const updated = { ...prev, ...fields };
      localStorage.setItem('apc_forum_reg_draft', JSON.stringify(updated));
      return updated;
    });
  };

  // Coverage toggle handler
  const handleCoverageToggle = (cov: string) => {
    let current = [...formData.selectedCoverages];
    if (cov === 'Kwara State at Large') {
      current = ['Kwara State at Large'];
    } else {
      current = current.filter((c) => c !== 'Kwara State at Large');
      if (current.includes(cov)) {
        current = current.filter((c) => c !== cov);
      } else {
        current.push(cov);
      }
      if (current.length === 0) current = ['Kwara State at Large'];
    }
    updateFormData({
      selectedCoverages: current,
      areaOfCoverage: current.join(', '),
    });
  };

  // LGA toggle handler
  const handleLgaToggle = (id: number) => {
    let current = [...formData.selectedLgaIds];
    if (current.includes(id)) {
      if (current.length > 1) current = current.filter((x) => x !== id);
    } else {
      current.push(id);
    }
    updateFormData({
      selectedLgaIds: current,
      lgaId: current[0],
      isAllLgas: current.length === lgas.length,
    });
  };

  const handleSelectAllLgas = () => {
    if (formData.isAllLgas) {
      // Unselect all except first
      const firstId = lgas[0]?.id || 1;
      updateFormData({
        selectedLgaIds: [firstId],
        lgaId: firstId,
        isAllLgas: false,
      });
    } else {
      // Select all 16 LGAs
      const allIds = lgas.map((l) => l.id);
      updateFormData({
        selectedLgaIds: allIds,
        lgaId: allIds[0] || 1,
        isAllLgas: true,
      });
    }
  };

  // File Upload Handler
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const data = new FormData();
    data.append('file', file);
    data.append('category', field);

    try {
      setUploadingField(field);
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data,
      });
      const json = await res.json();
      if (json.success && json.fileUrl) {
        updateFormData({ [field]: json.fileUrl });
      } else {
        alert(json.error || 'Upload failed');
      }
    } catch (err) {
      alert('File upload failed. Please verify file format and size (<5MB).');
    } finally {
      setUploadingField(null);
    }
  };

  // Step Validation logic
  const validateCurrentStep = (): boolean => {
    const errors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.name.trim() || formData.name.trim().length < 3) {
        errors.name = 'Forum name must be at least 3 characters.';
      }
      if (!formData.yearEstablished || formData.yearEstablished < 1960 || formData.yearEstablished > 2026) {
        errors.yearEstablished = 'Please enter a valid founding year (1960 - 2026).';
      }
    }

    if (currentStep === 2) {
      if (formData.selectedLgaIds.length === 0) {
        errors.lgaId = 'Please select at least one LGA of operation.';
      }
      if (!formData.officeAddress.trim() || formData.officeAddress.trim().length < 5) {
        errors.officeAddress = 'Please enter a valid office address or secretariat location.';
      }
    }

    if (currentStep === 3) {
      if (!formData.coordinatorName.trim()) errors.coordinatorName = 'Coordinator name is required.';
      if (!formData.coordinatorPhone.trim()) errors.coordinatorPhone = 'Coordinator phone is required.';
      if (!formData.secretaryName.trim()) errors.secretaryName = 'Secretary name is required.';
      if (!formData.secretaryPhone.trim()) errors.secretaryPhone = 'Secretary phone is required.';
    }

    if (currentStep === 4) {
      if (!formData.totalStrength || formData.totalStrength < 1) {
        errors.totalStrength = 'Please declare estimated member strength (at least 1).';
      }
      if (formData.keyActivities.length === 0) {
        errors.keyActivities = 'Please select at least one key mobilization activity.';
      }
    }

    if (currentStep === 6) {
      if (!formData.commitWork2027) errors.commitWork2027 = 'You must commit to working for APC victory in 2027.';
      if (!formData.agreeWithCongress) errors.agreeWithCongress = 'You must agree with the Congress principles.';
      if (!formData.declarationConfirmed) errors.declarationConfirmed = 'You must confirm the truthfulness of info.';
      if (!formData.consentDataProcessing) errors.consentDataProcessing = 'Consent to data processing is required.';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, STEPS.length));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Final Form Submission
  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitResult(null);

    const res = await submitForumRegistration({
      ...formData,
      totalStrength: Number(formData.totalStrength),
      yearEstablished: Number(formData.yearEstablished),
      lgaId: Number(formData.lgaId),
      wardId: formData.wardId ? Number(formData.wardId) : null,
      selectedLgaIds: formData.selectedLgaIds.map((id) => Number(id)),
      areaOfCoverage: formData.areaOfCoverage,
      wardName: formData.isAllWards ? 'All Wards' : formData.wardName,
    });

    setSubmitting(false);
    setSubmitResult(res);

    if (res.success) {
      localStorage.removeItem('apc_forum_reg_draft');
      setCurrentStep(10);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Top Accent Strip */}
      <div className="h-1.5 w-full flex">
        <div className="h-full bg-brand-600 flex-1"></div>
        <div className="h-full bg-gold-400 w-16"></div>
        <div className="h-full bg-apcRed-500 w-16"></div>
      </div>

      {/* Header & Step Tracker */}
      <div className="p-4 sm:p-6 lg:p-8 bg-slate-50 border-b border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-700">
              Official Registration Portal • Kwara State Chapter
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-0.5">
              APC Forum & Support Group Registration
            </h1>
          </div>
          <div className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 w-fit">
            Step {currentStep} of {STEPS.length - 1}
          </div>
        </div>

        {/* Step Indicator Pills (Desktop & Tablet) */}
        <div className="hidden md:flex items-center justify-between gap-1 overflow-x-auto pb-1">
          {STEPS.slice(0, 9).map((s) => {
            const Icon = s.icon;
            const isDone = currentStep > s.id;
            const isCurrent = currentStep === s.id;
            return (
              <div
                key={s.id}
                onClick={() => isDone && setCurrentStep(s.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                  isCurrent
                    ? 'bg-brand-700 text-white shadow-sm ring-2 ring-apcRed-500/30'
                    : isDone
                    ? 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                    : 'text-slate-500 hover:text-slate-700 bg-white border border-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{s.title}</span>
              </div>
            );
          })}
        </div>

        {/* Mobile Progress Bar */}
        <div className="md:hidden space-y-1.5">
          <div className="flex justify-between text-xs font-bold text-slate-700">
            <span>{STEPS[currentStep - 1]?.title}</span>
            <span>{Math.round((currentStep / (STEPS.length - 1)) * 100)}%</span>
          </div>
          <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-brand-600 transition-all duration-300"
              style={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Main Step Body */}
      <div className="p-4 sm:p-6 lg:p-8">
        {/* STEP 1: Forum Details */}
        {currentStep === 1 && (
          <div className="space-y-6 max-w-2xl">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-lg font-bold text-slate-900">Step 1: Forum Identity & Foundation</h2>
              <p className="text-xs text-slate-500 mt-0.5">Enter the official name, acronym, and scope of your organization.</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Official Forum / Support Group Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateFormData({ name: e.target.value })}
                  placeholder="e.g. Kwara Youth Movement for APC"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                />
                {validationErrors.name && <p className="text-xs text-red-600 mt-1">{validationErrors.name}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Acronym / Short Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.acronym}
                    onChange={(e) => updateFormData({ acronym: e.target.value })}
                    placeholder="e.g. KYM-APC"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Year Established / Founded *
                  </label>
                  <input
                    type="number"
                    min={1960}
                    max={2026}
                    value={formData.yearEstablished}
                    onChange={(e) => updateFormData({ yearEstablished: parseInt(e.target.value) || 2026 })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-brand-500"
                  />
                  {validationErrors.yearEstablished && (
                    <p className="text-xs text-red-600 mt-1">{validationErrors.yearEstablished}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Forum Motto / Slogan (Optional)
                </label>
                <input
                  type="text"
                  value={formData.motto}
                  onChange={(e) => updateFormData({ motto: e.target.value })}
                  placeholder="e.g. Unity, Progress and Victory"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-brand-500"
                />
              </div>

              {/* Multi-Area of Coverage Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Area(s) of Coverage / Senatorial Scope *
                </label>
                <p className="text-[11px] text-slate-500 mb-2">
                  Select one or more zones that your forum operates within, or choose "Kwara State at Large" for statewide coalitions.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {COVERAGE_OPTIONS.map((cov) => {
                    const isSelected = formData.selectedCoverages.includes(cov);
                    return (
                      <label
                        key={cov}
                        onClick={() => handleCoverageToggle(cov)}
                        className={`flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer transition text-xs font-semibold ${
                          isSelected
                            ? 'border-brand-600 bg-brand-50/80 text-brand-900 ring-1 ring-brand-600'
                            : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => {}}
                          className="w-4 h-4 text-brand-600 rounded focus:ring-brand-500"
                        />
                        <span>{cov}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Operating Jurisdiction */}
        {currentStep === 2 && (
          <div className="space-y-6 max-w-2xl">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-lg font-bold text-slate-900">Step 2: Operating Jurisdiction & LGAs</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Specify all Local Government Areas and Wards where your forum has an active presence.
              </p>
            </div>

            <div className="space-y-4">
              {/* LGA Selection with All 16 LGAs toggle */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-slate-800">
                    Local Government Areas of Operation *
                  </label>
                  <button
                    type="button"
                    onClick={handleSelectAllLgas}
                    className="text-xs font-bold text-brand-700 hover:text-brand-800 underline"
                  >
                    {formData.isAllLgas ? 'Deselect All (Single LGA)' : 'Select All 16 LGAs (Statewide)'}
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 max-h-48 overflow-y-auto p-2 border border-slate-200 rounded-xl bg-slate-50/50">
                  {lgas.map((lga) => {
                    const isChecked = formData.selectedLgaIds.includes(lga.id);
                    return (
                      <label
                        key={lga.id}
                        onClick={() => handleLgaToggle(lga.id)}
                        className={`flex items-center gap-1.5 p-2 rounded-lg border text-xs cursor-pointer transition ${
                          isChecked
                            ? 'bg-brand-100/70 border-brand-500 text-brand-900 font-bold'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="w-3.5 h-3.5 text-brand-600 rounded"
                        />
                        <span className="truncate">{lga.name}</span>
                      </label>
                    );
                  })}
                </div>
                {validationErrors.lgaId && <p className="text-xs text-red-600 mt-1">{validationErrors.lgaId}</p>}
                <p className="text-[11px] text-slate-500 mt-1">
                  Selected: <span className="font-semibold text-slate-800">{formData.selectedLgaIds.length} LGA(s)</span>
                </p>
              </div>

              {/* Ward Scope */}
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-2.5">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-800">
                  <input
                    type="checkbox"
                    checked={formData.isAllWards}
                    onChange={(e) => updateFormData({ isAllWards: e.target.checked })}
                    className="w-4 h-4 text-brand-600 rounded"
                  />
                  <span>Covers All Wards across the selected LGA(s)</span>
                </label>

                {!formData.isAllWards && (
                  <div className="pt-2 border-t border-slate-200 space-y-2">
                    <label className="block text-xs font-bold text-slate-800">
                      Specific Ward(s) or Polling Base
                    </label>
                    <input
                      type="text"
                      value={formData.wardName}
                      onChange={(e) => updateFormData({ wardName: e.target.value })}
                      placeholder="e.g. Magaji Ngeri Ward, Adewole Ward, etc."
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs bg-white focus:ring-2 focus:ring-brand-500"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Physical Secretariat / Office Address *
                </label>
                <input
                  type="text"
                  value={formData.officeAddress}
                  onChange={(e) => updateFormData({ officeAddress: e.target.value })}
                  placeholder="e.g. No. 12 Offa Road, GRA, Ilorin"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-brand-500"
                />
                {validationErrors.officeAddress && (
                  <p className="text-xs text-red-600 mt-1">{validationErrors.officeAddress}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Regular Meeting Venue (If different from Secretariat)
                </label>
                <input
                  type="text"
                  value={formData.meetingVenue}
                  onChange={(e) => updateFormData({ meetingVenue: e.target.value })}
                  placeholder="e.g. Community Town Hall, Kaiama"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Leadership & Contacts */}
        {currentStep === 3 && (
          <div className="space-y-6 max-w-2xl">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-lg font-bold text-slate-900">Step 3: Executive Leadership & Direct Contacts</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Principal officers responsible for communication with the State Directorate.
              </p>
            </div>

            <div className="space-y-4">
              {/* Coordinator */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="text-xs font-bold text-brand-700 uppercase tracking-wider">
                  Forum Coordinator / Head
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">Coordinator Full Name *</label>
                  <input
                    type="text"
                    value={formData.coordinatorName}
                    onChange={(e) => updateFormData({ coordinatorName: e.target.value })}
                    placeholder="e.g. Comrade Abdulrasheed Sanni"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm bg-white focus:ring-2 focus:ring-brand-500"
                  />
                  {validationErrors.coordinatorName && (
                    <p className="text-xs text-red-600 mt-1">{validationErrors.coordinatorName}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      Coordinator Phone Number (11 Digits) *
                    </label>
                    <input
                      type="tel"
                      value={formData.coordinatorPhone}
                      onChange={(e) => updateFormData({ coordinatorPhone: e.target.value })}
                      placeholder="08032010479"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm bg-white focus:ring-2 focus:ring-brand-500"
                    />
                    {validationErrors.coordinatorPhone && (
                      <p className="text-xs text-red-600 mt-1">{validationErrors.coordinatorPhone}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">Coordinator Email</label>
                    <input
                      type="email"
                      value={formData.coordinatorEmail}
                      onChange={(e) => updateFormData({ coordinatorEmail: e.target.value })}
                      placeholder="coordinator@domain.com"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm bg-white focus:ring-2 focus:ring-brand-500"
                    />
                  </div>
                </div>
              </div>

              {/* Secretary */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  General Secretary
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">Secretary Full Name *</label>
                  <input
                    type="text"
                    value={formData.secretaryName}
                    onChange={(e) => updateFormData({ secretaryName: e.target.value })}
                    placeholder="e.g. Fatima Aliyu"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm bg-white focus:ring-2 focus:ring-brand-500"
                  />
                  {validationErrors.secretaryName && (
                    <p className="text-xs text-red-600 mt-1">{validationErrors.secretaryName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Secretary Phone Number (11 Digits) *
                  </label>
                  <input
                    type="tel"
                    value={formData.secretaryPhone}
                    onChange={(e) => updateFormData({ secretaryPhone: e.target.value })}
                    placeholder="07030592380"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm bg-white focus:ring-2 focus:ring-brand-500"
                  />
                  {validationErrors.secretaryPhone && (
                    <p className="text-xs text-red-600 mt-1">{validationErrors.secretaryPhone}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">Official Forum Email</label>
                  <input
                    type="email"
                    value={formData.forumEmail}
                    onChange={(e) => updateFormData({ forumEmail: e.target.value })}
                    placeholder="info@forum.org"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">Social Media Handles</label>
                  <input
                    type="text"
                    value={formData.socialMediaHandles}
                    onChange={(e) => updateFormData({ socialMediaHandles: e.target.value })}
                    placeholder="e.g. @KwaraYouthAPC (X/Facebook)"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Capacity & Activities */}
        {currentStep === 4 && (
          <div className="space-y-6 max-w-2xl">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-lg font-bold text-slate-900">Step 4: Structure, Strength & Mobilization Capacity</h2>
              <p className="text-xs text-slate-500 mt-0.5">Declare your numerical strength and primary grassroots activities.</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Total Estimated Active Membership Strength *
                </label>
                <input
                  type="number"
                  min={1}
                  value={formData.totalStrength}
                  onChange={(e) => updateFormData({ totalStrength: parseInt(e.target.value) || 1 })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-brand-500"
                />
                {validationErrors.totalStrength && (
                  <p className="text-xs text-red-600 mt-1">{validationErrors.totalStrength}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Key Mobilization Activities (Select all that apply) *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {KEY_ACTIVITIES.map((act) => {
                    const checked = formData.keyActivities.includes(act);
                    return (
                      <label
                        key={act}
                        className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs cursor-pointer transition ${
                          checked
                            ? 'bg-brand-50 border-brand-500 text-brand-900 font-bold'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={(e) => {
                            const updated = e.target.checked
                              ? [...formData.keyActivities, act]
                              : formData.keyActivities.filter((a) => a !== act);
                            updateFormData({ keyActivities: updated });
                          }}
                          className="w-4 h-4 text-brand-600 rounded"
                        />
                        <span>{act}</span>
                      </label>
                    );
                  })}
                </div>
                {validationErrors.keyActivities && (
                  <p className="text-xs text-red-600 mt-1">{validationErrors.keyActivities}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Other Activities (Optional)
                </label>
                <input
                  type="text"
                  value={formData.otherActivity}
                  onChange={(e) => updateFormData({ otherActivity: e.target.value })}
                  placeholder="Specify any additional activities..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-800">
                  <input
                    type="checkbox"
                    checked={formData.hasWhatsappGroup}
                    onChange={(e) => updateFormData({ hasWhatsappGroup: e.target.checked })}
                    className="w-4 h-4 text-brand-600 rounded"
                  />
                  <span>Does your forum maintain an active WhatsApp / Telegram group for members?</span>
                </label>

                {formData.hasWhatsappGroup && (
                  <div className="pt-2 border-t border-slate-200">
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      Forum Member WhatsApp Group Link (Optional)
                    </label>
                    <input
                      type="url"
                      value={formData.whatsappGroupLink}
                      onChange={(e) => updateFormData({ whatsappGroupLink: e.target.value })}
                      placeholder="https://chat.whatsapp.com/..."
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: Political Track Record */}
        {currentStep === 5 && (
          <div className="space-y-6 max-w-2xl">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-lg font-bold text-slate-900">Step 5: Political Track Record & Election History</h2>
              <p className="text-xs text-slate-500 mt-0.5">Highlight your previous support and mobilization experience.</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Previous Election Participation *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {['2023', '2019', 'Both 2019 and 2023', 'This is our first time'].map((opt) => (
                    <label
                      key={opt}
                      className={`flex items-center gap-2 p-3 rounded-xl border text-xs cursor-pointer transition ${
                        formData.previousElectionActivity === opt
                          ? 'bg-brand-50 border-brand-500 text-brand-900 font-bold'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="prevElection"
                        checked={formData.previousElectionActivity === opt}
                        onChange={() => updateFormData({ previousElectionActivity: opt as any })}
                        className="w-4 h-4 text-brand-600"
                      />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Role Played During Last Election (Optional)
                </label>
                <textarea
                  rows={2}
                  value={formData.rolePlayedLastElection}
                  onChange={(e) => updateFormData({ rolePlayedLastElection: e.target.value })}
                  placeholder="Describe your polling unit mobilization, voter turnout drives, or campaign rallies..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-brand-500"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Notable Patrons / Leaders / Sponsors (Optional)
                </label>
                <input
                  type="text"
                  value={formData.leaderSponsorAlignment}
                  onChange={(e) => updateFormData({ leaderSponsorAlignment: e.target.value })}
                  placeholder="e.g. Alhaji X, Hon. Y (if any)"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 6: Declarations & Party Supremacy */}
        {currentStep === 6 && (
          <div className="space-y-6 max-w-2xl">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-lg font-bold text-slate-900">Step 6: Loyalty, Commitment & Declarations</h2>
              <p className="text-xs text-slate-500 mt-0.5">Mandatory institutional alignment statements.</p>
            </div>

            <div className="space-y-3.5 text-xs text-slate-700">
              <label className="flex items-start gap-3 p-3.5 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100 cursor-pointer transition">
                <input
                  type="checkbox"
                  checked={formData.commitWork2027}
                  onChange={(e) => updateFormData({ commitWork2027: e.target.checked })}
                  className="w-4 h-4 text-brand-600 rounded mt-0.5 flex-shrink-0"
                />
                <div>
                  <span className="font-bold text-slate-900 block">Commitment to Victory 2027 *</span>
                  <span className="text-slate-600 leading-relaxed text-[11px]">
                    We declare our unreserved commitment to work actively for the victory of All Progressives Congress (APC) candidates across all elective positions in the 2027 general elections.
                  </span>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3.5 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100 cursor-pointer transition">
                <input
                  type="checkbox"
                  checked={formData.agreeWithCongress}
                  onChange={(e) => updateFormData({ agreeWithCongress: e.target.checked })}
                  className="w-4 h-4 text-brand-600 rounded mt-0.5 flex-shrink-0"
                />
                <div>
                  <span className="font-bold text-slate-900 block">Alignment with APC Stakeholders Congress *</span>
                  <span className="text-slate-600 leading-relaxed text-[11px]">
                    We accept to operate in synergy with the guidelines, directives, and harmonized timetable established by the State Directorate of the APC Stakeholders Congress.
                  </span>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3.5 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100 cursor-pointer transition">
                <input
                  type="checkbox"
                  checked={formData.declarationConfirmed}
                  onChange={(e) => updateFormData({ declarationConfirmed: e.target.checked })}
                  className="w-4 h-4 text-brand-600 rounded mt-0.5 flex-shrink-0"
                />
                <div>
                  <span className="font-bold text-slate-900 block">Declaration of Truthfulness *</span>
                  <span className="text-slate-600 leading-relaxed text-[11px]">
                    I hereby certify that all information submitted in this application is true, accurate, and authorized by the executive committee of this forum.
                  </span>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3.5 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100 cursor-pointer transition">
                <input
                  type="checkbox"
                  checked={formData.consentDataProcessing}
                  onChange={(e) => updateFormData({ consentDataProcessing: e.target.checked })}
                  className="w-4 h-4 text-brand-600 rounded mt-0.5 flex-shrink-0"
                />
                <div>
                  <span className="font-bold text-slate-900 block">Data Processing & Verification Consent *</span>
                  <span className="text-slate-600 leading-relaxed text-[11px]">
                    We consent to the collection, verification, and administrative use of this data in accordance with the Congress Data Privacy Policy and Nigerian Data Protection Regulation (NDPR).
                  </span>
                </div>
              </label>
            </div>
          </div>
        )}

        {/* STEP 7: Support & Meetings */}
        {currentStep === 7 && (
          <div className="space-y-6 max-w-2xl">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-lg font-bold text-slate-900">Step 7: Resource Needs & Secretariat Coordination</h2>
              <p className="text-xs text-slate-500 mt-0.5">Let us know how the Directorate can empower your grassroots efforts.</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Support & Empowerment Needed from the Congress (Select all that apply)
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {SUPPORT_TYPES.map((sup) => {
                    const checked = formData.supportNeeded.includes(sup);
                    return (
                      <label
                        key={sup}
                        className={`flex items-center gap-2.5 p-3 rounded-xl border text-xs cursor-pointer transition ${
                          checked
                            ? 'bg-brand-50 border-brand-500 text-brand-900 font-bold'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={(e) => {
                            const updated = e.target.checked
                              ? [...formData.supportNeeded, sup]
                              : formData.supportNeeded.filter((s) => s !== sup);
                            updateFormData({ supportNeeded: updated });
                          }}
                          className="w-4 h-4 text-brand-600 rounded"
                        />
                        <span>{sup}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Willingness to attend periodic Stakeholder Consultations in Ilorin *
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Yes', 'No', 'Maybe'].map((opt) => (
                    <label
                      key={opt}
                      className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs cursor-pointer font-bold transition ${
                        formData.willingAttendMeetings === opt
                          ? 'bg-brand-700 text-white border-brand-700'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="meetings"
                        checked={formData.willingAttendMeetings === opt}
                        onChange={() => updateFormData({ willingAttendMeetings: opt as any })}
                        className="sr-only"
                      />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 8: Document Uploads */}
        {currentStep === 8 && (
          <div className="space-y-6 max-w-2xl">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-lg font-bold text-slate-900">Step 8: Supporting Documents & Credentials</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Upload resolution letters, coordinator passport photos, or registration certificates (PDF / JPG / PNG &lt; 5MB).
              </p>
            </div>

            <div className="space-y-4">
              {/* Coordinator Passport */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">Coordinator Passport Photograph</h3>
                    <p className="text-[11px] text-slate-500">For identification on verification records.</p>
                  </div>
                  {formData.coordinatorPassportUrl && (
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                      Uploaded ✓
                    </span>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, 'coordinatorPassportUrl')}
                  className="text-xs text-slate-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-brand-600 file:text-white hover:file:bg-brand-700"
                />
                {uploadingField === 'coordinatorPassportUrl' && (
                  <p className="text-xs text-brand-600">Uploading photo...</p>
                )}
              </div>

              {/* Resolution Letter */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">Executive Committee Resolution / Letter of Introduction</h3>
                    <p className="text-[11px] text-slate-500">Official letter endorsing the registration.</p>
                  </div>
                  {formData.resolutionLetterUrl && (
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                      Uploaded ✓
                    </span>
                  )}
                </div>
                <input
                  type="file"
                  accept=".pdf,image/*"
                  onChange={(e) => handleFileUpload(e, 'resolutionLetterUrl')}
                  className="text-xs text-slate-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-brand-600 file:text-white hover:file:bg-brand-700"
                />
                {uploadingField === 'resolutionLetterUrl' && (
                  <p className="text-xs text-brand-600">Uploading document...</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* STEP 9: Review & Submit */}
        {currentStep === 9 && (
          <div className="space-y-6 max-w-3xl">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-lg font-bold text-slate-900">Step 9: Review & Confirm Submission</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Verify all information before submitting for official verification and certification.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex justify-between items-center border-b border-slate-200 pb-1.5">
                  <span className="font-bold text-slate-900">Organization & Scope</span>
                  <button type="button" onClick={() => setCurrentStep(1)} className="text-brand-700 font-bold hover:underline">Edit</button>
                </div>
                <div className="grid grid-cols-2 gap-2 text-slate-700">
                  <div><strong>Forum Name:</strong> {formData.name}</div>
                  <div><strong>Acronym:</strong> {formData.acronym || 'None'}</div>
                  <div><strong>Founded:</strong> {formData.yearEstablished}</div>
                  <div><strong>Area of Coverage:</strong> {formData.areaOfCoverage}</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex justify-between items-center border-b border-slate-200 pb-1.5">
                  <span className="font-bold text-slate-900">Operating Jurisdiction</span>
                  <button type="button" onClick={() => setCurrentStep(2)} className="text-brand-700 font-bold hover:underline">Edit</button>
                </div>
                <div className="grid grid-cols-2 gap-2 text-slate-700">
                  <div><strong>LGAs Covered:</strong> {formData.isAllLgas ? 'All 16 Kwara LGAs' : `${formData.selectedLgaIds.length} LGA(s)`}</div>
                  <div><strong>Ward Scope:</strong> {formData.isAllWards ? 'All Wards' : formData.wardName || 'Specified base'}</div>
                  <div className="col-span-2"><strong>Secretariat Address:</strong> {formData.officeAddress}</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex justify-between items-center border-b border-slate-200 pb-1.5">
                  <span className="font-bold text-slate-900">Executive Leadership</span>
                  <button type="button" onClick={() => setCurrentStep(3)} className="text-brand-700 font-bold hover:underline">Edit</button>
                </div>
                <div className="grid grid-cols-2 gap-2 text-slate-700">
                  <div><strong>Coordinator:</strong> {formData.coordinatorName} ({formData.coordinatorPhone})</div>
                  <div><strong>Secretary:</strong> {formData.secretaryName} ({formData.secretaryPhone})</div>
                  <div><strong>Declared Strength:</strong> {formData.totalStrength.toLocaleString()} members</div>
                </div>
              </div>

              {submitResult?.error && (
                <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold">Submission Error</h4>
                    <p className="mt-0.5 text-xs">{submitResult.error}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 10: Complete / Success Screen with IMMEDIATE PDF DOWNLOADS & RESTRICTED WhatsApp Invite */}
        {currentStep === 10 && (
          <div className="py-8 text-center max-w-xl mx-auto space-y-6 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-3xl flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-700 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
                ✓ Accreditation Approved & Documents Ready
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Registration Completed Successfully!
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Your forum has been officially accredited under the <strong>APC Stakeholders Congress (Kwara State Chapter)</strong>. Your official Certificate of Registration and Letter of Recognition are ready for immediate download and have also been sent to your email.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1.5">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Official Registration Reference
              </span>
              <div className="text-xl sm:text-2xl font-mono font-extrabold text-brand-800">
                {submitResult?.registrationRef || 'APCSC-KW-2026-COMPLETED'}
              </div>
              <p className="text-[11px] text-slate-500">
                Save this reference code for future lookup and document re-download.
              </p>
            </div>

            {/* IMMEDIATE DOCUMENT DOWNLOAD BUTTONS */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-brand-600" />
                <span>Your Official Accreditation Documents</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                {submitResult?.certDocId ? (
                  <a
                    href={`/api/documents/${submitResult.certDocId}/download`}
                    className="p-4 rounded-2xl bg-brand-50 border border-brand-200 hover:border-brand-500 hover:shadow-md transition flex items-center justify-between group"
                  >
                    <div>
                      <div className="font-bold text-brand-950 text-xs sm:text-sm">
                        Certificate of Registration
                      </div>
                      <div className="text-[11px] text-brand-700 mt-0.5">
                        High-Resolution Vector PDF
                      </div>
                    </div>
                    <div className="p-2 bg-brand-600 group-hover:bg-brand-500 text-white rounded-xl transition">
                      <FileCheck2 className="w-4 h-4" />
                    </div>
                  </a>
                ) : (
                  <Link
                    href={`/status?ref=${submitResult?.registrationRef || ''}`}
                    className="p-4 rounded-2xl bg-brand-50 border border-brand-200 hover:border-brand-500 transition text-xs font-bold text-brand-800"
                  >
                    View Certificate on Status Page
                  </Link>
                )}

                {submitResult?.letterDocId ? (
                  <a
                    href={`/api/documents/${submitResult.letterDocId}/download`}
                    className="p-4 rounded-2xl bg-sky-50 border border-sky-200 hover:border-sky-500 hover:shadow-md transition flex items-center justify-between group"
                  >
                    <div>
                      <div className="font-bold text-sky-950 text-xs sm:text-sm">
                        Letter of Recognition
                      </div>
                      <div className="text-[11px] text-sky-700 mt-0.5">
                        Official Letterhead PDF
                      </div>
                    </div>
                    <div className="p-2 bg-sky-500 group-hover:bg-sky-400 text-white rounded-xl transition">
                      <FileCheck2 className="w-4 h-4" />
                    </div>
                  </a>
                ) : (
                  <Link
                    href={`/status?ref=${submitResult?.registrationRef || ''}`}
                    className="p-4 rounded-2xl bg-sky-50 border border-sky-200 hover:border-sky-500 transition text-xs font-bold text-sky-800"
                  >
                    View Letter on Status Page
                  </Link>
                )}
              </div>
            </div>

            {/* RESTRICTED WHATSAPP COMMUNITY CTA (Exclusive for Registered Forums) */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-brand-900 to-slate-950 text-white shadow-lg space-y-4 border border-brand-700">
              <div className="flex items-center justify-center gap-2 text-sky-300 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>Exclusive Coordinator Community</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white leading-tight">
                Join the APC Stakeholders Congress WhatsApp Group
              </h3>
              <p className="text-xs text-brand-200 leading-relaxed">
                Connect with the State Directorate and accredited coordinators across all 16 LGAs of Kwara State.
              </p>
              <div>
                <a
                  href="https://chat.whatsapp.com/JykufBzH7AS3wTLIk8XQ8f?s=cl&p=a&mlu=4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow transition flex items-center justify-center gap-2 text-xs sm:text-sm"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Join Official WhatsApp Community</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href={`/status?ref=${submitResult?.registrationRef || ''}`}
                className="w-full sm:w-auto px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition"
              >
                Go to Status Lookup
              </Link>
              <Link
                href="/"
                className="w-full sm:w-auto px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs transition"
              >
                Return to Homepage
              </Link>
            </div>
          </div>
        )}

        {/* Step Navigation Controls */}
        {currentStep < 10 && (
          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between gap-3">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handlePrev}
                className="px-4 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back
              </button>
            ) : (
              <div></div>
            )}

            {currentStep < 9 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2.5 text-xs sm:text-sm font-bold text-white bg-brand-700 hover:bg-brand-600 hover:ring-2 hover:ring-apcRed-500/30 active:bg-brand-800 rounded-xl shadow-sm transition flex items-center gap-1.5"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                disabled={submitting}
                onClick={handleSubmit}
                className="px-7 py-3 text-xs sm:text-sm font-bold text-white bg-brand-700 hover:bg-brand-600 hover:ring-2 hover:ring-apcRed-500/40 active:bg-brand-800 disabled:opacity-50 rounded-xl shadow-lg transition flex items-center gap-2"
              >
                {submitting ? (
                  <span>Transmitting Registration...</span>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Submit Official Registration</span>
                  </>
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
