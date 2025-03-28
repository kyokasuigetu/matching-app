import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <main className="text-center my-10 space-y-5">
        <h1>Welocome to Matching App Demo!!</h1>
        <div className="grid grid-cols-1 mx-auto max-w-xs gap-5">
          <Link className="w-full" href="/login">
            <Button className="w-full">Login</Button>
          </Link>
          <Link className="w-full" href="/register">
            <Button className="w-full">Register</Button>
          </Link>
        </div>
      </main>
    </>
  );
}
