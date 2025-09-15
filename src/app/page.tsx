// src/app/page.tsx
import AuthForm from "@/components/AuthForm";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Top-right auth (Login / Sign Up / Logout) */}
      <div className="w-full flex justify-end p-4">
        <AuthForm />
      </div>

      {/* Hero / Landing */}
      <section className="flex-1 flex flex-col items-center justify-center px-4 text-center">
        <h1 className="font-headline font-bold text-4xl md:text-6xl text-primary">
          Vansh Yatra
        </h1>

        <p className="mt-3 text-lg md:text-xl text-muted-foreground">
          जानो अपनी जड़ें, बनाओ अपना वंश।
        </p>

        <div className="mt-8 max-w-3xl text-left md:text-center leading-8 text-[17px] md:text-[18px]">
          वंश यात्रा एक अनोखा मोबाइल ऐप है जो आपके कुल व वंश की जानकारी को डिजिटल
          रूप में संरक्षित करता है। इस ऐप के माध्यम से आप अपने पूर्वजों की
          पीढ़ी-दर-पीढ़ी जानकारी एक ही स्थान पर जोड़ सकते हैं। परिवार वृक्ष
          (फैमिली ट्री) के रूप में सभी रिश्तों को सहज रूप से देखा जा सकता है। हर
          सदस्य की जन्म-तिथि, फोटो, और जीवन से जुड़ी बातें जोड़ना बहुत आसान है।
          यह ऐप परिवार को जोड़ने, विरासत को सहेजने और आने वाली पीढ़ियों को अपनी
          जड़ों से जोड़ने का माध्यम है।
        </div>

        <div className="mt-10">
          <a
            href="#start"
            className="inline-flex items-center px-6 py-3 rounded-md bg-primary text-primary-foreground font-medium"
          >
            Start Building Your Tree
          </a>
          <p className="mt-4 text-muted-foreground">
            Your family tree is empty. Click the button to begin your Family Journey.
          </p>
        </div>
      </section>
    </main>
  );
}
