import Link from "@docusaurus/Link";
import Heading from "@theme/Heading";

type CommunityItemProps = {
  title: string;
  link: string;
  imgSrc: string;
};

const communityItemList: CommunityItemProps[] = [
  {
    title: "LinkedIn",
    link: "https://www.linkedin.com/company/openmined",
    imgSrc: "/img/icons/linkedin.svg",
  },
  {
    title: "Slack",
    link: "https://join.slack.com/t/openmined/shared_invite/zt-2mppghwyb-PFVsZeUEF771nv2om_v6gA",
    imgSrc: "/img/icons/slack.svg",
  },
  {
    title: "Twitter",
    link: "https://www.x.com/openmined/",
    imgSrc: "img/icons/twitter.svg",
  },
];

function CommunityItem({ title, imgSrc, link }: CommunityItemProps) {
  return (
    <Link to={link} className="flex flex-col items-center gap-2 font-sans">
      <img className="size-16 text-black" role="img" src={imgSrc} />
      <Heading as="h3">{title}</Heading>
    </Link>
  );
}

export default function CommunityItems(): JSX.Element {
  return (
    <section className="flex flex-col items-center py-16">
      <Heading as="h2" className="pb-4 pt-2 text-center">
        Community
      </Heading>
      <div className="flex justify-center gap-14">
        {communityItemList.map((props, idx) => (
          <CommunityItem key={idx} {...props} />
        ))}
      </div>
    </section>
  );
}
