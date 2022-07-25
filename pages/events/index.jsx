import { useRouter } from "next/router";
import Head from "next/head";

import { getAllEvents } from "../../helpers/api-util";
import EventList from "../../components/events/EventList";
import EventsSearch from "../../components/events/EventsSearch";

function AllEventsPage({ events, ...props }) {
  const router = useRouter();

  function findEventsHandler(year, month) {
    const path = `/events/${year}/${month}`;

    router.push(path);
  }
  return (
    <div>
      <Head>
        <title>All my events</title>
      </Head>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList events={events} />
    </div>
  );
}

export async function getStaticProps() {
  const events = await getAllEvents();

  return {
    props: {
      events,
    },
    revalidate: 60,
  };
}

export default AllEventsPage;
