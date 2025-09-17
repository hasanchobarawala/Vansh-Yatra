"use client";

// If your AuthForm lives in src/components/ui/AuthForm.tsx keep this:
import AuthForm from "@/components/ui/AuthForm";

export default function HomePage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-900 text-white px-6 pt-6">
      {/* Custom 2-column grid:
          - Left: fixed wide (~52rem) so image can expand properly
          - Right: normal card width
      */}
      <div className="mx-auto w-full max-w-7xl grid grid-cols-1 md:grid-cols-[52rem_minmax(18rem,1fr)] gap-6 items-start">
        {/* LEFT: title + desc (narrower) + image (wider) */}
        <div className="space-y-3">
          <h1 className="text-4xl font-bold text-yellow-400">Vansh Yatra</h1>

          {/* Text container kept narrower so paragraph width doesn't grow */}
          <div className="max-w-[44rem]">
            <p className="text-gray-300 text-justify leading-relaxed">
              वंश यात्रा एक अनोखा ऐप है जो आपके वंश की जानकारी को डिजिटल रूप में सुरक्षित करता।
              इस ऐप के माध्यम से आप अपने पूर्वजों की पीढ़ी-दर-पीढ़ी जानकारी एक ही स्थान पर जोड़ सकते हैं।
              परिवार वृक्ष (फैमिली ट्री) के रूप में सभी रिश्तों को सहज रूप से देखा जा सकता है।
              यह ऐप परिवार को जोड़ने, विरासत को संजोने और आने वाली पीढ़ियों को अपनी जड़ों से जोड़ने का माध्यम है।
            </p>
          </div>

          {/* Image: left-aligned, height fixed 60vh, width fills left column */}
          <div className="mt-2">
            <img
              src="/family-tree.png"
              alt="Family Tree"
              className="h-[60vh] w-[48rem] max-w-full object-contain rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* RIGHT: Login (unchanged) */}
        <div className="flex md:justify-end">
          <div className="w-full max-w-sm rounded-lg shadow-lg border border-yellow-600 bg-yellow-500/95 p-5">
            <AuthForm />
          </div>
        </div>
      </div>
    </div>
  );
}
