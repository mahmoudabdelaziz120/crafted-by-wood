import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  ssr: false,
  component: AuthPage,
  head: () => ({ meta: [{ title: "تسجيل الدخول | إتقان" }, { name: "robots", content: "noindex" }] }),
});

function AuthPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("ahmed@alkashlan.com");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bootstrapping, setBootstrapping] = useState(true);

  useEffect(() => {
    // Bootstrap admin (idempotent) on first visit
    fetch("/api/public/bootstrap-admin").finally(() => setBootstrapping(false));
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) navigate({ to: "/admin" });
    });
  }, [navigate]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError("بيانات الدخول غير صحيحة");
      return;
    }
    navigate({ to: "/admin" });
  }

  return (
    <div
      dir="rtl"
      className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 55% 45% at 75% 25%, rgba(230,189,128,.16), transparent 60%), linear-gradient(180deg,#1c130c,#241a10 40%,#150e08 100%)",
      }}
    >
      <form
        onSubmit={submit}
        className="relative z-10 w-full max-w-md rounded-3xl p-10 border border-white/15 backdrop-blur-xl"
        style={{ background: "rgba(255,255,255,.06)", boxShadow: "0 30px 70px rgba(0,0,0,.45)" }}
      >
        <div
          className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-2xl text-3xl font-bold text-[#1c130b] shadow-lg"
          style={{ background: "linear-gradient(145deg, #e6bd80, #c9974f)", fontFamily: "Aref Ruqaa, serif" }}
        >
          إ
        </div>
        <h1 className="text-center text-2xl font-bold text-cream mb-1" style={{ fontFamily: "Aref Ruqaa, serif" }}>
          لوحة تحكم إتقان
        </h1>
        <p className="text-center text-sm text-cream-dim mb-8">تسجيل الدخول للمسؤول</p>

        <label className="block text-xs text-cream-dim mb-1.5">البريد الإلكتروني</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          dir="ltr"
          className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-cream placeholder:text-cream-dimmer focus:border-gold focus:outline-none mb-4"
        />

        <label className="block text-xs text-cream-dim mb-1.5">كلمة المرور</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          dir="ltr"
          className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-cream placeholder:text-cream-dimmer focus:border-gold focus:outline-none mb-6"
        />

        {error && <div className="mb-4 rounded-lg bg-red-500/15 border border-red-500/30 px-3 py-2 text-sm text-red-200">{error}</div>}

        <button
          type="submit"
          disabled={loading || bootstrapping}
          className="w-full rounded-xl bg-gold px-4 py-3 font-bold text-[#20140a] disabled:opacity-50 transition-transform hover:-translate-y-0.5"
        >
          {loading ? "جاري الدخول..." : bootstrapping ? "تجهيز..." : "دخول"}
        </button>

        <p className="mt-6 text-center text-xs text-cream-dimmer">اسم المستخدم: ahmed@alkashlan.com</p>
      </form>
    </div>
  );
}
