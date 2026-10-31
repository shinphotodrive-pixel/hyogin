import React from 'react';
import { BookOpen, Clock, FileText, CheckCircle2, Printer } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenCheatSheet: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onOpenCheatSheet }) => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Wordmark */}
        <button
          onClick={() => setActiveTab('schedule')}
          className="text-left flex items-center gap-2.5 text-slate-900 hover:text-indigo-600 transition-colors whitespace-nowrap shrink-0"
        >
          <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <span className="text-base sm:text-lg font-bold tracking-tight">화법과 언어 수행평가 만점 대비</span>
          </div>
        </button>

        {/* Zone 2: 5 Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button
            onClick={() => setActiveTab('schedule')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'schedule'
                ? 'text-indigo-600 font-semibold border-b-2 border-indigo-600'
                : 'hover:text-slate-900'
            }`}
          >
            시험 안내
          </button>
          <button
            onClick={() => setActiveTab('part1')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'part1'
                ? 'text-indigo-600 font-semibold border-b-2 border-indigo-600'
                : 'hover:text-slate-900'
            }`}
          >
            1차 평가지 (1~5번)
          </button>
          <button
            onClick={() => setActiveTab('part2')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'part2'
                ? 'text-indigo-600 font-semibold border-b-2 border-indigo-600'
                : 'hover:text-slate-900'
            }`}
          >
            2차 평가지 (6~7번)
          </button>
          <button
            onClick={() => setActiveTab('mock')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'mock'
                ? 'text-indigo-600 font-semibold border-b-2 border-indigo-600'
                : 'hover:text-slate-900'
            }`}
          >
            실전 모의평가
          </button>
        </nav>

        {/* Zone 3: Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenCheatSheet}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-sm transition-all whitespace-nowrap shrink-0"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>15점 만점 요약본</span>
          </button>
        </div>
      </div>

      {/* Mobile Bar */}
      <div className="md:hidden flex overflow-x-auto border-t border-slate-100 px-4 py-2 gap-2 scrollbar-none bg-slate-50">
        {[
          { id: 'schedule', label: '시험 안내' },
          { id: 'part1', label: '1차 (1~5번)' },
          { id: 'part2', label: '2차 (6~7번)' },
          { id: 'mock', label: '실전 모의평가' },
        ].map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 transition-colors ${
              activeTab === item.id
                ? 'bg-indigo-600 text-white font-semibold'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
};
