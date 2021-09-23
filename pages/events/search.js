import qs from "qs";
import Link from "next/link";
import EventItem from "components/EventItem";
import { API_URL } from "config";
import { useRouter } from "next/dist/client/router";
import Layout from "@/components/Layout";

export default function Search(props) {
  const router = useRouter();
  const search = router.query.term;

  return (
    <Layout>
      <Link href='/events'>
        <a className='header'>Nazad</a>
      </Link>
      <h1 className='header'>
        Rezultati pretrage za: <span style={{ color: "green" }}>{search}</span>
      </h1>
      <div className='header'>
        {props.events.length === 0 && <h3>Nema eventa!</h3>}
      </div>

      {props.events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}
    </Layout>
  );
}

export async function getServerSideProps({ query: { term } }) {
  const query = qs.stringify({
    _where: {
      _or: [
        { name_contains: term },
        { venue_contains: term },
        { performers_contains: term },
        { description_contains: term },
      ],
    },
  });

  const res = await fetch(`${API_URL}/events?${query}`);
  const events = await res.json();

  return {
    props: {
      events,
    },
  };
}
