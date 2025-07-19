"use client";
import css from "./EditProfilePage.module.css";
import Image from "next/image";
import { useState, useEffect } from "react";
import { updateMe, getMe } from "../../../../lib/api/clientApi";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../../../../lib/store/authStore";


const EditProfile = () => {
  const router = useRouter();
   const setUser = useAuthStore((state) => state.setUser);
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    getMe().then((user) => {
      setUserName(user.username ?? "");
      setEmail(user.email ?? "");
    });
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handleSaveUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
   const updatedUser = await updateMe({ username });
    setUser(updatedUser);

    router.push("/profile");
  };
  const handleCancel = () => {
    router.push("/profile");
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>
        <Image
          src="/avatar.png"
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />
        <form onSubmit={handleSaveUser} className={css.profileInfo}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username: {username}</label>
            <input
              type="text"
              value={username}
              onChange={handleChange}
              className={css.input}
            />
          </div>
          <p>Email: {email}</p>
          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default EditProfile;
