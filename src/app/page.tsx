import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1 className="text-2xl">Hertz Alertz</h1>
        <Link href="/subscriptions">Show my subscriptions</Link>
      </div>
    </main>
  );
}
