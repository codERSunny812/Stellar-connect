import PropTypes from 'prop-types'

const Screen2 = ({ arr, mainHeading, para , bgColor }) => {
  return (
      <div className="screen2" style={{ backgroundColor: bgColor}}>
    <div className="part1">
              <h3 className="part1_heading">{mainHeading}</h3>
              <p className="part1_para">
                 {para}
              </p>

    </div>
    
    <div className="part2">
       {
        arr.map((props)=>{
            return(
                <div className="article_category" key={Math.random()}>
                    <p>{props}</p>
                </div>
            )
        })

       }
        

    </div>
   </div>
  )
}

Screen2.propTypes = {
    para: PropTypes.string,
    mainHeading: PropTypes.string,
    arr: PropTypes.array,
    text: PropTypes.string,
    bgColor: PropTypes.string

}

export default Screen2