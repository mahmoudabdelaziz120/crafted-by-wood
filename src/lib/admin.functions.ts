import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";

async function requireAdmin(ctx: { supabase: any; userId: string }) {
  const { data, error } = await ctx.supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", ctx.userId)
    .eq("role", "admin")
    .maybeSingle();
  if (error || !data) throw new Error("Forbidden: admins only");
}

export const adminGetOverview = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await requireAdmin(context);
    const [msgs, unread, services] = await Promise.all([
      context.supabase.from("contact_messages").select("*").order("created_at", { ascending: false }).limit(5),
      context.supabase.from("contact_messages").select("id", { count: "exact", head: true }).eq("is_read", false),
      context.supabase.from("services").select("id", { count: "exact", head: true }),
    ]);
    return {
      recentMessages: msgs.data ?? [],
      unreadCount: unread.count ?? 0,
      servicesCount: services.count ?? 0,
    };
  });

export const adminGetSettings = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await requireAdmin(context);
    const { data } = await context.supabase.from("site_settings").select("*").eq("id", 1).maybeSingle();
    return data;
  });

const settingsSchema = z.object({
  hero_title: z.string().min(1).max(200),
  hero_subtitle: z.string().min(1).max(500),
  hero_cta_primary: z.string().min(1).max(50),
  hero_cta_secondary: z.string().min(1).max(50),
  whatsapp_phone: z.string().min(5).max(30),
  whatsapp_display: z.string().min(5).max(30),
  stat_projects: z.string().max(20),
  stat_years: z.string().max(20),
  stat_ontime: z.string().max(20),
  stat_wood: z.string().max(20),
});

export const adminUpdateSettings = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => settingsSchema.parse(input))
  .handler(async ({ context, data }) => {
    await requireAdmin(context);
    const { error } = await context.supabase.from("site_settings").update(data).eq("id", 1);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const adminListServices = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await requireAdmin(context);
    const { data } = await context.supabase.from("services").select("*").order("order_index");
    return data ?? [];
  });

const serviceSchema = z.object({
  id: z.string().uuid(),
  label_ar: z.string().min(1).max(100),
  label_en: z.string().min(1).max(100),
  tagline: z.string().max(300).nullable().optional(),
  hero_title: z.string().max(300).nullable().optional(),
  hero_sub: z.string().max(1000).nullable().optional(),
  intro: z.string().max(3000).nullable().optional(),
  hero_image_url: z.string().max(2000).nullable().optional(),
  is_active: z.boolean(),
  order_index: z.number().int(),
});

export const adminUpdateService = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => serviceSchema.parse(input))
  .handler(async ({ context, data }) => {
    await requireAdmin(context);
    const { id, ...rest } = data;
    const { error } = await context.supabase.from("services").update(rest).eq("id", id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const adminListMessages = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await requireAdmin(context);
    const { data } = await context.supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(200);
    return data ?? [];
  });

export const adminSetMessageRead = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z.object({ id: z.string().uuid(), is_read: z.boolean() }).parse(input),
  )
  .handler(async ({ context, data }) => {
    await requireAdmin(context);
    const { error } = await context.supabase
      .from("contact_messages")
      .update({ is_read: data.is_read })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const adminDeleteMessage = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ context, data }) => {
    await requireAdmin(context);
    const { error } = await context.supabase.from("contact_messages").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const adminListGallery = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ slug: z.string() }).parse(input))
  .handler(async ({ context, data }) => {
    await requireAdmin(context);
    const { data: rows } = await context.supabase
      .from("gallery_images")
      .select("*")
      .eq("service_slug", data.slug)
      .order("order_index");
    return rows ?? [];
  });

export const adminAddGalleryImage = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z.object({
      service_slug: z.string().min(1).max(60),
      image_url: z.string().url().max(2000),
      title: z.string().max(200).optional().nullable(),
      description: z.string().max(1000).optional().nullable(),
      order_index: z.number().int().default(0),
    }).parse(input),
  )
  .handler(async ({ context, data }) => {
    await requireAdmin(context);
    const { error } = await context.supabase.from("gallery_images").insert(data);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const adminDeleteGalleryImage = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ context, data }) => {
    await requireAdmin(context);
    const { error } = await context.supabase.from("gallery_images").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
