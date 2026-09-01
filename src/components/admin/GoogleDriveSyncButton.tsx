'use client';

import React, { useState, useTransition } from 'react';
import { Cloud, RefreshCw, CheckCircle2, AlertCircle, ExternalLink, HelpCircle } from 'lucide-react';
import { triggerGoogleDriveSync } from '@/app/actions/adminActions';

export function GoogleDriveSyncButton() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);
  const [showHelp, setShowHelp] = useState(false);

  const handleSync = () => {
    startTransition(async () => {
      setResult(null);
      const res = await triggerGoogleDriveSync();
      if (res.success && 'count' in res) {
        setResult({
          success: true,
          message: `Successfully synchronized ${res.count} records to Google Drive / Sheets!`,
        });
      } else {
        setResult({
          success: false,
          message: res.error || 'Google Drive webhook not yet connected.',
        });
      }
    });
  };

  return (
    <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-800 shadow-xl space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
            <Cloud className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-black text-white flex items-center gap-2">
              Automated Real-Time Google Drive Sync
              <button
                type="button"
                onClick={() => setShowHelp(!showHelp)}
                className="text-slate-400 hover:text-sky-300 transition text-xs"
                title="View Setup Details"
              >
                <HelpCircle className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-xs text-slate-400">
              Live automated streaming of all newly submitted registrations directly to your Google Drive Sheet.
            </p>
          </div>
        </div>

        <button
          onClick={handleSync}
          disabled={isPending}
          className="px-4 py-2.5 bg-sky-600 hover:bg-sky-500 active:bg-sky-700 text-white font-bold rounded-xl text-xs transition flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 flex-shrink-0"
        >
          {isPending ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" /> Syncing with Google Drive...
            </>
          ) : (
            <>
              <RefreshCw className="w-4 h-4" /> Sync All to Google Drive
            </>
          )}
        </button>
      </div>

      {result && (
        <div
          className={`p-3 rounded-xl text-xs font-semibold flex items-center gap-2 ${
            result.success
              ? 'bg-emerald-950/80 text-emerald-200 border border-emerald-800'
              : 'bg-amber-950/80 text-amber-200 border border-amber-800'
          }`}
        >
          {result.success ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <AlertCircle className="w-4 h-4 text-amber-400" />}
          <span>{result.message}</span>
        </div>
      )}

      {showHelp && (
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-2">
          <div className="font-bold text-white">How Google Drive Real-Time Sync Works:</div>
          <ol className="list-decimal list-inside space-y-1 text-[11px] text-slate-400">
            <li>Open your Google Drive and create a Google Sheet named <strong className="text-slate-200">APC Stakeholders Registrations</strong>.</li>
            <li>Go to <strong className="text-slate-200">Extensions &gt; Apps Script</strong> and paste the Google Webhook script.</li>
            <li>Click <strong className="text-slate-200">Deploy &gt; New Deployment &gt; Web App</strong> (Set &quot;Who has access&quot; to &quot;Anyone&quot;).</li>
            <li>Copy the Webhook URL and add it to your environment variables as <code className="text-sky-300">GOOGLE_SHEETS_WEBHOOK_URL</code>.</li>
            <li>Every time any forum registers, their information will appear automatically in your Google Sheet!</li>
          </ol>
        </div>
      )}
    </div>
  );
}
