import Link from "next/dist/client/link";

import classes from "./Button.module.css";

function Button({ link, onClick, children, ...props }) {
  return (
   (link) ?  
    (<Link href={link}>
      <a className={classes.btn}>{children}</a>
    </Link>) : 
    (
    <button className={classes.btn} onClick={onClick}>{children}</button>
    )
  )
}

export default Button;
