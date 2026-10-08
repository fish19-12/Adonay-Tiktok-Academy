import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  MessageSquareText,
  PlayCircle,
  Sparkles,
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

export default function WebinarDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [webinar, setWebinar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [joinUrl, setJoinUrl] = useState("");
  const [accessMessage, setAccessMessage] = useState("");

  useEffect(() => {
    const loadWebinar = async () => {
      try {
        const response = await fetch(`${API_URL}/webinars/${slug}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to load webinar" );
        }

        setWebinar(data);
      } catch (loadError) {
        setError(loadError.message);
      } finally {
        setLoading(false);
      }
    };

    loadWebinar();
  }, [slug]);

  useEffect(() => {
    let cancelled = false;
    const tokenFromEmail = new URLSearchParams(window.location.search).get(
      "registration_token",
    );
    const storageKey = `webinar-access:${slug}`;
    const token = tokenFromEmail || window.sessionStorage.getItem(storageKey);

    if (!token) {
      return () => {
        cancelled = true;
      };
    }

    if (tokenFromEmail) {
      window.sessionStorage.setItem(storageKey, tokenFromEmail);
    }

    const verifyRegistration = async () => {
      try {
        const response = await fetch(`${API_URL}/webinars/${slug}/verify-registration`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to verify webinar access.");
        }

        if (cancelled) return;
        setJoinUrl(data.joinUrl || "");
        setAccessMessage(data.message || "");

        if (tokenFromEmail) {
          navigate(`/webinars/${slug}`, { replace: true });
        }
      } catch (verificationError) {
        if (cancelled) return;
        window.sessionStorage.removeItem(storageKey);
        setAccessMessage(verificationError.message);
      }
    };

    verifyRegistration();

    return () => {
      cancelled = true;
    };
  }, [navigate, slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f7ff] px-4 pb-16 pt-28 md:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl animate-pulse rounded-[28px] bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.04)]">
          <div className="h-8 w-44 rounded bg-slate-200" />
          <div className="mt-5 h-80 rounded-[24px] bg-slate-200" />
        </div>
      </div>
    );
  }

  if (error || !webinar) {
    return (
      <div className="min-h-screen bg-[#f5f7ff] px-4 pb-16 pt-28 md:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-[28px] border border-rose-200 bg-rose-50 p-8 text-rose-700">
          {error || "Webinar not found."}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f7ff] px-4 pb-16 pt-28 text-slate-800 md:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Link to="/webinars" className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-slate-600 transition hover:text-slate-900">
          <ArrowLeft size={16} />
          Back to webinars
        </Link>

        <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.06)]">
          <div className="grid gap-0 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="border-b border-slate-200 p-6 lg:border-b-0 lg:border-r lg:p-8">
              <div className="mb-4 flex items-center gap-2">
                <span className="rounded-full bg-cyan-50 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-cyan-700">
                  {webinar.status}
                </span>
                <span className="rounded-full bg-violet-50 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-violet-700">
                  {webinar.accessType}
                </span>
              </div>

              <h1 className="text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
                {webinar.title}
              </h1>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <CalendarDays size={18} className="mb-2 text-cyan-600" />
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-500">Schedule</p>
                  <p className="mt-2 text-sm font-semibold text-slate-800">{formatDate(webinar.scheduledAt)}</p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <Clock3 size={18} className="mb-2 text-violet-600" />
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-500">Duration</p>
                  <p className="mt-2 text-sm font-semibold text-slate-800">{webinar.durationMinutes || 60} mins</p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <Users size={18} className="mb-2 text-pink-500" />
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-500">Capacity</p>
                  <p className="mt-2 text-sm font-semibold text-slate-800">
                    {webinar.capacity ? `${webinar.capacity} seats` : "Open"}
                  </p>
                </div>
              </div>

              <div className="mt-8 rounded-[26px] bg-slate-50 p-5">
                <div className="mb-4 flex items-center gap-2 text-slate-900">
                  <Sparkles size={18} className="text-pink-500" />
                  <h2 className="text-lg font-black">Webinar overview</h2>
                </div>
                <p className="leading-7 text-slate-600">{webinar.description}</p>
              </div>

              <div className="mt-8 overflow-hidden rounded-[26px] border border-slate-200 bg-slate-900">
                <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 text-white">
                  <div className="flex items-center gap-2">
                    <Video size={16} className="text-cyan-300" />
                    <span className="text-sm font-bold">Live auditorium</span>
                  </div>
                  {joinUrl ? (
                    <a
                      href={joinUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-1.5 text-xs font-bold text-white hover:bg-white/15"
                    >
                      <PlayCircle size={14} />
                      Open in Zoom
                    </a>
                  ) : null}
                </div>

                <div className="flex aspect-video w-full items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 p-6 text-center text-white">
                  {joinUrl ? (
                    <div>
                      <p className="mb-4 text-sm text-white/75">
                        Your email is verified. Join the live webinar in Zoom.
                      </p>
                      <a
                        href={joinUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl bg-[#e85f3f] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#d95537]"
                      >
                        <PlayCircle size={16} />
                        Join webinar
                      </a>
                    </div>
                  ) : (
                    <p className="max-w-md text-sm leading-6 text-white/70">
                      {accessMessage ||
                        "Register for this webinar and verify your email to receive a private Zoom access link."}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <aside className="bg-slate-50 p-6 lg:p-8">
              <div className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="text-lg font-black text-slate-900">Instructor controls</h3>

                <div className="mt-4 space-y-3 text-sm text-slate-600">
                  <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                    <MessageSquareText size={16} className="text-cyan-600" />
                    <span>{webinar.analytics?.questionsCount || 0} Q&A questions</span>
                  </div>

                  <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                    <Users size={16} className="text-violet-600" />
                    <span>{webinar.analytics?.registrationsCount || 0} registrations</span>
                  </div>

                  <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                    <Video size={16} className="text-pink-500" />
                    <span>{webinar.videoProvider?.provider || "zoom"} video provider</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-[26px] border border-dashed border-slate-300 bg-white p-5">
                <h3 className="text-lg font-black text-slate-900">Quick actions</h3>
                <div className="mt-4 space-y-3">
                  {joinUrl ? (
                    <a
                      href={joinUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 via-violet-500 to-pink-500 px-4 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5"
                    >
                      Join webinar
                    </a>
                  ) : null}

                  {["scheduled", "live"].includes(webinar.status) ? (
                    <Link
                      to="/webinars"
                      className="inline-flex w-full items-center justify-center rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-100"
                    >
                      Register and verify email
                    </Link>
                  ) : null}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
