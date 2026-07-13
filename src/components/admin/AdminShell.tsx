import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import type { ReactNode } from "react";

const NAV = [
  { to: "/admin", label: "لوحة التحكم", icon: "📊" },
  { to: "/admin/hero", label: "الصفحة الرئيسية", icon: "🏠" },
  { to: "/admin/services", label: "الخدمات", icon: "🪵" },
  { to: "/admin/gallery", label: "معرض الصور", icon: "🖼" },
  { to: "/admin/messages", label: "الرسائل", icon: "✉️" },
] as const;

export function AdminShell({ title, children }: { title: string; children: ReactNode }) {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  return (
    <div dir="rtl" className="min-h-screen bg-[#f6efe1] text-[#2b1d10]" style={{ fontFamily: "Tajawal, sans-serif" }}>
      <div className="flex">
        <aside className="fixed inset-y-0 right-0 w-64 border-l border-black/10 bg-white/60 backdrop-blur-xl p-6 flex flex-col">
          <div className="flex items-center gap-3 mb-8">
            <div
              className="grid h-11 w-11 place-items-center rounded-xl text-xl font-bold text-[#1c130b] shadow"
              style={{ background: "linear-gradient(145deg,#e6bd80,#c9974f)", fontFamily: "Aref Ruqaa, serif" }}
            >
              إ
            </div>
            <div>
              <div className="font-bold" style={{ fontFamily: "Aref Ruqaa, serif" }}>إتقان</div>
              <div className="text-xs text-black/50">لوحة التحكم</div>
            </div>
          </div>
          <nav className="flex-1 space-y-1">
            {NAV.map((n) => {
              const active = pathname === n.to || (n.to !== "/admin" && pathname.startsWith(n.to));
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition-colors ${
                    active ? "bg-[#c9974f] text-white font-bold" : "text-[#2b1d10]/80 hover:bg-black/5"
                  }`}
                >
                  <span className="text-lg">{n.icon}</span>
                  {n.label}
                </Link>
              );
            })}
          </nav>
          <button
            onClick={signOut}
            className="mt-4 flex items-center gap-2 rounded-xl bg-black/5 hover:bg-black/10 px-4 py-3 text-sm transition-colors"
          >
            <span>🚪</span> تسجيل الخروج
          </button>
        </aside>

        <main className="mr-64 flex-1 p-8">
          <h1 className="text-3xl font-bold mb-6" style={{ fontFamily: "Aref Ruqaa, serif" }}>{title}</h1>
          {children}
        </main>
      </div>
    </div>
  );
}
