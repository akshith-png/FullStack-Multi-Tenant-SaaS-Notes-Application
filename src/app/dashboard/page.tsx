'use client';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [plan, setPlan] = useState('free');
  const [token, setToken] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('token');
    if (!stored) return;
    setToken(stored);
    fetchNotes(stored);
  }, []);

  async function fetchNotes(jwt: string) {
    const res = await fetch('/api/notes', {
      headers: { Authorization: `Bearer ${jwt}` }
    });
    const data = await res.json();
    setNotes(data.notes || []);
    setPlan(data.plan || 'free');
  }

  async function createNote() {
    if (!newNote.trim()) return;
    const res = await fetch('/api/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ content: newNote })
    });
    if (res.ok) {
      setNewNote('');
      fetchNotes(token);
    }
  }

  async function deleteNote(id: string) {
    await fetch(`/api/notes/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchNotes(token);
  }

  async function upgradeTenant() {
    const res = await fetch('/api/tenants/acme/upgrade', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) fetchNotes(token);
  }

  return (
    <div style={{ padding: 40 }}>
      <h2>Dashboard</h2>
      <p>Plan: {plan}</p>

      {plan === 'free' && notes.length >= 3 ? (
        <button onClick={upgradeTenant}>Upgrade to Pro</button>
      ) : (
        <>
          <input
            type="text"
            placeholder="New note"
            value={newNote}
            onChange={e => setNewNote(e.target.value)}
          />
          <button onClick={createNote}>Add Note</button>
        </>
      )}

      <ul>
        {notes.map((note: any) => (
          <li key={note.id}>
            {note.content}
            <button onClick={() => deleteNote(note.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}