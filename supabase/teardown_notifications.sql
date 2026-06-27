-- Run this in the Supabase SQL editor to remove the email/WhatsApp notification
-- plumbing that was added for the notify-lead edge function. Safe to run even if
-- some of these objects were already removed or never created.

drop table if exists public.notification_logs;
