import useUser from "../hooks/useUser";

function UserTable() {
  const { userlist } = useUser();
  return (
    <div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userlist.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>

              <td>{user.email}</td>

              <td>{user.role}</td>
              <td>
                <i
                  className="bi bi-eye me-3 text-primary"
                  role="button"
                  // onClick={() => onView(task)}
                />

                <i
                  className="bi bi-pencil-square me-3 text-warning"
                  role="button"
                  // onClick={() => {
                  //   navigate(`${ROUTES.CREATE_TASK}/${task.id}`);
                  // }}
                />

                <i
                  className="bi bi-trash text-danger"
                  role="button"
                  // onClick={() => onDelete(task)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;
