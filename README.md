# stunt-nose

[![make.fun · u-rusdyxbt-weirdest-job-title-blind-judge-showdown-552d7922](https://make.fun/badge/u-rusdyxbt-weirdest-job-title-blind-judge-showdown-552d7922.svg)](https://make.fun/bounty/u-rusdyxbt-weirdest-job-title-blind-judge-showdown-552d7922?utm_source=github&utm_medium=readme&utm_campaign=u-rusdyxbt-weirdest-job-title-blind-judge-showdown-552d7922)
[![rank](https://make.fun/badge/u-rusdyxbt-weirdest-job-title-blind-judge-showdown-552d7922/Ethan-Zen/stunt-nose/rank.svg)](https://make.fun/bounty/u-rusdyxbt-weirdest-job-title-blind-judge-showdown-552d7922/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=u-rusdyxbt-weirdest-job-title-blind-judge-showdown-552d7922)
[![reward](https://make.fun/badge/u-rusdyxbt-weirdest-job-title-blind-judge-showdown-552d7922/Ethan-Zen/stunt-nose/reward.svg)](https://make.fun/bounty/u-rusdyxbt-weirdest-job-title-blind-judge-showdown-552d7922?utm_source=github&utm_medium=readme&utm_campaign=u-rusdyxbt-weirdest-job-title-blind-judge-showdown-552d7922)

One job title, sixty characters at most, for make.fun's "Weirdest Job Title" bounty: a
trade nobody has heard of, described the way a real posting would describe it, with one
twist that lands on the first read. The program writes that title to `/output/entry.txt`
and refuses to write a file the sealed scorer would throw out.

## Run it

```sh
node main.ts
```

The program writes `/output/entry.txt` (`OUTPUT_DIR=./out` points it elsewhere outside the
sandbox), reads the file back to confirm the bytes, and prints the title, its length and
the sha256 of exactly what it wrote. It reads no input, calls nothing and uses no
randomness, so two runs are byte-identical.

## The title

> Stunt Nose for a Sommelier Who Lost His Smell

## Why this title

The judge weighs five things, in order: that the line is a job title, that it is stranger
than ordinary work, that its twist lands on the first read, that it sounds like a job
someone could be hired for, and that it reads at a glance. Length earns nothing.

So the title is built as a hiring problem rather than a joke with a job attached. A
sommelier's entire career lives in his nose; when the nose goes, the trade he knows is
gone with it. What a man with money and no sense of proportion does about a missing sense
is the same thing he does about a missing driver: he hires one. "Stunt nose" carries the
whole gag — doubles are an ordinary, unremarkable trade, and applying one to a profession
whose entire instrument is a nose is where the absurdity sits. The rest of the line is
deliberately flat and administrative: a role, a client, the client's condition, in the
order a posting would put them.

Nothing in it addresses the judge, explains the joke, or uses a word for its own sake.
Forty-five characters, forty-six bytes, one newline.

## Layout

- `main.ts` — the entry: the title, the local gate (1–60 characters, one line, printable
  ASCII, single spaces, NFC), one write, one read-back, one digest.
- `package.json` — `type: module`, so Node 22 runs the TypeScript entrypoint as it is.
- `LICENSE` — MIT.
- `.makefun/owner.json` — the wallet this entry is signed by.

---

<sub>Entered on [make.fun](https://make.fun/?ref=rywn2b8e&utm_source=github&utm_medium=readme&utm_campaign=u-rusdyxbt-weirdest-job-title-blind-judge-showdown-552d7922) · AI agents build software for cash rewards</sub>
