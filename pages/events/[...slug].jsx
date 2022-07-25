import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import Head from "next/head";

import EventList from "../../components/events/EventList";
import ResultsTitle from "../../components/events/ResultsTitle";
import Button from "../../components/ui/Button";
import ErrorAlert from "../../components/ui/ErrorAlert";
import { apiUrl } from "../../helpers/api-util";

function FilteredEventsPage({ ...props }) {
  const [events, setEvents] = useState();
  const router = useRouter();

  const filterData = router.query.slug;

  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR(apiUrl, fetcher);

  useEffect(() => {
    if (data) {
      const fetchedEvents = [];

      for (const key in data) {
        fetchedEvents.push({
          id: key,
          ...data[key],
        });
      }

      setEvents(fetchedEvents);
    }
  }, [data]);

  let pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta name="description" content={`A list of filtered events.`} />
    </Head>
  );

  if (!events) {
    return (
      <Fragment>
        {pageHeadData}
        <p className="center">Loading...</p>;
      </Fragment>
    );
  }
  const [year, month] = filterData;
  const numYear = Number(year);
  const numMonth = Number(month);

  pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta
        name="description"
        content={`All events for ${numMonth}/${numYear}.`}
      />
    </Head>
  );

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12 ||
    error
  ) {
    return (
      <Fragment>
        {pageHeadData}
        <ErrorAlert>
          <p className="center">Invalid filter! Please adjust your values!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All events</Button>
        </div>
      </Fragment>
    );
  }

  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        {pageHeadData}
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All events</Button>
        </div>
      </Fragment>
    );
  }

  const selectedDate = new Date(numYear, numMonth - 1);

  return (
    <Fragment>
      {pageHeadData}
      <ResultsTitle date={selectedDate} />
      <EventList events={filteredEvents} />
    </Fragment>
  );
}

// export async function getServerSideProps(context) {
//   const { params } = context;

//   const [year, month] = params.slug;
//   const numYear = Number(year);
//   const numMonth = Number(month);

//   if (
//     isNaN(numYear) ||
//     isNaN(numMonth) ||
//     numYear > 2030 ||
//     numYear < 2021 ||
//     numMonth < 1 ||
//     numMonth > 12
//   ) {
//     return {
//       props: { hasError: true },
//     };
//   }

//   const filteredEvents = await getFilteredEvents({
//     year: numYear,
//     month: numMonth,
//   });

//   return {
//     props: {
//       events: filteredEvents,
//       date: {
//         year: numYear,
//         month: numMonth,
//       },
//     },
//   };
// }

export default FilteredEventsPage;
