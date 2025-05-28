
import React, { useState } from 'react';
import { Plus, Search, Edit3, Trash2, Save, X } from 'lucide-react';

const ChromeExtensionPopup = () => {
  const [notes, setNotes] = useState([
    { id: 1, title: 'Meeting Notes', content: 'Discuss project timeline and deliverables', timestamp: '2 hours ago' },
    { id: 2, title: 'Ideas', content: 'New feature ideas for the app', timestamp: '1 day ago' },
  ]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newNote, setNewNote] = useState({ title: '', content: '' });
  const [searchTerm, setSearchTerm] = useState('');

  const handleSaveNote = () => {
    if (newNote.title.trim() || newNote.content.trim()) {
      const note = {
        id: Date.now(),
        title: newNote.title || 'Untitled',
        content: newNote.content,
        timestamp: 'Just now'
      };
      setNotes([note, ...notes]);
      setNewNote({ title: '', content: '' });
      setIsCreating(false);
    }
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-80 h-96 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 text-white">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-lg font-semibold">Quick Notes</h1>
          <button
            onClick={() => setIsCreating(true)}
            className="p-1 hover:bg-white/20 rounded transition-colors"
          >
            <Plus size={18} />
          </button>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white/70" size={16} />
          <input
            type="text"
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-white/20 border border-white/30 rounded text-white placeholder-white/70 text-sm focus:outline-none focus:bg-white/30"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {isCreating && (
          <div className="p-3 border-b border-gray-200 bg-gray-50">
            <input
              type="text"
              placeholder="Note title..."
              value={newNote.title}
              onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded text-sm mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
            <textarea
              placeholder="Write your note here..."
              value={newNote.content}
              onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded text-sm h-20 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex gap-2 mt-2">
              <button
                onClick={handleSaveNote}
                className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600 transition-colors"
              >
                <Save size={12} />
                Save
              </button>
              <button
                onClick={() => {
                  setIsCreating(false);
                  setNewNote({ title: '', content: '' });
                }}
                className="flex items-center gap-1 px-3 py-1 bg-gray-300 text-gray-700 rounded text-xs hover:bg-gray-400 transition-colors"
              >
                <X size={12} />
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Notes List */}
        <div className="p-2">
          {filteredNotes.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Edit3 size={32} className="mx-auto mb-2 opacity-50" />
              <p className="text-sm">No notes found</p>
              <p className="text-xs text-gray-400">Click + to create your first note</p>
            </div>
          ) : (
            filteredNotes.map((note) => (
              <div
                key={note.id}
                className="group bg-white border border-gray-200 rounded-lg p-3 mb-2 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-medium text-gray-900 text-sm truncate flex-1">
                    {note.title}
                  </h3>
                  <button
                    onClick={() => handleDeleteNote(note.id)}
                    className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition-all p-1"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
                <p className="text-gray-600 text-xs mb-2 line-clamp-2">
                  {note.content}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">{note.timestamp}</span>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="p-2 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>{notes.length} note{notes.length !== 1 ? 's' : ''}</span>
          <span>Quick Notes v1.0</span>
        </div>
      </div>
    </div>
  );
};

export default ChromeExtensionPopup;
