import { useState, useContext, useEffect } from "react";
import AuthContext from "context/AuthContext";
import styles from "@/styles/AuthForm.module.css";
import Layout from "components/Layout";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, error } = useContext(AuthContext);

  useEffect(() => error && toast.error(error));

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <Layout title='Prijava'>
      <div className={styles.auth}>
        <h1>
          <FaUser /> PRIJAVA
        </h1>
        <ToastContainer theme='colored' />
        <form onSubmit={handleSubmit}>
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
          <input type='submit' value='Prijava' className='btn' />
        </form>
        <p>
          Nemate račun ? <Link href='/account/register'>Registruj se</Link>{" "}
        </p>
      </div>
    </Layout>
  );
};

export default Login;
