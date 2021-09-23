import { useState, useContext, useEffect } from "react";
import styles from "@/styles/AuthForm.module.css";
import Layout from "components/Layout";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import AuthContext from "context/AuthContext";
import { ToastContainer, toast } from "react-toastify";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const { register, error } = useContext(AuthContext);

  useEffect(() => error && toast.error(error));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password != passwordConfirm) {
      toast.error("Šifre se ne podudaraju");
      return;
    }
    register({ username, email, password });
  };

  return (
    <Layout title='Registracija'>
      <div className={styles.auth}>
        <h1>
          <FaUser /> REGISTRACIJA
        </h1>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='username'>Username</label>
            <input
              type='text'
              id='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor='password'>Šifra</label>
            <input
              type='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor='passwordConfirm'>Potvrdi šifru</label>
            <input
              type='password'
              id='passwordConfirm'
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </div>
          <input type='submit' value='Registracija' className='btn' />
        </form>
        <p>
          Imate račun ? <Link href='/account/login'>Prijavite se</Link>{" "}
        </p>
      </div>
    </Layout>
  );
};

export default Register;
