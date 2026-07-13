import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { AdminShell } from "@/components/admin/AdminShell";
import { adminListMessages, adminSetMessageRead, adminDeleteMessage, adminGetSettings } from "@/lib/admin.functions";

export const Route = createFileRoute("/_authenticated/admin/messages")({
  component: MessagesAdmin,
  head: () => ({ meta: [{ title: "الرسائل | إتقان" }, { name: "robots", content: "noindex" }] }),
});

function MessagesAdmin() {
  const listFn = useServerFn(adminListMessages);
  const readFn = useServerFn(adminSetMessageRead);
  const delFn = useServerFn(adminDeleteMessage);
  const settingsFn = useServerFn(adminGetSettings);
  const qc = useQueryClient();

  const { data: msgs } = useQuery({ queryKey: ["admin-messages"], queryFn: () => listFn() });
  const { data: settings } = useQuery({ queryKey: ["admin-settings"], queryFn: () => settingsFn() });

  const readMut = useMutation({
    mutationFn: (p: { id: string; is_read: boolean }) => readFn({ data: p }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-messages"] }); qc.invalidateQueries({ queryKey: ["admin-overview"] }); },
  });
  const delMut = useMutation({
    mutationFn: (id: string) => delFn({ data: { id } }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-messages"] }); qc.invalidateQueries({ queryKey: ["admin-overview"] }); },
  });

  return (
    <AdminShell title="الرسائل الواردة">
      <div className="space-y-3">
        {(msgs ?? []).length === 0 && <p className="text-black/50">لا توجد رسائل بعد.</p>}
        {(msgs ?? []).map((m: any) => {
          const waMsg = encodeURIComponent(`مرحباً ${m.name}، بخصوص طلبك على موقع إتقان...`);
          const waLink = `https://wa.me/${m.phone.replace(/[^0-9]/g, "")}?text=${waMsg}`;
          return (
            <div key={m.id} className={`rounded-2xl border p-5 ${m.is_read ? "bg-white/60 border-black/10" : "bg-white border-[#c9974f]/40 shadow-sm"}`}>
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-lg">{m.name}</span>
                    {!m.is_read && <span className="rounded-full bg-red-500 text-white text-[10px] px-2 py-0.5">جديدة</span>}
                  </div>
                  <div className="text-sm text-black/60" dir="ltr">{m.phone}</div>
                  {m.city && <div className="text-xs text-black/50">{m.city}</div>}
                </div>
                <div className="text-xs text-black/50">{new Date(m.created_at).toLocaleString("ar-EG")}</div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs mb-3">
                {m.project_types?.length > 0 && <Info label="النوع" value={m.project_types.join("، ")} />}
                {m.style && <Info label="النمط" value={m.style} />}
                {m.budget && <Info label="الميزانية" value={m.budget} />}
                {m.wood && <Info label="الخشب" value={m.wood} />}
              </div>
              {m.description && <p className="text-sm bg-black/5 rounded-lg p-3 mb-3">{m.description}</p>}
              <div className="flex flex-wrap gap-2">
                <a href={waLink} target="_blank" rel="noreferrer" className="rounded-lg bg-[#25d366] text-white px-4 py-2 text-sm font-bold">💬 رد على واتساب</a>
                <a href={`tel:${m.phone}`} className="rounded-lg bg-black/5 px-4 py-2 text-sm">📞 اتصال</a>
                <button onClick={() => readMut.mutate({ id: m.id, is_read: !m.is_read })} className="rounded-lg bg-black/5 px-4 py-2 text-sm">
                  {m.is_read ? "تحديد كغير مقروءة" : "تحديد كمقروءة"}
                </button>
                <button onClick={() => { if (confirm("حذف الرسالة؟")) delMut.mutate(m.id); }} className="rounded-lg bg-red-500/10 text-red-700 px-4 py-2 text-sm">حذف</button>
              </div>
            </div>
          );
        })}
      </div>
      {settings && (
        <p className="mt-6 text-xs text-black/40">رقم الواتساب الحالي للاستقبال: {settings.whatsapp_display}</p>
      )}
    </AdminShell>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return <div className="bg-black/5 rounded-lg px-3 py-1.5"><span className="text-black/50">{label}:</span> <span className="font-bold">{value}</span></div>;
}
