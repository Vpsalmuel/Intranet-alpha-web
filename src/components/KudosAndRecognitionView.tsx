import React from 'react';
import { User } from '../types';
import { Heart, Trophy, Star, PlusCircle } from 'lucide-react';

interface KudosAndRecognitionViewProps {
  currentUser: User;
}

export default function KudosAndRecognitionView({ currentUser: _currentUser }: KudosAndRecognitionViewProps) {
  return (
    <div className="space-y-8 animate-fade-in pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-sans font-bold tracking-tight text-gray-950 flex items-center gap-2">
            <Heart className="w-6 h-6 text-rose-500 fill-rose-500" /> Kudos & Recognition
          </h2>
          <p className="text-xs text-gray-500 mt-1">Celebrate your colleagues' achievements, work anniversaries, and outstanding contributions.</p>
        </div>
        <button className="bg-brand-blue text-white px-4 py-2 flex items-center gap-2 rounded-xl text-xs font-bold hover:bg-brand-blue/90 transition-all shadow-sm cursor-pointer">
          <PlusCircle className="w-4 h-4" /> Give Kudos
        </button>
      </div>

      {/* Company Recognition Feed */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex gap-4">
          <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center shrink-0">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <div className="flex justify-between items-start mb-1">
              <h4 className="font-bold text-gray-900 text-sm">Customer Excellence Award</h4>
              <span className="text-[10px] text-gray-400">2 hours ago</span>
            </div>
            <p className="text-xs text-brand-blue font-semibold mb-2">Awarded to: Samuel Adebayo</p>
            <p className="text-xs text-gray-600 leading-relaxed">
              "For consistently going above and beyond in processing claims accurately and maintaining an incredibly high standard of empathy for our clients during stressful times."
            </p>
            <div className="mt-3 flex gap-3 text-[10px] text-gray-500 font-semibold">
              <button className="flex items-center gap-1 hover:text-rose-500 transition-colors cursor-pointer">
                <Heart className="w-3.5 h-3.5" /> 24 Appreciations
              </button>
            </div>
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex gap-4">
          <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
            <Star className="w-5 h-5" />
          </div>
          <div>
            <div className="flex justify-between items-start mb-1">
              <h4 className="font-bold text-gray-900 text-sm">Team Player Spotlight</h4>
              <span className="text-[10px] text-gray-400">1 day ago</span>
            </div>
            <p className="text-xs text-brand-blue font-semibold mb-2">Awarded to: Sarah Jenkins</p>
            <p className="text-xs text-gray-600 leading-relaxed">
              "Massive shoutout to Sarah for stepping in to handle the backlog while half the team was out at training. You are an absolute lifesaver!"
            </p>
            <div className="mt-3 flex gap-3 text-[10px] text-gray-500 font-semibold">
              <button className="flex items-center gap-1 hover:text-rose-500 transition-colors cursor-pointer">
                <Heart className="w-3.5 h-3.5" /> 18 Appreciations
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
