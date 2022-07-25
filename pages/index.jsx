import { getFeaturedEvents } from "../helpers/api-util";
import EventList from "../components/events/EventList";

function HomePage({featuredEvents, ...props}) {

  return (
    <div>
      <EventList events={featuredEvents} />
    </div>
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
