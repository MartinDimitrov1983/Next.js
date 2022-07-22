import { Fragment } from "react";
import { useRouter } from "next/router";

import { getEventById } from "../../dummy-data";
import EventSummary from "../../components/eventDetail/EventSummary";
import EventContent from "../../components/eventDetail/EventContent";
import EventLogistics from "../../components/eventDetail/EventLogistics";
import ErrorAlert from "../../components/ui/ErrorAlert";

function AllEventsPage({}) {
  const router = useRouter();
  const eventid = router.query.eventid;
  console.log(eventid);
  const event = getEventById(eventid);

  if (!event) {
    return (
      <ErrorAlert>
        <p>No event found!</p>
      </ErrorAlert>
    );
  }

  const { title, date, location, image, description } = event;
  return (
    <Fragment>
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
    </Fragment>
  );
}

export default AllEventsPage;
