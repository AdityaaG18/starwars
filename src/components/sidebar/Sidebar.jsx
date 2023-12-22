import React, { useEffect, useState } from "react";
import "./Sidebar.css";

const Sidebar = () => {
  const [data, setData] = useState({
    films: [],
    people: [],
    planets: [],
    species: [],
    starships: [],
    vehicles: [],
  });

  const [showDropdowns, setShowDropdowns] = useState({
    films: false,
    people: false,
    planets: false,
    species: false,
    starships: false,
    vehicles: false,
  });

  useEffect(() => {
    async function fetchData(category) {
      try {
        const response = await fetch(`https://swapi.dev/api/${category}/`);
        if (!response.ok) {
          throw new Error(`Network response was not ok for ${category}`);
        }
        const jsonData = await response.json();
        setData((prevData) => ({ ...prevData, [category]: jsonData.results }));
      } catch (error) {
        console.error(`Error fetching ${category} data:`, error);
      }
    }

    fetchData("films");
    fetchData("people");
    fetchData("planets");
    fetchData("species");
    fetchData("starships");
    fetchData("vehicles");
  }, []);

  // Function to toggle the visibility of a dropdown menu
  const toggleDropdown = (category) => {
    setShowDropdowns((prevDropdowns) => ({
      ...prevDropdowns,
      [category]: !prevDropdowns[category],
    }));
  };

  return (
    <div className="sidebar-container">
      <div className="sidebar bg-blueColor p-4 h-screen ">
        <h2 className="text-white mb-4">LOGO</h2>
        <nav>
          <ul className="space-y-2 p-5">
            {Object.keys(data).map((category) => (
              <li
                key={category}
                className={`text-white p-2 hover:bg-pink-500 cursor-pointer`}
                onClick={() => toggleDropdown(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
                {showDropdowns[category] && (
                  <ul className="ml-4">
                    {data[category].map((item, index) => (
                      <li
                        key={index}
                        className="text-white p-2 hover:bg-pink-500 rounded-full"
                      >
                        {item.name || item.title}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
      
    </div>
  );
};

export default Sidebar;
