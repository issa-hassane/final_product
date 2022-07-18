import "./Filter.css";
import axios from "axios";
import {
  Link,
  useLocation,
  useHistory,
} from "react-router-dom/cjs/react-router-dom.min";
import { useEffect, useState } from "react";
// import useFetch from "./useFetch";
const Filter = () => {
  let history = useHistory();

  const [restaurants, setRestaurants] = useState([]);
  const [cuisine, setCuisine] = useState([]);
  const [location, setLocation] = useState([]);
  const [lcost, setLcost] = useState(undefined);
  const [hcost, setHcost] = useState(undefined);
  const [sort, setSort] = useState(1);
  const [lrating, setLrating] = useState(undefined);
  const [hrating, setHrating] = useState(undefined);
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const mealtype = searchParams.get("mealtype");
  // console.log(mealtype);
  useEffect(() => {
    let filterOptions = { lcost, hcost, mealtype, sort };
    axios
      .post("http://localhost:2020/filter", filterOptions)
      .then(function (response) {
        // console.log(response);
        setRestaurants(response.data.restaurants);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [mealtype, lcost, hcost, sort]);

  const [locations, setLocations] = useState([]);
  useEffect(() => {
    fetch("http://localhost:2020/locations")
      .then((res) => res.json())
      .then((res) => setLocations(res.locations));
  }, []);

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

  const handleCostChange = (lcost, hcost) => {
    setLcost(lcost);
    setHcost(hcost);
    console.log("handle cost method");
  };
  const handleSortChange = (sort) => {
    setSort(sort);
  };

  const handleNavigate = (restaurantId) => {
    // let path = `/filter?mealtype=${mealId}`;
    // history.push(path);
    const locationId = sessionStorage.getItem("locationId");
    if (locationId) {
      history.push(`/overview?restoId=${restaurantId}&location=${locationId}`);
    } else {
      history.push(`/overview?restoId=${restaurantId}`);
    }
  };

  return (
    <>
      <nav className="navbar navbar-light bg-light">
        <div className="container">
          <div className="rounded-circle p-2 text-end bg-light ">
            <Link to="/" className="navbar-brand ps-3 logo">
              A!
            </Link>
          </div>
          <div className="">
            <button type="button" className="btn btn-link text-white">
              Login
            </button>
            <button className="btn btn-outline-light">Create an account</button>
          </div>
        </div>
      </nav>
      <div className="container">
        <h2 className="heading my-3">Breakfast Places in Mumbai</h2>
      </div>
      <div className="container-fluid">
        {/* <!-- sidebar -->
      <!-- select location --> */}
        <div className="d-lg-none">
          <div className="dropdown mb-3">
            <button
              className="btn btn-outline-dark dropdown-toggle w-100 dropdown-button"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              filters/Sort
            </button>
            <ul
              className="dropdown-menu p-0 w-100"
              aria-labelledby="dropdownMenuButton1"
            >
              <li className="w-100">
                <div className="sidebar m-auto w-100">
                  <p className="sidebar-title">Filters</p>
                  <p className="sidebar-subtitle my-2">Select Location</p>
                  {/* <!-- select location --> */}
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={handleLocationChange}
                  >
                    <option disabled>Select Location</option>
                    {locations.map((item) => {
                      return (
                        <option
                          key={item.location_id}
                          value={item.location_id}
                        >{`${item.name}, ${item.city}`}</option>
                      );
                    })}
                  </select>
                  <p className="sidebar-subtitle my-2">Cuisine</p>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckNorth"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckNorth"
                    >
                      North Indian
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckSouth"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckSouth"
                    >
                      South Indian
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckChinese"
                      checked
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckChinese"
                    >
                      Chinese
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckFast"
                    />
                    <label className="form-check-label" htmlFor="flexCheckFast">
                      Fast Food
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckStreet"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckStreet"
                    >
                      Street Food
                    </label>
                  </div>
                  <p className="sidebar-subtitle my-2">Cost For Two</p>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexRadioDefault1"
                    >
                      Less than ₹ 500
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexRadioDefault1"
                    >
                      ₹ 500 to ₹ 1000
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexRadioDefault1"
                    >
                      ₹ 1000 to ₹ 1500
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexRadioDefault1"
                    >
                      ₹ 1500 to ₹ 2000
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexRadioDefault1"
                    >
                      ₹ 2000+
                    </label>
                  </div>
                  <p className="sidebar-title">Sort</p>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioPrice"
                      id="flexRadioPriceLow"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexRadioPriceLow"
                    >
                      Price low to high
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioPrice"
                      id="flexRadioPriceHigh"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexRadioPriceHigh"
                    >
                      Price high to low
                    </label>
                  </div>
                  <button className="btn btn-outline-danger mt-3 w-100">
                    Apply
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="row">
          <div className="col-2 sidebar d-none d-lg-block">
            <p className="sidebar-title">Filters</p>
            <p className="sidebar-subtitle my-2">Select Location</p>
            {/* <!-- select location --> */}
            <select
              className="form-select"
              aria-label="Default select example"
              onChange={handleLocationChange}
            >
              <option disabled selected>
                Select Location
              </option>
              {locations.map((item) => {
                return (
                  <option
                    key={item.location_id}
                    value={item.location_id}
                  >{`${item.name}, ${item.city}`}</option>
                );
              })}
            </select>
            <p className="sidebar-subtitle my-2">Cuisine</p>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckNorth"
              />
              <label className="form-check-label" htmlFor="flexCheckNorth">
                North Indian
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckSouth"
              />
              <label className="form-check-label" htmlFor="flexCheckSouth">
                South Indian
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckChinese"
              />
              <label className="form-check-label" htmlFor="flexCheckChinese">
                Chinese
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckFast"
              />
              <label className="form-check-label" htmlFor="flexCheckFast">
                Fast Food
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckStreet"
              />
              <label className="form-check-label" htmlFor="flexCheckStreet">
                Street Food
              </label>
            </div>
            <p className="sidebar-subtitle my-2">Cost For Two</p>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
                onChange={() => handleCostChange(1, 500)}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault1">
                Less than ₹ 500
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
                onChange={() => handleCostChange(500, 1000)}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault1">
                ₹ 500 to ₹ 1000
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
                onChange={() => handleCostChange(1000, 1500)}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault1">
                ₹ 1000 to ₹ 1500
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
                onChange={() => handleCostChange(1500, 2000)}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault1">
                ₹ 1500 to ₹ 2000
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
                onChange={() => handleCostChange(2000, 5000)}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault1">
                ₹ 2000+
              </label>
            </div>
            <p className="sidebar-title">Sort</p>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioPrice"
                id="flexRadioPriceLow"
                onChange={() => handleSortChange(1)}
              />
              <label className="form-check-label" htmlFor="flexRadioPriceLow">
                Price low to high
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioPrice"
                id="flexRadioPriceHigh"
                onChange={() => handleSortChange(-1)}
              />
              <label className="form-check-label" htmlFor="flexRadioPriceHigh">
                Price high to low
              </label>
            </div>
          </div>
          {/* <!-- cards --> */}
          <div className="col-sm-12 col-md-12 col-lg-7">
            {restaurants.length > 0 ? (
              restaurants.map((item, index) => {
                return (
                  <div
                    className="row"
                    key={index}
                    onClick={() => handleNavigate(item._id)}
                  >
                    <div className="card w-100">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-3">
                            <img
                              src={`./${item.image}`}
                              className="img-fluid rounded imag"
                              alt="food image"
                            />
                          </div>
                          <div className="col col-md-auto">
                            <h5 className="card-title">{item.name}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">
                              {item.locality}
                            </h6>
                            <p>{item.city}</p>
                            <p>Ratings: {item.aggregate_rating}</p>
                          </div>
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col col-md-auto">
                            <p>CUISINES</p>
                            <p>COST FOR TWO:</p>
                          </div>
                          <div className="col col-md-auto">
                            <p className="sidebar-subtitle">
                              {item.cuisine.map((val) => `${val.name}, `)}
                            </p>
                            <p className="sidebar-subtitle">
                              ₹ {item.min_price}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <h4>sorry no data </h4>
            )}
          </div>
        </div>
        <div className="footer d-flex justify-content-center">
          <ul className="pagination">
            <li className="page-item">
              <a className="page-link text-dark" href="#" aria-label="Previous">
                <span aria-hidden="true">&#60;</span>
              </a>
            </li>
            <li className="page-item">
              <a className="page-link active" href="#">
                1
              </a>
            </li>
            <li className="page-item">
              <a className="page-link text-dark" href="#">
                2
              </a>
            </li>
            <li className="page-item">
              <a className="page-link text-dark" href="#">
                3
              </a>
            </li>
            <li className="page-item">
              <a className="page-link text-dark" href="#" aria-label="Next">
                <span aria-hidden="true">&#62;</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Filter;
