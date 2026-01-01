"use client";

import { useState } from "react";
import ExegesisPanel from "../components/ExegesisPanel";

// ---- IMPORT YOUR BOOK FILES HERE ----
// Make sure these paths & filenames match your actual JSON files.
import genesisRaw from "../data/kjv/Genesis.json";
import exodusRaw from "../data/kjv/Exodus.json";
import leviticusRaw from "../data/kjv/Leviticus.json";
import numbersRaw from "../data/kjv/Numbers.json";
import deuteronomyRaw from "../data/kjv/Deuteronomy.json";
import joshuaRaw from "../data/kjv/Joshua.json";
import judgesRaw from "../data/kjv/Judges.json";
import ruthRaw from "../data/kjv/Ruth.json";
import firstSamuelRaw from "../data/kjv/1Samuel.json";
import secondSamuelRaw from "../data/kjv/2Samuel.json";
import firstKingsRaw from "../data/kjv/1Kings.json";
import secondKingsRaw from "../data/kjv/2Kings.json";
import firstChroniclesRaw from "../data/kjv/1Chronicles.json";
import secondChroniclesRaw from "../data/kjv/2Chronicles.json";
import ezraRaw from "../data/kjv/Ezra.json";
import nehemiahRaw from "../data/kjv/Nehemiah.json";
import estherRaw from "../data/kjv/Esther.json";
import jobRaw from "../data/kjv/Job.json";
import psalmsRaw from "../data/kjv/Psalms.json";
import proverbsRaw from "../data/kjv/Proverbs.json";
import ecclesiastesRaw from "../data/kjv/Ecclesiastes.json";
import SongOfSolomonRaw from "../data/kjv/SongOfSolomon.json";
import isaiahRaw from "../data/kjv/Isaiah.json";
import jeremiahRaw from "../data/kjv/Jeremiah.json";
import lamentationsRaw from "../data/kjv/Lamentations.json";
import ezekielRaw from "../data/kjv/Ezekiel.json";
import danielRaw from "../data/kjv/Daniel.json";
import hoseaRaw from "../data/kjv/Hosea.json";
import joelRaw from "../data/kjv/Joel.json";
import amosRaw from "../data/kjv/Amos.json";
import obadiahRaw from "../data/kjv/Obadiah.json";
import jonahRaw from "../data/kjv/Jonah.json";
import micahRaw from "../data/kjv/Micah.json";
import nahumRaw from "../data/kjv/Nahum.json";
import habakkukRaw from "../data/kjv/Habakkuk.json";
import zephaniahRaw from "../data/kjv/Zephaniah.json";
import haggaiRaw from "../data/kjv/Haggai.json";
import zechariahRaw from "../data/kjv/Zechariah.json";
import malachiRaw from "../data/kjv/Malachi.json";
import matthewRaw from "../data/kjv/Matthew.json";
import markRaw from "../data/kjv/Mark.json";
import lukeRaw from "../data/kjv/Luke.json";
import johnRaw from "../data/kjv/John.json";
import actsRaw from "../data/kjv/Acts.json";
import romansRaw from "../data/kjv/Romans.json";
import firstCorinthiansRaw from "../data/kjv/1Corinthians.json";
import secondCorinthiansRaw from "../data/kjv/2Corinthians.json";
import galatiansRaw from "../data/kjv/Galatians.json";
import ephesiansRaw from "../data/kjv/Ephesians.json";
import philippiansRaw from "../data/kjv/Philippians.json";
import colossiansRaw from "../data/kjv/Colossians.json";
import firstThessaloniansRaw from "../data/kjv/1Thessalonians.json";
import secondThessaloniansRaw from "../data/kjv/2Thessalonians.json";
import firstTimothyRaw from "../data/kjv/1Timothy.json";
import secondTimothyRaw from "../data/kjv/2Timothy.json";
import titusRaw from "../data/kjv/Titus.json";
import philemonRaw from "../data/kjv/Philemon.json";
import hebrewsRaw from "../data/kjv/Hebrews.json";
import jamesRaw from "../data/kjv/James.json";
import firstPeterRaw from "../data/kjv/1Peter.json";
import secondPeterRaw from "../data/kjv/2Peter.json";
import firstJohnRaw from "../data/kjv/1John.json";
import secondJohnRaw from "../data/kjv/2John.json";
import thirdJohnRaw from "../data/kjv/3John.json";
import judeRaw from "../data/kjv/Jude.json";
import revelationRaw from "../data/kjv/Revelation.json";

