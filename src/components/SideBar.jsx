import './sideBar.scss';
import  {avtar , banner} from '../constants/constant.js'
import {PoundCircleTwoTone} from '@ant-design/icons'

const SideBar = () => {
  return (
    <div className="sideBar">

      <div className="sideBar_top">

        <img src={banner} alt="user bg" className='sideBar_bg'/>
         <img src={avtar } className='sideBar_avtar' alt="user profile photo" />
         <h2>sushil pandey</h2>
         <h4>sengersunny448@gmail.com</h4>

         <hr  />
         <div className="sideBar_stats">

          <div className="sideBarStats_one">
            <p>profile viewers</p>
            <p className='sideBar_num'>239</p>
          </div>

          <div className="sideBarStats_two">
            <p>post impression</p>
            <p className='sideBar_num'>22</p>

          </div>
         </div>
         <hr />

         <div className="sideBar_Premium_Info">
          <p className='sideBar_text'>get 4x more profile view with premium</p>
          <div className="sideBar_Premium_icon">
            <PoundCircleTwoTone twoToneColor="#FCD12A" className='sideBar_icon' />
            <h6>try for $0</h6>
          </div>
         </div>

         <hr />

         <div className="sideBar_saved_post">
          <span>saved</span>
          <h4>saved items</h4>
         </div>


      </div>


      <div className="sideBar_bottom">

      </div>

    </div>
  )
}

export default SideBar