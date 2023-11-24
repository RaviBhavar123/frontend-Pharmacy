import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../components/ViewAllProducts/viewAllProducts.css";

function Products() {

  const userData =  JSON.parse(localStorage.getItem("userData"))
  const [products, setProducts] = useState([]);
  
 

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8082/drug/get");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching all Products data:", error.message);
        alert("Error fetching all Products data:");
      }
    };
    fetchAllProducts();
  }, []);

  const handleOrderButton = async (product) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => {
      const options = {
        key: "rzp_test_RVkW9MRY5Y3UDs", // Enter your razorpay key here
        // Cok2ejoZz2bEitqNTr67mwLX
       
        amount: 40 * 100, // amount in paise
        currency: "INR",
        name: "Bookings",
        description: "Test Transaction",
        image: "YOUR_LOGO_URL", // Add your logo URL here
        handler: function (response) {
          //alert(response.razorpay_payment_id);
        },
        prefill: {
          name: "Pranav",
          email: "pranavbhasme@gmail.com",
          contact: 9067683203,
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    };
    document.body.appendChild(script);
    const confirm = window.confirm("Are you sure you want to Order ?");
    // if (confirm) {
    //   try {
    //     // await axios.delete(`http://localhost:8082/drug/delete/${drugid}`);
    //     alert("Order placed successfully\nThank you, visit again");
    //     window.location.reload();
    //   } catch (error) {
    //     console.error("Order Handle error:", error);
    //     alert("Error Order item. Please try again.");
    //   }
    // }
       
    console.log(product)

    const payload={

      orderId:78,
      drugId:product.drugid,
      userId:userData.id,
      quantity:2,
      orderDate:"2023-11-23"




    }

    if(confirm){
      axios.post("http://localhost:8083/order/addOrder",payload).then(()=>{
        
        alert("Order Successfull")
      }).catch((error)=>{
        alert("Cannot Order");
        console.log(payload);
      })
    }


  };

  return (
    <>
      <h1 className="PageHeading">Available Products</h1>
      <div className="GridProductsContainer">
        {products.map((product) => (
          <div key={product.drugid} className="GridCard">
            <div>
              <p>Drug Id = {product.drugid}</p>
              <p>Drug Name = {product.drugName}</p>
              {/* <p>Drug Quantity = {product.drugQuantity}</p> */}
              <p>Expiry Date = {product.expiryDate ? product.expiryDate.slice(0, 10) : 'N/A'}</p>
              <p>Price = {product.price}</p>
              <button
                className="OrderButton"
                onClick={() => handleOrderButton(product)}
              >
                Order Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Products;
