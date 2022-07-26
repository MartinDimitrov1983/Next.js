import { Fragment } from "react";
import Head from "next/head";

import { getFeaturedEvents, getEventById } from "../../helpers/api-util";
import EventSummary from "../../components/eventDetail/EventSummary";
import EventContent from "../../components/eventDetail/EventContent";
import EventLogistics from "../../components/eventDetail/EventLogistics";
import Comments from "../../components/input/Comments";

function AllEventsPage({ event, ...props }) {
  if (!event) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    );
  }

  const { title, date, location, image, description } = event;
  return (
    <Fragment>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content={event.description} />
      </Head>
      <EventSummary title={title} />
      <EventLogistics
        date={date}
        address={location}
        image={image}
        imageAlt={title}
      />
      <EventContent>
        <p>{description}</p>
      </EventContent>
      <Comments eventId={event.id}/>
    </Fragment>
  );
}

export async function getStaticProps(context) {
  const {
    params: { eventId },
  } = context;

  const event = await getEventById(eventId);

  return {
    props: {
      event: event,
      revalidate: 30,
    },
  };
}

export async function getStaticPaths(context) {
  const events = await getFeaturedEvents();

  const paths = events.map((event) => ({ params: { eventId: event.id } }));

  return {
    paths: paths,
    fallback: "blocking",
  };
}

export default AllEventsPage;
