import { useRef } from "react";
import classes from "./profile-form.module.css";

function ProfileForm() {
  const newPasswordRef = useRef();
  const oldPasswordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPassword = newPasswordRef.current.value;
    const oldPassword = oldPasswordRef.current.value;
    const res = await fetch("/api/user/change-password", {
      method: "PUT",
      body: JSON.stringify({ newPassword, oldPassword }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await res.json();
    if (result.ok) {
      alert("password changed");
    }
    console.log(result);
  };
  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={newPasswordRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="old-password">Old Password</label>
        <input type="password" id="old-password" ref={oldPasswordRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
