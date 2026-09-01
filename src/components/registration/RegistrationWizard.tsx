'use client';

import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  MapPin, 
  Users, 
  Layers, 
  Vote, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  ArrowLeft, 
  Download, 
  ExternalLink, 
  ShieldCheck, 
  Check, 
  Sparkles, 
  ChevronDown 
} from 'lucide-react';
import { registerForumAction, RegistrationResult } from '@/app/actions/registerForum';
import { section1Schema, section2Schema } from '@/lib/validators';

const KWARA_LGAS = [
  { id: 1, name: 'Asa', district: 'Kwara Central' },
  { id: 2, name: 'Ilorin East', district: 'Kwara Central' },
  { id: 3, name: 'Ilorin South', district: 'Kwara Central' },
  { id: 4, name: 'Ilorin West', district: 'Kwara Central' },
  { id: 5, name: 'Baruten', district: 'Kwara North' },
  { id: 6, name: 'Edu', district: 'Kwara North' },
  { id: 7, name: 'Kaiama', district: 'Kwara North' },
  { id: 8, name: 'Moro', district: 'Kwara North' },
  { id: 9, name: 'Pategi', district: 'Kwara North' },
  { id: 10, name: 'Ekiti', district: 'Kwara South' },
  { id: 11, name: 'Ifelodun', district: 'Kwara South' },
  { id: 12, name: 'Irepodun', district: 'Kwara South' },
  { id: 13, name: 'Isin', district: 'Kwara South' },
  { id: 14, name: 'Offa', district: 'Kwara South' },
  { id: 15, name: 'Oke Ero', district: 'Kwara South' },
  { id: 16, name: 'Oyun', district: 'Kwara South' },
];

const MEMBER_STRENGTH_OPTIONS = [
  { label: '100 - 200 Members', rangeStr: '100 - 200', value: 150 },
  { label: '200 - 300 Members', rangeStr: '200 - 300', value: 250 },
  { label: '300 - 500 Members', rangeStr: '300 - 500', value: 400 },
  { label: '500 - 1,000 Members', rangeStr: '500 - 1,000', value: 750 },
  { label: '1,000 and Above', rangeStr: '1,000 and above', value: 1200 },
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
  'Kwara State at Large',
  'Kwara Central',
  'Kwara North',
  'Kwara South',
];

