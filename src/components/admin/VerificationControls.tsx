'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateForumStatus } from '@/app/actions/adminActions';
import { 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Send,
  FileDown,
  RefreshCw,
  Lock
} from 'lucide-react';

interface VerificationControlsProps {
  forumId: string;
  currentStatus: string;
  currentNotes?: string | null;
  generatedDocs?: Array<{
    id: string;
    docType: string;
    filePath: string;
    verificationToken: string;
  }>;
}

export default function VerificationControls({
  forumId,
  currentStatus,
  currentNotes,
  generatedDocs = [],
}: VerificationControlsProps) {
  const router = useRouter();
  const [status, setStatus] = useState(currentStatus);
  const [notes, setNotes] = useState(currentNotes || '');
  const [queryMessage, setQueryMessage] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleStatusUpdate = async (newAction: any) => {
    setLoading(true);
    setMessage(null);

    const res = await updateForumStatus(
      forumId,
      newAction,
      notes,
      queryMessage,
      rejectionReason
    );

    setLoading(false);

    if (res.success) {
      setStatus(newAction);
      setMessage({ type: 'success', text: `Status successfully updated to ${newAction.replace('_', ' ').toUpperCase()}.` });
      router.refresh();
    } else {
      setMessage({ type: 'error', text: res.error || 'Failed to update status' });
    }
  };

  const letterDoc = generatedDocs.find((d) => d.docType === 'letter_of_recognition');

  return (
    <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-brand-400" />
          Verification & Sign-off Directorate
        </h3>
        <span className="text-xs text-slate-400">
          Current Status: <strong className="text-white uppercase">{status.replace('_', ' ')}</strong>
        </span>
      </div>

      {message && (
        <div
          className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
            message.type === 'success'
              ? 'bg-emerald-950/80 border border-emerald-800 text-emerald-200'
              : 'bg-red-950/80 border border-red-800 text-red-200'
          }`}
        >
          {message.type === 'success' ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <AlertCircle className="w-4 h-4 text-red-400" />}
          <span>{message.text}</span>
        </div>
      )}

      {/* Internal Confidential Notes */}
      <div>
        <label className="block text-xs font-bold text-slate-300 mb-1">
          Internal Reviewer Notes (Confidential)
        </label>
        <textarea
          rows={2}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add internal notes on committee verification, background checks, or observations..."
          className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:ring-2 focus:ring-brand-500"
        ></textarea>
      </div>

      {/* Conditional Query Message box if more info needed */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-amber-400">
          Registrant Query Message (Visible to Applicant on Status Page)
        </label>
        <textarea
          rows={2}
          value={queryMessage}
          onChange={(e) => setQueryMessage(e.target.value)}
          placeholder="Specify what additional information or documents are required from the forum..."
          className="w-full px-3 py-2 bg-slate-900 border border-amber-900/60 rounded-xl text-xs text-amber-100 placeholder-slate-600 focus:ring-2 focus:ring-amber-500"
        ></textarea>
      </div>

      {/* Action Buttons */}
      <div className="pt-2 flex flex-wrap gap-2.5">
        <button
          type="button"
          disabled={loading}
          onClick={() => handleStatusUpdate('under_review')}
          className="px-3.5 py-2 rounded-xl bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white text-xs font-bold transition border border-blue-500/30 flex items-center gap-1.5"
        >
          <Clock className="w-3.5 h-3.5" /> Mark Under Review
        </button>

        <button
          type="button"
          disabled={loading}
          onClick={() => handleStatusUpdate('more_info_required')}
          className="px-3.5 py-2 rounded-xl bg-amber-600/20 hover:bg-amber-600 text-amber-300 hover:text-white text-xs font-bold transition border border-amber-500/30 flex items-center gap-1.5"
        >
          <AlertCircle className="w-3.5 h-3.5" /> Request More Information
        </button>

        <button
          type="button"
          disabled={loading}
          onClick={() => handleStatusUpdate('approved_verified')}
          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold transition shadow-lg flex items-center gap-1.5"
        >
          <CheckCircle2 className="w-4 h-4" /> Approve & Issue Official Documents
        </button>

        <button
          type="button"
          disabled={loading}
          onClick={() => handleStatusUpdate('rejected')}
          className="px-3.5 py-2 rounded-xl bg-red-600/20 hover:bg-red-600 text-red-300 hover:text-white text-xs font-bold transition border border-red-500/30 flex items-center gap-1.5"
        >
          <XCircle className="w-3.5 h-3.5" /> Reject Submission
        </button>

        {status === 'approved_verified' && (
          <button
            type="button"
            disabled={loading}
            onClick={() => handleStatusUpdate('suspended_revoked')}
            className="px-3.5 py-2 rounded-xl bg-purple-600/20 hover:bg-purple-600 text-purple-300 hover:text-white text-xs font-bold transition border border-purple-500/30"
          >
            Suspend / Revoke
          </button>
        )}
      </div>

      {/* Generated Documents Section */}
      {status === 'approved_verified' && (
        <div className="pt-4 border-t border-slate-800 space-y-3">
          <h4 className="text-xs font-bold text-sky-400 uppercase tracking-wider">
            Official Generated Artifacts
          </h4>

          <div className="grid grid-cols-1 gap-3">
            {letterDoc ? (
              <a
                href={`/api/documents/${letterDoc.id}/download`}
                target="_blank"
                className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-brand-500 flex items-center justify-between text-xs transition"
              >
                <div>
                  <div className="font-bold text-white">Official Letter of Recognition</div>
                  <div className="text-[10px] text-slate-500">PDF • Official Letterhead & QR Code</div>
                </div>
                <FileDown className="w-4 h-4 text-brand-400" />
              </a>
            ) : (
              <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800 text-xs text-slate-500">
                Official Letter of Recognition generating...
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
