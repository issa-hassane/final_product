import { useHistory, Link } from "react-router-dom";
const MealList = ({ mealList }) => {
  let history = useHistory();
  const handleClick = (mealId) => {
    // <Redirect to="/filter" />;
    let path = `/filter?mealtype=${mealId}`;
    history.push(path);
    console.log(mealId);
  };
  return (
    <>
      <div className="container">
        <h2 className="mt-4 title-color fw-bold">Quick Searches</h2>
        <p className="text-muted">Discover restaurants by type of meal</p>

        <div className="d-flex flex-wrap justify-content-around">
          {mealList.map((meal) => {
            return (
              <div
                className="card mb-3"
                key={meal._id}
                onClick={() => handleClick(meal._id)}
              >
                <div className="row g-0">
                  <div className="col-5 col-md-5">
                    <img
                      src={meal.image}
                      className="img-fluid card-img rounded-start"
                      alt="link is broken"
                    />
                  </div>
                  <div className="col-7 col-md-7">
                    <div className="card-body">
                      <h5 className="card-title title-color">{meal.name}</h5>
                      <p className="card-text text-muted">{meal.content}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MealList;
