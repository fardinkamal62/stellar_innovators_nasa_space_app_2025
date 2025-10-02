'use client';
import { useState } from 'react';

const Navigation = () => {
  const [showAboutDialog, setShowAboutDialog] = useState(false);

  const toggleAboutDialog = () => {
    setShowAboutDialog(!showAboutDialog);
  };

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center z-20000">
      <div className="flex items-center">
        <h1 className="text-xl font-bold">Light Pollution Visualizer</h1>
        <span className="ml-4 text-sm bg-blue-600 px-2 py-1 rounded">NASA Space Apps Challenge</span>
      </div>

      <div className="flex space-x-4">
        <button
          className="px-3 py-1 bg-gray-800 rounded hover:bg-gray-700"
          onClick={toggleAboutDialog}
        >
          About
        </button>
      </div>

      {/* About Dialog */}
      {showAboutDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 text-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-bold">About Stellar Innovators DIU</h2>
              <button
                onClick={toggleAboutDialog}
                className="text-gray-400 hover:text-white focus:outline-none"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </button>
            </div>
            <a href="mailto:raselislam07575@gmail.com" className="text-blue-400 hover:underline text-sm" target='_blank'>raselislam07575@gmail.com</a>
            <div className="space-y-4 mt-4">
              <div>
                <h3 className="text-lg font-medium text-blue-400 mb-2">Our Mission</h3>
                <p className="text-gray-300">
                  Stellar Innovators DIU is dedicated to addressing light pollution through innovative data visualization and analytics.
                  Our mission is to raise awareness about the impact of light pollution on our environment and provide actionable
                  insights for communities and policymakers.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-blue-400 mb-2">The Team</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-700 p-3 rounded">
                    <h4 className="font-semibold">MD. Rasel Islam</h4>
                    <p className="text-sm text-gray-400">Team Leader | Researcher</p>
                  </div>
                  <div className="bg-gray-700 p-3 rounded">
                    <h4 className="font-semibold">Muhammad Iktear</h4>
                    <p className="text-sm text-gray-400">Backend Developer</p>
                  </div>
                  <div className="bg-gray-700 p-3 rounded">
                    <h4 className="font-semibold">Shihab Shariar</h4>
                    <p className="text-sm text-gray-400">Backend Developer</p>
                  </div>
                  <div className="bg-gray-700 p-3 rounded">
                    <h4 className="font-semibold">Maheer Alam</h4>
                    <p className="text-sm text-gray-400">UI-UX Developer</p>
                  </div>
                  <div className="bg-gray-700 p-3 rounded">
                    <h4 className="font-semibold">Fardin Kamal</h4>
                    <p className="text-sm text-gray-400">Frontend Developer</p>
                  </div>
                  <div className="bg-gray-700 p-3 rounded">
                    <h4 className="font-semibold">Sumaiya Akter</h4>
                    <p className="text-sm text-gray-400">Researcher</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-blue-400 mb-2">NASA Space Apps Challenge 2025</h3>
                <p className="text-gray-300">
                  This project was developed for the NASA Space Apps Challenge 2025, focusing on visualizing
                  and analyzing light pollution data using satellite imagery and machine learning techniques.
                </p>
              </div>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={toggleAboutDialog}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;