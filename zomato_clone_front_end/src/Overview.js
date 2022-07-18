import overview from "./Assets/overview.png";
import { Link } from "react-router-dom";
const Overview = () => {
  return (
    <>
      {/* <!-- nav bar --> */}
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
        <div className=" mt-5">
          <img
            className="w-100"
            style={{ height: "20rem", "object-fit": "cover" }}
            src={overview}
            alt=""
          />
        </div>
        <h2 className="heading my-4">The Big Chill Cakery</h2>

        <div className="buttons my-auto">
          <button className="btn btn-link sidebar-subtitle h-100">
            overview
          </button>
          <button className="btn btn-link sidebar-subtitle h-100">
            Contact
          </button>
          {/* <!-- Button trigger modal --> */}
          <button
            className="btn btn-danger p-2 float-end"
            data-bs-toggle="modal"
            data-bs-target="#menuModal"
          >
            Place Online Order
          </button>
          <hr />
          <h3 className="sidebar-title my-4">About this place</h3>
          <p className="sidebar-title fw-bold">Cuisine</p>
          <p className="sidebar-subtitle ms-3">Bakery, Fast-food</p>

          <p className="sidebar-title fw-bold">Average Cost</p>
          <p className="sidebar-subtitle ms-3">₹700 for two people (approx.)</p>
        </div>
      </div>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="menuModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content container">
            <div className="modal-header border-0">
              <h5 className="modal-title" id="exampleModalLabel">
                The Big Chill Cakery
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-8">
                  <h5>Gobi Manchurian</h5>
                  <p>&#x20B9; 89</p>
                  <p>
                    Deep-fried cauliflower florets tossed in pungent spices to
                    form a flavorsome dry curry
                  </p>
                </div>
                <div className="col-4">
                  <div className="position-relative">
                    <img
                      src="https://cdn.pixabay.com/photo/2014/06/16/23/40/blue-370127_1280.png"
                      className="img-fluid"
                      alt="..."
                    />
                    <button className="btn btn-light position-absolute top-100 start-50 translate-middle">
                      ADD
                    </button>
                  </div>
                </div>
                <hr />
              </div>
              <div className="row">
                <div className="col-8">
                  <h5>Gobi Manchurian</h5>
                  <p>&#x20B9; 89</p>
                  <p>
                    Deep-fried cauliflower florets tossed in pungent spices to
                    form a flavorsome dry curry
                  </p>
                </div>
                <div className="col-4">
                  <div className="position-relative">
                    <img
                      src="https://cdn.pixabay.com/photo/2014/06/16/23/40/blue-370127_1280.png"
                      className="img-fluid"
                      alt="..."
                    />
                    <button className="btn btn-light position-absolute top-100 start-50 translate-middle">
                      ADD
                    </button>
                  </div>
                </div>
                <hr />
              </div>
            </div>
            <div className="modal-footer bg-light justify-content-between">
              <p className="fw-bold">
                Subtotal <span>&#x20B9; 89</span>
              </p>

              {/* <!--<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>--> */}
              <button type="button" className="btn btn-danger">
                Pay Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Overview;
