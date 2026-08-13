import { useEffect, useRef, useState } from "react";

function SkillFilter({
  skills,
  selectedSkills,
  setSelectedSkills,
}) {

  const [isOpen, setIsOpen] =
    useState(false);

  const filterRef =
    useRef(null);


  useEffect(() => {

    function handleClickOutside(event) {

      if (
        filterRef.current &&
        !filterRef.current.contains(
          event.target
        )
      ) {

        setIsOpen(false);

      }

    }


    document.addEventListener(
      "mousedown",
      handleClickOutside
    );


    return () => {

      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

    };

  }, []);


  function toggleSkill(skill) {

    setSelectedSkills(
      (previous) => {

        if (
          previous.includes(skill)
        ) {

          return previous.filter(
            (item) =>
              item !== skill
          );

        }


        return [
          ...previous,
          skill,
        ];

      }
    );

  }


  function clearSkills() {

    setSelectedSkills([]);

  }


  return (

    <div
      className="skill-filter"
      ref={filterRef}
    >

      <label htmlFor="skill-filter-button">
        Need one or multiple skillset?
      </label>


      <button
        id="skill-filter-button"
        type="button"
        className="skill-filter-button"
        onClick={() =>
          setIsOpen(
            (previous) => !previous
          )
        }
      >

        {selectedSkills.length === 0
          ? "Select skills..."
          : `${selectedSkills.length} skill${
              selectedSkills.length > 1
                ? "s"
                : ""
            } selected`}

        <span>
          ▾
        </span>

      </button>


      {isOpen && (

        <div className="skill-filter-menu">


          {skills.length === 0 ? (

            <p className="skill-filter-empty">
              No skills available.
            </p>

          ) : (

            skills.map((skill) => (

              <label
                key={skill}
                className="skill-option"
              >

                <input
                  type="checkbox"
                  checked={
                    selectedSkills.includes(
                      skill
                    )
                  }
                  onChange={() =>
                    toggleSkill(skill)
                  }
                />

                <span>
                  {skill}
                </span>

              </label>

            ))

          )}


          {selectedSkills.length > 0 && (

            <button
              type="button"
              className="clear-skills-button"
              onClick={clearSkills}
            >
              Clear selections
            </button>

          )}

        </div>

      )}

    </div>

  );

}


export default SkillFilter;