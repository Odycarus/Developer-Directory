import "../styles/DeveloperForm.css";

function DeveloperForm({
  formData,
  handleChange,
  handleSubmit,
  buttonText,
  errors = {},
}) {
  const isFormValid =
    formData.name.trim() &&
    formData.title.trim() &&
    formData.affiliation.trim() &&
    formData.email.trim() &&
    formData.phone.trim() &&
    formData.skills.trim();

  return (
    <form
  className="developer-form"
  onSubmit={handleSubmit}
>

      <p className="required-note">
        * Required fields
      </p>


      <label htmlFor="name">
        Name *
      </label>

      <input
        id="name"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
      />

      {errors.name && (
        <p className="form-error">
          {errors.name}
        </p>
      )}


      <label htmlFor="title">
        Title *
      </label>

      <input
        id="title"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
      />

      {errors.title && (
        <p className="form-error">
          {errors.title}
        </p>
      )}


      <label htmlFor="affiliation">
        Affiliation *
      </label>

      <input
        id="affiliation"
        name="affiliation"
        placeholder="Affiliation"
        value={formData.affiliation}
        onChange={handleChange}
      />

      {errors.affiliation && (
        <p className="form-error">
          {errors.affiliation}
        </p>
      )}


      <label htmlFor="location">
        Location
      </label>

      <input
        id="location"
        name="location"
        placeholder="Location"
        value={formData.location}
        onChange={handleChange}
      />


      <label htmlFor="email">
        Email *
      </label>

      <input
        id="email"
        type="email"
        name="email"
        placeholder="developer@example.com"
        value={formData.email}
        onChange={handleChange}
      />

      {errors.email && (
        <p className="form-error">
          {errors.email}
        </p>
      )}


      <label htmlFor="phone">
        Phone *
      </label>

      <input
        id="phone"
        type="tel"
        name="phone"
        placeholder="+971 50 123 4567"
        value={formData.phone}
        onChange={handleChange}
      />

      {errors.phone && (
        <p className="form-error">
          {errors.phone}
        </p>
      )}


      <label htmlFor="skills">
        Skills *
      </label>

      <input
        id="skills"
        name="skills"
        placeholder="React, Django, Python"
        value={formData.skills}
        onChange={handleChange}
      />

      {errors.skills && (
        <p className="form-error">
          {errors.skills}
        </p>
      )}


      <label htmlFor="description">
        Description
      </label>

      <textarea
        id="description"
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
      />


      <label htmlFor="avatar">
        Avatar
      </label>

      <input
        id="avatar"
        type="file"
        name="avatar"
        accept="image/*"
        onChange={handleChange}
      />


      <button
        type="submit"
        className={`form-button ${isFormValid ? "active" : ""}`}
        disabled={!isFormValid}
      >
        {buttonText}
      </button>

    </form>
  );
}

export default DeveloperForm;
