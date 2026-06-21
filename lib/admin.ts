import "server-only";

import type { User } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

type SupabaseServerClient = Awaited<ReturnType<typeof createClient>>;

type AdminProfile = {
  user_id: string;
  email: string | null;
  full_name: string | null;
  role: string;
};

type AdminSession = {
  isAdmin: true;
  status: 200;
  supabase: SupabaseServerClient;
  user: User;
  profile: AdminProfile;
};

type AdminFailure = {
  isAdmin: false;
  status: 401 | 403;
  supabase: SupabaseServerClient;
  user: User | null;
  profile: null;
  message: string;
};

type RequireAdminOptions = {
  redirectTo?: string | false;
};

export async function requireAdmin(): Promise<AdminSession>;
export async function requireAdmin(options: {
  redirectTo: false;
}): Promise<AdminSession | AdminFailure>;
export async function requireAdmin(
  options: RequireAdminOptions = {},
): Promise<AdminSession | AdminFailure> {
  const supabase = await createClient();
  const redirectTo =
    options.redirectTo === undefined ? "/admin/login" : options.redirectTo;

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    console.error("Could not read Supabase auth user", userError);
  }

  if (!user) {
    if (redirectTo) {
      redirect(redirectTo);
    }

    return {
      isAdmin: false,
      status: 401,
      supabase,
      user: null,
      profile: null,
      message: "Vui lòng đăng nhập admin.",
    };
  }

  const { data: profile, error: profileError } = await supabase
    .from("admin_profiles")
    .select("user_id, email, full_name, role")
    .eq("user_id", user.id)
    .maybeSingle();

  if (profileError) {
    console.error("Could not read admin profile", profileError);

    if (redirectTo) {
      redirect(redirectTo);
    }

    return {
      isAdmin: false,
      status: 403,
      supabase,
      user,
      profile: null,
      message: profileError.message,
    };
  }

  if (!profile || profile.role !== "admin") {
    if (redirectTo) {
      redirect(redirectTo);
    }

    return {
      isAdmin: false,
      status: 403,
      supabase,
      user,
      profile: null,
      message: "Tài khoản chưa có quyền admin.",
    };
  }

  return {
    isAdmin: true,
    status: 200,
    supabase,
    user,
    profile: profile as AdminProfile,
  };
}
