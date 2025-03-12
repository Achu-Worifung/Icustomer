import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./product.css";
const Product = ({ token }) => {
  const navigate = useNavigate();

  const [products, setProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [filteredProduct, setFilteredProduct] = useState([]);

  useEffect(() => {
    
    if (!token && !localStorage.getItem("token")) {

      navigate("/login");
      return;
    }
    //getting all the products
    axios
      .get("http://localhost:8080/products", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setProduct(res.data);
          console.log("Product:", products);
        } else {
        }
      });
  }, [token, navigate]);
  useEffect(() => {
    setFilteredProduct(products);
    setCategory([...new Set(products.map((prod) => prod["data category"]))]);
  }, [products]);

  const filteredbyCategory = (e) => {
    const selected_cat = e.target.value;
    if (selected_cat === "") {
      setFilteredProduct(products);
      return;
    }
    const result = products.filter(
      (prod) => prod["data category"] === selected_cat
    );
    setFilteredProduct(result);
  };

  const filteredbySearch = (e) => {
    // console.log('there is a change', e.target.value);

    const searchValue = e.target.value;

    const filteredResults = products.filter((prod) => {
      if (prod.fields && typeof prod.fields === "string") {
        return prod.fields
          .toLowerCase()
          .split(",")
          .some((field) =>
            field.trim().toLowerCase().includes(searchValue.toLowerCase())
          );
      }
      return false;
    });

    setFilteredProduct(filteredResults);
  };

  return (
    <section class="business-list">
      <header>
        <div className="search">
          <img src="/searchIcon.png" alt="Search Icon" width={20} height={20} />

          <input
            type="text"
            placeholder="Search products"
            onChange={filteredbySearch}
          />
        </div>
        <select onChange={filteredbyCategory} placeholder="Filter by category">
          <option value="" defaultValue={true}>
            Filter by category
          </option>

          {category.map((cat) => (
            <option value={cat}>{cat} </option>
          ))}
        </select>
      </header>
      <table border={0}>
        <thead>
          <tr className="table-header">
            <th>Company Name</th>
            <th>Category</th>
            <th>Website</th>
            <th>Record count</th>
          </tr>
        </thead>
        <tbody>
          {filteredProduct.map((prod) => (
            <tr
              key={prod.id}
              className="product" // Use classNameName instead of className
              onClick={() => navigate(`/products/${prod.id}`)}
            >
              <td>{prod.fields?.split(",")[0]}</td>
              <td>{prod["data category"]}</td>
              <td>{prod.fields?.split(",")[2]}</td>
              <td>{prod["Record count"]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Product;
