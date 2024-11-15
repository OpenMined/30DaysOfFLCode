import clsx from "clsx";
import Link from "@docusaurus/Link";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

type CommunityItemProps = {
  title: string;
  link: string;
  url: string;
};

const CommunityItemList: CommunityItemProps[] = [
  {
    title: "LinkedIn",
    link: "https://www.linkedin.com/company/openmined",
    url: "/img/icons/linkedin.svg",
  },
  {
    title: "Slack",
    link: "https://join.slack.com/t/openmined/shared_invite/zt-2mppghwyb-PFVsZeUEF771nv2om_v6gA",
    url: "/img/icons/slack.svg",
  },
  {
    title: "Twitter",
    link: "https://www.x.com/openmined/",
    url: "img/icons/twitter.svg",
  },
];

function CommunityItem({ title, url, link }: CommunityItemProps) {
  return (
    <Link className="" to={link}>
      <div className={clsx("col font-sans")}>
        <div className="text--center">
          <img className={styles.featureSvg} role="img" src={url} />
        </div>
        <div className="text--center padding-horiz--md">
          <Heading as="h3">{title}</Heading>
        </div>
      </div>
    </Link>
  );
}

export default function CommunityItems(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container py-8">
        <Heading as="h2" className="pb-4 pt-2 text-center">
          Community
        </Heading>
        <div className="flex justify-center">
          {CommunityItemList.map((props, idx) => (
            <CommunityItem key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
