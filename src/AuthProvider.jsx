import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "./redux/authThunk";
import { fetchCart } from "./redux/cartThunk";
import { getUser } from "./redux/authSlice";

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  let isLoading;

  useEffect(() => {
    const fetchUserInfo = async () => {
      isLoading = true;
      const user = await dispatch(fetchUser());
      if (user) {
        dispatch(fetchCart());
      }
      isLoading = false;
    };

    fetchUserInfo();
  }, [dispatch]);

  //   useEffect(() => {
  //     if (user) {
  //       dispatch(fetchCart());
  //     }
  //   }, [dispatch, user]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return <>{children}</>;
};

export default AuthProvider;
