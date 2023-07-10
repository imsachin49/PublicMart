import "./Categories.css";
import CategoryList from "./CategoryList";
import { Link } from "react-router-dom";

const Categories = () => {
  return (
    <div style={{ backgroundColor: "aliceblue" }} id="categories">
      <h2>Shop Our Top Categories</h2>
      <div className="cat-categories">
        <div className="cat-wrapper">
          {CategoryList.map((item, id) => {
            return (
              <Link to={`/products/${item.cat}`} key={item.id}>
                <div className="cat-card">
                  <div className="org-card">
                    <img src={item.img} alt="noCat" />
                    <div className="cat-mid">
                      <h4 className="ctitle">{item.cat}</h4>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Categories;
