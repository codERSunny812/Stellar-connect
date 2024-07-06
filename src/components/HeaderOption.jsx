import './HeaderOption.css';
import PropTypes from 'prop-types'

const HeaderOption = ({ Icon, title}) => {
// console.log(HomeFilled)
  return (
    <div className="headerOptions">
          {Icon&& <Icon className="header_icon"/>}
        <h3>{title}</h3>
    </div>
  )
}

HeaderOption.propTypes={
    Icon:PropTypes.object,
    title:PropTypes.string

}
export default HeaderOption


