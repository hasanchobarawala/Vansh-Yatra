// src/app/page.tsx
import AuthForm from "@/components/ui/AuthForm";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-[88vh] w-full grid grid-cols-1 md:grid-cols-2 items-center gap-10 px-6 md:px-10 lg:px-20">
      {/* LEFT: Heading + Text + CTA */}
      <section className="text-center md:text-left">
        <h1 className="text-5xl md:text-6xl font-extrabold text-yellow-400 mb-3">
          Vansh Yatra
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8">
          जानो अपनी जड़ें, बनाओ अपना वंश।
        </p>

        <p className="max-w-2xl mx-auto md:mx-0 text-gray-300 leading-8 mb-8">
          वंश यात्रा एक अनोखा ऐप है जो आपके कुल व वंश की जानकारी को डिजिटल रूप
          में सुरक्षित करता है। इस ऐप के माध्यम से आप अपने पूर्वजों की पीढ़ी-दर-पीढ़ी
          जानकारी एक ही स्थान पर जोड़ सकते हैं। परिवार वृक्ष (फैमिली ट्री) के रूप में
          सभी रिश्तों को सहज रूप से देखना बहुत आसान है।
        </p>

        <Link
          href="/tree"
          className="inline-block bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-3 rounded"
        >
          Start Building Your Tree
        </Link>

        <p className="mt-6 text-gray-400">
          Your family tree is empty. Click the button to begin your Family Journey.
        </p>
      </section>

      {/* RIGHT: Login / Signup (ONLY ONCE) */}
      <section className="max-w-md w-full mx-auto">
        <AuthForm />
      </section>
    </main>
  );
}
