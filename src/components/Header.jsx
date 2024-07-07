import './header.scss';
import {Linkedln_logo} from '../constants/constant'
import { SearchOutlined , HomeFilled , ContactsFilled , ShoppingFilled , MessageFilled,BellFilled , UserOutlined } from '@ant-design/icons';
import HeaderOption from './HeaderOption';


const Header = () => {
  return (
    <div className="header">
        <div className="header_left">
            <img src={Linkedln_logo} alt="" />

            <div className="header_searchBar">
                  <SearchOutlined className='header_searchBar_icon' />
                  <input type="search" name="" id="" placeholder='search' />
            </div>

        </div>
        <div className="header_right">
         <HeaderOption Icon={HomeFilled} title="home"/>
         <HeaderOption  Icon={ContactsFilled} title="my network" />
         <HeaderOption  Icon={ShoppingFilled} title="jobs" />
         <HeaderOption Icon={MessageFilled} title="messages" />
         <HeaderOption Icon={BellFilled} title="notification"/>
         <HeaderOption Icon={UserOutlined}/>

        </div>
    </div>
  )
}

export default Header