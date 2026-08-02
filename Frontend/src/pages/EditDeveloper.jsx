import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDeveloperContext } from "../context/DeveloperContext";
import DeveloperForm from "../components/DeveloperForm";


function EditDeveloper() {

  const { id } = useParams();

  const navigate = useNavigate();

  const { refreshDevelopers } = useDeveloperContext();


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

  const [loading, setLoading] = useState(true);



  useEffect(() => {

    async function fetchDeveloper() {

      try {

        const response = await fetch(
          `http://127.0.0.1:8000/api/developers/${id}/`
        );


        const data = await response.json();


        setFormData({
          name: data.name || "",
          title: data.title || "",
          affiliation: data.affiliation || "",
          location: data.location || "",
          skills: data.skills.join(", "),
          description: data.description || "",
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



    if (formData.avatar) {

      data.append("avatar", formData.avatar);

    }



    try {

      const response = await fetch(
        `http://127.0.0.1:8000/api/developers/${id}/`,
        {
          method: "PATCH",
          body: data,
        }
      );


      if (!response.ok) {

        throw new Error("Failed to update developer.");

      }


      await refreshDevelopers();


      navigate(`/developer/${id}`, {
        state: {
          notification: "Developer Updated Successfully",
        },
      });


    } catch (error) {

      console.error(error);

    }

  }



  if (loading) {

    return <p>Loading...</p>;

  }



  return (

    <div className="profile-page edit-form">

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