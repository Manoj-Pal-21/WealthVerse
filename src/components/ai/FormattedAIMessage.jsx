import React from 'react';
import { 
  AlertTriangle, 
  CheckCircle2, 
  Info, 
  ArrowRight, 
  ShieldAlert, 
  Calendar, 
  Sparkles,
  Zap
} from 'lucide-react';
import Badge from '../common/Badge';

// Helper to render bold, italics, and code inside markdown text
function renderFormattedText(text) {
  if (!text) return null;

  // Split by markdown bold **text**
  const parts = text.split(/(\*\*.*?\*\*|\*.*?\*|`.*?`)/g);

  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={index} className="font-bold text-slate-900">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return (
        <em key={index} className="italic text-slate-700 font-medium">
          {part.slice(1, -1)}
        </em>
      );
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={index} className="px-1.5 py-0.5 bg-slate-100 text-brand-700 rounded font-mono text-xs">
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

// Parses raw markdown into structured blocks (h1, h2, h3, table, blockquote, list, paragraph, divider)
function parseMarkdownBlocks(markdown) {
  if (!markdown) return [];

  const lines = markdown.split(/\r?\n/);
  const blocks = [];
  let i = 0;

  while (i < lines.length) {
    const rawLine = lines[i];
    const line = rawLine.trim();

    // 1. Skip empty lines
    if (!line) {
      i++;
      continue;
    }

    // 2. Horizontal Rules (--- or ***)
    if (/^[-*_]{3,}$/.test(line)) {
      blocks.push({ type: 'divider' });
      i++;
      continue;
    }

    // 3. Headings
    if (line.startsWith('### ')) {
      blocks.push({ type: 'h3', text: line.replace(/^###\s+/, '') });
      i++;
      continue;
    }
    if (line.startsWith('## ')) {
      blocks.push({ type: 'h2', text: line.replace(/^##\s+/, '') });
      i++;
      continue;
    }
    if (line.startsWith('# ')) {
      blocks.push({ type: 'h1', text: line.replace(/^#\s+/, '') });
      i++;
      continue;
    }

    // 4. Blockquotes (> ...)
    if (line.startsWith('>')) {
      const quoteLines = [];
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        quoteLines.push(lines[i].trim().replace(/^>\s?/, ''));
        i++;
      }
      blocks.push({ type: 'quote', text: quoteLines.join(' ') });
      continue;
    }

    // 5. Tables (| col | col |)
    if (line.startsWith('|') && line.includes('|', 1)) {
      const tableLines = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        tableLines.push(lines[i].trim());
        i++;
      }

      if (tableLines.length >= 2) {
        const headerCols = tableLines[0]
          .split('|')
          .slice(1, -1)
          .map(c => c.trim());

        // Skip divider line (e.g. |---|---|)
        const rowLines = tableLines.slice(2);
        const rows = rowLines.map(r => 
          r.split('|').slice(1, -1).map(c => c.trim())
        ).filter(cols => cols.length > 0);

        blocks.push({ type: 'table', headers: headerCols, rows });
        continue;
      }
    }

    // 6. Bullet or Numbered Lists
    if (/^[-*]\s+/.test(line) || /^\d+\.\s+/.test(line)) {
      const listItems = [];
      while (
        i < lines.length && 
        (/^[-*]\s+/.test(lines[i].trim()) || /^\d+\.\s+/.test(lines[i].trim()))
      ) {
        listItems.push(lines[i].trim().replace(/^[-*]\s+|\d+\.\s+/, ''));
        i++;
      }
      blocks.push({ type: 'list', items: listItems });
      continue;
    }

    // 7. Regular Paragraphs
    blocks.push({ type: 'paragraph', text: line });
    i++;
  }

  return blocks;
}

export default function FormattedAIMessage({ content, onNavigate }) {
  if (!content) return null;

  const blocks = parseMarkdownBlocks(content);

  return (
    <div className="space-y-4 text-slate-800 text-xs sm:text-sm leading-relaxed">
      {blocks.map((block, idx) => {
        switch (block.type) {
          case 'h1':
            return (
              <div 
                key={idx} 
                className="p-4 rounded-2xl bg-gradient-to-r from-brand-50 via-teal-50/50 to-emerald-50/80 border border-brand-200/80 shadow-xs my-2"
              >
                <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-brand-600 shrink-0" />
                  <span>{renderFormattedText(block.text)}</span>
                </h2>
              </div>
            );

          case 'h2':
            return (
              <div key={idx} className="pt-2 pb-1 flex items-center gap-2 border-b border-slate-100">
                <span className="w-2 h-4 rounded-full bg-brand-600 shrink-0" />
                <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                  {renderFormattedText(block.text)}
                </h3>
              </div>
            );

          case 'h3':
            return (
              <h4 key={idx} className="text-xs font-bold text-slate-900 uppercase tracking-wide mt-2">
                {renderFormattedText(block.text)}
              </h4>
            );

          case 'divider':
            return <hr key={idx} className="border-t border-slate-200/70 my-3" />;

          case 'paragraph':
            return (
              <p key={idx} className="text-slate-700 leading-relaxed text-xs sm:text-sm">
                {renderFormattedText(block.text)}
              </p>
            );

          case 'quote': {
            const isDanger = block.text.toLowerCase().includes('shock') || 
                             block.text.toLowerCase().includes('vulnerable') || 
                             block.text.toLowerCase().includes('safe') || 
                             block.text.includes('🚨');

            return (
              <div 
                key={idx} 
                className={`p-3.5 rounded-xl border flex items-start gap-3 my-2 ${
                  isDanger 
                    ? 'bg-rose-50/80 border-rose-200/90 text-rose-950' 
                    : 'bg-amber-50/80 border-amber-200 text-amber-950'
                }`}
              >
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-white font-bold text-xs ${
                  isDanger ? 'bg-rose-600 shadow-xs' : 'bg-amber-600 shadow-xs'
                }`}>
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div className="flex-1 text-xs leading-relaxed font-medium">
                  {renderFormattedText(block.text)}
                </div>
              </div>
            );
          }

          case 'list':
            return (
              <div key={idx} className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-2">
                {block.items.map((item, itemIdx) => (
                  <div 
                    key={itemIdx} 
                    className="p-2.5 rounded-xl bg-slate-50/80 border border-slate-200/80 flex items-start gap-2.5 hover:bg-slate-100/70 transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-700 font-medium leading-snug">
                      {renderFormattedText(item)}
                    </span>
                  </div>
                ))}
              </div>
            );

          case 'table': {
            // Check if this is a 2-column or multi-column table
            const isComparative = block.headers.some(h => 
              h.toLowerCase().includes('reason') || 
              h.toLowerCase().includes('action') || 
              h.toLowerCase().includes('explanation')
            );

            return (
              <div key={idx} className="my-3 rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs bg-white">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs divide-y divide-slate-100">
                    <thead>
                      <tr className="bg-slate-50/90 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
                        {block.headers.map((h, hIdx) => (
                          <th key={hIdx} className="px-4 py-2.5">
                            {renderFormattedText(h)}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100/80">
                      {block.rows.map((row, rIdx) => {
                        const rowStr = row.join(' ').toLowerCase();
                        const isGapRow = rowStr.includes('gap') || rowStr.includes('🚨');
                        const isNetWorthRow = rowStr.includes('net worth') || rowStr.includes('✅');

                        return (
                          <tr 
                            key={rIdx} 
                            className={`transition-colors ${
                              isGapRow 
                                ? 'bg-rose-50/60 font-bold text-rose-900 border-l-4 border-l-rose-500' 
                                : isNetWorthRow
                                ? 'bg-brand-50/40 font-bold text-brand-900 border-l-4 border-l-brand-500'
                                : 'hover:bg-slate-50/80 text-slate-800'
                            }`}
                          >
                            {row.map((cell, cIdx) => (
                              <td 
                                key={cIdx} 
                                className={`px-4 py-2.5 ${
                                  cIdx === 1 && !isComparative ? 'font-bold text-right sm:text-left' : ''
                                }`}
                              >
                                {renderFormattedText(cell)}
                              </td>
                            ))}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          }

          default:
            return null;
        }
      })}
    </div>
  );
}
