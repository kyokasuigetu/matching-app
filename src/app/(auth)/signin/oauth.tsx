import {
  GoogleAuthButton,
  FacebookAuthButton,
  LineAuthButton,
} from "@/components/auth";

export function OAuth() {

  return (
    <div className="grid grid-cols-1 gap-5 max-w-[400px]">
      {/* Google */}
      <GoogleAuthButton />

      {/* Facebook */}
      <FacebookAuthButton />

      {/* LINE */}
      <LineAuthButton />
    </div>
  );
}