// ---- Types that match the actual JSON structure ----
type RawVerse = { verse: string; text: string };
type RawChapter = { chapter: string; verses: RawVerse[] };
type RawBook = {
  book: string;
  // Some datasets include this, some don't; make it optional.
  "chapter-count"?: string;
  chapters: RawChapter[];
};

// Normalized structure our viewer expects
type BookData = Record<string, Record<string, string>>;

// Convert RawBook JSON into { "1": { "1": "text", ... }, "2": {...}, ... }
function normalizeBook(raw: RawBook): BookData {
  const result: BookData = {};
  for (const ch of raw.chapters) {
    const chKey = String(ch.chapter);
    result[chKey] = {};
    for (const v of ch.verses) {
      result[chKey][String(v.verse)] = v.text;
    }
  }
  return result;
}

// ---- Central map of all books ----
const booksMap: Record<string, BookData> = {
  Genesis: normalizeBook(genesisRaw),
  Exodus: normalizeBook(exodusRaw),
  Leviticus: normalizeBook(leviticusRaw),
  Numbers: normalizeBook(numbersRaw),
  Deuteronomy: normalizeBook(deuteronomyRaw),
  Joshua: normalizeBook(joshuaRaw),
  Judges: normalizeBook(judgesRaw),
  Ruth: normalizeBook(ruthRaw),
  "1 Samuel": normalizeBook(firstSamuelRaw),
  "2 Samuel": normalizeBook(secondSamuelRaw),
  "1 Kings": normalizeBook(firstKingsRaw),
  "2 Kings": normalizeBook(secondKingsRaw),
  "1 Chronicles": normalizeBook(firstChroniclesRaw),
  "2 Chronicles": normalizeBook(secondChroniclesRaw),
  Ezra: normalizeBook(ezraRaw),
  Nehemiah: normalizeBook(nehemiahRaw),
  Esther: normalizeBook(estherRaw),
  Job: normalizeBook(jobRaw),
  Psalms: normalizeBook(psalmsRaw),
  Proverbs: normalizeBook(proverbsRaw),
  Ecclesiastes: normalizeBook(ecclesiastesRaw),
  "Song of Solomon": normalizeBook(SongOfSolomonRaw),
  Isaiah: normalizeBook(isaiahRaw),
  Jeremiah: normalizeBook(jeremiahRaw),
  Lamentations: normalizeBook(lamentationsRaw),
  Ezekiel: normalizeBook(ezekielRaw),
  Daniel: normalizeBook(danielRaw),
  Hosea: normalizeBook(hoseaRaw),
  Joel: normalizeBook(joelRaw),
  Amos: normalizeBook(amosRaw),
  Obadiah: normalizeBook(obadiahRaw),
  Jonah: normalizeBook(jonahRaw),
  Micah: normalizeBook(micahRaw),
  Nahum: normalizeBook(nahumRaw),
  Habakkuk: normalizeBook(habakkukRaw),
  Zephaniah: normalizeBook(zephaniahRaw),
  Haggai: normalizeBook(haggaiRaw),
  Zechariah: normalizeBook(zechariahRaw),
  Malachi: normalizeBook(malachiRaw),

  Matthew: normalizeBook(matthewRaw),
  Mark: normalizeBook(markRaw),
  Luke: normalizeBook(lukeRaw),
  John: normalizeBook(johnRaw),
  Acts: normalizeBook(actsRaw),
  Romans: normalizeBook(romansRaw),
  "1 Corinthians": normalizeBook(firstCorinthiansRaw),
  "2 Corinthians": normalizeBook(secondCorinthiansRaw),
  Galatians: normalizeBook(galatiansRaw),
  Ephesians: normalizeBook(ephesiansRaw),
  Philippians: normalizeBook(philippiansRaw),
  Colossians: normalizeBook(colossiansRaw),
  "1 Thessalonians": normalizeBook(firstThessaloniansRaw),
  "2 Thessalonians": normalizeBook(secondThessaloniansRaw),
  "1 Timothy": normalizeBook(firstTimothyRaw),
  "2 Timothy": normalizeBook(secondTimothyRaw),
  Titus: normalizeBook(titusRaw),
  Philemon: normalizeBook(philemonRaw),
  Hebrews: normalizeBook(hebrewsRaw),
  James: normalizeBook(jamesRaw),
  "1 Peter": normalizeBook(firstPeterRaw),
  "2 Peter": normalizeBook(secondPeterRaw),
  "1 John": normalizeBook(firstJohnRaw),
  "2 John": normalizeBook(secondJohnRaw),
  "3 John": normalizeBook(thirdJohnRaw),
  Jude: normalizeBook(judeRaw),
  Revelation: normalizeBook(revelationRaw),
};

