import './header.scss';
import {Linkedln_logo} from '../constants/constant'
import { SearchOutlined } from '@ant-design/icons';


const Header = () => {
  return (
    <div className="header">
        <div className="header_left">
            <img src={Linkedln_logo} alt="" />

            <div className="header_searchBar">
                  <SearchOutlined />
                  <input type="search" name="" id="" />
            </div>

        </div>
        <div className="header_right">

        </div>
    </div>
  )
}

export default Header