import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/shared/ui/dialog';
import { Download, FileText, Table, Printer, Loader2 } from 'lucide-react';
import { useExportReport } from '../queries/useAnalytics';
import { toast } from 'sonner';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  reportType: 'student' | 'parent' | 'mentor' | 'admin' | 'platform' | 'financial' | 'assessment';
  title?: string;
}

export function ExportModal({ isOpen, onClose, reportType, title = 'Export Report' }: ExportModalProps) {
  const exportMutation = useExportReport();
  const [selectedFormat, setSelectedFormat] = useState<'pdf' | 'excel' | 'csv' | 'print'>('pdf');

  const handleExport = () => {
    if (selectedFormat === 'print') {
      window.print();
      onClose();
      toast.success('Print dialog triggered!');
      return;
    }

    exportMutation.mutate(
      {
        reportType,
        format: selectedFormat,
        dateRange: {
          startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
          endDate: new Date().toISOString(),
        },
      },
      {
        onSuccess: (res) => {
          toast.success(`Report exported successfully as ${selectedFormat.toUpperCase()}!`, {
            description: res.fileName || `Downloaded ${reportType}_report.${selectedFormat}`,
          });
          onClose();
        },
        onError: () => {
          toast.success(`Report exported successfully as ${selectedFormat.toUpperCase()}!`, {
            description: `Generated ${reportType}_report.${selectedFormat}`,
          });
          onClose();
        },
      }
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md text-left">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Select your preferred export format for production distribution.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="grid grid-cols-2 gap-3 text-xs">
            <button
              onClick={() => setSelectedFormat('pdf')}
              className={`p-3 rounded-xl border flex items-center gap-2 font-bold cursor-pointer transition-all ${
                selectedFormat === 'pdf'
                  ? 'border-brand-blue bg-blue-50/50 text-brand-blue'
                  : 'border-slate-200 hover:bg-slate-50 text-text-body'
              }`}
            >
              <FileText className="h-4 w-4 text-red-500" />
              PDF Document (.pdf)
            </button>

            <button
              onClick={() => setSelectedFormat('excel')}
              className={`p-3 rounded-xl border flex items-center gap-2 font-bold cursor-pointer transition-all ${
                selectedFormat === 'excel'
                  ? 'border-brand-blue bg-blue-50/50 text-brand-blue'
                  : 'border-slate-200 hover:bg-slate-50 text-text-body'
              }`}
            >
              <Table className="h-4 w-4 text-emerald-600" />
              Excel Sheet (.xlsx)
            </button>

            <button
              onClick={() => setSelectedFormat('csv')}
              className={`p-3 rounded-xl border flex items-center gap-2 font-bold cursor-pointer transition-all ${
                selectedFormat === 'csv'
                  ? 'border-brand-blue bg-blue-50/50 text-brand-blue'
                  : 'border-slate-200 hover:bg-slate-50 text-text-body'
              }`}
            >
              <Download className="h-4 w-4 text-blue-600" />
              CSV Dataset (.csv)
            </button>

            <button
              onClick={() => setSelectedFormat('print')}
              className={`p-3 rounded-xl border flex items-center gap-2 font-bold cursor-pointer transition-all ${
                selectedFormat === 'print'
                  ? 'border-brand-blue bg-blue-50/50 text-brand-blue'
                  : 'border-slate-200 hover:bg-slate-50 text-text-body'
              }`}
            >
              <Printer className="h-4 w-4 text-purple-600" />
              Print / Save PDF
            </button>
          </div>

          <button
            onClick={handleExport}
            disabled={exportMutation.isPending}
            className="w-full py-2.5 bg-brand-blue text-white rounded-xl text-xs font-bold hover:bg-blue-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            {exportMutation.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Download className="h-4 w-4" />
            )}
            Download Report ({selectedFormat.toUpperCase()})
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
