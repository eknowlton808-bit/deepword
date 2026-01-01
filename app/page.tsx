import Link from "next/link";
export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <header className="border-b border-slate-800 px-6 py-4 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-xs tracking-widest text-emerald-400 uppercase">
            DeepWord (working title)
          </span>
          <h1 className="text-xl font-semibold">
            A Scripture-first discipleship platform
          </h1>
        </div>
       <nav className="flex gap-4 text-sm">
  <Link href="/word" className="hover:text-emerald-400">
    The Word
  </Link>
  <Link href="/healing" className="hover:text-emerald-400">
    Healing
  </Link>
  <Link href="/living" className="hover:text-emerald-400">
    Living
  </Link>
  <Link href="/warfare" className="hover:text-emerald-400">
    Warfare
  </Link>
  <Link href="/journey" className="hover:text-emerald-400">
    Your Journey
  </Link>
</nav>
      </header>

      <section className="px-6 py-10 border-b border-slate-800">
        <h2 className="text-3xl md:text-4xl font-bold mb-3">
          Deep Scripture. Real Life. For the glory of God.
        </h2>
        <p className="text-slate-300 max-w-2xl">
          This app is being built to help believers around the world dive deeply
          into God&apos;s Word, find healing in Christ, live faithfully in a
          fallen world, and stand firm in spiritual warfare — with personalized,
          Scripture-centered guidance.
        </p>
      </section>

      <section
        id="word"
        className="px-6 py-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        <article className="border border-slate-800 rounded-xl p-5 bg-slate-900/40">
          <h3 className="text-lg font-semibold mb-2">The Word</h3>
          <p className="text-sm text-slate-300">
            Core Bible study: multiple translations, Strong&apos;s Concordance,
            deep exegesis, historical and theological context — all centered on
            Scripture as the ultimate authority.
          </p>
        </article>

        <article
          id="healing"
          className="border border-slate-800 rounded-xl p-5 bg-slate-900/40"
        >
          <h3 className="text-lg font-semibold mb-2">Healing</h3>
          <p className="text-sm text-slate-300">
            A sanctuary for those walking through trauma, loss, grief, abuse,
            injury, and overwhelming suffering — bringing God&apos;s truth and
            comfort into the darkest places of life.
          </p>
        </article>

        <article
          id="living"
          className="border border-slate-800 rounded-xl p-5 bg-slate-900/40"
        >
          <h3 className="text-lg font-semibold mb-2">Living</h3>
          <p className="text-sm text-slate-300">
            Practical discipleship for daily life: work, family, community,
            culture, and calling — tailored to the believer&apos;s context,
            location, and vocation.
          </p>
        </article>

        <article
          id="warfare"
          className="border border-slate-800 rounded-xl p-5 bg-slate-900/40"
        >
          <h3 className="text-lg font-semibold mb-2">Spiritual Warfare</h3>
          <p className="text-sm text-slate-300">
            Training for the battle: exposing the enemy&apos;s tactics,
            equipping believers with Scripture, prayer, and strategy to walk in
            victory in Christ.
          </p>
        </article>

        <article
          id="journey"
          className="border border-slate-800 rounded-xl p-5 bg-slate-900/40"
        >
          <h3 className="text-lg font-semibold mb-2">Your Journey</h3>
          <p className="text-sm text-slate-300">
            A personalized path of growth in Christ — tracking your story,
            prayers, battles, and progress as the Lord shapes you over time.
          </p>
        </article>
      </section>

      <footer className="mt-auto border-t border-slate-800 px-6 py-4 text-xs text-slate-500">
        This is an early work-in-progress prototype. The goal is to glorify
        God, uphold Scripture, and serve the Body of Christ with care, truth,
        and excellence.
      </footer>
    </main>
  );
}