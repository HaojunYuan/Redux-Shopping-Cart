import { cartActions } from "./cartSlice";
import { uiActions } from "./uiSlice";

export const fetchData = () => {
  return async (dispatch) => {
    const fetchCartItems = async () => {
      const response = await fetch("https://redux-http-e8680-default-rtdb.firebaseio.com/cartItems.json");
      const data = await response.json();
      return data;
    }
    try {
      const cartItems = await fetchCartItems();
      dispatch(cartActions.replaceData(cartItems));
    } catch (err) {
      dispatch(uiActions.showNotification({
        open: true,
        message: "Fetching cart items failed",
        type: "error"
      }));
    }
  }
}

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(uiActions.showNotification({
      open: true,
      message: "Sending request to server",
      type: "info"
    }));
    const sendRequest = async () => {
      //Send state as Sending request to server
      const response = await fetch("https://redux-http-e8680-default-rtdb.firebaseio.com/cartItems.json",
        {
          method: "PUT",
          body: JSON.stringify(cart)
        })
      const data = await response.json()
      //Send state as response from server
      dispatch(uiActions.showNotification({
        open: true,
        message: "Request sent to server",
        type: "success"
      }));
    };
    try {
      await sendRequest();
    } catch (err) {
      //Send state as error from server
      dispatch(uiActions.showNotification({
        open: true,
        message: "Sending requuest to server failed",
        type: "error"
      }));
    };
  }
}