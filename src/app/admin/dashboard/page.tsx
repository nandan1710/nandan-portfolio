"use client";

import { useEffect, useState } from "react";
import { getWordPressSite } from "@/lib/wordpress";

export default function AdminDashboard() {
  const [site, setSite] = useState<any>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function connectWordPress() {
      try {
        const data = await getWordPressSite();
        setSite(data);
      } catch (err) {
        console.error(err);
        setError("Could not connect to WordPress.");
      } finally {
        setLoading(false);
      }
    }

    connectWordPress();
  }, []);

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-10">
      <div className="mx-auto max-w-3xl">

        <h1 className="text-3xl font-bold">
          NANDAN CMS
        </h1>

        <p className="mt-2 text-zinc-400">
          WordPress Headless CMS Connection
        </p>

        <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

          {loading && (
            <p className="text-cyan-300">
              Connecting to WordPress...
            </p>
          )}

          {error && (
            <p className="text-red-400">
              {error}
            </p>
          )}

          {site && (
            <div className="space-y-4">

              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-green-400" />
                <span className="text-green-400 font-semibold">
                  WordPress Connected
                </span>
              </div>

              <div>
                <p className="text-xs text-zinc-500">
                  SITE NAME
                </p>

                <p className="text-lg">
                  {site.name}
                </p>
              </div>

              <div>
                <p className="text-xs text-zinc-500">
                  SITE ID
                </p>

                <p className="text-lg">
                  {site.ID}
                </p>
              </div>

              <div>
                <p className="text-xs text-zinc-500">
                  WORDPRESS URL
                </p>

                <p className="text-cyan-300">
                  {site.URL}
                </p>
              </div>

            </div>
          )}

        </div>

      </div>
    </main>
  );
}
