import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { AdminShell } from "@/components/admin/AdminShell";
import { adminGetOverview } from "@/lib/admin.functions";

export const Route = createFileRoute("/_authenticated/admin/")({
  component: AdminHome,
  head: () => ({ meta: [{ title: "لوحة التحكم | إتقان" }, { name: "robots", content: "noindex" }] }),
});

function AdminHome() {
  const fn = useServerFn(adminGetOverview);
  const { data, isLoading } = useQuery({ queryKey: ["admin-overview"], queryFn: () => fn() });

  return (
    <AdminShell title="لوحة التحكم">
      {isLoading ? (
        <p>جاري التحميل...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            <StatCard icon="✉️" label="رسائل غير مقروءة" value={String(data?.unreadCount ?? 0)} accent="#c1543b" />
            <StatCard icon="🪵" label="عدد الخدمات" value={String(data?.servicesCount ?? 0)} accent="#c9974f" />
            <StatCard icon="✅" label="حالة الموقع" value="نشط" accent="#3f8f5f" />
          </div>

          <div className="rounded-3xl bg-white/70 border border-black/10 p-6">
            <h2 className="text-xl font-bold mb-4" style={{ fontFamily: "Aref Ruqaa, serif" }}>آخر الرسائل</h2>
            {(data?.recentMessages ?? []).length === 0 ? (
              <p className="text-black/50 text-sm">لا توجد رسائل بعد.</p>
            ) : (
              <ul className="space-y-2">
                {data!.recentMessages.map((m: any) => (
                  <li key={m.id} className="flex items-center justify-between rounded-xl bg-white px-4 py-3 border border-black/5">
                    <div>
                      <div className="font-bold">{m.name}</div>
                      <div className="text-xs text-black/50" dir="ltr">{m.phone}</div>
                    </div>
                    {!m.is_read && <span className="rounded-full bg-red-500 text-white text-xs px-2 py-0.5">جديدة</span>}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </AdminShell>
  );
}

function StatCard({ icon, label, value, accent }: { icon: string; label: string; value: string; accent: string }) {
  return (
    <div className="rounded-3xl bg-white/70 border border-black/10 p-6 flex items-center gap-4">
      <div className="grid h-14 w-14 place-items-center rounded-2xl text-2xl" style={{ background: accent + "22", color: accent }}>
        {icon}
      </div>
      <div>
        <div className="text-3xl font-bold" style={{ fontFamily: "Poppins, sans-serif" }}>{value}</div>
        <div className="text-sm text-black/60">{label}</div>
      </div>
    </div>
  );
}
