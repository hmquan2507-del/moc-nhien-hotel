"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setErrorMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setErrorMessage("Email hoặc mật khẩu chưa đúng.");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-ivory px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md rounded-2xl border border-moss/10 bg-white p-6 shadow-lg"
      >
        <h1 className="text-2xl font-bold text-moss">Đăng nhập admin</h1>
        <p className="mt-2 text-sm text-olive">
          Quản lý đặt phòng Mộc Nhiên Hotel.
        </p>

        <div className="mt-6 grid gap-4">
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
            className="min-h-12 rounded-xl border border-moss/10 bg-ivory px-4"
          />

          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Mật khẩu"
            className="min-h-12 rounded-xl border border-moss/10 bg-ivory px-4"
          />

          {errorMessage && (
            <p className="rounded-lg bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="min-h-12 rounded-full bg-moss px-5 font-bold text-white disabled:opacity-70"
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </div>
      </form>
    </main>
  );
}
