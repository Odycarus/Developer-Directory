import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDeveloperContext } from "../context/DeveloperContext";
import DeveloperForm from "../components/DeveloperForm";
import "../styles/Notification.css";


function AddDeveloper() {

  const navigate = useNavigate();

  const { refreshDevelopers } = useDeveloperContext();

  const [notification, setNotification] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    title: "",
    affiliation: "",
    location: "",
    skills: "",
    description: "",
    avatar: null,
  });


  const [errors, setErrors] = useState({});



  function handleChange(event) {

    const { name, value, files } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: files ? files[0] : value,
    }));

  }



  async function handleSubmit(event) {

    event.preventDefault();


    const newErrors = {};


    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    }


    if (!formData.title.trim()) {
      newErrors.title = "Title is required.";
    }


    if (!formData.affiliation.trim()) {
      newErrors.affiliation = "Affiliation is required.";
    }


    if (!formData.skills.trim()) {
      newErrors.skills = "Skills are required.";
    }


    setErrors(newErrors);


    if (Object.keys(newErrors).length > 0) {
      return;
    }



    const data = new FormData();


    data.append("name", formData.name);
    data.append("title", formData.title);
    data.append("affiliation", formData.affiliation);
    data.append("location", formData.location);
    data.append("skills", formData.skills);
    data.append("description", formData.description);


    if (formData.avatar) {

      data.append("avatar", formData.avatar);

    }



    try {

      const response = await fetch(
        "http://127.0.0.1:8000/api/developers/",
        {
          method: "POST",
          body: data,
        }
      );


      if (!response.ok) {

        throw new Error("Failed to create developer.");

      }


      await refreshDevelopers();

navigate("/", {
  state: {
    notification: {
      message: "✓ Developer Added Successfully",
      type: "success",
    },
  },
});

    } catch (error) {

      console.error(error);

    }

  }



  return (
    <div className="profile-page">

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