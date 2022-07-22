import classes from './EventContent.module.css';

function EventContent({children, ...props}) {
  return (
    <section className={classes.content}>
      {children}
    </section>
  );
}

export default EventContent;
