import classes from './ErrorAlert.module.css';

function ErrorAlert({children,  ...props}) {
  return <div className={classes.alert}>{children}</div>;
}

export default ErrorAlert;
