import BrandMark from "./BrandMark";

type HeaderProps = {
  title: string;
};

export default function Header({title}: HeaderProps) {
  return (
    <header className="w-full max-w-5xl mb-6 flex items-center justify-between gap-2 flex-wrap">
      <BrandMark />

      <h1>{title}</h1>

      <button>Sign Out</button>
    </header>
  )
}