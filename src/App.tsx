/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ScheduleOverview } from './components/ScheduleOverview';
import { Part1Explorer } from './components/Part1Explorer';
import { Part2Explorer } from './components/Part2Explorer';
import { TimedMockExam } from './components/TimedMockExam';
import { FullCheatSheetModal } from './components/FullCheatSheetModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('schedule');
  const [isCheatSheetOpen, setIsCheatSheetOpen] = useState<boolean>(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenCheatSheet={() => setIsCheatSheetOpen(true)}
      />

      {/* Main Content Body */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {activeTab === 'schedule' && (
          <ScheduleOverview
            onGoToPart1={() => setActiveTab('part1')}
            onGoToPart2={() => setActiveTab('part2')}
            onOpenCheatSheet={() => setIsCheatSheetOpen(true)}
          />
        )}

        {activeTab === 'part1' && <Part1Explorer />}

        {activeTab === 'part2' && <Part2Explorer />}

        {activeTab === 'mock' && <TimedMockExam />}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-10 mt-16 border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs space-y-2">
          <p className="font-semibold text-slate-300 text-sm">
            파주 금촌고등학교 2학년 &lt;화법과 언어&gt; 국어 규범 탐구 수행평가 15점 만점을 응원합니다! 🥰
          </p>
          <div className="text-slate-500 flex items-center justify-center gap-2">
            <span>국립국어원 어문 규범 및 표준국어대사전 규정 준수</span>
            <span aria-hidden="true">·</span>
            <span>2-11반 / 2-1반 / 2-2반 11월 5일 목요일 실시 대비</span>
          </div>
        </div>
      </footer>

      {/* 15점 만점 모범답안 요약본 모달 */}
      <FullCheatSheetModal
        isOpen={isCheatSheetOpen}
        onClose={() => setIsCheatSheetOpen(false)}
      />
    </div>
  );
}
