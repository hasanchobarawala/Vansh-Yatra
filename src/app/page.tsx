import Link from "next/link";
import AuthForm from "@/components/ui/AuthForm";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Top container */}
      <div className="mx-auto max-w-6xl px-4 py-10 grid grid-cols-1 md:grid-cols-[1fr,340px] gap-10">
        {/* Hero */}
        <section className="flex flex-col items-center text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-yellow-500">
            Vansh Yatra
          </h1>
          <p className="mt-3 text-xl text-gray-300">
            जानो अपनी जड़ें, बनाओ अपना वंश।
          </p>

          <p className="mt-8 max-w-3xl leading-7 text-gray-200">
            वंश यात्रा एक अनोखा मोबाइल ऐप है जो आपके कुल व वंश की जानकारी को डिजिटल
            रूप में सुरक्षित करता है। इस ऐप के माध्यम से आप अपने पूर्वजों की पीढ़ी-दर-पीढ़ी
            जानकारी एक ही स्थान पर जोड़ सकते हैं। परिवार वृक्ष के रूप में सभी
            रिश्तों को सहज रूप से देखना बहुत आसान है।
          </p>

          <Link
            href="/tree"
            className="mt-10 inline-block rounded bg-yellow-500 px-6 py-3 font-semibold text-black hover:bg-yellow-400"
          >
            Start Building Your Tree
          </Link>

          <p className="mt-6 text-gray-400">
            Your family tree is empty. Click the button to begin your Family Journey.
          </p>

          <footer className="mt-16 text-sm text-gray-400">
            App Developed by Hasan Chobarawala · +91-9926652153
          </footer>
        </section>

        {/* Right column – Auth */}
        <aside className="md:mt-8">
          <div className="rounded-lg border border-gray-800 bg-gray-900/60 p-4">
            <AuthForm />
          </div>
        </aside>
      </div>
    </main>
  );
}
