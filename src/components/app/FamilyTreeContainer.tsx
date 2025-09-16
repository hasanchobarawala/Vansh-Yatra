import React, { useState } from 'react';
import AddMemberForm from './AddMemberForm'; // ensure path correct ho
import Footer from '../ui/Footer';

const FamilyTreeContainer = () => {
  // State for Add Member modal
  const [showAddMember, setShowAddMember] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Vansh Yatra</h1>
        <div>
          <span className="mr-4">Username</span>
          <button
            className="px-4 py-2 bg-red-500 rounded hover:bg-red-600"
            onClick={() => alert('Logout clicked')}
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-4">
        <button
          onClick={() => setShowAddMember(true)}
          className="px-4 py-2 font-bold text-white bg-yellow-500 rounded hover:bg-yellow-600"
        >
          Add Member
        </button>

        {/* Add Member Modal */}
        {showAddMember && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
              <AddMemberForm onClose={() => setShowAddMember(false)} />
              <button
                onClick={() => setShowAddMember(false)}
                className="mt-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default FamilyTreeContainer;
