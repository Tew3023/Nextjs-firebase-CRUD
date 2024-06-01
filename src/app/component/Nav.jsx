import Link from "next/link";
export default function Nav() {
  return (
    <div className="flex justify-center py-2 shadow-teal-500 border-b-2">
      <Link className="px-2" href="/">Gallery</Link>
      <Link className="px-2" href="/cart">Cart</Link>
    </div>
  );
}
