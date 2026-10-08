import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CalendarDays,
  Clock3,
  Sparkles,
  UserRoundCheck,
  Users,
  Video,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function formatDate(value) {
  if (!value) return "TBD";
  return new Date(value).toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function WebinarsPage() {
  const [webinars, setWebinars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [registeringId, setRegisteringId] = useState("");

  useEffect(() => {
    const loadWebinars = async () => {
      try {
        const response = await fetch(`${API_URL}/webinars`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load webinars.");
        }

        setWebinars(data);
      } catch (loadError) {
        setError(loadError.message);
      } finally {
        setLoading(false);
      }
    };

    loadWebinars();
  }, []);

  const handleRegister = async (webinarId) => {
    const name = window.prompt("Enter your full name");
    const email = window.prompt("Enter your email address");

    if (!name || !email) {
      return;
    }

    setRegisteringId(webinarId);

    try {
      const response = await fetch(`${API_URL}/webinars/${webinarId}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to register for this webinar.");
      }

      window.alert(data.message || "Check your inbox to verify your email.");
      const refreshed = await fetch(`${API_URL}/webinars`);
      const nextWebinars = await refreshed.json();
      setWebinars(nextWebinars);
    } catch (registerError) {
      window.alert(registerError.message);
    } finally {
      setRegisteringId("");
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f7ff] px-4 pb-16 pt-28 text-slate-800 md:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col gap-4 rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)] md:flex-row md:items-center md:justify-between">
          <div>
            <p className="mb-2 inline-flex items-center gap-2 rounded-full bg-cyan-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-cyan-700">
              <Sparkles size={12} />
              Live learning
            </p>

            <h1 className="text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
              Adonay webinars
            </h1>
          </div>

          <Link
            to="/seminar-countdown"
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
          >
            View live countdown
            <ArrowRight size={16} />
          </Link>
        </div>

        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="h-72 animate-pulse rounded-[26px] bg-slate-200" />
            ))}
          </div>
        ) : null}

        {!loading && error ? (
          <div className="rounded-[24px] border border-rose-200 bg-rose-50 p-6 text-rose-700">
            {error}
          </div>
        ) : null}

        {!loading && !error ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {webinars.map((webinar) => (
              <article
                key={webinar._id}
                className="flex h-full flex-col overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_60px_rgba(15,23,42,0.05)]"
              >
                <div className="flex h-52 items-center justify-center bg-gradient-to-br from-cyan-500 via-violet-500 to-pink-500 p-5 text-white">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/40 bg-white/10 backdrop-blur-sm">
                    <Video size={28} />
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">
                      {webinar.status}
                    </span>

                    <span className="rounded-full bg-cyan-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-cyan-700">
                      {webinar.accessType}
                    </span>
                  </div>

                  <h2 className="text-xl font-black text-slate-900">{webinar.title}</h2>

                  <p className="mt-3 line-clamp-4 text-sm leading-6 text-slate-600">
                    {webinar.description}
                  </p>

                  <div className="mt-5 space-y-2 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <CalendarDays size={16} className="text-cyan-600" />
                      {formatDate(webinar.scheduledAt)}
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock3 size={16} className="text-violet-600" />
                      {webinar.durationMinutes || 60} minutes
                    </div>

                    <div className="flex items-center gap-2">
                      <Users size={16} className="text-pink-500" />
                      {webinar.capacity ? `${webinar.capacity} seats` : "Open access"}
                    </div>
                  </div>

                  <div className="mt-6 flex gap-3 pt-2">
                    <Link
                      to={`/webinars/${webinar.slug || webinar._id}`}
                      className="inline-flex flex-1 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700 transition hover:border-slate-300 hover:bg-slate-100"
                    >
                      View details
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleRegister(webinar._id)}
                      disabled={registeringId === webinar._id}
                      className="inline-flex flex-1 items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 via-violet-500 to-pink-500 px-4 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {registeringId === webinar._id ? "Registering..." : "Register"}
                    </button>
                  </div>
                </div>
              </article>
            ))}

            {webinars.length === 0 ? (
              <div className="col-span-full rounded-[24px] border border-dashed border-slate-300 bg-white p-10 text-center text-slate-600">
                No webinars are available right now. Please check back soon.
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
