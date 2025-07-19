"use client";
import css from "./SignUpPage.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { register, RegisterRequest } from "../../../lib/api/clientApi";
import { useAuthStore } from "../../../lib/store/authStore";

const SignUp = () => {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const [error, setError] = useState("");

  const handleSubmit = async (formData: FormData) => {
    try {
      const formValues = Object.fromEntries(formData) as RegisterRequest;
      const user = await register(formValues);
      if (user) {
        setUser(user);
        router.push("/profile");
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      console.log("error", error);
      setError("Invalid email or password");
  
  };
 
};
  return (
    <>
      <main className={css.mainContent}>
        <form action={handleSubmit} className={css.form}>
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
        {error &&  <p className={css.error}>Something went wrong</p>}
      </main>
    </>
  );
};
export default SignUp;
