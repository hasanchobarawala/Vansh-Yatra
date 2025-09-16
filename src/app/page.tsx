"use client";

import AuthForm from "@/components/ui/AuthForm";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl items-center">
        
        {/* Left: Vansh Yatra text */}
        <div className="text-left space-y-4">
          <h1 className="text-4xl font-bold text-yellow-400">Vansh Yatra</h1>
          <p className="text-gray-300">
            वंश यात्रा एक अनोखा ऐप है जो आपके कुल व वंश की जानकारी को डिजिटल रूप में सुरक्षित करता है। 
            इस ऐप के माध्यम से आप अपने पूर्वजों की पीढ़ी-दर-पीढ़ी जानकारी एक ही स्थान पर जोड़ सकते हैं। 
            परिवार वृक्ष (फैमिली ट्री) के रूप में सभी रिश्तों को सहज रूप से देखा जा सकता है। 
            यह ऐप परिवार को जोड़ने, विरासत को संजोने और आने वाली पीढ़ियों को अपनी जड़ों से जोड़ने का माध्यम है।
          </p>
        </div>

        {/* Center: Family Tree image */}
        <div className="flex justify-center">
          <img
            src="/family-tree.png"
            alt="Family Tree"
            className="max-h-72 object-contain rounded-lg shadow-lg"
          />
        </div>

        {/* Right: Login form */}
        <div className="flex justify-center">
          <div className="w-full max-w-sm bg-gray-800 p-6 rounded-lg shadow-lg">
            <AuthForm />
          </div>
        </div>
      </div>
    </div>
  );
}