export default function RegistrationWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [lgas, setLgas] = useState(KWARA_LGAS);
  const [submitting, setSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<RegistrationResult | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    // Section 1: Forum Details & Geography
    name: '',
    yearEstablished: 2023,
    areaOfCoverage: 'Kwara State at Large',
    selectedCoverages: ['Kwara State at Large'] as string[],

    lgaId: 1,
    selectedLgaIds: [1] as number[],
    isAllLgas: false,
    wardId: null as number | null,
    wardName: '',
    isAllWards: true,
    officeAddress: '',

    // Section 1: Leadership & Contacts
    coordinatorName: '',
    coordinatorPhone: '',
    secretaryName: '',
    secretaryPhone: '',
    forumEmail: '',
    socialMediaHandles: '',

    // Section 2: Structure & Capacity
    totalStrength: 150,
    strengthRange: '100 - 200',
    keyActivities: ['Voter Mobilization', 'Sensitization / Awareness'] as string[],
    otherActivity: '',
    additionalCapacityInfo: '',

    // Section 2: Political Track Record
    previousElectionActivity: 'Both 2019 and 2023' as '2023' | '2019' | 'Both 2019 and 2023' | 'This is our first time',
    rolePlayedLastElection: '',
    leaderSponsorAlignment: '',

    // Section 2: Commitments & Declarations
    commitWork2027: true,
    agreeWithCongress: true,
    declarationConfirmed: true,
    consentDataProcessing: true,

    // Section 2: Support & Meetings
    supportNeeded: ['Branded Campaign Materials (T-shirts, Caps, Banners)', 'Training & Canvassing Workshops'] as string[],
    willingAttendMeetings: 'Yes' as 'Yes' | 'No' | 'Maybe',
  });

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // 1. Sync database LGAs if available, while keeping fallback intact
  useEffect(() => {
    async function loadLgas() {
      try {
        const res = await fetch('/api/geography?type=lgas');
        const data = await res.json();
        if (data.lgas && data.lgas.length > 0) {
          setLgas(data.lgas);
        }
      } catch (err) {}
    }
    loadLgas();
  }, []);

  // 2. Draft Auto-Save to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('apc_forum_reg_draft_v5');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setFormData((prev) => ({ ...prev, ...parsed }));
        } catch (e) {}
      }
    }
  }, []);

  const updateFormData = (fields: Partial<typeof formData>) => {
    setFormData((prev) => {
      const updated = { ...prev, ...fields };
      if (typeof window !== 'undefined') {
        localStorage.setItem('apc_forum_reg_draft_v5', JSON.stringify(updated));
      }
      return updated;
    });
  };

  const handleLgaToggle = (id: number) => {
    const current = [...formData.selectedLgaIds];
    const idx = current.indexOf(id);
    if (idx > -1) {
      if (current.length > 1) {
        current.splice(idx, 1);
      }
    } else {
      current.push(id);
    }
    updateFormData({
      selectedLgaIds: current,
      lgaId: current[0] || 1,
      isAllLgas: current.length === lgas.length,
    });
  };

  const handleSelectAllLgas = () => {
    if (formData.isAllLgas) {
      updateFormData({
        isAllLgas: false,
        selectedLgaIds: [1],
        lgaId: 1,
      });
    } else {
      updateFormData({
        isAllLgas: true,
        selectedLgaIds: lgas.map((l) => l.id),
        lgaId: 1,
      });
    }
  };

  const handleActivityToggle = (act: string) => {
    const current = [...formData.keyActivities];
    const idx = current.indexOf(act);
    if (idx > -1) {
      if (current.length > 1) current.splice(idx, 1);
    } else {
      current.push(act);
    }
    updateFormData({ keyActivities: current });
  };

  const handleSupportToggle = (sup: string) => {
    const current = [...formData.supportNeeded];
    const idx = current.indexOf(sup);
    if (idx > -1) {
      current.splice(idx, 1);
    } else {
      current.push(sup);
    }
    updateFormData({ supportNeeded: current });
  };

  // Step 1 -> Step 2 Validation
  const handleProceedToStep2 = () => {
    setValidationErrors({});
    const result = section1Schema.safeParse(formData);

    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as string;
        errors[field] = err.message;
      });
      setValidationErrors(errors);
      window.scrollTo({ top: 150, behavior: 'smooth' });
      return;
    }

    setCurrentStep(2);
    window.scrollTo({ top: 100, behavior: 'smooth' });
  };

  // Final Form Submission
  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationErrors({});

    const result = section2Schema.safeParse(formData);
    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as string;
        errors[field] = err.message;
      });
      setValidationErrors(errors);
      window.scrollTo({ top: 150, behavior: 'smooth' });
      return;
    }

    setSubmitting(true);
    try {
      const submissionData = {
        ...formData,
        motto: '',
        wardName: 'All Wards Covered',
        isAllWards: true,
        hasWhatsappGroup: false,
        whatsappGroupLink: '',
      };

      const res = await registerForumAction(submissionData);
      setSubmitting(false);

      if (res.success) {
        setSubmitResult(res);
        setCurrentStep(3);
        if (typeof window !== 'undefined') {
          localStorage.removeItem('apc_forum_reg_draft_v5');
        }
        window.scrollTo({ top: 50, behavior: 'smooth' });
      } else {
        if (res.fieldErrors) {
          const flatErrors: Record<string, string> = {};
          Object.keys(res.fieldErrors).forEach((k) => {
            flatErrors[k] = res.fieldErrors![k][0];
          });
          setValidationErrors(flatErrors);
        }
        alert(res.error || 'A submission error occurred. Please check all fields and try again.');
      }
    } catch (err: any) {
      setSubmitting(false);
      alert('Network or server error: ' + (err.message || 'Please verify internet connection.'));
    }
  };

  const whatsappGroupLink = 'https://chat.whatsapp.com/JykufBzH7AS3wTLIk8XQ8f?s=cl&p=a&mlu=4';

  return (
    <div className="max-w-4xl mx-auto py-6 sm:py-10 px-4 sm:px-6">
      {/* Step Indicator Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-slate-200 w-full z-0"></div>
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-brand-600 transition-all duration-300 z-0"
            style={{ width: currentStep === 1 ? '0%' : currentStep === 2 ? '50%' : '100%' }}
          ></div>

          {/* Step 1 Pill */}
          <div className="relative z-10 flex flex-col items-center">
            <div
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm border-2 transition ${
                currentStep >= 1
                  ? 'bg-brand-600 border-brand-600 text-white shadow-md'
                  : 'bg-white border-slate-300 text-slate-500'
              }`}
            >
              1
            </div>
            <span className="text-[11px] sm:text-xs font-bold mt-1.5 text-slate-800 text-center">
              Identity & Leadership
            </span>
          </div>

          {/* Step 2 Pill */}
          <div className="relative z-10 flex flex-col items-center">
            <div
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm border-2 transition ${
                currentStep >= 2
                  ? 'bg-brand-600 border-brand-600 text-white shadow-md'
                  : 'bg-white border-slate-300 text-slate-500'
              }`}
            >
              2
            </div>
            <span className="text-[11px] sm:text-xs font-bold mt-1.5 text-slate-800 text-center">
              Capacity & Commitments
            </span>
          </div>

          {/* Step 3 Pill */}
          <div className="relative z-10 flex flex-col items-center">
            <div
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm border-2 transition ${
                currentStep === 3
                  ? 'bg-emerald-600 border-emerald-600 text-white shadow-md ring-4 ring-emerald-100'
                  : 'bg-white border-slate-300 text-slate-500'
              }`}
            >
              3
            </div>
            <span className="text-[11px] sm:text-xs font-bold mt-1.5 text-slate-800 text-center">
              Accreditation
            </span>
          </div>
        </div>
      </div>

      {/* ================= STEP 1: IDENTITY & LEADERSHIP ================= */}
      {currentStep === 1 && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-8 animate-in fade-in duration-200">
          <div className="border-b border-slate-100 pb-5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Official Kwara State Portal
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Section 1: Forum Identity, Operational Scope & Leadership
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Provide your group&apos;s legal/working title, operational Local Government Areas, and accredited leadership contacts.
            </p>
          </div>

          <div className="space-y-8">
            {/* Part A: Forum Identity */}
            <div className="space-y-5">
              <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-brand-600" />
                <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
                  Part 1: Basic Information & Jurisdiction
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Forum Full Official Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => updateFormData({ name: e.target.value })}
                    placeholder="e.g. Kwara APC Youth Mobilization Vanguard for 2027"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm text-slate-900 bg-white placeholder-slate-400 focus:ring-2 focus:ring-brand-500 ${
                      validationErrors.name ? 'border-red-400 bg-red-50/20' : 'border-slate-300'
                    }`}
                  />
                  {validationErrors.name && (
                    <p className="text-[11px] text-red-600 font-semibold mt-1">{validationErrors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Year Established / Founded <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    min="1960"
                    max="2026"
                    value={formData.yearEstablished}
                    onChange={(e) => updateFormData({ yearEstablished: parseInt(e.target.value, 10) || 2023 })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm text-slate-900 bg-white focus:ring-2 focus:ring-brand-500 ${
                      validationErrors.yearEstablished ? 'border-red-400 bg-red-50/20' : 'border-slate-300'
                    }`}
                  />
                  {validationErrors.yearEstablished && (
                    <p className="text-[11px] text-red-600 font-semibold mt-1">{validationErrors.yearEstablished}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    Primary Area of Coverage <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {COVERAGE_OPTIONS.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => updateFormData({ areaOfCoverage: opt })}
                        className={`py-2 px-2.5 rounded-xl border text-xs font-bold transition text-center ${
                          formData.areaOfCoverage === opt
                            ? 'bg-brand-600 text-white border-brand-600 shadow-xs'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Part B: Operational Geography (16 LGAs of Kwara) */}
            <div className="space-y-5">
              <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-brand-600" />
                  <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
                    Part 2: Operational Geography (16 Kwara LGAs)
                  </h2>
                </div>
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-brand-700 bg-brand-50 px-3 py-1.5 rounded-xl border border-brand-200">
                  <input
                    type="checkbox"
                    checked={formData.isAllLgas}
                    onChange={handleSelectAllLgas}
                    className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500 border-slate-300 cursor-pointer"
                  />
                  <span>Select All 16 LGAs</span>
                </label>
              </div>

              {/* Primary Base LGA Dropdown */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Primary Base / Headquarter LGA <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={formData.lgaId}
                    onChange={(e) => {
                      const id = parseInt(e.target.value, 10);
                      const currentSelected = Array.from(new Set([id, ...formData.selectedLgaIds]));
                      updateFormData({ lgaId: id, selectedLgaIds: currentSelected });
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 bg-white focus:ring-2 focus:ring-brand-500 appearance-none pr-10"
                  >
                    <optgroup label="Kwara Central">
                      {KWARA_LGAS.filter(l => l.district === 'Kwara Central').map(l => (
                        <option key={l.id} value={l.id}>{l.name} LGA</option>
                      ))}
                    </optgroup>
                    <optgroup label="Kwara North">
                      {KWARA_LGAS.filter(l => l.district === 'Kwara North').map(l => (
                        <option key={l.id} value={l.id}>{l.name} LGA</option>
                      ))}
                    </optgroup>
                    <optgroup label="Kwara South">
                      {KWARA_LGAS.filter(l => l.district === 'Kwara South').map(l => (
                        <option key={l.id} value={l.id}>{l.name} LGA</option>
                      ))}
                    </optgroup>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-3 pointer-events-none" />
                </div>
              </div>

              {/* Multi-LGA Checkbox Matrix */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-2">
                  Operational Presence (Mark All Applicable LGAs) <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                  {lgas.map((l) => {
                    const isSelected = formData.selectedLgaIds.includes(l.id);
                    return (
                      <button
                        key={l.id}
                        type="button"
                        onClick={() => handleLgaToggle(l.id)}
                        className={`p-2.5 rounded-xl text-xs font-semibold border transition text-left flex items-center justify-between ${
                          isSelected
                            ? 'bg-brand-600 text-white border-brand-600 shadow-xs font-bold'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <span className="truncate">{l.name}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 flex-shrink-0" />}
                      </button>
                    );
                  })}
                </div>
                {validationErrors.lgaId && (
                  <p className="text-[11px] text-red-600 font-semibold mt-1">{validationErrors.lgaId}</p>
                )}
              </div>

              {/* Office Street Address */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Office / Secretariat Street Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.officeAddress}
                  onChange={(e) => updateFormData({ officeAddress: e.target.value })}
                  placeholder="e.g. Suite 4, Harmony Plaza, Fate Road, Ilorin, Kwara State"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm text-slate-900 bg-white placeholder-slate-400 focus:ring-2 focus:ring-brand-500 ${
                    validationErrors.officeAddress ? 'border-red-400 bg-red-50/20' : 'border-slate-300'
                  }`}
                />
                {validationErrors.officeAddress && (
                  <p className="text-[11px] text-red-600 font-semibold mt-1">{validationErrors.officeAddress}</p>
                )}
              </div>
            </div>

            {/* Part C: Leadership & Contacts */}
            <div className="space-y-5">
              <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
                <Users className="w-5 h-5 text-brand-600" />
                <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
                  Part 3: Forum Leadership & Contact Details
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Coordinator Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.coordinatorName}
                    onChange={(e) => updateFormData({ coordinatorName: e.target.value })}
                    placeholder="e.g. Alh. Ibrahim Mustapha"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm text-slate-900 bg-white placeholder-slate-400 focus:ring-2 focus:ring-brand-500 ${
                      validationErrors.coordinatorName ? 'border-red-400 bg-red-50/20' : 'border-slate-300'
                    }`}
                  />
                  {validationErrors.coordinatorName && (
                    <p className="text-[11px] text-red-600 font-semibold mt-1">{validationErrors.coordinatorName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Coordinator Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.coordinatorPhone}
                    onChange={(e) => updateFormData({ coordinatorPhone: e.target.value })}
                    placeholder="e.g. 08012345678"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm text-slate-900 bg-white placeholder-slate-400 focus:ring-2 focus:ring-brand-500 ${
                      validationErrors.coordinatorPhone ? 'border-red-400 bg-red-50/20' : 'border-slate-300'
                    }`}
                  />
                  {validationErrors.coordinatorPhone && (
                    <p className="text-[11px] text-red-600 font-semibold mt-1">{validationErrors.coordinatorPhone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Secretary Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.secretaryName}
                    onChange={(e) => updateFormData({ secretaryName: e.target.value })}
                    placeholder="e.g. Comr. Aminat Babatunde"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm text-slate-900 bg-white placeholder-slate-400 focus:ring-2 focus:ring-brand-500 ${
                      validationErrors.secretaryName ? 'border-red-400 bg-red-50/20' : 'border-slate-300'
                    }`}
                  />
                  {validationErrors.secretaryName && (
                    <p className="text-[11px] text-red-600 font-semibold mt-1">{validationErrors.secretaryName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Secretary Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.secretaryPhone}
                    onChange={(e) => updateFormData({ secretaryPhone: e.target.value })}
                    placeholder="e.g. 07098765432"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm text-slate-900 bg-white placeholder-slate-400 focus:ring-2 focus:ring-brand-500 ${
                      validationErrors.secretaryPhone ? 'border-red-400 bg-red-50/20' : 'border-slate-300'
                    }`}
                  />
                  {validationErrors.secretaryPhone && (
                    <p className="text-[11px] text-red-600 font-semibold mt-1">{validationErrors.secretaryPhone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Official Forum Email (Optional)
                  </label>
                  <input
                    type="email"
                    value={formData.forumEmail}
                    onChange={(e) => updateFormData({ forumEmail: e.target.value })}
                    placeholder="e.g. info@forumname.org"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 bg-white placeholder-slate-400 focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Social Media Handles / Links (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.socialMediaHandles}
                    onChange={(e) => updateFormData({ socialMediaHandles: e.target.value })}
                    placeholder="e.g. @KwaraYouthAPC (X/Facebook)"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 bg-white placeholder-slate-400 focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>
            </div>

            {/* Step 1 Actions */}
            <div className="pt-6 border-t border-slate-100 flex items-center justify-end">
              <button
                type="button"
                onClick={handleProceedToStep2}
                className="px-6 py-3 bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white font-extrabold rounded-2xl text-xs sm:text-sm shadow-md transition flex items-center gap-2"
              >
                Proceed to Section 2 <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= STEP 2: CAPACITY & COMMITMENTS ================= */}
      {currentStep === 2 && (
        <form onSubmit={handleFinalSubmit} className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-8 animate-in fade-in duration-200">
          <div className="border-b border-slate-100 pb-5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Final Step
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Section 2: Mobilization Strength, Track Record & Commitments
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Declare your grassroots numerical strength, previous election activities, and affirmative commitments to the APC victory.
            </p>
          </div>

          <div className="space-y-8">
            {/* Part A: Structure & Capacity */}
            <div className="space-y-5">
              <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
                <Layers className="w-5 h-5 text-brand-600" />
                <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
                  Part 1: Structure & Mobilization Strength
                </h2>
              </div>

              {/* Member Strength Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-2">
                  Declared Estimated Member Strength <span className="text-red-500">*</span>
                </label>

                {/* Direct Interactive Clickable Option Pills */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mb-3">
                  {MEMBER_STRENGTH_OPTIONS.map((opt) => {
                    const isSelected = formData.strengthRange === opt.rangeStr;
                    return (
                      <button
                        key={opt.rangeStr}
                        type="button"
                        onClick={() => {
                          updateFormData({
                            strengthRange: opt.rangeStr,
                            totalStrength: opt.value,
                          });
                        }}
                        className={`p-3 rounded-2xl border text-center transition cursor-pointer flex flex-col items-center justify-center gap-1 ${
                          isSelected
                            ? 'bg-brand-600 text-white border-brand-600 shadow-md ring-2 ring-brand-200'
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                      >
                        <span className="font-extrabold text-xs sm:text-sm leading-tight">{opt.rangeStr}</span>
                        <span className={`text-[10px] ${isSelected ? 'text-brand-100 font-semibold' : 'text-slate-400'}`}>
                          Members
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Accessible Styled Native Select Dropdown */}
                <div className="relative pt-1">
                  <select
                    id="member-strength-select"
                    aria-label="Declared Estimated Member Strength"
                    value={formData.strengthRange}
                    onChange={(e) => {
                      const val = e.target.value;
                      const selected = MEMBER_STRENGTH_OPTIONS.find(opt => opt.rangeStr === val);
                      updateFormData({
                        strengthRange: val,
                        totalStrength: selected ? selected.value : 150,
                      });
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 bg-white focus:ring-2 focus:ring-brand-500 appearance-none cursor-pointer pr-10 shadow-xs"
                  >
                    {MEMBER_STRENGTH_OPTIONS.map((opt) => (
                      <option key={opt.rangeStr} value={opt.rangeStr}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 bottom-3 pointer-events-none" />
                </div>
                {validationErrors.totalStrength && (
                  <p className="text-[11px] text-red-600 font-semibold mt-1">{validationErrors.totalStrength}</p>
                )}
              </div>

              {/* Key Activities */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-2">
                  Key Mobilization Activities Undertaken <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {KEY_ACTIVITIES.map((act) => {
                    const isChecked = formData.keyActivities.includes(act);
                    return (
                      <button
                        key={act}
                        type="button"
                        onClick={() => handleActivityToggle(act)}
                        className={`p-3 rounded-xl border text-xs font-semibold text-left transition flex items-center justify-between cursor-pointer ${
                          isChecked
                            ? 'bg-brand-50/80 border-brand-500 text-brand-900 font-bold'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <span>{act}</span>
                        <div
                          className={`w-4 h-4 rounded flex items-center justify-center border transition ${
                            isChecked ? 'bg-brand-600 border-brand-600 text-white' : 'border-slate-300 bg-white'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Additional Mobilization Capacity & Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  value={formData.additionalCapacityInfo}
                  onChange={(e) => updateFormData({ additionalCapacityInfo: e.target.value })}
                  placeholder="Describe your executive structure, active polling unit coordinators, or mobilization reach..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 bg-white placeholder-slate-400 focus:ring-2 focus:ring-brand-500"
                ></textarea>
              </div>
            </div>

            {/* Part B: Political Track Record */}
            <div className="space-y-5">
              <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
                <Vote className="w-5 h-5 text-brand-600" />
                <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
                  Part 2: Political Track Record & Alignment
                </h2>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-2">
                  Previous General Election Mobilization Activity <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {(['Both 2019 and 2023', '2023', '2019', 'This is our first time'] as const).map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => updateFormData({ previousElectionActivity: opt })}
                      className={`p-3 rounded-xl border text-xs font-bold transition text-center cursor-pointer ${
                        formData.previousElectionActivity === opt
                          ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Specific Role Played in Last General Election (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.rolePlayedLastElection}
                    onChange={(e) => updateFormData({ rolePlayedLastElection: e.target.value })}
                    placeholder="e.g. Grassroots door-to-door, Polling unit agents, Media campaigns"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 bg-white placeholder-slate-400 focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Leader / Sponsor Alignment (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.leaderSponsorAlignment}
                    onChange={(e) => updateFormData({ leaderSponsorAlignment: e.target.value })}
                    placeholder="e.g. Party stakeholders, patron, political patron"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 bg-white placeholder-slate-400 focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>
            </div>

            {/* Part C: Declarations & Affirmations */}
            <div className="space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
              <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                <ShieldCheck className="w-5 h-5 text-brand-600" />
                <h3 className="text-sm font-extrabold text-slate-900">
                  Directorate Affirmations & Declarations
                </h3>
              </div>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.commitWork2027}
                  onChange={(e) => updateFormData({ commitWork2027: e.target.checked })}
                  className="w-4 h-4 mt-0.5 rounded text-brand-600 focus:ring-brand-500 border-slate-300 cursor-pointer"
                />
                <span className="text-xs text-slate-700 leading-relaxed font-medium">
                  We solemnly pledge and commit to mobilize tirelessly and work for the absolute victory of all All Progressives Congress (APC) candidates in the 2027 general elections. <span className="text-red-500">*</span>
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.agreeWithCongress}
                  onChange={(e) => updateFormData({ agreeWithCongress: e.target.checked })}
                  className="w-4 h-4 mt-0.5 rounded text-brand-600 focus:ring-brand-500 border-slate-300 cursor-pointer"
                />
                <span className="text-xs text-slate-700 leading-relaxed font-medium">
                  We agree to align with the guidelines, leadership, directives, and harmonized structure of the APC Stakeholders Congress, Kwara State Chapter. <span className="text-red-500">*</span>
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.declarationConfirmed}
                  onChange={(e) => updateFormData({ declarationConfirmed: e.target.checked })}
                  className="w-4 h-4 mt-0.5 rounded text-brand-600 focus:ring-brand-500 border-slate-300 cursor-pointer"
                />
                <span className="text-xs text-slate-700 leading-relaxed font-medium">
                  I hereby declare that the executive details and declared member strength provided in this registration are truthful and verifiable. <span className="text-red-500">*</span>
                </span>
              </label>
            </div>

            {/* Part D: Support Needed */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-800">
                Support / Collaboration Needed from the Congress (Mark All Applicable)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {SUPPORT_TYPES.map((sup) => {
                  const isSelected = formData.supportNeeded.includes(sup);
                  return (
                    <button
                      key={sup}
                      type="button"
                      onClick={() => handleSupportToggle(sup)}
                      className={`p-2.5 rounded-xl border text-xs text-left transition flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'bg-brand-50 border-brand-500 text-brand-900 font-bold'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span className="truncate">{sup}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-brand-600 flex-shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2 Actions */}
            <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs sm:text-sm transition flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Section 1
              </button>

              <button
                type="submit"
                disabled={submitting}
                className="px-8 py-3 bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white font-black rounded-2xl text-xs sm:text-sm shadow-xl transition flex items-center gap-2 disabled:opacity-50"
              >
                {submitting ? 'Processing & Generating Letter...' : 'Submit Registration'}
                <CheckCircle2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </form>
      )}

      {/* ================= STEP 3: SUCCESS & ACCREDITATION ================= */}
      {currentStep === 3 && submitResult && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-2xl space-y-8 text-center animate-in zoom-in-95 duration-300">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <ShieldCheck className="w-12 h-12" />
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-extrabold">
              <Sparkles className="w-3.5 h-3.5" /> Registration Approved & Accredited
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Congratulations! Registration Completed
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
              Your forum has been formally approved and admitted as an accredited affiliate of the APC Stakeholders Congress, Kwara State Chapter.
            </p>
          </div>

          {/* Reference Card */}
          <div className="bg-slate-50 p-5 sm:p-6 rounded-2xl border border-slate-200 max-w-md mx-auto space-y-3 text-left">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Official Registration Reference Number
              </span>
              <span className="text-lg sm:text-xl font-mono font-black text-brand-700 block">
                {submitResult.registrationRef}
              </span>
            </div>
            <div className="border-t border-slate-200 pt-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Registered Organization
              </span>
              <span className="text-sm font-bold text-slate-800 block">
                {formData.name}
              </span>
            </div>
          </div>

          {/* Download & WhatsApp Actions */}
          <div className="space-y-4 max-w-md mx-auto">
            {submitResult.letterDocId && (
              <a
                href={`/api/documents/${submitResult.letterDocId}/download`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white font-black rounded-2xl text-sm shadow-lg transition flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download Official Letter of Recognition (PDF)
              </a>
            )}

            {/* Official WhatsApp Group for Verified Coordinators */}
            <a
              href={whatsappGroupLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-extrabold rounded-2xl text-sm shadow-md transition flex items-center justify-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              Join State Coordinators WhatsApp Group
            </a>
          </div>

          <div className="pt-4 border-t border-slate-100 text-xs text-slate-500 max-w-md mx-auto">
            <p>
              An official confirmation email containing your Registration Reference ID and Letter of Recognition PDF has been dispatched to your email.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
