import axios from "axios";
import { useState } from "react";
function SearchSection({ locationsData }) {
  //   console.log(locationsData);
  const [restaurants, setRestaurants] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  var handleLocationChange = (event) => {
    const locId = event.target.value;
    sessionStorage.setItem("locationId", locId);
    axios({
      url: `http://localhost:2020/restaurants/${locId}`,
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((respone) => {
        setRestaurants(respone.data.restaurants);
        console.log(restaurants);
      })
      .catch((e) => console.log(e));
  };
  //   console.log(restaurants);
  var renderSuggestions = () => {
    if (suggestions.length === 0) {
      return null;
    }
    return (
      <ul className="list-group list-group-flush w-100 position-absolute mt-5 shadow-lg">
        {suggestions.map((item, index) => (
          <li
            className="list-group-item text-start"
            style={{ color: "#192f60", zIndex: 10 }}
            key={index}
            onClick={() => this.selectedText(item)}
          >
            <img
              className="rounded-circle mx-3 border border-danger"
              src={`./${item.image}`}
              alt="Sorry for the Inconvinience"
              height="40px"
              width="40px"
            />
            {`${item.name} - ${item.locality} , ${item.city}`}
          </li>
        ))}
      </ul>
    );
  };

  var handleInput = (event) => {
    const searchField = event.target.value;
    let searchrest = [];

    searchrest = restaurants.filter((item) =>
      item.name.toLowerCase().includes(searchField.toLowerCase())
    );

    // this.setState({ suggestions: searchrest, searchField });
    setSuggestions(searchrest);
  };
  var handleBlur = () => {
    setSuggestions([]);
  };
  return (
    <>
      <div className="d-flex justify-content-center">
        <div className="row mt-3 mb-5 g-4 w-100 justify-content-center">
          <div className="col-12 col-md-4 col-lg-3">
            {/* <input
                  className="form-control form-control-lg first-input"
                  type="text"
                  placeholder="Please type a location"
                  aria-label=".form-control-lg example"
                /> */}
            <select
              className="form-select form-select-lg mb-3"
              aria-label=".form-select-lg example"
              onChange={handleLocationChange}
            >
              <option value="0" disabled selected>
                Please type a location
              </option>

              {locationsData.map((item) => {
                return (
                  <option
                    key={item.location_id}
                    value={item.location_id}
                  >{`${item.name}, ${item.city}`}</option>
                );
              })}
            </select>
          </div>
          <div className="col-12 col-md-8 col-lg-6">
            <div className="input-group input-group-lg position-relative">
              <span
                className="input-group-text bg-white"
                id="inputGroup-sizing-lg"
              >
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                className="form-control border-start-0"
                placeholder="Search for restaurants"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-lg"
                onChange={handleInput}
                onBlur={handleBlur}
              />
              {renderSuggestions()}
            </div>
          </div>
        </div>
      </div>
      ;
    </>
  );
}

export default SearchSection;
