import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { listRsvps } from "@/lib/rsvp.functions";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "RSVP Admin · M&Z" }] }),
  component: AdminPage,
});

type Rsvp = {
  id: string;
  full_name: string;
  phone: string;
  attending: boolean;
  guest_count: number;
  message: string | null;
  created_at: string;
};

function AdminPage() {
  const fetchRsvps = useServerFn(listRsvps);
  const [session, setSession] = useState<unknown>(null);
  const [loading, setLoading] = useState(true);
  const [rsvps, setRsvps] = useState<Rsvp[]>([]);
  const [err, setErr] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s);
    });
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) return;
    fetchRsvps()
      .then((r) => setRsvps(r.rsvps as Rsvp[]))
      .catch((e) => setErr(e instanceof Error ? e.message : "Failed"));
  }, [session, fetchRsvps]);

  const onAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    const fn = authMode === "signin" ? supabase.auth.signInWithPassword : supabase.auth.signUp;
    const { error } = await fn.call(supabase.auth, {
      email,
      password,
      options: { emailRedirectTo: window.location.origin + "/admin" },
    });
    if (error) setErr(error.message);
  };

  if (loading) return <div className="p-10 text-center">Loading…</div>;

  if (!session) {
    return (
      <div className="mx-auto max-w-sm px-6 py-20">
        <h1 className="font-serif text-3xl text-gold-dark">Admin Access</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Sign in to view RSVP responses.
        </p>
        <form onSubmit={onAuth} className="mt-6 space-y-3">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-md border border-gold/40 bg-background px-3 py-2"
          />
          <input
            type="password"
            placeholder="Password (min 6 chars)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            required
            className="w-full rounded-md border border-gold/40 bg-background px-3 py-2"
          />
          {err && <p className="text-sm text-destructive">{err}</p>}
          <button className="w-full rounded-full bg-gradient-gold px-6 py-3 font-display text-xs uppercase tracking-[0.3em] text-white shadow-gold">
            {authMode === "signin" ? "Sign In" : "Create Admin Account"}
          </button>
          <button
            type="button"
            onClick={() => setAuthMode(authMode === "signin" ? "signup" : "signin")}
            className="w-full text-xs text-muted-foreground underline"
          >
            {authMode === "signin"
              ? "First time? Create the admin account"
              : "Already have an account? Sign in"}
          </button>
        </form>
      </div>
    );
  }

  const yes = rsvps.filter((r) => r.attending);
  const totalGuests = yes.reduce((s, r) => s + r.guest_count, 0);

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-3xl text-gold-dark">RSVP Responses</h1>
        <button
          onClick={() => supabase.auth.signOut()}
          className="text-xs text-muted-foreground underline"
        >
          Sign out
        </button>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3 text-center">
        <Stat label="Total" value={rsvps.length} />
        <Stat label="Attending" value={yes.length} />
        <Stat label="Guests" value={totalGuests} />
      </div>

      {err && <p className="mt-4 text-sm text-destructive">{err}</p>}

      <div className="mt-6 space-y-3">
        {rsvps.length === 0 ? (
          <p className="text-sm text-muted-foreground">No responses yet.</p>
        ) : (
          rsvps.map((r) => (
            <div key={r.id} className="embossed-card rounded-lg p-4 text-sm">
              <div className="flex items-center justify-between">
                <div className="font-serif text-base">{r.full_name}</div>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wider ${
                    r.attending
                      ? "bg-gold/20 text-gold-dark"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {r.attending ? `Yes · ${r.guest_count}` : "No"}
                </span>
              </div>
              <div className="mt-1 text-xs text-muted-foreground">
                {r.phone} · {new Date(r.created_at).toLocaleString()}
              </div>
              {r.message && (
                <p className="mt-2 text-sm italic text-foreground/85">“{r.message}”</p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="embossed-card rounded-lg p-3">
      <div className="font-display text-2xl text-gold-dark">{value}</div>
      <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
        {label}
      </div>
    </div>
  );
}
