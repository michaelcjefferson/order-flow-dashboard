import BrandMark from "./BrandMark";
import NavBar from "./NavBar";

type HeaderProps = {
  title: string;
};

export default function Header({title}: HeaderProps) {
  return (
    <header className="w-full max-w-5xl mb-6 flex items-center justify-between gap-2 flex-wrap">
      <BrandMark />

      <h1 className="text-2xl sm:text-3xl mb-2 hidden sm:inline">{title}</h1>

      <NavBar />
    </header>
  )
}