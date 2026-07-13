
-- =========================================================
-- 1) User roles system (secure, no privilege escalation)
-- =========================================================
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users can read their own roles"
  ON public.user_roles FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  );
$$;

-- =========================================================
-- 2) Site settings (single row)
-- =========================================================
CREATE TABLE public.site_settings (
  id INTEGER PRIMARY KEY DEFAULT 1,
  hero_title TEXT NOT NULL DEFAULT 'نصنع أثاثاً يدوم للأجيال',
  hero_subtitle TEXT NOT NULL DEFAULT 'تصميم وتنفيذ قطع أثاث فاخرة بأعلى جودة وأدق التفاصيل',
  hero_cta_primary TEXT NOT NULL DEFAULT 'احصل على عرض سعر',
  hero_cta_secondary TEXT NOT NULL DEFAULT 'شاهد أعمالنا',
  whatsapp_phone TEXT NOT NULL DEFAULT '201064766650',
  whatsapp_display TEXT NOT NULL DEFAULT '+20 106 476 6650',
  stat_projects TEXT NOT NULL DEFAULT '+350',
  stat_years TEXT NOT NULL DEFAULT '+12',
  stat_ontime TEXT NOT NULL DEFAULT '100%',
  stat_wood TEXT NOT NULL DEFAULT '100%',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT single_row CHECK (id = 1)
);

GRANT SELECT ON public.site_settings TO anon, authenticated;
GRANT UPDATE ON public.site_settings TO authenticated;
GRANT ALL ON public.site_settings TO service_role;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public read site_settings"
  ON public.site_settings FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "admins update site_settings"
  ON public.site_settings FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

INSERT INTO public.site_settings (id) VALUES (1);

-- =========================================================
-- 3) Services (overrides for the 7 static services)
-- =========================================================
CREATE TABLE public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  label_ar TEXT NOT NULL,
  label_en TEXT NOT NULL,
  tagline TEXT,
  hero_title TEXT,
  hero_sub TEXT,
  intro TEXT,
  hero_image_url TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.services TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.services TO authenticated;
GRANT ALL ON public.services TO service_role;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public read services"
  ON public.services FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "admins manage services"
  ON public.services FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

INSERT INTO public.services (slug, label_ar, label_en, tagline, hero_title, hero_sub, order_index) VALUES
  ('kitchens', 'مطابخ', 'Kitchens', 'قلب المنزل، بحرفية إتقان', 'مطابخ فاخرة تُصنع لتدوم', 'تصميم وتنفيذ مطابخ عصرية وكلاسيكية بأدق التفاصيل — من القياس حتى التركيب.', 1),
  ('bedrooms', 'غرف نوم', 'Bedrooms', 'راحة تشبهك، أناقة تدوم', 'غرف نوم تُروى فيها القصص', 'تصاميم متكاملة تجمع بين الفخامة والدفء، بأناقة تعكس ذوقك الخاص.', 2),
  ('wardrobes', 'دواليب', 'Wardrobes', 'تنظيم يليق بأناقتك', 'دواليب مصممة لكل زاوية', 'دواليب مفصلة حسب المساحة، بحلول تخزين ذكية وتشطيبات فاخرة.', 3),
  ('offices', 'مكاتب', 'Offices', 'بيئة عمل تلهم الإبداع', 'مكاتب تعكس هيبة عملك', 'مكاتب تنفيذية ومكاتب منزلية بتصاميم تجمع الأناقة والعملية.', 4),
  ('libraries', 'مكتبات', 'Libraries', 'للكتب مكانها اللائق', 'مكتبات تحكي شغفك بالمعرفة', 'مكتبات مصممة خصيصاً لتناسب مقتنياتك.', 5),
  ('doors', 'أبواب', 'Doors', 'أول انطباع يبقى', 'أبواب خشبية فاخرة', 'أبواب داخلية وخارجية بتصاميم متعددة، من الكلاسيكي حتى المودرن.', 6),
  ('custom-furniture', 'أثاث حسب الطلب', 'Custom Furniture', 'قطعة فريدة تحمل بصمتك', 'أثاث يُصنع خصيصاً لك', 'أي قطعة تتخيلها، نحوّلها إلى واقع — بحرفية إتقان.', 7);

-- =========================================================
-- 4) Gallery images per service
-- =========================================================
CREATE TABLE public.gallery_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_slug TEXT NOT NULL REFERENCES public.services(slug) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  title TEXT,
  description TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX gallery_images_service_slug_idx ON public.gallery_images(service_slug, order_index);
GRANT SELECT ON public.gallery_images TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.gallery_images TO authenticated;
GRANT ALL ON public.gallery_images TO service_role;
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public read gallery"
  ON public.gallery_images FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "admins manage gallery"
  ON public.gallery_images FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- =========================================================
-- 5) Contact messages
-- =========================================================
CREATE TABLE public.contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  city TEXT,
  project_types TEXT[],
  style TEXT,
  budget TEXT,
  wood TEXT,
  description TEXT,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX contact_messages_created_at_idx ON public.contact_messages(created_at DESC);
GRANT INSERT ON public.contact_messages TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.contact_messages TO authenticated;
GRANT ALL ON public.contact_messages TO service_role;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anyone can submit contact"
  ON public.contact_messages FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "admins read messages"
  ON public.contact_messages FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "admins update messages"
  ON public.contact_messages FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "admins delete messages"
  ON public.contact_messages FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- =========================================================
-- updated_at trigger
-- =========================================================
CREATE OR REPLACE FUNCTION public.tg_set_updated_at() RETURNS TRIGGER
LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TRIGGER site_settings_upd BEFORE UPDATE ON public.site_settings
  FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();
CREATE TRIGGER services_upd BEFORE UPDATE ON public.services
  FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();
