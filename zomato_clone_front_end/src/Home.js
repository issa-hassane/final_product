import "./Home.css";
import logo from "./Assets/logo.png";
import MealList from "./MealList";
import useFetch from "./useFetch";
import SearchSection from "./SearchSection";
// import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const {
    data: mealList,
    isPending,
    error,
  } = useFetch("http://localhost:2020/mealtype");

  const [locations, setLocations] = useState([]);
  useEffect(() => {
    fetch("http://localhost:2020/locations")
      .then((res) => res.json())
      .then((res) => setLocations(res.locations));
  });
  // axios({
  //   url: "http://localhost:2020/locations",
  //   method: "GET",
  //   headers: { "Content-Type": "application/json" },
  // })
  //   .then((respone) => {
  //     setLocations(respone.data.locations);
  //   })
  //   .catch();

  // console.log(locationsData);
  return (
    <>
      <header>
        <div className="container p-3 d-flex justify-content-end">
          <button className="btn btn-link login-btn text-decoration-none">
            Login
          </button>
          <button className="btn btn-outline-light">Create an account</button>
        </div>
        <div className="container text-center">
          <img className="logo" src={logo} alt="" />
          <h2 className="text-white">
            Find the best restaurants, cafés, and bars
          </h2>
          <SearchSection locationsData={locations} />
        </div>
      </header>

      {/* {isPending && (
        <div class="d-flex justify-content-center">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      )} */}
      {mealList && <MealList mealList={mealList.mealtypes} />}
    </>
  );
}

export default App;
