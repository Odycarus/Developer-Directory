import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDeveloperContext } from "../context/DeveloperContext";
import { useAuth } from "../context/AuthContext";
import { apiFetch } from "../api/api";
import DeveloperForm from "../components/DeveloperForm";
import Notification from "../components/Notification";
import "../styles/Notification.css";


function AddDeveloper() {

  const navigate = useNavigate();


  const { refreshDevelopers } =
    useDeveloperContext();


  const {
    accessToken,
    isAuthenticated,
  } = useAuth();


  const [notification, setNotification] =
    useState(null);


  const [formData, setFormData] = useState({

    name: "",
    title: "",
    affiliation: "",
    location: "",
    skills: "",
    description: "",
    email: "",
    phone: "",
    avatar: null,

  });


  const [errors, setErrors] =
    useState({});



  function handleChange(event) {

    const {
      name,
      value,
      files,
    } = event.target;


    setFormData((previous) => ({

      ...previous,

      [name]:
        files
          ? files[0]
          : value,

    }));

  }



  async function handleSubmit(event) {

    event.preventDefault();


    setNotification(null);


    const newErrors = {};


    if (!formData.name.trim()) {

      newErrors.name =
        "Name is required.";

    }


    if (!formData.title.trim()) {

      newErrors.title =
        "Title is required.";

    }


    if (!formData.affiliation.trim()) {

      newErrors.affiliation =
        "Affiliation is required.";

    }


    if (!formData.email.trim()) {

      newErrors.email =
        "Email is required.";

    }


    if (!formData.phone.trim()) {

      newErrors.phone =
        "Phone number is required.";

    }


    if (!formData.skills.trim()) {

      newErrors.skills =
        "Skills are required.";

    }


    setErrors(newErrors);


    if (
      Object.keys(newErrors).length > 0
    ) {

      return;

    }



    if (!isAuthenticated) {

      setNotification({

        message:
          "You are not permitted to do this.",

        type: "error",

      });

      return;

    }



    const data =
      new FormData();


    data.append(
      "name",
      formData.name
    );

    data.append(
      "title",
      formData.title
    );

    data.append(
      "affiliation",
      formData.affiliation
    );

    data.append(
      "location",
      formData.location
    );

    data.append(
      "skills",
      formData.skills
    );

    data.append(
      "description",
      formData.description
    );

    data.append(
      "email",
      formData.email
    );

    data.append(
      "phone",
      formData.phone
    );


    if (formData.avatar) {

      data.append(
        "avatar",
        formData.avatar
      );

    }



    try {

      await apiFetch(

        "/developers/",

        {
          method: "POST",
          body: data,
        },

        accessToken

      );


      await refreshDevelopers();


      navigate("/", {

        state: {

          notification: {

            message:
              "✓ Developer Added Successfully",

            type: "success",

          },

        },

      });


    } catch (error) {

      console.error(error);


      if (
        error.status === 401 ||
        error.status === 403
      ) {

        setNotification({

          message:
            "You are not permitted to do this.",

          type: "error",

        });

        return;

      }


      if (
        error.data?.detail
      ) {

        setNotification({

          message:
            error.data.detail,

          type: "error",

        });

        return;

      }


      setNotification({

        message:
          "Failed to create developer.",

        type: "error",

      });

    }

  }



  return (

    <div className="profile-page edit-form">

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


      <h1>
        Add Developer
      </h1>


      <DeveloperForm

        formData={formData}

        handleChange={handleChange}

        handleSubmit={handleSubmit}

        buttonText="Save Developer"

        errors={errors}

      />

    </div>

  );

}


export default AddDeveloper;