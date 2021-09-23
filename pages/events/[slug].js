import Link from "next/link";
import Image from "next/image";
import { API_URL } from "config";
import Layout from "@/components/Layout";
import EventMap from "components/EventMap";

import styles from "@/styles/Event.module.css";

const Event = (props) => {
  const { evt } = props;

  return (
    <Layout title={`Event - ${evt.name}`}>
      <div className={styles.event}>
        <div className='header'>
          <span>
            {new Date(evt.date).toLocaleDateString("en-GB")} u {evt.time}
          </span>
          <h1>{evt.name}</h1>
        </div>
        {evt.image && (
          <div className={styles.image}>
            <Image
              src={evt.image.formats.medium.url}
              width={960}
              height={600}
            />
          </div>
        )}
        <h3>Izvođači:</h3>
        <p>{evt.performers}</p>
        <h3>Opis:</h3>
        <p>{evt.description}</p>
        <h3>Mjesto održavanja: {evt.venue}</h3>
        <p>{evt.address}</p>

        <EventMap evt={evt} />

        <Link href={"/events"}>
          <a className={styles.back}>{"<"} Nazad</a>
        </Link>
      </div>
    </Layout>
  );
};

export default Event;

// export async function getStaticProps({ params: { slug } }) {
//   const res = await fetch(`${API_URL}/events?slug=${slug}`);
//   const events = await res.json();

//   return {
//     props: {
//       evt: events[0],
//     },
//     revalidate: 1,
//   };
// }

// export async function getStaticPaths(ctx) {
//   const res = await fetch(`${API_URL}/events`);
//   const events = await res.json();

//   const paths = events.map((ev) => ({
//     params: { slug: ev.slug },
//   }));

//   return {
//     paths,
//     fallback: true,
//   };
// }

export async function getServerSideProps({ query: { slug } }) {
  const res = await fetch(`${API_URL}/events?slug=${slug}`);
  const events = await res.json();

  return {
    props: {
      evt: events[0],
    },
  };
}
