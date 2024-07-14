import './icon.css';
import PropTypes from 'prop-types'

const Icons = ({Icons , name}) => {

  return (
    <div className="Icons">
       <Icons className="iconss"/>
       <p>{name}</p>
    </div>
  )
}


Icons.propTypes = {
  Icons: PropTypes.object,
  name:PropTypes.string

}

export default Icons;