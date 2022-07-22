import EventItem from "./EventItem";
import classes from './EventList.module.css'

function EventList({ events, ...props }) {
  return (
    <ul className={classes.list}>
      {events.map((event) => {
        return <EventItem key={event.id} {...event} />;
      })}
    </ul>
  );
}

export default EventList;
