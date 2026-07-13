
-- Tighten contact_messages insert policy with basic length checks
DROP POLICY "anyone can submit contact" ON public.contact_messages;
CREATE POLICY "anyone can submit contact"
  ON public.contact_messages FOR INSERT TO anon, authenticated
  WITH CHECK (
    length(name) BETWEEN 1 AND 100
    AND length(phone) BETWEEN 5 AND 30
    AND (description IS NULL OR length(description) <= 2000)
  );

-- Revoke public execute on has_role; only DB-internal RLS policies use it (SECURITY DEFINER bypasses grants).
REVOKE EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) FROM PUBLIC, anon, authenticated;
