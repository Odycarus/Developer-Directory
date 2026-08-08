import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDeveloperContext } from "../context/DeveloperContext";
import { useAuth } from "../context/AuthContext";
import DeveloperForm from "../components/DeveloperForm";
import Notification from "../components/Notification";
import "../styles/Notification.css";

function EditDeveloper() {
  const { id } = useParams();

  const navigate = useNavigate();

  const { refreshDevelopers } = useDeveloperContext();

  const { accessToken } = useAuth();


  const [formData, setFormData] = useState({
    name: "",
    title: "",
    affiliation: "",
    location: "",
    skills: "",
    description: "",
    avatar: null,
    email: "",
    phone: "",
  });


  const [errors, setErrors] = useState({});

  const [loading, setLoading] = useState(true);

  const [notification, setNotification] = useState(null);


  useEffect(() => {
    async function fetchDeveloper() {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/developers/${id}/`
        );

        if (!response.ok) {
          throw new Error("Failed to load developer.");
        }

        const data = await response.json();

        setFormData({
          name: data.name || "",
          title: data.title || "",
          affiliation: data.affiliation || "",
          location: data.location || "",
          skills: Array.isArray(data.skills)
            ? data.skills.join(", ")
            : data.skills || "",
          description: data.description || "",
          email: data.email || "",
          phone: data.phone || "",
          avatar: null,
        });

      } catch (error) {
        console.error(error);

      } finally {
        setLoading(false);
      }
    }

    fetchDeveloper();
  }, [id]);


  function handleChange(event) {
    const { name, value, files } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: files ? files[0] : value,
    }));
  }


  function validateForm() {
    const newErrors = {};

    const requiredFields = [
      "name",
      "title",
      "affiliation",
      "email",
      "phone",
      "skills",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field].trim()) {
        newErrors[field] = `${field} is required.`;
      }
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }


  async function handleSubmit(event) {
    event.preventDefault();

    setNotification(null);

    if (!validateForm()) {
      return;
    }


    const data = new FormData();

    data.append("name", formData.name);
    data.append("title", formData.title);
    data.append("affiliation", formData.affiliation);
    data.append("location", formData.location);
    data.append("skills", formData.skills);
    data.append("description", formData.description);
    data.append("email", formData.email);
    data.append("phone", formData.phone);


    if (formData.avatar) {
      data.append("avatar", formData.avatar);
    }


    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/developers/${id}/`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: data,
        }
      );


      if (response.status === 403) {
        setNotification({
          message: "You are not permitted to do this.",
          type: "error",
        });

        return;
      }


      if (!response.ok) {
        throw new Error("Failed to update developer.");
      }


      await refreshDevelopers();


      navigate(`/developer/${id}`, {
        state: {
          notification: {
            message: "Developer Updated Successfully",
            type: "success",
          },
        },
      });

    } catch (error) {
      console.error(error);

      setNotification({
        message: "No.",
        type: "error",
      });
    }
  }


  if (loading) {
    return <p>Loading...</p>;
  }


  return (
    <div className="profile-page edit-form">

      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
        />
      )}


      <h1>
        Edit Developer
      </h1>


      <DeveloperForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        buttonText="Save Changes"
        errors={errors}
      />

    </div>
  );
}


export default EditDeveloper;