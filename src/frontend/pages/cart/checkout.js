import React, {useContext} from "react";
import UserContext from "../../context/userContext";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
function Checkout(){
    const { user } = useContext(UserContext);
    const getDataCart = useSelector((state) => state.cart.carts);
    const totalAmount = useSelector((state) => state.cart.totalAmount);
    return (
        user ?
        <div className='cart row'>
            <h1>Thanh Toán</h1>
            <div className='col-md-6'>
                <h3>thông tin khách hàng</h3>
                <from>
                    <div className="md-3">
                        <label for="UserName" className="from-label">Họ Tên</label> <br/>
                        <input type="text" className="from-control" value={user.username}/>
                    </div>
                    <div className="md-3">
                        <label for="exampleInputEmail" className="from-lable">Email</label> <br/>
                        <input type="email" className="from-control" aria-describedby="emailHelp" value={user.email}/>
                    </div>  
                    <div className="md-3">
                        <label for="phone" className="from-lable">Điện Thoại</label> <br/>
                        <input type="text" className="from-control" value={user.phone}/>
                    </div>
                    <div className="md-3">
                        <label for="address" className="from-lable">Điạ chỉ</label> <br/>
                        <input type="text" className="from-control"  value={user.address}/>
                    </div>
                    <div className="md-3">
                        <label for="note" className="from-lable">Ghi chú</label> <br/>
                        <textarea className="from-control"/>
                    </div>
                    <button type="submit" className="btn btn-primary">Thanh toán</button>
                </from>
            </div>
            <div className="col-md-6">
                <h3>Thông tin giỏ hàng</h3>
                <table className="table table-bordered">
                    <tr>
                        <th>Tên sản phẩm</th>
                        <th>Đơn giá</th>
                        <th>Số lượng</th>
                        <th>Thành tiền</th>
                    </tr>
                    {
                        getDataCart.map((e) => {
                            return(
                                <tr>
                                    <tb>{e.name}</tb>
                                    <tb>{e.price}</tb>
                                    <tb>{e.quantity}</tb>
                                    <tb>{e.price * e.quantity}</tb>
                                </tr>
                            )
                        })
                    }
                    <tr><th colSpan={3}>Tổng Tiền</th><th>{totalAmount}</th></tr>
                </table>
            </div>
        </div> :
        <div className="cart">
            <h1>Bạn cần đăng nhập để thanh toán</h1>
            <button type="button" className="btn btn-info"><Link to="/login" className="text-white text-decoration-none">Đăng nhập</Link></button>
        </div>
    )
}

export default Checkout;