type InsightTab = "strongs" | "exegesis" | "application" | "notes";

// ---- Strong's simple types & sample data ----
type StrongToken = {
  text: string; // English word/phrase in the verse
  strong: string; // e.g. "H7225", "H430", "G25"
  language: "H" | "G"; // Hebrew or Greek
  lemma: string; // Original-language lemma
  transliteration: string; // Transliteration
  gloss: string; // Short gloss
  definition: string; // Short definition / notes
};

type StrongVerseIndex = Record<string, StrongToken[]>; // verse -> tokens

// Strong's index: book -> chapter -> verse -> tokens
const strongsIndex: Record<string, Record<string, StrongVerseIndex>> = {
  Genesis: {
    "1": {
      "1": [
        {
          text: "In the beginning",
          strong: "H7225",
          language: "H",
          lemma: "רֵאשִׁית",
          transliteration: "rēʼšîth",
          gloss: "beginning, first, chief",
          definition:
            "The first, the starting point, the head of a series. Often used of the beginning of time or of a chief/rank.",
        },
        {
          text: "God",
          strong: "H430",
          language: "H",
          lemma: "אֱלֹהִים",
          transliteration: "ʼĕlōhîm",
          gloss: "God, mighty one",
          definition:
            "Plural form used with singular verbs when referring to the one true God, emphasizing majesty, fullness of power.",
        },
        {
          text: "created",
          strong: "H1254",
          language: "H",
          lemma: "בָּרָא",
          transliteration: "bārāʼ",
          gloss: "create",
          definition:
            "To create, shape, form — used especially of God’s creative work out of nothing or by His sovereign power.",
        },
        {
          text: "heaven",
          strong: "H8064",
          language: "H",
          lemma: "שָׁמַיִם",
          transliteration: "šāmayim",
          gloss: "heaven, heavens, sky",
          definition:
            "The heavens, the sky, the realm above the earth; also the dwelling place of God.",
        },
        {
          text: "earth",
          strong: "H776",
          language: "H",
          lemma: "אֶרֶץ",
          transliteration: "ʼereṣ",
          gloss: "earth, land",
          definition:
            "The earth, land, territory, ground — the created world in contrast to the heavens.",
        },
      ],
    },
  },
  John: {
    "3": {
      "16": [
        {
          text: "loved",
          strong: "G25",
          language: "G",
          lemma: "ἀγαπάω",
          transliteration: "agapaō",
          gloss: "love",
          definition:
            "To love with will and purpose, to seek the good of another — not mere feeling but sacrificial, covenant love.",
        },
        {
          text: "world",
          strong: "G2889",
          language: "G",
          lemma: "κόσμος",
          transliteration: "kosmos",
          gloss: "world, ordered system",
          definition:
            "The ordered world, humanity in its moral state; often the fallen world in need of redemption.",
        },
        {
          text: "only begotten Son",
          strong: "G3439",
          language: "G",
          lemma: "μονογενής",
          transliteration: "monogenēs",
          gloss: "only, unique, one-of-a-kind",
          definition:
            "Unique, one-of-a-kind, only one of its class — used of Christ as the uniquely begotten Son of the Father.",
        },
        {
          text: "believeth",
          strong: "G4100",
          language: "G",
          lemma: "πιστεύω",
          transliteration: "pisteuō",
          gloss: "believe, trust",
          definition:
            "To believe in, to entrust oneself to; not mere mental assent but active trust and reliance.",
        },
      ],
    },
  },
};

