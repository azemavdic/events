import Link from "next/link";
import EventItem from "components/EventItem";
import { API_URL } from "config";
import Layout from "@/components/Layout";

export default function Home(props) {
  return (
    <Layout>
      <h1 className='header'>Nadolazeći eventi</h1>
      {props.events.length === 0 && <h3>Nema eventa!</h3>}

      {props.events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}

      {props.events.length > 0 && (
        <Link href='/events'>
          <a className='btn-secondary'>Svi eventi</a>
        </Link>
      )}
    </Layout>
  );
}

export async function getStaticProps(ctx) {
  const res = await fetch(`${API_URL}/events?_sort=date:ASC&_limit=3`);
  const events = await res.json();

  return {
    props: {
      events,
    },
    revalidate: 1,
  };
}
