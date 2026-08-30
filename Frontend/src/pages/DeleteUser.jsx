import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { apiFetch } from "../api/api";
import ConfirmModal from "../components/ConfirmModal";
import Notification from "../components/Notification";
import "../styles/DeleteUser.css";
function DeleteUser() {
const { accessToken, user } = useAuth();
const [users, setUsers] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [selectedUser, setSelectedUser] =
useState(null);
const [showDeleteModal, setShowDeleteModal] =
useState(false);
const [notification, setNotification] =
useState(null);
async function fetchUsers() {
try {

  setLoading(true);

  const response = await apiFetch(
    "/developers/admin/users/",
    {},
    accessToken
  );

  const data = await response.json();

  setUsers(data);

} catch (err) {

  setError(
    err.data?.detail ||
    "Failed to load users."
  );

} finally {

  setLoading(false);

}
}
useEffect(() => {
fetchUsers();
}, []);
useEffect(() => {
if (!notification) {

  return;

}

const timer = setTimeout(() => {

  setNotification(null);

}, 3000);


return () => {

  clearTimeout(timer);

};
}, [notification]);
async function handleDelete() {
try {

  await apiFetch(

    `/developers/admin/users/${selectedUser.id}/`,

    {
      method: "DELETE",
    },

    accessToken

  );


  setUsers(
    users.filter(
      (currentUser) =>
        currentUser.id !== selectedUser.id
    )
  );


  setShowDeleteModal(false);

  setSelectedUser(null);

  setNotification({

    message:
      "User Deleted Successfully",

    type:
      "success",

  });


} catch (err) {

  console.error(err);

  setShowDeleteModal(false);

  setSelectedUser(null);

  setNotification({

    message:
      err.data?.detail ||
      "Failed to delete user.",

    type:
      "error",

  });

}
}
if (loading) {
return <p>Loading users...</p>;
}
if (error) {
return (

  <p>
    Error: {error}
  </p>

);
}
return (
<div className="delete-user-page">


  {notification && (

    <Notification

      message={
        notification.message
      }

      type={
        notification.type
      }

    />

  )}


  {showDeleteModal && selectedUser && (

    <ConfirmModal

      title="Delete User?"

      message={
        `Are you sure you want to delete ` +
        `${selectedUser.username}? ` +
        `This action cannot be undone.`
      }

      confirmText="Delete"

      cancelText="Cancel"

      onCancel={() => {

        setShowDeleteModal(false);

        setSelectedUser(null);

      }}

      onConfirm={handleDelete}

    />

  )}


  <h1>
    Delete User
  </h1>


  <p>
    Select a user to delete.
  </p>


  <div className="user-list">

    {users

      .filter(
        (currentUser) =>
          currentUser.id !== user?.id
      )

      .map(
        (currentUser) => (

          <div
            key={currentUser.id}
            className="user-row"
          >

            <div>

              <strong>
                {currentUser.username}
              </strong>

              <span>
                {currentUser.email}
              </span>

            </div>


            <button

              className="profile-button delete-button"

              onClick={() => {

                setSelectedUser(
                  currentUser
                );

                setShowDeleteModal(
                  true
                );

              }}

            >

              Delete User

            </button>

          </div>

        )
      )}

  </div>


</div>
);
}
export default DeleteUser;