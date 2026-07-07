import { useEffect } from "react";
import { useAuth } from "../../auth/context/AuthContext";
import { AuthService } from "../../auth/services/authService";

function Profile() {
  const { user } = useAuth();
  useEffect(()=>{
    AuthService.me();
  },[]);
  return (
    <div className="card shadow p-4">
      <h3>My Profile</h3>

      <hr />

      <div className="mb-3">
        <label>Username</label> : 
        <span> {user?.username}</span>
      </div>

      <div className="mb-3">
        <label>Email</label> : 
        <span> {user?.email}</span>
      </div>
    </div>
  );
}

export default Profile;
