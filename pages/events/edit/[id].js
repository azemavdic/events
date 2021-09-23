import { FaImage } from "react-icons/fa";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import styles from "@/styles/Form.module.css";
import { API_URL } from "config";
import Modal from "@/components/Modal";
import ImageUpload from "components/ImageUpload";
import Layout from "@/components/Layout";
import { parseCookies } from "helpers";

const Edit = ({ data, token }) => {
  const [values, setValues] = useState({
    name: data.name,
    description: data.description,
    venue: data.venue,
    date: data.date,
    time: data.time,
    address: data.address,
    performers: data.performers,
  });

  const [imagePreview, setImagePreview] = useState(
    data.image ? data.image.formats.thumbnail.url : null
  );

  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const hasEmptyFields = Object.values(values).some((e) => e === "");

    if (hasEmptyFields) {
      toast.error("Molimo ispunite sva polja");
    }

    const res = await fetch(`${API_URL}/events/${data.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      toast.error("Neuspjelo dodavanje u bazu.");
    } else {
      const evt = await res.json();
      setIsLoading(false);
      router.push(`/events/${evt.slug}`);
    }
  };

  if (isLoading) {
    toast.info("Loading", { toastId: "bb", autoClose: false });
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const imageUploaded = async () => {
    const res = await fetch(`${API_URL}/events/${data.id}`);
    const evt = await res.json();
    setImagePreview(evt.image.formats.thumbnail.url);
    setShowModal(false);
  };

  return (
    <Layout title={data.name}>
      <Link href='/events'>Nazad na evente</Link>
      <h1>
        Edituj event -{" "}
        <span
          style={{
            fontWeight: "400",
            color: "green",
            borderBottom: "1px solid green",
          }}
        >
          {data.name}
        </span>
      </h1>
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
              value={moment(values.date).format("yyyy-MM-DD")}
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
      <h2>Slika eventa</h2>
      {imagePreview ? (
        <Image src={imagePreview} width={170} height={100} />
      ) : (
        <div>
          <p>Nema slike za pregled.</p>
        </div>
      )}
      <div>
        <button className='btn-secondary' onClick={() => setShowModal(true)}>
          <FaImage /> Postavi sliku
        </button>
      </div>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <ImageUpload
          evtId={data.id}
          imageUploaded={imageUploaded}
          token={token}
        />
      </Modal>
    </Layout>
  );
};

export default Edit;

export async function getServerSideProps({ params: { id }, req }) {
  const res = await fetch(`${API_URL}/events/${id}`);
  const data = await res.json();

  const { token } = parseCookies(req);

  return {
    props: { data, token },
  };
}
