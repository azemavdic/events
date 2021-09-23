import EventItem from "components/EventItem";
import Pagination from "components/Pagination";
import { API_URL } from "config";
import { PER_PAGE } from "components/Pagination";
import Layout from "@/components/Layout";

export default function Events({ events, page, total }) {
  return (
    <Layout title='Svi eventi'>
      <h1 className='header'>Eventi</h1>
      {events.length === 0 && <h3>Nema eventa!</h3>}

      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}

      <Pagination page={page} total={total} />
    </Layout>
  );
}

export async function getServerSideProps({ query: { page = 1 } }) {
  //Početna stranica pagination
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;

  //Fetch total events
  const totalRes = await fetch(`${API_URL}/events/count`);
  const total = await totalRes.json();

  //Fetch events
  const res = await fetch(
    `${API_URL}/events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`
  );
  const events = await res.json();

  return {
    props: {
      events,
      page: +page,
      total,
    },
    // revalidate: 1,
  };
}
