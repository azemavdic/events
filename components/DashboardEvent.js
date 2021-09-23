import styles from "@/styles/DashboardEvent.module.css";
import Link from "next/dist/client/link";
import { FaPencilAlt, FaTimes } from "react-icons/fa";

const DashboardEvent = ({ event, handleDelete }) => {
  return (
    <div className={styles.event}>
      <h4>
        <Link href={`/events/${event.slug}`}>
          <a>{event.name}</a>
        </Link>
      </h4>
      <Link href={`/events/edit/${event.id}`}>
        <a className={styles.edit}>
          <FaPencilAlt />
        </a>
      </Link>
      <a
        href='#'
        onClick={() => handleDelete(event.id)}
        className={styles.delete}
      >
        <FaTimes />
      </a>
    </div>
  );
};

export default DashboardEvent;
