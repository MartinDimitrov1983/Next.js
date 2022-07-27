import { Fragment } from "react";
import Head from "next/head";

import { getFeaturedEvents } from "../helpers/api-util";
import EventList from "../components/events/EventList";
import NewsletterRegistration from "../components/input/NewsletterRegistration";

function HomePage({ featuredEvents, ...props }) {
  return (
    <Fragment>
      <Head>
        <title>NextJS Events</title>
        <meta
          name="description"
          content="Find a lot of great events that allow you to evolve..."
        />
      </Head>
      <NewsletterRegistration />
      <EventList events={featuredEvents} />
    </Fragment>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      featuredEvents: featuredEvents,
    },
    revalidate: 1800,
  };
}

export default HomePage;
