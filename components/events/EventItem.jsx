import Image from "next/image";

import Button from "../ui/Button";
import AddressIcon from "../icons/AddressIcon";
import DateIcon from "../icons/DateIcon";
import ArrowRightIcon from '../icons/ArrowRightIcon'
import classes from "./EventItem.module.css";

function EventItem({ title, image, date, location, id, ...props }) {
  const humanReadableDate = new Date(date).toLocaleDateString("en-us", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const formattedAddress = location.replace(".", "\n");

  return (
    <li className={classes.item}>
      <Image src={"/" + image} alt={title} width={250} height={250}/>
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{title}</h2>
          <div className={classes.date}>
            <DateIcon />
            <time>{humanReadableDate}</time>
          </div>
          <div className={classes.address}>
            <AddressIcon />
            <address>{formattedAddress}</address>
          </div>
        </div>
        <div className={classes.actions}>
          <Button link={`/events/${id}`}>
            <span>Explore Event</span>
            <span className={classes.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
}

export default EventItem;
