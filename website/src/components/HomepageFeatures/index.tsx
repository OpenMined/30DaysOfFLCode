import clsx from "clsx";
import Link from "@docusaurus/Link";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  link: string;
  Svg: React.ComponentType<React.ComponentProps<"svg">>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: "LinkedIn",
    link: "https://www.linkedin.com/company/openmined",
    Svg: require("@site/static/img/icons/linkedin.svg").default,
    description: (
      <>
        Docusaurus was designed from the ground up to be easily installed and
        used to get your website up and running quickly.
      </>
    ),
  },
  {
    title: "Slack",
    link: "https://join.slack.com/t/openmined/shared_invite/zt-2mppghwyb-PFVsZeUEF771nv2om_v6gA",
    Svg: require("@site/static/img/icons/slack.svg").default,
    description: (
      <>
        Docusaurus lets you focus on your docs, and we&apos;ll do the chores. Go
        ahead and move your docs into the <code>docs</code> directory.
      </>
    ),
  },
  {
    title: "Twitter",
    link: "https://www.x.com/openmined/",
    Svg: require("@site/static/img/icons/twitter.svg").default,
    description: (
      <>
        Extend or customize your website layout by reusing React. Docusaurus can
        be extended while reusing the same header and footer.
      </>
    ),
  },
];

function Feature({ title, Svg, description, link }: FeatureItem) {
  return (
    <Link className="" to={link} >
    <div className={clsx("col font-sans")}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        {/* <p>{description}</p> */}
      </div>
    </div>
    </Link>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container pt-8 pb-8">
        <h1 className="text--center pt-2 pb-4">Community</h1>
        <div className="row justify-center">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
