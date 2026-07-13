import { createFileRoute } from "@tanstack/react-router";

const ADMIN_EMAIL = "ahmed@alkashlan.com";
const ADMIN_PASSWORD = "123456789AHMED";

export const Route = createFileRoute("/api/public/bootstrap-admin")({
  server: {
    handlers: {
      GET: async () => {
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

        // Check if any user with admin role already exists
        const { data: existingRoles } = await supabaseAdmin
          .from("user_roles")
          .select("user_id")
          .eq("role", "admin")
          .limit(1);

        if (existingRoles && existingRoles.length > 0) {
          return Response.json({ ok: true, status: "already_seeded" });
        }

        // Try create user
        const { data: created, error: createErr } = await supabaseAdmin.auth.admin.createUser({
          email: ADMIN_EMAIL,
          password: ADMIN_PASSWORD,
          email_confirm: true,
        });

        let userId = created?.user?.id;

        if (createErr) {
          // Might already exist — try to find them
          const { data: list } = await supabaseAdmin.auth.admin.listUsers();
          const existing = list?.users.find((u) => u.email?.toLowerCase() === ADMIN_EMAIL);
          if (!existing) {
            return Response.json({ ok: false, error: createErr.message }, { status: 500 });
          }
          userId = existing.id;
        }

        if (!userId) {
          return Response.json({ ok: false, error: "no_user_id" }, { status: 500 });
        }

        const { error: roleErr } = await supabaseAdmin
          .from("user_roles")
          .upsert({ user_id: userId, role: "admin" }, { onConflict: "user_id,role" });

        if (roleErr) {
          return Response.json({ ok: false, error: roleErr.message }, { status: 500 });
        }

        return Response.json({ ok: true, status: "seeded", email: ADMIN_EMAIL });
      },
    },
  },
});
