import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import CommunityItems from "@site/src/components/HomepageFeatures";
import Heading from "@theme/Heading";
import Timer from "../components/timer/Timer";
import Counter from "../components/counter/Counter";

import styles from "./index.module.css";

// Deadline and duration constants
const millisecondsPerDay = 24 * 60 * 60 * 1000;
const daysUntilDeadline = Math.ceil(
  (new Date("2024-11-20").getTime() - Date.now()) / millisecondsPerDay,
);
const deadline = new Date(Date.now() + daysUntilDeadline * millisecondsPerDay);
const duration = 30; // days
const isDeadline = Date.now() > deadline.getTime();
const startDate = new Date(deadline);
startDate.setDate(startDate.getDate() - duration);

function HeropageHeader() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <section className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title m-0 pb-8 pt-8">
          {siteConfig.title}
        </Heading>
        <div className={`${styles.buttons} pb-8 pt-8`}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro"
          >
            Quickstart Guide - 5min ⏱️
          </Link>
        </div>
        <p className="hero__subtitle m-0 pb-8 pt-8 text-black">
          {siteConfig.tagline}
        </p>
        <Counter startDate={startDate} duration={duration} />
      </div>
    </section>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      {!isDeadline && (
        <Timer
          deadline={deadline}
          onFinish={() => {
            console.log("Countdown finished!");
            // Add your desired actions here
            alert("Countdown complete!");
          }}
        />
      )}
      <HeropageHeader />
      <main>
        <CommunityItems />
      </main>
    </Layout>
  );
}
