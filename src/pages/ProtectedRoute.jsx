import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../client";

const ProtectedRoute = ({ children }) => {
  const [data, setData] = useState();
  const [err, setErr] = useState();
  const navigate = useNavigate();

  const getSession = useCallback(async () => {
    const { data, error } = await supabase.auth.getSession();
    setData(data);
    setErr(error);
    console.log(data, error);
    if (!data?.session) {
      navigate("/login", { replace: true });
      console.log(data?.session);
    }
  }, [navigate]);

  useEffect(() => {
    getSession();
  }, [getSession]);

  return !err && data ? <>{children}</> : null;
};

export default ProtectedRoute;
