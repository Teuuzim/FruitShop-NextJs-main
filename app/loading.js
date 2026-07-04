export default function Loading() {
  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8">
      <div className="skeleton h-5 w-36 rounded-full" />
      <div className="skeleton mt-5 h-16 max-w-2xl rounded-3xl" />
      <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2].map((item) => (
          <div key={item} className="overflow-hidden rounded-[2rem] bg-white">
            <div className="skeleton aspect-[4/3]" />
            <div className="space-y-3 p-5">
              <div className="skeleton h-7 w-2/3 rounded-full" />
              <div className="skeleton h-4 w-full rounded-full" />
              <div className="skeleton h-11 w-full rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
