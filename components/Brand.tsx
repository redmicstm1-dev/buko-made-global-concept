import Image from "next/image";
import Link from "next/link";
export default function Brand() {
  return <Link href="/" className="brand" aria-label="Buko Made Global Concept home"><Image src="/images/brand/buko-made-logo.svg" alt="Buko Made Global Concept" width={320} height={84} priority /></Link>;
}
