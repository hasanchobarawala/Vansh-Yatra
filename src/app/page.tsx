"use client";

// NOTE: aapke project me AuthForm yahin hai:
import AuthForm from "@/components/ui/AuthForm";
// agar aapke yahan path alag hai, sirf ye import line adjust कर लेना

export default function HomePage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-900 text-white px-6 pt-8">
      {/* Top row: Left = Title+Desc(+Image), Right = Login */}
      {/* Right column ko fixed width de रहे हैं; Left baaki full ले लेगा */}
      <div className="mx-auto w-full max-w-7xl grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_22rem] gap-8 items-start">
        {/* LEFT: Vansh Yatra + description + image (left-aligned, wider) */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-yellow-400">Vansh Yatra</h1>

          <p className="text-gray-300 text-justify leading-relaxed">
            वंश यात्रा एक अनोखा ऐप है जो आपके वंश की जानकारी को डिजिटल रूप में सुरक्षित करता।
            इस ऐप के माध्यम से आप अपने पूर्वजों की पीढ़ी-दर-पीढ़ी जानकारी एक ही स्थान पर जोड़ सकते हैं।
            परिवार वृक्ष (फैमिली ट्री) के रूप में सभी रिश्तों को सहज रूप से देखा जा सकता है।
            यह ऐप परिवार को जोड़ने, विरासत को संजोने और आने वाली पीढ़ियों को अपनी जड़ों से जोड़ने का माध्यम है।
          </p>

          {/* IMAGE: left aligned, अब left column चौड़ा है, तो image भी बड़ी होगी */}
          <div className="mt-2 w-full">
            <img
              src="/family-tree.png"
              alt="Family Tree"
              className="w-full max-h-[60vh] object-contain rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* RIGHT: Login (top-right, same yellow card) */}
        <div className="flex md:justify-end">
          <div className="w-full max-w-sm rounded-lg shadow-lg border border-yellow-600 bg-yellow-500/95 p-5">
            <AuthForm />
          </div>
        </div>
      </div>
    </div>
  );
}
