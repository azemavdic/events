import { parseCookies } from "helpers";
import Layout from "components/Layout";
import { API_URL } from "config";
import styles from "@/styles/Dashboard.module.css";
import DashboardEvent from "components/DashboardEvent";
import { ToastContainer, toast } from "react-toastify";

import { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import AuthContext from "@/context/AuthContext";

const Dashboard = ({ data, token }) => {
  const router = useRouter();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) {
      router.push("/account/login");
    }
  });

  if (!user) {
    return null;
  }

  const deleteEvent = async (id) => {
    if (confirm("Jesi li siguran")) {
      const res = await fetch(`${API_URL}/events/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        toast.error("Neuspješno brisanje");
      } else {
        toast.success("Uspješno obrisan event");
        router.push("/account/dashboard");
      }
    }
  };

  return (
    <Layout title='Dashboard'>
      <div className={styles.dash}>
        <h1>Dashboard</h1>
        <h3>Moji eventi</h3>
        <ToastContainer />
        {data.map((event) => (
          <DashboardEvent
            key={event.id}
            event={event}
            handleDelete={deleteEvent}
          />
        ))}
      </div>
    </Layout>
  );
};

export default Dashboard;

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);

  const res = await fetch(`${API_URL}/events/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return {
    props: { data, token },
  };
}
