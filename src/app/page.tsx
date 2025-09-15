"use client";

import StartButton from "@/components/StartButton";

export default function Home() {
  return (
    <div
      className="min-h-screen bg-black text-white flex flex-col items-center 
                 justify-start px-4 pt-12 pb-20 gap-4"
    >
      {/* Title */}
      <h1 className="text-5xl font-bold text-yellow-500 mb-2">
        Vansh Yatra
      </h1>
      <p className="text-lg text-gray-300 mb-4">
        जानो अपनी जड़ें, बनाओ अपना वंश।
      </p>

      {/* Description */}
      <p className="text-center max-w-3xl text-gray-300 mb-6 leading-relaxed">
        वंश यात्रा एक अनोखा ऐप है जो आपके कुल व वंश की जानकारी को
        डिजिटल रूप में संरक्षित करता है। इस ऐप के माध्यम से आप अपने
        पूर्वजों की पीढ़ी-दर-पीढ़ी जानकारी एक ही स्थान पर जोड़ सकते हैं।
        परिवार वृक्ष (फैमिली ट्री) के रूप में सभी रिश्तों को सहज रूप से देखा
        जा सकता है। हर सदस्य की जन्म-तिथि, फोटो, और जीवन से जुड़ी बातें
        जोड़ना बहुत आसान है। यह ऐप परिवार को जोड़ने, विरासत को संजोने और
        आने वाली पीढ़ियों को अपनी जड़ों से जोड़ने का माध्यम है।
      </p>

      {/* Start Button */}
      <StartButton />

      {/* Empty Tree Message */}
      <p className="text-sm text-gray-400 mt-4">
        Your family tree is empty. Click the button to begin your Family
        Journey.
      </p>
    </div>
  );
}
