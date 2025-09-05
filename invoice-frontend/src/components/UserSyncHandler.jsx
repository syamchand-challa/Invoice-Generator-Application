import { useAuth, useUser } from "@clerk/clerk-react";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext.jsx";
import axios from "axios";
import toast from "react-hot-toast";

  const UserSyncHandler = () => {
  const { isLoaded, isSignedIn, getToken } = useAuth();
  const { user } = useUser();
  const [synced, setSynced] = useState(false);
  const { baseURL } = useContext(AppContext);

  useEffect(() => {
    const saveUser = async () => {
      if (!isLoaded || !isSignedIn || synced) {
        return;
      }

      try {
        const token = await getToken(); 
      
        const userData = {
          clerkId: user.id,
          email: user.primaryEmailAddress.emailAddress,
          firstName: user.firstName,
          lastName: user.lastName,
          photoUrl: user.imageUrl,

        }

     await axios.post(baseURL + "/users", userData, {
  headers: {
    Authorization: `Bearer ${token}`, 
  },
});

        setSynced(true);
      
      } catch (error) {
      
        toast.error(error.message);
      }
    }

    saveUser();
  }, [isLoaded, isSignedIn, getToken, user, synced, ]);

  return null;
}

export default UserSyncHandler;



