"use client";

import AuthForm from "@/components/ui/AuthForm";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-black text-center px-4">
      {/* Hero Section */}
      <h1 className="text-5xl font-bold text-yellow-500 mb-4">Vansh Yatra</h1>
      <p className="text-xl text-white mb-8">जानो अपनी जड़ें, बनाओ अपना वंश।</p>
      
      <p className="max-w-2xl text-white mb-8">
        वंश यात्रा एक अनोखा ऐप है जो आपके कुल व वंश की जानकारी को डिजिटल रूप में सुरक्षित करता है। 
        इस ऐप के माध्यम से आप अपने पूर्वजों की पीढ़ी-दर-पीढ़ी जानकारी एक ही स्थान पर जोड़ सकते हैं। 
        परिवार वृक्ष (फैमिली ट्री) के रूप में सभी रिश्तों को सहज रूप से देखा जा सकता है। 
        यह ऐप परिवार को जोड़ने, विरासत को संजोने और आने वाली पीढ़ियों को अपनी जड़ों से जोड़ने का माध्यम है।
      </p>

      {/* Auth Form */}
      <div className="mb-8">
        <AuthForm />
      </div>

      {/* Start Tree Button */}
      <button
        onClick={() => router.push("/tree")}
        className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-6 rounded"
      >
        Start Building Your Tree
      </button>

      {/* Info */}
      <p className="text-gray-400 mt-4">
        Your family tree is empty. Click the button to begin your Family Journey.
      </p>
    </main>
  );
}
