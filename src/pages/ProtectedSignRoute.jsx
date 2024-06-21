import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { supabase } from "../client";

const ProtectedSignRoute = ({ children }) => {
  const [data, setData] = useState();
  const [err, setErr] = useState();
  const navigate = useNavigate();

  const getSession = useMemo(
    () => async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        setData(data);
        setErr(error);
        console.log(data, error);
        if (data?.session) {
          toast("you are signed in");
          navigate("/dashboard", { replace: true });
        }
      } catch (error) {
        setErr(error);
      }
    },
    [navigate]
  ); // removed getSession from dependencies array

  useEffect(() => {
    getSession();
  }, [getSession]); // removed getSession from dependencies array

  return !err && data ? <>{children}</> : null;
};

export default ProtectedSignRoute;
