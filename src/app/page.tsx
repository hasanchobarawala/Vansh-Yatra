"use client";

import AuthForm from "@/components/ui/AuthForm";

export default function HomePage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-900 text-white px-6 pt-6">
      <div className="mx-auto w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
        {/* LEFT */}
        <div className="space-y-4">
          {/* Heading */}
          <h1 className="text-4xl font-bold text-yellow-400">Vansh Yatra</h1>

          {/* Caption */}
          <p className="text-2xl font-semibold text-yellow-300">
            जानो अपनी जड़ें, पहचानो अपना वंश
          </p>

          {/* Description */}
          <p className="text-gray-300 text-justify leading-relaxed">
            वंश यात्रा एक अनोखा ऐप है जो आपके वंश की जानकारी को डिजिटल रूप में सुरक्षित करता।
            इस ऐप के माध्यम से आप अपने पूर्वजों की पीढ़ी-दर-पीढ़ी जानकारी एक ही स्थान पर जोड़ सकते हैं।
            परिवार वृक्ष (फैमिली ट्री) के रूप में सभी रिश्तों को सहज रूप से देखा जा सकता है।
            यह ऐप परिवार को जोड़ने, विरासत को संजोने और आने वाली पीढ़ियों को अपनी जड़ों से जोड़ने का माध्यम है।
          </p>

          {/* Image (सबसे last) */}
          <div className="mt-2 flex justify-start">
            <img
              src="/family-tree.png"
              alt="Family Tree"
              className="h-[50vh] w-auto max-w-full object-contain rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* RIGHT: Login */}
        <div className="flex md:justify-end">
          <div className="w-full max-w-sm rounded-lg shadow-lg border border-yellow-600 bg-yellow-500/95 p-5">
            <AuthForm />
          </div>
        </div>
      </div>
    </div>
  );
}
