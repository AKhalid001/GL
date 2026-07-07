import { useEffect, useState } from "react";
import { UserService } from "../services/userService";
import type { User } from "../modal/User";

function useUser() {
  const [userlist, setUserList] = useState<User[]>([]);

  useEffect(() => {
    UserService.getAllUSers().then((data)=>{
        setUserList(data);
    });
  }, []);

  return {userlist}
}

export default useUser;
