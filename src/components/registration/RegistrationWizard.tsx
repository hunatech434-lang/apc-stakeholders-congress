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
  CheckCircle2, 
  ArrowLeft, 
  ArrowRight, 
  AlertCircle, 
  MessageCircle,
  ExternalLink,
  ChevronDown,
  FileDown,
  FileText,
  Check
} from 'lucide-react';
import { submitForumRegistration, RegistrationResult } from '@/app/actions/registerForum';

// The 16 Local Government Areas of Kwara State grouped by Senatorial District
const KWARA_LGAS = [
  // Kwara Central
  { id: 1, name: 'Asa', district: 'Kwara Central' },
  { id: 2, name: 'Ilorin East', district: 'Kwara Central' },
  { id: 3, name: 'Ilorin South', district: 'Kwara Central' },
  { id: 4, name: 'Ilorin West', district: 'Kwara Central' },

  // Kwara North
  { id: 5, name: 'Baruten', district: 'Kwara North' },
  { id: 6, name: 'Edu', district: 'Kwara North' },
  { id: 7, name: 'Kaiama', district: 'Kwara North' },
  { id: 8, name: 'Moro', district: 'Kwara North' },
  { id: 9, name: 'Pategi', district: 'Kwara North' },

  // Kwara South
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
  // Step 1: Section 1 (Identity, Geography & Leadership)
  // Step 2: Section 2 (Capacity, Political Track Record & Commitments)
  // Step 3: Success Screen (Accreditation & Letter of Recognition)
  const [currentStep, setCurrentStep] = useState(1);
  const [lgas, setLgas] = useState(KWARA_LGAS);
  const [submitting, setSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<RegistrationResult | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    // Section 1: Forum Details & Geography
    name: '',
    motto: '',
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
    hasWhatsappGroup: true,
    whatsappGroupLink: '',
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

    // Section 2: Optional Documents
    coordinatorPassportUrl: '',
    resolutionLetterUrl: '',
    supportingDocumentUrl: '',
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
      } catch (err) {
        // Fallback KWARA_LGAS already loaded
      }
    }
    loadLgas();
  }, []);

  // 2. Draft Auto-Save to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('apc_forum_reg_draft_v4');
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
        localStorage.setItem('apc_forum_reg_draft_v4', JSON.stringify(updated));
      }
      return updated;
    });

    // Clear matching validation errors when typing
    const updatedKeys = Object.keys(fields);
    setValidationErrors((prev) => {
      const next = { ...prev };
      updatedKeys.forEach((k) => delete next[k]);
      return next;
    });
  };

  // Toggle LGA Checkbox
  const handleLgaToggle = (lgaId: number) => {
    let current = [...formData.selectedLgaIds];
    if (current.includes(lgaId)) {
      current = current.filter((id) => id !== lgaId);
    } else {
      current.push(lgaId);
    }

    if (current.length === 0 && lgas.length > 0) {
      current = [lgas[0].id];
    }

    updateFormData({
      selectedLgaIds: current,
      lgaId: current[0] || 1,
      isAllLgas: current.length === lgas.length && lgas.length > 0,
    });
  };

  // Select All 16 LGAs Toggle
  const handleAllLgasToggle = (checked: boolean) => {
    if (checked) {
      const allIds = lgas.map((l) => l.id);
      updateFormData({
        selectedLgaIds: allIds,
        lgaId: allIds[0] || 1,
        isAllLgas: true,
      });
    } else {
      const firstId = lgas[0]?.id || 1;
      updateFormData({
        selectedLgaIds: [firstId],
        lgaId: firstId,
        isAllLgas: false,
      });
    }
  };

  const handleActivityToggle = (act: string) => {
    let current = [...formData.keyActivities];
    if (current.includes(act)) {
      current = current.filter((a) => a !== act);
    } else {
      current.push(act);
    }
    updateFormData({ keyActivities: current });
  };

  const handleSupportToggle = (sup: string) => {
    let current = [...formData.supportNeeded];
    if (current.includes(sup)) {
      current = current.filter((s) => s !== sup);
    } else {
      current.push(sup);
    }
    updateFormData({ supportNeeded: current });
  };

  // Section 1 Validation
  const validateSection1 = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errors.name = 'Forum name must be at least 2 characters.';
    }
    if (!formData.yearEstablished || formData.yearEstablished < 1960 || formData.yearEstablished > 2026) {
      errors.yearEstablished = 'Please enter a valid founding year (1960 - 2026).';
    }
    if (formData.selectedLgaIds.length === 0) {
      errors.lgaId = 'Please select at least one LGA of operation.';
    }
    if (!formData.officeAddress.trim() || formData.officeAddress.trim().length < 3) {
      errors.officeAddress = 'Please enter an office or secretariat address.';
    }
    if (!formData.coordinatorName.trim()) {
      errors.coordinatorName = 'Coordinator full name is required.';
    }
    if (!formData.coordinatorPhone.trim()) {
      errors.coordinatorPhone = 'Coordinator phone number is required.';
    }
    if (!formData.secretaryName.trim()) {
      errors.secretaryName = 'Secretary full name is required.';
    }
    if (!formData.secretaryPhone.trim()) {
      errors.secretaryPhone = 'Secretary phone number is required.';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Section 2 Validation
  const validateSection2 = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.totalStrength || formData.totalStrength < 1) {
      errors.totalStrength = 'Please select estimated member strength.';
    }
    if (formData.keyActivities.length === 0) {
      errors.keyActivities = 'Please select at least one key mobilization activity.';
    }
    if (!formData.commitWork2027) {
      errors.commitWork2027 = 'You must commit to mobilizing for APC in 2027.';
    }
    if (!formData.agreeWithCongress) {
      errors.agreeWithCongress = 'You must agree to align with APC Stakeholders Congress principles.';
    }
    if (!formData.declarationConfirmed) {
      errors.declarationConfirmed = 'You must confirm the truthfulness of the provided information.';
    }
    if (!formData.consentDataProcessing) {
      errors.consentDataProcessing = 'Consent to data processing is required.';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextSection = () => {
    if (validateSection1()) {
      setCurrentStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 150, behavior: 'smooth' });
    }
  };

  const handlePrevSection = () => {
    setCurrentStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Final Form Submission
  const handleSubmit = async () => {
    if (!validateSection2()) {
      window.scrollTo({ top: 250, behavior: 'smooth' });
      return;
    }

    setSubmitting(true);
    setSubmitResult(null);

    try {
      const res = await submitForumRegistration({
        ...formData,
        totalStrength: Number(formData.totalStrength),
        yearEstablished: Number(formData.yearEstablished),
        lgaId: Number(formData.lgaId || 1),
        wardId: formData.wardId ? Number(formData.wardId) : null,
        selectedLgaIds: formData.selectedLgaIds.map((id) => Number(id)),
        areaOfCoverage: formData.areaOfCoverage,
        wardName: formData.isAllWards ? 'All Wards' : formData.wardName,
      });

      setSubmitting(false);
      setSubmitResult(res);

      if (res.success) {
        localStorage.removeItem('apc_forum_reg_draft_v4');
        setCurrentStep(3); // Show Success Screen
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (res.fieldErrors) {
        const mapped: Record<string, string> = {};
        Object.entries(res.fieldErrors).forEach(([k, v]) => {
          mapped[k] = v[0];
        });
        setValidationErrors(mapped);
        window.scrollTo({ top: 150, behavior: 'smooth' });
      }
    } catch (err) {
      setSubmitting(false);
      setSubmitResult({
        success: false,
        error: 'Network connection or server timeout. Please try again.',
      });
    }
  };

  const officialWhatsAppLink = 'https://chat.whatsapp.com/JykufBzH7AS3wTLIk8XQ8f?s=cl&p=a&mlu=4';

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Top Accent Strip */}
      <div className="h-1.5 w-full flex">
        <div className="h-full bg-brand-600 flex-1"></div>
        <div className="h-full bg-sky-400 w-24"></div>
        <div className="h-full bg-apcRed-500 w-24"></div>
      </div>

      {/* Header & Section Progress Indicator */}
      <div className="p-5 sm:p-7 bg-slate-50 border-b border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-700">
              Official Digital Accreditation Portal • Kwara State Chapter
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-0.5">
              APC Stakeholders & Support Group Registration
            </h1>
          </div>
          {currentStep < 3 && (
            <div className="text-xs font-bold px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-brand-800 shadow-sm w-fit">
              Section {currentStep} of 2
            </div>
          )}
        </div>

        {/* 2-Section Step Progress Bar */}
        {currentStep < 3 && (
          <div className="grid grid-cols-2 gap-3 max-w-xl">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className={`p-3 rounded-2xl border text-left transition flex items-center gap-3 ${
                currentStep === 1
                  ? 'bg-white border-brand-500 shadow-sm ring-2 ring-brand-500/20'
                  : 'bg-white/60 border-slate-200 hover:bg-white'
              }`}
            >
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${
                currentStep === 1 ? 'bg-brand-600 text-white' : 'bg-emerald-100 text-emerald-700'
              }`}>
                {currentStep > 1 ? <Check className="w-4 h-4" /> : '1'}
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-slate-900 truncate">Section 1</div>
                <div className="text-[11px] text-slate-500 truncate">Identity & Leadership</div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => {
                if (validateSection1()) setCurrentStep(2);
              }}
              className={`p-3 rounded-2xl border text-left transition flex items-center gap-3 ${
                currentStep === 2
                  ? 'bg-white border-brand-500 shadow-sm ring-2 ring-brand-500/20'
                  : 'bg-white/60 border-slate-200 hover:bg-white'
              }`}
            >
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${
                currentStep === 2 ? 'bg-brand-600 text-white' : 'bg-slate-200 text-slate-600'
              }`}>
                2
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-slate-900 truncate">Section 2</div>
                <div className="text-[11px] text-slate-500 truncate">Capacity & Declarations</div>
              </div>
            </button>
          </div>
        )}
      </div>

      {/* Global Error Banner */}
      {submitResult && !submitResult.success && (
        <div className="m-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-600 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold">Submission Error:</span>
            <p>{submitResult.error}</p>
          </div>
        </div>
      )}

      {/* FORM BODY */}
      <div className="p-6 sm:p-8 lg:p-10">
        
        {/* ================= SECTION 1: IDENTITY, GEOGRAPHY & LEADERSHIP ================= */}
        {currentStep === 1 && (
          <div className="space-y-10 max-w-4xl">
            
            {/* Part A: Forum Identity */}
            <div className="space-y-5">
              <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-brand-600" />
                <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
                  Part 1: Forum Identification & Basic Info
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Official Name of Forum / Support Group <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => updateFormData({ name: e.target.value })}
                    placeholder="e.g. Kwara APC Youth Vanguard for 2027"
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

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Motto / Slogan (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.motto}
                    onChange={(e) => updateFormData({ motto: e.target.value })}
                    placeholder="e.g. Unity, Grassroots Loyalty & Victory"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 bg-white placeholder-slate-400 focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    Primary Area of Coverage <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {COVERAGE_OPTIONS.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => updateFormData({ areaOfCoverage: opt })}
                        className={`py-2 px-3 rounded-xl border text-xs font-bold transition text-center ${
                          formData.areaOfCoverage === opt
                            ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
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
                    onChange={(e) => handleAllLgasToggle(e.target.checked)}
                    className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500 border-slate-300"
                  />
                  <span>Select All 16 LGAs</span>
                </label>
              </div>

              {/* Primary LGA Dropdown */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Primary Local Government Area (LGA) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={formData.lgaId}
                    onChange={(e) => {
                      const id = parseInt(e.target.value, 10);
                      updateFormData({
                        lgaId: id,
                        selectedLgaIds: formData.selectedLgaIds.includes(id)
                          ? formData.selectedLgaIds
                          : [...formData.selectedLgaIds, id],
                      });
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 bg-white focus:ring-2 focus:ring-brand-500 appearance-none cursor-pointer pr-10"
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold text-slate-800">
                      Ward / Polling Unit Focus
                    </label>
                    <label className="flex items-center gap-1.5 text-xs text-slate-600 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.isAllWards}
                        onChange={(e) => updateFormData({ isAllWards: e.target.checked })}
                        className="w-3.5 h-3.5 rounded text-brand-600 focus:ring-brand-500 border-slate-300"
                      />
                      <span>All Wards in LGA(s)</span>
                    </label>
                  </div>
                  <input
                    type="text"
                    disabled={formData.isAllWards}
                    value={formData.isAllWards ? 'All Wards Covered' : formData.wardName}
                    onChange={(e) => updateFormData({ wardName: e.target.value })}
                    placeholder="e.g. Akanbi Ward II / Balogun Fulani"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 bg-white disabled:bg-slate-100 disabled:text-slate-500 focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Office / Secretariat Street Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.officeAddress}
                    onChange={(e) => updateFormData({ officeAddress: e.target.value })}
                    placeholder="e.g. Suite 4, Harmony Plaza, Fate Road, Ilorin"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm text-slate-900 bg-white placeholder-slate-400 focus:ring-2 focus:ring-brand-500 ${
                      validationErrors.officeAddress ? 'border-red-400 bg-red-50/20' : 'border-slate-300'
                    }`}
                  />
                  {validationErrors.officeAddress && (
                    <p className="text-[11px] text-red-600 font-semibold mt-1">{validationErrors.officeAddress}</p>
                  )}
                </div>
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
                    placeholder="e.g. 08032010479"
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
                    placeholder="e.g. Hajia Fatima Bello"
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
                    placeholder="e.g. 07030592380"
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
                    placeholder="e.g. youthvanguard@gmail.com"
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
                    placeholder="e.g. Facebook: KwaraYouthVanguard | X: @KwaraAPC_Youth"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 bg-white placeholder-slate-400 focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>
            </div>

            {/* Bottom Button */}
            <div className="pt-6 border-t border-slate-200 flex items-center justify-end">
              <button
                type="button"
                onClick={handleNextSection}
                className="px-8 py-3.5 bg-brand-600 hover:bg-brand-500 text-white font-extrabold text-xs sm:text-sm rounded-xl transition flex items-center gap-2 shadow cursor-pointer"
              >
                <span>Continue to Section 2: Capacity & Declarations</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ================= SECTION 2: CAPACITY, TRACK RECORD & DECLARATIONS ================= */}
        {currentStep === 2 && (
          <div className="space-y-10 max-w-4xl">
            
            {/* Part D: Capacity & Key Activities */}
            <div className="space-y-5">
              <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
                <Layers className="w-5 h-5 text-brand-600" />
                <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
                  Part 4: Mobilization Capacity & Activities
                </h2>
              </div>

              <div className="space-y-5">
                {/* Declared Member Strength Selector (Dual Dropdown + Interactive Option Pills) */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <label className="block text-xs font-bold text-slate-900">
                      Declared Estimated Member Strength <span className="text-red-500">*</span>
                    </label>
                    <span className="text-[11px] text-brand-700 font-semibold">
                      Selected: <strong>{formData.strengthRange || '100 - 200'}</strong> ({formData.totalStrength} est. count)
                    </span>
                  </div>

                  {/* 1. Direct Clickable Option Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
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
                          className={`p-3 rounded-xl border text-xs font-bold transition text-center flex flex-col items-center justify-center gap-1 cursor-pointer ${
                            isSelected
                              ? 'bg-brand-600 text-white border-brand-600 shadow-md ring-2 ring-brand-500/20'
                              : 'bg-white text-slate-800 border-slate-300 hover:bg-slate-100 hover:border-slate-400'
                          }`}
                        >
                          <span className="text-sm font-extrabold">{opt.rangeStr}</span>
                          <span className="text-[10px] font-medium opacity-85">Members</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* 2. Accessible Native Dropdown Selector */}
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">
                      Internal WhatsApp Group Available?
                    </label>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => updateFormData({ hasWhatsappGroup: true })}
                        className={`flex-1 py-2 px-3 rounded-xl border text-xs font-bold transition cursor-pointer ${
                          formData.hasWhatsappGroup
                            ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
                            : 'bg-slate-50 text-slate-700 border-slate-200'
                        }`}
                      >
                        Yes, We Have a Group
                      </button>
                      <button
                        type="button"
                        onClick={() => updateFormData({ hasWhatsappGroup: false })}
                        className={`flex-1 py-2 px-3 rounded-xl border text-xs font-bold transition cursor-pointer ${
                          !formData.hasWhatsappGroup
                            ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
                            : 'bg-slate-50 text-slate-700 border-slate-200'
                        }`}
                      >
                        No
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">
                      Group WhatsApp Link (Optional)
                    </label>
                    <input
                      type="url"
                      value={formData.whatsappGroupLink || ''}
                      onChange={(e) => updateFormData({ whatsappGroupLink: e.target.value })}
                      placeholder="https://chat.whatsapp.com/..."
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 bg-white placeholder-slate-400 focus:ring-2 focus:ring-brand-500"
                    />
                  </div>
                </div>

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
                              ? 'bg-brand-50 border-brand-500 text-brand-900 font-bold'
                              : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          <span>{act}</span>
                          {isChecked && <Check className="w-4 h-4 text-brand-600 flex-shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                  {validationErrors.keyActivities && (
                    <p className="text-[11px] text-red-600 font-semibold mt-1">{validationErrors.keyActivities}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Part E: Political Track Record */}
            <div className="space-y-5">
              <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
                <Vote className="w-5 h-5 text-brand-600" />
                <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
                  Part 5: Political Track Record & Alignment
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    Previous General Election Mobilization Activity <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {(['Both 2019 and 2023', '2023', '2019', 'This is our first time'] as const).map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => updateFormData({ previousElectionActivity: opt })}
                        className={`p-2.5 rounded-xl border text-xs font-bold transition text-center cursor-pointer ${
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

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Specific Mobilization Role / Impact in Last Election (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.rolePlayedLastElection}
                    onChange={(e) => updateFormData({ rolePlayedLastElection: e.target.value })}
                    placeholder="e.g. Canvassed 32 polling units in Kwara South, provided voting day transport"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 bg-white placeholder-slate-400 focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Patron / Sponsor / Political Alignment (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.leaderSponsorAlignment}
                    onChange={(e) => updateFormData({ leaderSponsorAlignment: e.target.value })}
                    placeholder="e.g. Mentored by Party Elders in Ilorin West"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 bg-white placeholder-slate-400 focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>
            </div>

            {/* Part F: Support Needed & Meeting Attendance */}
            <div className="space-y-5">
              <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-brand-600" />
                <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
                  Part 6: Support Needed & Directorate Meetings
                </h2>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-2">
                  Institutional Support Desired from the State Directorate
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {SUPPORT_TYPES.map((sup) => {
                    const isChecked = formData.supportNeeded.includes(sup);
                    return (
                      <button
                        key={sup}
                        type="button"
                        onClick={() => handleSupportToggle(sup)}
                        className={`p-3 rounded-xl border text-xs font-semibold text-left transition flex items-center justify-between cursor-pointer ${
                          isChecked
                            ? 'bg-sky-50 border-sky-500 text-sky-900 font-bold'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <span>{sup}</span>
                        {isChecked && <Check className="w-4 h-4 text-sky-600 flex-shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Willingness to attend physical coordination meetings at the State Secretariat in Ilorin? <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  {(['Yes', 'No', 'Maybe'] as const).map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => updateFormData({ willingAttendMeetings: opt })}
                      className={`flex-1 py-2 px-3 rounded-xl border text-xs font-bold transition cursor-pointer ${
                        formData.willingAttendMeetings === opt
                          ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
                          : 'bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Part G: Declarations & 2027 Commitment */}
            <div className="space-y-5 bg-brand-50/50 p-6 sm:p-7 rounded-3xl border border-brand-200">
              <div className="border-b border-brand-200/60 pb-3 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-brand-700" />
                <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
                  Part 7: Declarations, Party Supremacy & 2027 Commitment
                </h2>
              </div>

              <div className="space-y-3.5">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.commitWork2027}
                    onChange={(e) => updateFormData({ commitWork2027: e.target.checked })}
                    className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500 border-slate-300 mt-0.5"
                  />
                  <span className="text-xs sm:text-sm text-slate-800 font-medium">
                    We solemnly commit our grassroots network and resources to actively mobilize voters for total victory of the <strong>All Progressives Congress (APC) in the 2027 General Elections</strong>.
                  </span>
                </label>
                {validationErrors.commitWork2027 && (
                  <p className="text-[11px] text-red-600 font-semibold">{validationErrors.commitWork2027}</p>
                )}

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.agreeWithCongress}
                    onChange={(e) => updateFormData({ agreeWithCongress: e.target.checked })}
                    className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500 border-slate-300 mt-0.5"
                  />
                  <span className="text-xs sm:text-sm text-slate-800 font-medium">
                    We agree to uphold party supremacy and align with the guidelines, structure, and strategic coordination of the <strong>APC Stakeholders Congress (Kwara State Chapter)</strong>.
                  </span>
                </label>
                {validationErrors.agreeWithCongress && (
                  <p className="text-[11px] text-red-600 font-semibold">{validationErrors.agreeWithCongress}</p>
                )}

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.declarationConfirmed}
                    onChange={(e) => updateFormData({ declarationConfirmed: e.target.checked })}
                    className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500 border-slate-300 mt-0.5"
                  />
                  <span className="text-xs sm:text-sm text-slate-800 font-medium">
                    I declare that all information submitted in this application is accurate and represents the authentic authority of our executive council.
                  </span>
                </label>
                {validationErrors.declarationConfirmed && (
                  <p className="text-[11px] text-red-600 font-semibold">{validationErrors.declarationConfirmed}</p>
                )}

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.consentDataProcessing}
                    onChange={(e) => updateFormData({ consentDataProcessing: e.target.checked })}
                    className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500 border-slate-300 mt-0.5"
                  />
                  <span className="text-xs sm:text-sm text-slate-800 font-medium">
                    I consent to the storage and verification of our leadership details on the official APC State Directorate registry.
                  </span>
                </label>
                {validationErrors.consentDataProcessing && (
                  <p className="text-[11px] text-red-600 font-semibold">{validationErrors.consentDataProcessing}</p>
                )}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="button"
                onClick={handlePrevSection}
                className="w-full sm:w-auto px-6 py-3 border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs sm:text-sm rounded-xl transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Section 1</span>
              </button>

              <button
                type="button"
                disabled={submitting}
                onClick={handleSubmit}
                className="w-full sm:w-auto px-9 py-3.5 bg-brand-600 hover:bg-brand-500 active:bg-brand-700 disabled:bg-slate-400 text-white font-extrabold text-xs sm:text-sm rounded-xl transition flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              >
                {submitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>Submitting & Generating Official Letter...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-5 h-5" />
                    <span>Submit Registration</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 3: SUCCESS & DOCUMENT ISSUANCE ================= */}
        {currentStep === 3 && submitResult?.success && (
          <div className="max-w-2xl mx-auto py-8 text-center space-y-8">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5" /> Registration Approved & Accredited
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Registration Successful!
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
                Your forum <strong>{formData.name}</strong> has been officially accredited and integrated into the Kwara State APC Stakeholders registry.
              </p>
            </div>

            {/* Official Ref Box */}
            <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-1">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Official Registration Reference
              </div>
              <div className="text-2xl sm:text-3xl font-mono font-extrabold text-brand-700">
                {submitResult.registrationRef}
              </div>
              <div className="text-[11px] text-slate-500 pt-1">
                Save this reference code to view your status or re-download your official letter anytime.
              </div>
            </div>

            {/* Document Download: Official Letter of Recognition */}
            <div className="bg-white p-6 rounded-2xl border-2 border-brand-500/30 shadow-sm space-y-4">
              <div className="text-left space-y-1">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-brand-600" />
                  Official Letter of Recognition / Acceptance
                </h3>
                <p className="text-xs text-slate-500">
                  Your formal letter from the State Directorate is ready for instant download.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                {submitResult.letterDocId ? (
                  <a
                    href={`/api/documents/${submitResult.letterDocId}/download`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 px-4 bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-2 shadow"
                  >
                    <FileDown className="w-4 h-4" />
                    <span>Download Letter of Recognition (PDF)</span>
                  </a>
                ) : (
                  <div className="text-xs text-slate-500 py-2">Document generation in progress...</div>
                )}
              </div>
            </div>

            {/* Exclusive Coordinator WhatsApp Community */}
            <div className="bg-emerald-50/80 border border-emerald-200 p-6 rounded-2xl space-y-3.5 text-left">
              <div className="flex items-center gap-2.5 text-emerald-900 font-bold text-sm">
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <span>Exclusive Coordinator WhatsApp Group</span>
              </div>
              <p className="text-xs text-emerald-800 leading-relaxed">
                Connect directly with senatorial coordinators, party leaders, and fellow forum heads across all 16 LGAs of Kwara State.
              </p>
              <a
                href={officialWhatsAppLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition shadow"
              >
                <span>Join Official WhatsApp Community</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="pt-2 flex justify-center gap-4 text-xs">
              <Link href={`/status?ref=${submitResult.registrationRef}`} className="font-bold text-brand-700 hover:underline">
                View Status on Portal
              </Link>
              <span className="text-slate-300">•</span>
              <Link href="/" className="font-medium text-slate-600 hover:underline">
                Return to Home
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
