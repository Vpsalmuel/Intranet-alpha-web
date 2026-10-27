import React, { useState } from 'react';
import { Award, Star, Trophy, Users, Cake, GraduationCap, ChevronRight, MessageSquare, ThumbsUp, Send } from 'lucide-react';
import { Milestone, User } from '../types';

interface MilestonesViewProps {
  milestones: Milestone[];
  currentUser?: User;
}

export default function MilestonesView({ milestones, currentUser }: MilestonesViewProps) {
  const [localReactions, setLocalReactions] = useState<Record<string, Record<string, number>>>(
    milestones.reduce((acc, m) => ({ ...acc, [m.id]: m.reactions || {} }), {})
  );
  const [activeCommentId, setActiveCommentId] = useState<string | null>(null);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<Record<string, { author: string; text: string; date: string }[]>>({});
  const [showEmojiPickerFor, setShowEmojiPickerFor] = useState<string | null>(null);

  const EMOJIS = ['👍', '🎉', '👏', '❤️', '🔥'];

  const handleReaction = (milestoneId: string, emoji: string) => {
    setLocalReactions(prev => {
      const milestoneReactions = prev[milestoneId] || {};
      return {
        ...prev,
        [milestoneId]: {
          ...milestoneReactions,
          [emoji]: (milestoneReactions[emoji] || 0) + 1
        }
      };
    });
    setShowEmojiPickerFor(null);
  };

  const handlePostComment = (milestoneId: string) => {
    if (!commentText.trim()) return;
    const authorName = currentUser?.name || 'Anonymous User';
    const newComment = { author: authorName, text: commentText, date: 'Just now' };
    
    setComments(prev => ({
      ...prev,
      [milestoneId]: [...(prev[milestoneId] || []), newComment]
    }));
    setCommentText('');
    // Optionally close the comment section after posting or keep it open
  };
  // Helper to get an icon and styling based on milestone type
  const getMilestoneStyle = (type: string) => {
    switch (type.toLowerCase()) {
      case 'promotion':
        return {
          icon: <Trophy className="w-5 h-5 text-yellow-600" />,
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          textColor: 'text-yellow-800'
        };
      case 'work anniversary':
        return {
          icon: <Cake className="w-5 h-5 text-fuchsia-600" />,
          bgColor: 'bg-fuchsia-50',
          borderColor: 'border-fuchsia-200',
          textColor: 'text-fuchsia-800'
        };
      case 'certification earned':
        return {
          icon: <GraduationCap className="w-5 h-5 text-blue-600" />,
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          textColor: 'text-blue-800'
        };
      default:
        return {
          icon: <Star className="w-5 h-5 text-brand-orange" />,
          bgColor: 'bg-orange-50',
          borderColor: 'border-orange-200',
          textColor: 'text-orange-800'
        };
    }
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12 font-sans">
      {/* Header board */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-sans font-bold tracking-tight text-gray-950 flex items-center gap-2">
            <Award className="w-6 h-6 text-[#1E2D64]" /> Team Milestones
          </h2>
          <p className="text-xs text-gray-500 mt-1">Celebrate promotions, work anniversaries, and major achievements across the organization.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="bg-white border rounded-lg px-3 py-1.5 shadow-sm flex items-center gap-2 text-xs font-semibold text-slate-700">
            <Users className="w-4 h-4 text-slate-400" /> All Departments
          </div>
        </div>
      </div>

      {/* Grid listing Table layout */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {milestones.map((milestone) => {
          const style = getMilestoneStyle(milestone.type);
          
          return (
            <div key={milestone.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col">
              {/* Card Header (Gradient / Color based on type) */}
              <div className={`p-5 ${style.bgColor} ${style.borderColor} border-b flex justify-between items-start`}>
                <div className={`w-10 h-10 rounded-xl bg-white border shadow-sm flex items-center justify-center ${style.textColor}`}>
                  {style.icon}
                </div>
                <span className={`px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase rounded-full bg-white border shadow-sm ${style.textColor}`}>
                  {milestone.type}
                </span>
              </div>
              
              {/* Employee Info & Content */}
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center gap-3 mb-4 -mt-10">
                  <img 
                    src={milestone.employeeAvatar} 
                    alt={milestone.employeeName} 
                    referrerPolicy="no-referrer"
                    className="w-14 h-14 rounded-full border-4 border-white bg-gray-200 object-cover shadow-sm"
                  />
                  <div className="mt-8">
                    <h4 className="font-bold text-gray-900 leading-tight">{milestone.employeeName}</h4>
                    <p className="text-[10px] text-gray-400 mt-0.5">{milestone.date}</p>
                  </div>
                </div>

                <p className="text-xs text-gray-700 leading-relaxed flex-1 mb-6">
                  {milestone.message}
                </p>
                {/* Reactions */}
                <div className="flex flex-col border-t border-slate-100 pt-4 mt-auto">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      {Object.entries(localReactions[milestone.id] || {}).map(([emoji, count]) => (
                        <span key={emoji} className="inline-flex items-center gap-1 text-[10px] font-semibold text-slate-600 bg-slate-50 px-2 py-1 rounded-full border border-slate-150">
                          <span>{emoji}</span> {count as number}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2 relative">
                      {showEmojiPickerFor === milestone.id && (
                        <div className="absolute bottom-10 right-0 bg-white border border-slate-200 rounded-lg shadow-lg p-2 flex gap-2 z-10">
                          {EMOJIS.map(e => (
                            <button key={e} onClick={() => handleReaction(milestone.id, e)} className="hover:bg-slate-100 p-1.5 rounded text-lg transition-colors">
                              {e}
                            </button>
                          ))}
                        </div>
                      )}
                      <button 
                        onClick={() => setShowEmojiPickerFor(prev => prev === milestone.id ? null : milestone.id)}
                        className="w-7 h-7 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-brand-orange transition-colors"
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                      </button>
                      <button 
                        onClick={() => setActiveCommentId(prev => prev === milestone.id ? null : milestone.id)}
                        className="w-7 h-7 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-brand-blue transition-colors"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Comments Section */}
                  {activeCommentId === milestone.id && (
                    <div className="pt-3 border-t border-slate-100 space-y-3 animate-fade-in">
                      <div className="space-y-3 max-h-32 overflow-y-auto pr-1">
                        {(comments[milestone.id] || []).map((c, i) => (
                          <div key={i} className="bg-slate-50 rounded-lg p-2.5">
                            <div className="flex justify-between items-start mb-1">
                              <span className="text-[10px] font-bold text-slate-800">{c.author}</span>
                              <span className="text-[9px] text-slate-400">{c.date}</span>
                            </div>
                            <p className="text-[11px] text-slate-600 leading-relaxed">{c.text}</p>
                          </div>
                        ))}
                        {!(comments[milestone.id] || []).length && (
                          <p className="text-[10px] text-slate-400 text-center italic py-2">No comments yet. Be the first to congratulate!</p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={commentText}
                          onChange={(e) => setCommentText(e.target.value)}
                          placeholder="Write a congratulatory message..."
                          className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-[11px] focus:outline-none focus:border-brand-blue/50"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handlePostComment(milestone.id);
                          }}
                        />
                        <button
                          onClick={() => handlePostComment(milestone.id)}
                          disabled={!commentText.trim()}
                          className="w-8 h-8 rounded-lg bg-brand-blue hover:bg-brand-blue/90 text-white flex items-center justify-center disabled:opacity-50 transition-colors shrink-0"
                        >
                          <Send className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {milestones.length === 0 && (
        <div className="p-12 text-center bg-white border rounded-2xl shadow-sm">
          <Trophy className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h4 className="text-sm font-bold text-gray-800">No recent milestones</h4>
          <p className="text-xs text-gray-400 mt-1 max-w-sm mx-auto">There are no recent team milestones to display right now.</p>
        </div>
      )}
    </div>
  );
}
