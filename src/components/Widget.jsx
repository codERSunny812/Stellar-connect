import './widget.css';
import PropTypes from 'prop-types';

const Widget = () => {

  const News = ({title,para})=>{
    return(
      <div className="news_heading">
        <h4>{title}</h4>
        <h6>{para}</h6>
      </div>
    )
  }
  return (
    <div className="widget">
      <h1 className='widget_heading'>linkdln news</h1>
      <h4>new stories</h4>
      <News title="building india's top ev workspace" para="2959 reader"/>
      <News title="msme rope influecers" para="9390 reader" />
      <News title="iim's welcome more women students" para="1959 reader" />
      <News title="legatech to serve more tech jobs" para="2959 reader" />
    </div>
  )
}

Widget.propTypes={
  title:PropTypes.string,
  para:PropTypes.string
}



export default Widget