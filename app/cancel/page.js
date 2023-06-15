import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="p-4 text-4xl">
        <i class="fa-solid fa-triangle-exclamation"></i>
      </div>
      <div>
        <Link href="/">Back Home</Link>
      </div>
    </div>
  );
}
