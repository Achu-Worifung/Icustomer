import {  useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';

const ProductDetails = ({ token }) => {
    // const navigate = useNavigate();
    const { id } = useParams(); // get the product id
    const [product, setProduct] = useState(undefined);
    const [isLoading, setIsLoading] = useState(true);
    
    // Get token from localStorage
    const storedToken = localStorage.getItem("token");
    
    useEffect(() => {
        
        // Check for token inside useEffect
        if (!storedToken) {
            // navigate("/login");
            return;
        }
        
        console.log("Fetching product with ID:", id);
        
        // Fetch product data
        axios.get(`http://localhost:8080/products/${id}`, {
            headers: {
                Authorization: `Bearer ${storedToken}`,
                "Content-Type": "application/json",
            },
        })
        .then((res) => {
            console.log("API response:", res);
            if (res.status === 200) {
                setProduct(res.data);
                setIsLoading(false);
                console.log("Product data set:", res.data);
            } else {
                console.log("Error:", res.status);
            }
        })
        .catch(error => {
            console.error("Failed to fetch product:", error);
            // Check if we're being redirected
            if (error.response && error.response.status === 404) {
                console.log("Product not found");
            }
        });

     
    }, [id, storedToken]);

    return (
        isLoading ? <p>Loading...</p>
        :
        product ? (
            <section>
           <h2>Product Details</h2>
           <h1>product id: {product.id}</h1>
           <h1>name: {product.fields?.split(",")[0]}</h1>
           <h1>product category: {product['data category']}</h1>
           <h1>Record count: {product['Record count']}</h1>
       </section>
        ): (

            <section>
                <h2>Product Details</h2>
                <p>No such product in the inventory</p>
            </section>
        )
    );
        
};

export default ProductDetails;