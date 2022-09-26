import { useSession } from "next-auth/react";
import { useEffect } from "react";
import ProfileForm from "./profile-form";
import classes from "./user-profile.module.css";

function UserProfile() {
  // Redirect away if NOT auth
  // const { data: session, status } = useSession();

  // // if (!session) {
  // //   window.location.href = "/";
  // // }
  // useEffect(() => {
  //   if (!session && status !== "loading") {
  //     window.location.href = "/auth";
  //   }
  // }, [session, status]);

  // if (status === "loading") {
  //   console.log("LOADING AT FIRST");
  //   return <div className={classes.profile}>Loading....</div>;
  // }

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm />
    </section>
  );
}

export default UserProfile;
