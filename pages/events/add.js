import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";
import styles from "@/styles/Form.module.css";
import { API_URL } from "config";
import Layout from "@/components/Layout";
import { parseCookies } from "helpers";

const Add = ({ token }) => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    venue: "",
    date: "",
    time: "",
    address: "",
    performers: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const hasEmptyFields = Object.values(values).some((e) => e === "");

    if (hasEmptyFields) {
      toast.error("Molimo ispunite sva polja");
    }

    const res = await fetch(`${API_URL}/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      toast.error("Neuspjelo dodavanje u bazu.");
      return;
    } else {
      const evt = await res.json();
      router.push(`/events/${evt.slug}`);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    toast.info("Loading", { toastId: "aaa", autoClose: false });
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <Layout>
      <Link href='/events'>Nazad na evente</Link>
      <h1>Dodaj event</h1>
      <ToastContainer theme='colored' />
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor='name'>Naziv eventa</label>
            <input
              type='text'
              id='name'
              name='name'
              onChange={handleInputChange}
              value={values.name}
            />
          </div>
          <div>
            <label htmlFor='performers'>Izvođači eventa</label>
            <input
              type='text'
              id='performers'
              name='performers'
              onChange={handleInputChange}
              value={values.performers}
            />
          </div>
          <div>
            <label htmlFor='venue'>Mjesto eventa</label>
            <input
              type='text'
              id='venue'
              name='venue'
              onChange={handleInputChange}
              value={values.venue}
            />
          </div>
          <div>
            <label htmlFor='address'>Adresa eventa</label>
            <input
              type='text'
              id='address'
              name='address'
              onChange={handleInputChange}
              value={values.address}
            />
          </div>
          <div>
            <label htmlFor='date'>Datum eventa</label>
            <input
              type='date'
              id='date'
              name='date'
              onChange={handleInputChange}
              value={values.date}
            />
          </div>

          <div>
            <label htmlFor='time'>Vrijeme eventa</label>
            <input
              type='text'
              id='time'
              name='time'
              onChange={handleInputChange}
              value={values.time}
            />
          </div>
        </div>
        <div>
          <label htmlFor='description'>Opis eventa</label>
          <textarea
            name='description'
            id='description'
            onChange={handleInputChange}
            value={values.description}
          ></textarea>
        </div>
        <input type='submit' value='Potvrdi' className='btn' />
      </form>
    </Layout>
  );
};

export default Add;

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);

  return {
    props: { token },
  };
}
