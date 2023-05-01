import { useEffect } from "react";
import Navbar from "./components/Navbar";
import CartContainer from "./components/CartContainer";
import Modal from "./components/Modal";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { getCartItems } from "./features/cart/cartSlice";

function App() {
  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector((store) => store.modal);
  const { isLoading } = useAppSelector((store) => store.cart);

  useEffect(() => {
    dispatch(getCartItems());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    );
  }
  return (
    <main>
      {isOpen && <Modal />}
      <Navbar />
      <CartContainer />
    </main>
  );
}
export default App;
