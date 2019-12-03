import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class Orders extends Component {
  state = {
    orders: [],
    loading: false
  };

  componentDidMount() {
    axios
      .get("/orders.json")
      .then((response) => {
        //  orders.push(response.data);
        // console.log(response.data);

        const fetchedOrders = [];

        for (let key in response.data) {
          // fetchedOrders.push({...response.data[key], id:key})
          fetchedOrders.push({ ...response.data[key], id: key });
        }

        console.log(fetchedOrders);
        this.setState({ loading: false, orders: fetchedOrders });
      })
      .catch((err) => {
        this.setState({ loading: false });
      });
  }

  render() {
    return (
      <div>
        {this.state.orders.map((order) => (
          <Order
            key={order.id}
            ingr
            edients={order.ingredients}
            price={order.price}
          />
        ))}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);
