import { Header } from '@/components/app/Header';
import { FamilyTreeContainer } from '@/components/app/FamilyTreeContainer';
import { initialFamilyData } from '@/lib/family-data';

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <FamilyTreeContainer initialData={initialFamilyData} />
          </div>
        </section>
      </main>
      <footer className="bg-card text-center py-4">
        <p className="text-sm text-primary font-bold">App Developed By Hasan Chobarawala +91-99266-52153</p>
      </footer>
    </div>
  );
}
