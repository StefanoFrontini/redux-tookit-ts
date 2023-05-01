import { CartIcon } from "./icons";
import { useAppSelector } from "../app/hooks";

const Navbar = () => {
  const { cartItems } = useAppSelector((store) => store.cart);
  const totalAmount = cartItems.reduce((acc, item) => acc + item.amount, 0);

  return (
    <nav>
      <div className="nav-center">
        <h3>redux toolkit</h3>
        <div className="nav-container">
          <CartIcon />
          <div className="amount-container">
            <p className="total-amount">{totalAmount}</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
