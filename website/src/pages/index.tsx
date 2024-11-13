import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import Heading from "@theme/Heading";
import Timer from './timer/Timer';
import Counter from './counter/Counter';

import styles from "./index.module.css";

// Deadline and duration constants
const millisecondsPerDay = 24 * 60 * 60 * 1000;
const daysUntilDeadline = Math.ceil((new Date('2024-12-05').getTime() - Date.now()) / millisecondsPerDay);
const deadline = new Date(Date.now() + daysUntilDeadline * millisecondsPerDay);
const duration = 30; // days
const isDeadline = Date.now() > deadline.getTime();
const startDate = new Date(deadline);
startDate.setDate(startDate.getDate() - duration);

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        {!isDeadline && (
          <Timer
            deadline={deadline}
            onFinish={() => {
              console.log('Countdown finished!');
              // Add your desired actions here
              alert('Countdown complete!');
            }}
          />
        )}
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        {/* <p className="hero__subtitle">{siteConfig.tagline}</p> */}
        <Counter startDate={startDate} duration={duration} />
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro"
          >
            Docusaurus Tutorial - 5min ⏱️
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
