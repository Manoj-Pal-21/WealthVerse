import React, { useState } from 'react';
import { 
  FileText, 
  Upload, 
  CheckCircle2, 
  AlertTriangle, 
  Download, 
  Search, 
  Sparkles, 
  ShieldCheck, 
  Eye, 
  FileCheck 
} from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import Modal from '../components/common/Modal';
import { 
  documentCategories, 
  documentList, 
  aiDocumentInsight 
} from '../data/documentsData';

export default function DocumentsPage({ onOpenAI }) {
  const [selectedCat, setSelectedCat] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [docs, setDocs] = useState(documentList);
  
  // Upload form state
  const [docName, setDocName] = useState('');
  const [docCategory, setDocCategory] = useState('insurance');

  const filteredDocs = docs.filter(doc => {
    const matchesCat = selectedCat === 'all' || doc.category === selectedCat;
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          doc.notes.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    if (!docName) return;

    const newDoc = {
      id: `doc-${Date.now()}`,
      name: docName.endsWith('.pdf') ? docName : `${docName}.pdf`,
      category: docCategory,
      categoryLabel: documentCategories.find(c => c.id === docCategory)?.name || 'General',
      size: '1.4 MB',
      uploadedDate: 'Just now',
      status: 'Verified',
      statusType: 'verified',
      notes: 'Uploaded and encrypted via 360° Secure Vault.'
    };

    setDocs([newDoc, ...docs]);
    setDocName('');
    setShowUploadModal(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Document Vault</h1>
          <p className="text-sm text-slate-500 mt-1">
            Keep your important financial documents organized in one AES-256 encrypted place.
          </p>
        </div>

        <Button 
          variant="primary" 
          size="sm"
          onClick={() => setShowUploadModal(true)}
          icon={Upload}
        >
          Upload Document
        </Button>
      </div>

      {/* AI Document Insight Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-50 via-white to-amber-50/50 border border-amber-200/90 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-slate-900">{aiDocumentInsight.title}</h3>
              <Badge variant="warning" size="sm">Action Recommended</Badge>
            </div>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed max-w-2xl">
              {aiDocumentInsight.description}
            </p>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onOpenAI("Explain the impact of my loan interest reset")}
          className="shrink-0 border-amber-300 text-amber-900 hover:bg-amber-100"
        >
          {aiDocumentInsight.actionText}
        </Button>
      </div>

      {/* Vault Category Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {documentCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCat(cat.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all flex items-center gap-2 ${
              selectedCat === cat.id
                ? 'bg-brand-600 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80 hover:bg-slate-50'
            }`}
          >
            <span>{cat.name}</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
              selectedCat === cat.id ? 'bg-brand-700 text-white' : 'bg-slate-100 text-slate-500'
            }`}>
              {cat.count}
            </span>
          </button>
        ))}
      </div>

      {/* Documents List Card */}
      <Card
        title="Central Document Repository"
        subtitle={`Showing ${filteredDocs.length} vaulted documents`}
        action={
          <div className="relative w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search documents..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-500"
            />
          </div>
        }
      >
        <div className="divide-y divide-slate-100">
          {filteredDocs.map((doc) => (
            <div key={doc.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/70 px-2 rounded-xl transition-colors">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-brand-700" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{doc.name}</h4>
                  <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-0.5">
                    <span>{doc.categoryLabel}</span>
                    <span>•</span>
                    <span>{doc.size}</span>
                    <span>•</span>
                    <span>Updated {doc.uploadedDate}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">{doc.notes}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                <Badge variant={doc.statusType === 'verified' ? 'good' : 'warning'} size="sm">
                  {doc.status}
                </Badge>
                <button className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Upload Document Modal */}
      <Modal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        title="Upload Financial Document"
        subtitle="Documents are encrypted and audited for financial telemetry"
      >
        <form onSubmit={handleUploadSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Document Title</label>
            <input
              type="text"
              required
              value={docName}
              onChange={(e) => setDocName(e.target.value)}
              placeholder="e.g. Term Life Endorsement.pdf"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 focus:bg-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Document Category</label>
            <select
              value={docCategory}
              onChange={(e) => setDocCategory(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 focus:bg-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
            >
              <option value="insurance">Insurance</option>
              <option value="mutual-funds">Mutual Funds</option>
              <option value="demat">Demat</option>
              <option value="bank">Bank</option>
              <option value="loans">Loans</option>
              <option value="tax">Tax</option>
              <option value="estate">Estate Planning</option>
            </select>
          </div>

          <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center hover:border-brand-500 transition-colors cursor-pointer bg-slate-50/50">
            <Upload className="w-8 h-8 text-brand-600 mx-auto mb-2" />
            <p className="font-semibold text-slate-700">Click or drag PDF / image file here</p>
            <p className="text-[11px] text-slate-400 mt-1">Supports PDF, PNG, JPEG up to 25MB</p>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <Button variant="outline" size="sm" onClick={() => setShowUploadModal(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Upload & Encrypt
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
