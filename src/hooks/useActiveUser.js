import { useState, useEffect } from 'react';
import { supabase } from "../client";

const useActiveUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);

        // Get the currently logged-in user
        const { data: user, error } = await supabase.auth.getUser();

        if (error) {
          throw error;
        }

        setUser(user);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();

  }, []);

  return { user, loading, error };
};

export default useActiveUser;