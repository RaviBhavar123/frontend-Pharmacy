import axios from "axios";
import React, { useEffect, useState } from "react";

function OrderRequest(){


    const [orders,setOrders] = useState([])

    useEffect(()=>{
        axios.get("http://localhost:8083/order/get").then((response)=>{
            setOrders(response.data)
            console.log(response.data)
        });
    },[]);


    return(
        <div>
 <div className="GridProductsContainer">
        {orders.map((order) => (
          <div key={order.orderId} className="GridCard">
            <div>
            <p>Order Id = {order.orderId}</p>
              <p>Drug Id = {order.drugId}</p>
              <p>User Id = {order.userId}</p>
              <p>Drug Quantity = {order.quantity}</p>
              <p>Expiry Date = {"12-12-2023"}</p>
            </div>
          </div>
        ))}
      </div>
        </div>
    )
}

export default OrderRequest;