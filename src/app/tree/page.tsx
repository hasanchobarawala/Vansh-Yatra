import FamilyTreeContainer from "@/components/app/FamilyTreeContainer";

export default function TreePage() {
  return (
    <main className="min-h-screen bg-black text-white px-4 py-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-center text-4xl font-extrabold text-yellow-500">
          आपका Family Tree
        </h1>
        <p className="mt-2 text-center text-gray-300">
          यहाँ आप अपने परिवार के सदस्यों को जोड़ और देख सकते हैं।
        </p>

        <div className="mt-8">
          <FamilyTreeContainer />
        </div>

        <footer className="mt-16 text-center text-sm text-gray-400">
          App Developed by Hasan Chobarawala · +91-9926652153
        </footer>
      </div>
    </main>
  );
}
