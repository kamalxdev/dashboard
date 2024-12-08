
export default function Header() {
  return (
    <header className="sticky h-14 w-full px-5 lg:px-10 pt-2 inline-flex items-center gap-5 text-white">
      <a href="/" className=" relative w-fit h-full flex gap-3 items-center">
        <img src="/logo.png" alt="Logo" className="relative h-full rounded-sm p-1" />
        <h1 className="text-lg font-semibold">Dashboard</h1>
      </a>
    </header>
  );
}
