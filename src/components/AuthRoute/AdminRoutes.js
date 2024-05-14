import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfileAction } from "../../redux/slice/users/usersSlice";
import AdminOnly from "../NotAuthorised/AdminOnly";


const AdminRoutes = ({ children }) => {
  // console.log("ddd");
  //dispatch
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserProfileAction());
  }, [dispatch]);
  //get user from store
  const { userAuth } = useSelector((state) => state?.users);
  console.log(userAuth)
  const isAdmin = userAuth?.userInfo?.userFound?.isAdmin ? true : false;
  if (!isAdmin) return <AdminOnly />;
  return <>{children}</>;
};

export default AdminRoutes;