"use client";

import { useEffect, useState } from "react";
import { getWordPressPosts } from "@/lib/wordpress";

interface WordPressPost {
  ID: number;
  title: string;
  URL: string;
  date: string;
  content: string;
  excerpt: string;
}

export default function AdminDashboard() {
  const [posts, setPosts] = useState<WordPressPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadPosts() {
      try {
        const data = await getWordPressPosts();

        setPosts(data.posts || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load WordPress content.");
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, []);

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-6 md:p-10">

      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-10">
          <p className="font-mono text-xs uppercase tracking-widest text-cyan-300">
            NANDAN CMS
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            WordPress Content
          </h1>

          <p className="mt-2 text-zinc-400">
            Content currently stored in your WordPress CMS.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <p className="text-cyan-300">
              Loading WordPress content...
            </p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6">
            <p className="text-red-300">
              {error}
            </p>
          </div>
        )}

        {/* Posts */}
        {!loading && !error && (
          <div className="space-y-5">

            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                WordPress Posts
              </h2>

              <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs text-cyan-300">
                {posts.length} posts
              </span>
            </div>

            {posts.length === 0 ? (
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
                <p className="text-zinc-400">
                  No WordPress posts found.
                </p>
              </div>
            ) : (
              <div className="grid gap-5 md:grid-cols-2">

                {posts.map((post) => (
                  <div
                    key={post.ID}
                    className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition hover:border-cyan-400/40"
                  >

                    <div className="mb-4">
                      <p className="text-xs font-mono text-cyan-300">
                        POST #{post.ID}
                      </p>

                      <h3 className="mt-2 text-xl font-bold">
                        {post.title}
                      </h3>
                    </div>

                    <p className="text-sm text-zinc-400">
                      Published:{" "}
                      {new Date(post.date).toLocaleDateString()}
                    </p>

                    <div className="mt-5 flex gap-3">
  <button
    className="rounded-lg bg-cyan-400 px-4 py-2 text-sm font-semibold text-black hover:bg-cyan-300"
  >
    Edit
  </button>

  <button
    className="rounded-lg border border-red-500/40 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10"
  >
    Delete
  </button>
</div>

                  </div>
                ))}

              </div>
            )}

          </div>
        )}

      </div>

    </main>
  );
}
