import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <main className="text-center my-10 space-y-5">
        <h1>Welocome to Matching App Demo!!</h1>
        <Button>
          <Link href="/login">
            Login
          </Link>
        </Button>
      </main>
    </>
  );
}
