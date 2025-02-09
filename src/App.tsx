import React, { useState } from 'react';
import { CalendarEvent } from './types';
import { EventForm } from './components/EventForm';
import { EventList } from './components/EventList';
import { Calendar as CalendarIcon, Plus, Rss } from 'lucide-react';

function App() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);

  const handleSubmit = (eventData: Partial<CalendarEvent>) => {
    if (editingEvent) {
      setEvents(events.map(event => 
        event.id === editingEvent.id ? { ...eventData, id: event.id } as CalendarEvent : event
      ));
    } else {
      const newEvent: CalendarEvent = {
        ...eventData,
        id: crypto.randomUUID(),
      } as CalendarEvent;
      setEvents([...events, newEvent]);
    }
    setIsFormOpen(false);
    setEditingEvent(null);
  };

  const handleEdit = (event: CalendarEvent) => {
    setEditingEvent(event);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Möchten Sie diesen Termin wirklich löschen?')) {
      setEvents(events.filter(event => event.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <CalendarIcon className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-3xl font-bold text-gray-900">RSS Kalender</h1>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => {
                  setIsFormOpen(true);
                  setEditingEvent(null);
                }}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Neuer Termin
              </button>
              <button
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <Rss className="h-4 w-4 mr-2" />
                RSS Feed
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {isFormOpen ? (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">
              {editingEvent ? 'Termin bearbeiten' : 'Neuer Termin'}
            </h2>
            <EventForm
              event={editingEvent || {}}
              onSubmit={handleSubmit}
              onCancel={() => {
                setIsFormOpen(false);
                setEditingEvent(null);
              }}
            />
          </div>
        ) : (
          <EventList
            events={events}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </main>
    </div>
  );
}

export default App;
