export default function StickyFooter() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50">
      <div className="w-full border-t border-yellow-700 bg-black/70 backdrop-blur">
        <p className="py-3 text-center font-bold text-yellow-400">
          App Developed by Hasan Chobarawala · +91-9926652153
        </p>
      </div>
    </div>
  );
}
