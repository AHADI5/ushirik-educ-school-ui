import React, { useState } from 'react';

const CreateCommuniqueModal = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [recipients, setRecipients] = useState([]);
  const [content, setContent] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [dateTime, setDateTime] = useState('');
  const [error, setError] = useState(null);
//   const [selectedType , selectedType] = useState([]) ;

  const handleSend = async (e) => {
    e.preventDefault();

    // Validate input fields
    if (!title.trim() || recipients.length === 0 || !content.trim() || !dateTime) {
      setError('Please fill in all fields');
      return;
    }

    // Prepare data to send
    const data = {
      title,
      recipients,
      content,
      attachments,
      dateTime
    };

    try {
      // Send data to API endpoint
      const response = await fetch('YOUR_API_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Failed to send communiqué');
      }

      // Close modal on successful send
      onClose();
    } catch (error) {
      console.error('Error sending communiqué:', error.message);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <div className={`fixed z-10 inset-0 overflow-y-auto ${isOpen ? 'block' : 'hidden'}`}>
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <form onSubmit={handleSend}>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-2">Créer un Communiqué</h3>
                  <div className="mt-2">
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    <div className="mb-4">
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Objet</label>
                      <input
                        type="text"
                        name="title"
                        id="title"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="recipients" className="block text-sm font-medium text-gray-700 mb-1">Recipients</label>
                      <select
                        id="recipients"
                        name="recipients"
                        multiple
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        value={recipients}
                        onChange={(e) => setRecipients(Array.from(e.target.selectedOptions, option => option.value))}
                      >
                        <option value="all">All</option>
                        <option value="levels">All Teachers</option>
                        <option value="sections">All Students</option>
                        <option value="selected_parents"></option>
                      </select>
                    </div>
                    <div className="mb-4">
                      <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                      <textarea
                        id="content"
                        name="content"
                        rows="3"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                      ></textarea>
                    </div>
                    <div className="mb-4">
                      <label htmlFor="attachments" className="block text-sm font-medium text-gray-700 mb-1">Attachments</label>
                      <input
                        type="file"
                        id="attachments"
                        name="attachments"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        onChange={(e) => setAttachments(Array.from(e.target.files))}
                        multiple
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="datetime" className="block text-sm font-medium text-gray-700 mb-1">Date and Time</label>
                      <input
                        type="datetime-local"
                        id="datetime"
                        name="datetime"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        value={dateTime}
                        onChange={(e) => setDateTime(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="submit"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Send
              </button>
              <button
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCommuniqueModal;
