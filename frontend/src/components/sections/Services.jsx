import {
  ArrowRight,
  BarChart3,
  Check,
  MessageCircle,
  Sparkles,
  Users,
  Video,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

const membershipFeatures = [
  "የ30 ቀን የቪዲዮ ተግዳሮት: በየቀኑ ይዘት እንዲያዘጋጁ እና በተከታታይ እንዲለጥፉ የሚመራ ፕሮግራም።",
  "ዕለታዊ ተግባራዊ ምክሮች: በቴሌግራም የሚደርሱዎ የይዘት እና የዕድገት ስልቶች።",
  "የቀጥታ ዌቢናሮችና ወርክሾፖች: በተግባር የሚማሩባቸው ተሳትፎ ያላቸው ውይይቶች።",
  "የፈጣሪዎች ማህበረሰብ: ከሌሎች ፈጣሪዎች ጋር ይገናኙ፣ ልምድ ይለዋወጡ እና አብረው ያድጉ።",
];

const mastermindFeatures = [
  "ሙሉ በሙሉ የተመራ የቪዲዮ ኮርስ: ይዘት ከማዘጋጀት እስከ ደንበኛ ማግኘት የሚያስተምር የተሟላ ኮርስ።",
  "በሳምንት 3 ጊዜ የቀጥታ ጥያቄና መልስ: ስለ ቪዲዮዎ፣ ስክሪፕትዎ እና የሽያጭ መልዕክትዎ ቀጥተኛ ግብረመልስ ያግኙ።",
  "የግል ድጋፍና የስትራቴጂ አማካሪነት: ወደ ግብዎ እንዲራመዱ ቀጣይ እገዛ ያግኙ።",
  "የግል ማህበረሰብና ተግዳሮቶች: በልዩ ትምህርቶች ይሳተፉ፣ ከሌሎች ጋርም ተጠያቂነትን ይጋሩ።",
];

const telegramUrl = "https://t.me/AdonayTiktokAcademyofficialBot";

function FeatureList({ features }) {
  return (
    <ul className="mt-5 grid gap-y-3 sm:grid-cols-2 sm:gap-x-4">
      {features.map((feature) => {
        const [label, description] = feature.split(": ");
        return (
          <li className="flex items-start gap-2.5" key={label}>
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-100 to-violet-100 text-violet-600">
              <Check size={13} strokeWidth={3} />
            </span>
            <span className="text-xs leading-5 text-slate-600">
              <strong className="font-semibold text-slate-900">{label}:</strong>{" "}
              {description}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

function ServiceCard({
  number,
  icon,
  title,
  audience,
  description,
  features,
  action,
  href,
  featured = false,
}) {
  const cardClass = `group relative flex h-full flex-col overflow-hidden rounded-3xl border p-5 shadow-[0_18px_55px_rgba(15,23,42,0.07)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_65px_rgba(15,23,42,0.12)] sm:p-6 lg:p-7 ${
    featured
      ? "border-cyan-200/80 bg-white/90"
      : "border-slate-200/80 bg-white/80"
  }`;

  return (
    <article className={cardClass}>
      {featured && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-gradient-to-br from-cyan-200/50 to-pink-200/40 blur-3xl"
        />
      )}
      <div className="relative flex flex-1 flex-col">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold tracking-[0.16em] text-slate-500">
            {number}
          </span>
          {featured && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-100 bg-gradient-to-r from-cyan-50 to-violet-50 px-2.5 py-1.5 text-[10px] font-semibold text-violet-700">
              <Sparkles size={12} />
              ለዕድገት ዝግጁ ለሆኑ ፈጣሪዎች
            </span>
          )}
        </div>

        <div className="mt-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-100 via-violet-100 to-pink-100 text-violet-700 shadow-sm shadow-violet-100">
          {icon}
        </div>
        <h2 className="mt-4 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
          {title}
        </h2>
        <p className="mt-2 text-xs font-semibold leading-5 text-violet-700 sm:text-sm">
          {audience}
        </p>
        <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>

        <div className="mt-5 border-t border-slate-200 pt-1">
          <FeatureList features={features} />
        </div>

        {href.startsWith("http") ? (
          <a
            className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 via-violet-500 to-pink-500 px-5 py-3 text-sm font-bold text-white shadow-[0_12px_28px_rgba(99,102,241,0.16)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_35px_rgba(99,102,241,0.24)] focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2"
            href={href}
            rel="noreferrer"
            target="_blank"
          >
            {action}
            <ArrowRight size={17} />
          </a>
        ) : (
          <Link
            className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 via-violet-500 to-pink-500 px-5 py-3 text-sm font-bold text-white shadow-[0_12px_28px_rgba(99,102,241,0.16)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_35px_rgba(99,102,241,0.24)] focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2"
            to={href}
          >
            {action}
            <ArrowRight size={17} />
          </Link>
        )}
      </div>
    </article>
  );
}

export default function Services() {
  return (
    <section lang="am" className="relative isolate overflow-hidden bg-gradient-to-br from-slate-50 via-white to-cyan-50/40 px-4 pb-16 pt-28 text-slate-900 sm:px-6 sm:pb-20 sm:pt-32 lg:px-8 lg:pb-24 lg:pt-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -left-48 top-0 h-[28rem] w-[28rem] rounded-full bg-cyan-300/20 blur-[110px]" />
        <div className="absolute -right-40 top-1/3 h-[32rem] w-[32rem] rounded-full bg-pink-300/15 blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(#0f172a_1px,transparent_1px),linear-gradient(90deg,#0f172a_1px,transparent_1px)] [background-size:64px_64px]" />
      </div>
      <div className="mx-auto max-w-6xl">
        <header className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-xs font-semibold tracking-wide text-slate-700 shadow-sm backdrop-blur-md">
            <Sparkles size={15} className="text-violet-600" />
            ቀጣይ ዕድገትዎን በቲክቶክ ይጀምሩ
          </span>
          <h1 className="mt-6 text-4xl font-black leading-[1.04] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            በቲክቶክ ላይ የሚያደርጉት{" "}
            <span className="bg-gradient-to-r from-cyan-500 via-violet-500 to-pink-500 bg-clip-text text-transparent">
              ቀጣይ እርምጃ ውጤት ያምጣ!
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
            የፈጣሪ ብራንድዎን ለማሳደግም ሆነ የንግድ ይዘትዎን ወደ እውነተኛ ደንበኞች ለመቀየር፣
            ከግብዎ ጋር የሚስማማውን የድጋፍ ፕሮግራም ይምረጡ።
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {[
              [<Video key="content" size={14} />, "ተግባራዊ የይዘት አዘገጃጀት"],
              [<BarChart3 key="growth" size={14} />, "የታዳሚ ዕድገት"],
              [<Users key="community" size={14} />, "የባለሙያዎች ማህበረሰብ"],
            ].map(([icon, text]) => (
              <span
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/75 px-3.5 py-2 text-xs font-medium text-slate-600 shadow-sm"
                key={text}
              >
                <span className="text-violet-600">{icon}</span>
                {text}
              </span>
            ))}
          </div>
        </header>

        <div
          className="mt-9 grid scroll-mt-28 items-stretch gap-4 sm:mt-11 lg:grid-cols-2 lg:gap-5"
          id="programs"
        >
          <ServiceCard
            number="01 / የፈጣሪዎች ፕሮግራም"
            icon={<Zap size={23} />}
            title="የቲክቶክ ዕድገት አባልነት"
            audience="ለፈጣሪዎች፣ ለኢንፍሉዌንሰሮች እና ለይዘት ፈጣሪ መሆን ለሚፈልጉ"
            description="ቪዲዮዎ በብዙ ሰዎች እንዲታይ ያድርጉ፣ ተሳታፊ ታዳሚ ያብዙ፣ የግል ብራንድዎንም በተመራ ስልጠናና በማህበረሰብ ድጋፍ ወደ ገቢ ይቀይሩ።"
            features={membershipFeatures}
            action="አባል ሆነው ይጀምሩ"
            href={telegramUrl}
            featured
          />
          <ServiceCard
            number="02 / የንግድ ፕሮግራም"
            icon={<MessageCircle size={23} />}
            title="የቲክቶክ ንግድ ማስተርማይንድ"
            audience="ለአገልግሎት ንግድ ባለቤቶች"
            description="በቲክቶክ ዕይታን ወደ ደንበኛ ለመቀየር ለሚፈልጉ የሪል እስቴት ወኪሎች፣ የአካል ብቃትና የውበት ባለሙያዎች፣ የሽያጭ አማካሪዎች እና የዝግጅት አዘጋጆች የተዘጋጀ።"
            features={mastermindFeatures}
            action="አሁኑኑ ያመልክቱ"
            href="/business-registration"
          />
        </div>

      </div>
    </section>
  );
}
