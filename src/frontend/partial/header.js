import React, {useContext} from 'react';
import logo from '../assets/images/logo.png';
import UserContext from '../context/userContext';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
function Header() {
    const {user} = useContext(UserContext);
    const getData = useSelector((state) => state.cart.carts);
    if(user){
        var username = user.username;
    }else{
        var username = "";
    }
    return (
        <div className="row bg-white">
        <div className="col-md-4">
            <div className="logo py-2"><img src={logo} /></div>
        </div>
        <div className="col-md-4 pt-3">
            <form action="">
                <div className="input-group">
                    <input type="hidden" name="page" value="search"/>
                    <input type="text" className="form-control"  placeholder="Search products" name="product"/>
                    <input type="submit" className="btn btn-success"/>
                </div>
            </form>
        </div>
        
        <div className="col-md-4 text-end pt-3">
            <a href="/#" className="btn border">
                <i className="fas fa-heart text-success"></i>
                <span className="badge text-black">{username}</span>
            </a>
            
            <Link to="/cart" className="btn border"><i className="fas fa-shopping-cart text-success"></i>
                    <span className="badge text-black">{getData.length}</span></Link>
        </div>
    </div>
    );
  }
  
  export default Header;