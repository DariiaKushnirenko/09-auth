"use client";
import css from "./SignUpPage.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { register, RegisterRequest } from "@/lib/clientApi";

const SignUp = () => {
  const router = useRouter();
  const [error, setError] = useState("");

  // const handleSubmit = async (formData: FormData) => {
  //   try {
  //     const formValues = Object.fromEntries(formData) as RegisterRequest;
  //     const res = await register(formValues);
  //     if (res) {
  //       router.push("/profile");
  //     } else {
  //       setError("Invalid email or password");
  //     }
  //   } catch (error) {
  //     console.log("error", error);
  //     setError("Invalid email or password");
  //   }
  // };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault(); // зупиняє перезавантаження сторінки

  const formData = new FormData(event.currentTarget);
  const formValues = Object.fromEntries(formData) as RegisterRequest;

  try {
    const res = await register(formValues);
    if (res) {
      router.push('/profile');
    } else {
      setError('Invalid email or password');
    }
  } catch (error) {
    console.log('error', error);
    setError('Invalid email or password');
  }
};
  return (
    <>
      <main className={css.mainContent}>
        <form onSubmit={handleSubmit} className={css.form}>
        <h1 className={css.formTitle}>Sign up</h1>

          <div className={css.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              className={css.input}
              required
            />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              className={css.input}
              required
            />
          </div>

          <div className={css.actions}>
            <button type="submit" className={css.submitButton}>
              Register
            </button>
          </div>
        </form>
        {error &&  <p className={css.error}>Error</p>}
      </main>
    </>
  );
};
export default SignUp;
