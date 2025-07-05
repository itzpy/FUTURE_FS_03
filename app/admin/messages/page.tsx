'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Mail, Eye, Trash, Search, Filter, RefreshCw } from 'lucide-react';
import { ContactSubmission } from '@/lib/schema';

export default function MessagesAdmin() {
  const [messages, setMessages] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMessage, setViewMessage] = useState<ContactSubmission | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadMessages();
  }, []);

  async function loadMessages() {
    setLoading(true);
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error loading messages:', error);
    } else {
      setMessages(data || []);
    }
    
    setLoading(false);
  }

  async function deleteMessage(id: number) {
    if (!confirm('Are you sure you want to delete this message?')) return;

    try {
      const { error } = await supabase
        .from('contact_submissions')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      if (viewMessage?.id === id) {
        setViewMessage(null);
      }
      
      setMessages(messages.filter(msg => msg.id !== id));
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  }

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  const filteredMessages = messages.filter(msg => {
    // Apply search term
    const matchesSearch = 
      msg.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    // No additional filtering for 'all'
    if (filter === 'all') return matchesSearch;
    
    // Example filters (could be implemented with actual read/unread statuses in a real app)
    if (filter === 'read') return matchesSearch && (msg.id ?? 0) % 2 === 0; // Just an example
    if (filter === 'unread') return matchesSearch && (msg.id ?? 0) % 2 !== 0; // Just an example
    
    return matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-heading font-bold">Customer Messages</h1>
      
      {/* Search and filter bar */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="relative flex-grow max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={18} />
          <input
            type="text"
            className="pl-10 pr-4 py-2 rounded-lg border border-neutral-300 w-full focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Search messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-4">
          <div className="relative">
            <select
              className="pl-10 pr-4 py-2 rounded-lg border border-neutral-300 appearance-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Messages</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
            </select>
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={18} />
          </div>
          
          <button
            onClick={loadMessages}
            className="p-2 rounded-lg border border-neutral-300 hover:bg-neutral-100 transition"
          >
            <RefreshCw size={20} />
          </button>
        </div>
      </div>
      
      {/* Messages table and view panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Messages list */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow overflow-hidden">
          {filteredMessages.length > 0 ? (
            <table className="min-w-full">
              <thead className="bg-neutral-50 border-b">
                <tr>
                  <th className="py-3 px-4 text-left text-sm font-medium text-neutral-700">From</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-neutral-700">Subject</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-neutral-700">Date</th>
                  <th className="py-3 px-4 text-right text-sm font-medium text-neutral-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {filteredMessages.map(message => (
                  <tr 
                    key={message.id} 
                    className={`hover:bg-neutral-50 cursor-pointer ${viewMessage?.id === message.id ? 'bg-primary-50' : ''}`}
                    onClick={() => setViewMessage(message)}
                  >
                    <td className="py-3 px-4">
                      <div className="font-medium">{message.name}</div>
                      <div className="text-sm text-neutral-500">{message.email}</div>
                    </td>
                    <td className="py-3 px-4">
                      {message.subject}
                    </td>
                    <td className="py-3 px-4 text-neutral-500">
                      {message.created_at && formatDate(message.created_at)}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex justify-end space-x-2">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setViewMessage(message);
                          }}
                          className="p-1 bg-primary-100 text-primary-700 rounded hover:bg-primary-200"
                        >
                          <Eye size={18} />
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteMessage(message.id!);
                          }}
                          className="p-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
                        >
                          <Trash size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-8 text-center">
              <Mail className="h-12 w-12 mx-auto text-neutral-300 mb-4" />
              <h3 className="text-lg font-medium text-neutral-700 mb-2">No messages found</h3>
              <p className="text-neutral-500">There are no messages matching your filters.</p>
            </div>
          )}
        </div>
        
        {/* Message view panel */}
        <div className="bg-white rounded-xl shadow p-6">
          {viewMessage ? (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">{viewMessage.subject}</h3>
                <button 
                  onClick={() => deleteMessage(viewMessage.id!)}
                  className="p-1.5 bg-red-100 text-red-700 rounded hover:bg-red-200"
                >
                  <Trash size={18} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-neutral-500 text-sm">From:</p>
                  <p className="font-medium">{viewMessage.name}</p>
                  <p className="text-sm">{viewMessage.email}</p>
                </div>
                
                <div>
                  <p className="text-neutral-500 text-sm">Date:</p>
                  <p>{viewMessage.created_at && formatDate(viewMessage.created_at)}</p>
                </div>
                
                <div>
                  <p className="text-neutral-500 text-sm">Message:</p>
                  <div className="bg-neutral-50 p-4 rounded-lg mt-2 whitespace-pre-wrap">
                    {viewMessage.message}
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-neutral-200">
                <button className="btn-primary w-full">
                  Reply via Email
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <Mail className="h-16 w-16 text-neutral-300 mb-4" />
              <h3 className="text-lg font-medium text-neutral-700 mb-2">No message selected</h3>
              <p className="text-neutral-500">Select a message from the list to view its details.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
