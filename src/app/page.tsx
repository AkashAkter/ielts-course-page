// app/page.tsx
import { fetchProductData } from "@/lib/api";

export default async function HomePage() {
  const data = await fetchProductData("en"); // or "bn"

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">API Test Result</h1>
      {data ? (
        <pre className="bg-gray-100 text-sm p-4 rounded overflow-x-auto">
          {JSON.stringify(data, null, 2)}
        </pre>
      ) : (
        <p className="text-red-500">Failed to fetch data.</p>
      )}
    </main>
  );
}
