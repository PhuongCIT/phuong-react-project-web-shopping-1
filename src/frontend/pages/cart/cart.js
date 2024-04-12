import { useDispatch, useSelector } from "react-redux";
import cartReducer from "../../../redux/reducers/cartReducer";
import CartItem from "./cartItem";
import { CLEAR, TOTAL } from "../../../redux/action/cartAction";
import { Link } from "react-router-dom";
function Cart(){
    const getDataCart = useSelector((state) => state.cart.carts);
    const dispatch = useDispatch();
    dispatch(TOTAL());

    const clearCart = () => {
        dispatch(CLEAR());
    }

    const totalAmount = useSelector((state) => state.cart.totalAmount);

    console.log("getDataCart: ", getDataCart);
    return(
        <div>
            <h1>Giỏ Hàng</h1>
            <table className="table table-bordered">
                <tr>
                    <th>Hình ảnh</th>
                    <th>Tên Sản Phẩm</th>
                    <th>Đơn giá</th>
                    <th>Số lượng</th>
                    <th>Thành tiền</th>
                    <th>Xóa</th>
                </tr>
                {
                    getDataCart.map((e) => {
                        return(
                            <CartItem item={e} />
                        )
                    })
                }
                <tr><th colSpan={4}>Tổng Tiền</th><th colSpan={2}>{totalAmount}</th></tr>
            </table>
            <button type="button" className="btn btn-danger me-1" onClick={() => clearCart()}>Xóa Giỏ Hàng</button>
            <button type="button" className="btn btn-info"><Link to="/checkout" className='text-white text-decoration-none'>Thanh toán</Link></button>
        </div>
    );
}

export default Cart;