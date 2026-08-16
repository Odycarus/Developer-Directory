import {
  useParams,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";

import { useEffect, useState } from "react";

import "../styles/DeveloperDetails.css";

import { useDeveloperContext } from "../context/DeveloperContext";

import { useAuth } from "../context/AuthContext";

import { apiFetch } from "../api/api";

import ConfirmModal from "../components/ConfirmModal";

import Notification from "../components/Notification";



function DeveloperDetails() {

  const { id } = useParams();

  const navigate = useNavigate();

  const location = useLocation();


  const { refreshDevelopers } =
    useDeveloperContext();

  const { user } = useAuth();

  const { accessToken } =
    useAuth();


  const notification =
    location.state?.notification;


  const [showDeleteModal, setShowDeleteModal] =
    useState(false);


  const [developer, setDeveloper] =
    useState(null);


  const [loading, setLoading] =
    useState(true);


  const [error, setError] =
    useState(null);


  const [deleteNotification, setDeleteNotification] =
    useState(null);



  useEffect(() => {

    async function fetchDeveloper() {

      try {

        const response = await apiFetch(
          `/developers/${id}/`
        );


        const data =
          await response.json();


        setDeveloper(data);


      } catch (err) {

        setError(
          err.data?.detail ||
          "Developer not found."
        );

      } finally {

        setLoading(false);

      }

    }


    fetchDeveloper();

  }, [id]);



  useEffect(() => {

    if (developer) {

      document.title =
        `${developer.name} | Developer Directory`;

    } else {

      document.title =
        "Developer Not Found | Developer Directory";

    }


    return () => {

      document.title =
        "Developer Directory";

    };

  }, [developer]);



  useEffect(() => {

    if (notification) {

      const timer = setTimeout(() => {

        navigate(
          `/developer/${id}`,
          {
            replace: true,
            state: {},
          }
        );

      }, 3000);


      return () =>
        clearTimeout(timer);

    }

  }, [
    notification,
    navigate,
    id,
  ]);



  async function handleDelete() {

    try {

      setDeleteNotification(null);


      await apiFetch(

        `/developers/${id}/`,

        {
          method: "DELETE",
        },

        accessToken

      );


      await refreshDevelopers();


      setShowDeleteModal(false);


      navigate("/", {

        state: {

          notification: {

            message:
              "Developer Deleted Successfully",

            type: "success",

          },

        },

      });


    } catch (error) {

      console.error(error);


      setShowDeleteModal(false);


      if (
        error.status === 401 ||
        error.status === 403
      ) {

        setDeleteNotification({

          message:
            "You are not permitted to do this.",

          type: "error",

        });

        return;

      }


      setDeleteNotification({

        message:
          "Failed to delete developer.",

        type: "error",

      });

    }

  }



  if (loading) {

    return <p>Loading...</p>;

  }



  if (error) {

    return (

      <p>
        Error: {error}
      </p>

    );

  }



  if (!developer) {

    return (

      <div>

        <h1>
          Developer Not Found
        </h1>


        <p>

          The profile you are looking for
          does not exist.

        </p>


        <Link to="/">

          ← Back to Developers

        </Link>

      </div>

    );

  }

  const isOwner =
  user &&
  user.id === developer.owner_id;



  return (

    <div className="profile-page">


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



      {deleteNotification && (

        <Notification

          message={
            deleteNotification.message
          }

          type={
            deleteNotification.type
          }

        />

      )}



      {showDeleteModal && (

        <ConfirmModal

          title="Delete Developer?"

          message={
            `Are you sure you want to delete ` +
            `${developer.name}? This action cannot be undone.`
          }

          confirmText="Delete"

          cancelText="Cancel"

          onCancel={() =>
            setShowDeleteModal(false)
          }

          onConfirm={handleDelete}

        />

      )}



      <div className="profile-top-bar">


        <Link
          to="/"
          className="back-link"
        >

          ← Back to Developers

        </Link>



        <div className="profile-actions">

  {(developer.owner_id === user?.id ||
    user?.is_superuser) && (

    <>
      <Link
        to={`/developer/${developer.id}/edit`}
        className="profile-button edit-button"
      >
        Edit Developer
      </Link>

      <button
        className="profile-button delete-button"
        onClick={() =>
          setShowDeleteModal(true)
        }
      >
        Delete Developer
      </button>
    </>

  )}

</div>
      </div>



      <hr />



      <div className="profile-header">


        <div className="profile-avatar">


          {developer.avatar ? (

            <img

              src={developer.avatar}

              alt={developer.name}

            />

          ) : (

            developer.name.charAt(0)

          )}


        </div>



        <h1>
          {developer.name}
        </h1>


        <h2>
          {developer.title}
        </h2>


        <p className="profile-location">

          {developer.location}

        </p>


      </div>



      <div className="profile-section">

        <h3>
          Affiliation
        </h3>

        <p>
          {developer.affiliation}
        </p>

      </div>



      <div className="profile-section">

        <h3>
          Skills
        </h3>


        <ul className="skills-container">


          {developer.skills.map(
            (skill) => (

              <li

                key={skill}

                className="skill-badge"

              >

                {skill}

              </li>

            )
          )}


        </ul>

      </div>



      <div className="profile-section">

        <h3>
          About
        </h3>

        <p>
          {developer.description}
        </p>

      </div>



      <div className="profile-section">

        <h3>
          Contact
        </h3>


        <p>

          <a

            href={
              `mailto:${developer.email}`
            }

            className="contact-link"

          >

            {developer.email}

          </a>

        </p>


        <p>

          <a

            href={
              `tel:${developer.phone}`
            }

            className="contact-link"

          >

            {developer.phone}

          </a>

        </p>


      </div>


    </div>

  );

}


export default DeveloperDetails;