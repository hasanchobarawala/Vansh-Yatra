
const FamilyTreeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 3v1h18V3" />
    <path d="M12 4v17" />
    <path d="M12 9h4" />
    <path d="M12 13h-4" />
    <path d="M12 17h6" />
    <path d="M12 21h-2" />
    <path d="M6 9h2" />
    <path d="M8 13H6" />
    <path d="M18 17h2" />
    <path d="M10 21h2" />
  </svg>
)


export function Header() {
  return (
    <header className="flex h-16 items-center border-b bg-card px-4 md:px-6">
      <div className="flex items-center gap-3">
        <FamilyTreeIcon className="h-7 w-7 text-primary" />
        <h1 className="font-headline text-2xl font-bold tracking-tight text-foreground">
          Vansh Yatra
        </h1>
      </div>
    </header>
  );
}
