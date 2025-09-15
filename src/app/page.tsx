"use client";

import StartButton from "./src/app/tree/src/components/StartButton";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Main content */}
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-5xl font-bold text-yellow-600 mb-2">
          Vansh Yatra
        </h1>
        <p className="text-lg text-gray-300 mb-8">
          जानो अपनी जड़ें, बनाओ अपना वंश।
        </p>

        <p className="max-w-2xl text-gray-200 mb-10">
          वंश यात्रा एक अनोखा ऐप है जो आपके कुल व वंश की जानकारी को
          डिजिटल रूप में संरक्षित करता है। इस ऐप के माध्यम से आप अपने पूर्वजों की
          पीढ़ी-दर-पीढ़ी जानकारी एक ही स्थान पर जोड़ सकते हैं। परिवार वृक्ष
          (फैमिली ट्री) के रूप में सभी रिश्तों को सहज रूप से देखा जा सकता है। हर
          सदस्य की जन्म-तिथि, फोटो, और जीवन से जुड़ी बातें जोड़ना बहुत आसान है।
          यह ऐप परिवार को जोड़ने, विरासत को संजोने और आने वाली पीढ़ियों को अपनी
          जड़ों से जोड़ने का माध्यम है।
        </p>

        <StartButton />

        <p className="mt-6 text-sm text-gray-400">
          Your family tree is empty. Click the button to begin your Family Journey.
        </p>
      </main>

      {/* Footer */}
      <footer className="bg-black text-gray-400 text-sm text-center py-4 border-t border-gray-800">
        App Developed by Hasan Chobarawala -91-9926652153
      </footer>
    </div>
  );
}
