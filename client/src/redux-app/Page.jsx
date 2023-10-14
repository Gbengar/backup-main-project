import { useEffect } from "react";
import { selectUser, selectIsLoggedIn } from "./features/auth/authSlice";
import { useSelector } from "react-redux";

function Page({ pageTitle, children }) {
  const { isLoading, isLoggedIn, isSuccess, message, user } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isLoggedIn && user) {
      document.title = `Applaza - ${user.name} / ${pageTitle}`;
    } else {
      document.title = `Applaza - ${pageTitle}`;
    }
  }, [pageTitle, user, isLoggedIn]);

  return children;
}

export default Page;
