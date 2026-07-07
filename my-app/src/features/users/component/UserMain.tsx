import React, { useEffect } from "react";
import { UserService } from "../services/userService";
import UserTable from "./UserTable";

function UserMain() {

  return <div>
    <UserTable />
  </div>;
}

export default UserMain;