export default function WordPage() {
  const bookNames = Object.keys(booksMap);

  const [book, setBook] = useState<string>(bookNames[0] ?? "");
  const [chapter, setChapter] = useState<string>(() => {
    const firstBookData = booksMap[bookNames[0]];
    return Object.keys(firstBookData)[0];
  });
  const [verse, setVerse] = useState<string>(() => {
    const firstBookData = booksMap[bookNames[0]];
    const firstChapter = Object.keys(firstBookData)[0];
    return Object.keys(firstBookData[firstChapter])[0];
  });

  const [activeTab, setActiveTab] = useState<InsightTab>("exegesis");
  const [notes, setNotes] = useState("");
  const [selectedStrong, setSelectedStrong] = useState<StrongToken | null>(
    null
  );

  const currentBookData = booksMap[book] ?? {};
  const chapterNumbers = Object.keys(currentBookData);
  const verseNumbers = chapter
    ? Object.keys(currentBookData[chapter] || {})
    : [];

  const verseText =
    (chapter && verse && currentBookData[chapter]?.[verse]) ||
    "Verse not found in current data.";

  const strongTokens: StrongToken[] =
    strongsIndex[book]?.[chapter]?.[verse] ?? [];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 px-4 py-6 md:px-6 md:py-8">
      <header className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          The Word — King James Version
        </h1>
        <p className="text-slate-300 max-w-3xl text-sm md:text-base">
          Select a book, chapter, and verse to read from the KJV (1769 text
          standard). This view now supports all 66 books and will soon be
          connected to Strong&apos;s Concordance, exegesis, and practical
          application to real-life hardship and spiritual warfare.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)] items-start">
        {/* LEFT: Scripture viewer */}
        <section className="space-y-4">
          {/* Controls */}
          <div className="grid gap-3 md:grid-cols-3 max-w-xl">
            <div className="flex flex-col gap-1">
              <label className="text-xs uppercase tracking-wide text-slate-400">
                Book
              </label>
              <select
                className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-emerald-400"
                value={book}
                onChange={(e) => {
                  const newBook = e.target.value;
                  const newBookData = booksMap[newBook];
                  const firstChapter = Object.keys(newBookData)[0];
                  const firstVerse = Object.keys(newBookData[firstChapter])[0];
                  setBook(newBook);
                  setChapter(firstChapter);
                  setVerse(firstVerse);
                  setSelectedStrong(null);
                }}
              >
                {bookNames.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs uppercase tracking-wide text-slate-400">
                Chapter
              </label>
              <select
                className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-emerald-400"
                value={chapter}
                onChange={(e) => {
                  const newChapter = e.target.value;
                  const newBookData = booksMap[book];
                  const firstVerse = Object.keys(newBookData[newChapter])[0];
                  setChapter(newChapter);
                  setVerse(firstVerse);
                  setSelectedStrong(null);
                }}
              >
                {chapterNumbers.map((ch) => (
                  <option key={ch} value={ch}>
                    {ch}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs uppercase tracking-wide text-slate-400">
                Verse
              </label>
              <select
                className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-emerald-400"
                value={verse}
                onChange={(e) => {
                  setVerse(e.target.value);
                  setSelectedStrong(null);
                }}
              >
                {verseNumbers.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Verse display + Strong's inline panel */}
          <div className="bg-slate-900/60 border border-slate-700 rounded-2xl p-5 md:p-6 shadow-lg max-w-3xl">
            <div className="text-xs md:text-sm text-slate-400 mb-2">
              {book} {chapter}:{verse} (KJV)
            </div>
            <p className="text-lg md:text-xl leading-relaxed whitespace-pre-wrap">
              {verseText}
            </p>

            {strongTokens.length > 0 && (
              <div className="mt-4 pt-3 border-t border-slate-800">
                <p className="text-xs md:text-sm text-slate-400 mb-2">
                  Words in this verse with Strong&apos;s links:
                </p>
                <div className="flex flex-wrap gap-2">
                  {strongTokens.map((token) => (
                    <button
                      key={token.strong + token.text}
                      onClick={() => {
                        setSelectedStrong(token);
                        setActiveTab("strongs");
                      }}
                      className={`px-2.5 py-1 rounded-full border text-xs md:text-sm transition-colors ${
                        selectedStrong?.strong === token.strong &&
                        selectedStrong?.text === token.text
                          ? "bg-emerald-500/20 border-emerald-400 text-emerald-200"
                          : "bg-slate-950 border-slate-700 text-slate-200 hover:border-emerald-400 hover:text-emerald-200"
                      }`}
                    >
                      {token.text}{" "}
                      <span className="text-[0.7rem] opacity-70">
                        ({token.strong})
                      </span>
                    </button>
                  ))}
                </div>
                <p className="mt-2 text-[0.75rem] text-slate-500">
                  Select a word to inspect its root meaning, or open the
                  Strong&apos;s tab for details.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* RIGHT: Insights panel with tabs */}
        <aside className="bg-slate-900/70 border border-slate-800 rounded-2xl shadow-lg">
          <div className="flex border-b border-slate-800 text-xs md:text-sm">
            {[
              { id: "strongs", label: "Strong's" },
              { id: "exegesis", label: "Exegesis" },
              { id: "application", label: "Life Application" },
              { id: "notes", label: "Notes" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as InsightTab)}
                className={`flex-1 px-3 py-2 md:px-4 md:py-2.5 border-b-2 text-center transition-colors ${
                  activeTab === tab.id
                    ? "border-emerald-400 text-emerald-300 bg-slate-900"
                    : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-4 md:p-5 space-y-3 text-sm md:text-[0.9rem]">
            {activeTab === "strongs" && (
              <div className="text-slate-300 space-y-3">
                <p className="mb-1 text-slate-400 text-xs uppercase tracking-wide">
                  Strong&apos;s Concordance
                </p>

                {strongTokens.length === 0 ? (
                  <p className="text-slate-400 text-sm">
                    There is no Strong&apos;s data loaded yet for{" "}
                    <span className="font-semibold">
                      {book} {chapter}:{verse}
                    </span>
                    . Try{" "}
                    <span className="font-semibold">Genesis 1:1</span> or{" "}
                    <span className="font-semibold">John 3:16</span> to see an
                    example.
                  </p>
                ) : (
                  <>
                    <p className="text-slate-400 text-sm">
                      Words in{" "}
                      <span className="font-semibold">
                        {book} {chapter}:{verse}
                      </span>{" "}
                      with linked Strong&apos;s entries. Select a word to
                      inspect its root meaning.
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {strongTokens.map((token) => (
                        <button
                          key={token.strong + token.text}
                          onClick={() => {
                            setSelectedStrong(token);
                            setActiveTab("strongs");
                          }}
                          className={`px-2.5 py-1 rounded-full border text-xs md:text-sm transition-colors ${
                            selectedStrong?.strong === token.strong &&
                            selectedStrong?.text === token.text
                              ? "bg-emerald-500/20 border-emerald-400 text-emerald-200"
                              : "bg-slate-900 border-slate-700 text-slate-200 hover:border-emerald-400 hover:text-emerald-200"
                          }`}
                        >
                          {token.text}{" "}
                          <span className="text-[0.7rem] opacity-70">
                            ({token.strong})
                          </span>
                        </button>
                      ))}
                    </div>

                    {selectedStrong ? (
                      <div className="mt-3 border-t border-slate-800 pt-3 space-y-1">
                        <div className="text-xs uppercase tracking-wide text-slate-400">
                          Selected Word
                        </div>
                        <div className="text-sm">
                          <span className="font-semibold">
                            {selectedStrong.text}
                          </span>{" "}
                          <span className="text-slate-400">
                            — {selectedStrong.strong}{" "}
                            {selectedStrong.language === "H"
                              ? "(Hebrew)"
                              : "(Greek)"}
                          </span>
                        </div>
                        <div className="text-sm">
                          <span className="font-semibold">
                            {selectedStrong.lemma}{" "}
                          </span>
                          <span className="text-slate-400">
                            ({selectedStrong.transliteration})
                          </span>
                        </div>
                        <div className="text-sm">
                          <span className="font-semibold">Gloss: </span>
                          {selectedStrong.gloss}
                        </div>
                        <div className="text-sm">
                          <span className="font-semibold">Definition: </span>
                          {selectedStrong.definition}
                        </div>
                      </div>
                    ) : (
                      <p className="mt-2 text-slate-400 text-sm">
                        Select a word above to view its Strong&apos;s details.
                      </p>
                    )}
                  </>
                )}
              </div>
            )}

            {activeTab === "exegesis" && (
              <ExegesisPanel initialPassage={`${book} ${chapter}:${verse}`} />
            )}

            {activeTab === "application" && (
              <div className="text-slate-300 space-y-2">
                <p className="mb-1 text-slate-400 text-xs uppercase tracking-wide">
                  Life Application
                </p>
                <p>
                  This area will connect the text to real-world hardships —
                  grief, trauma, calling, temptation, and spiritual warfare — so
                  believers can walk out the truth of{" "}
                  <span className="font-semibold">
                    {book} {chapter}:{verse}
                  </span>
                  .
                </p>
              </div>
            )}

            {activeTab === "notes" && (
              <div className="space-y-2">
                <p className="mb-1 text-slate-400 text-xs uppercase tracking-wide">
                  Personal Notes
                </p>
                <p className="text-slate-300">
                  Capture what the Lord is showing you as you read. These notes
                  can later be tied into your Journey module.
                </p>
                <textarea
                  className="w-full min-h-[120px] bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 outline-none focus:border-emerald-400"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Write your reflections, prayers, or questions here..."
                />
              </div>
            )}
          </div>
        </aside>
      </div>
    </main>
  );
}
