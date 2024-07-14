
import FooterContent from './FooterContent';
import {footer_content_1 , footer_content_2, footer_content_3 , footer_content_4} from '../../constants/constant'


const Footer = () => {
  return (
    <div className="footer">
        
        <FooterContent 
        title="general"
        link={footer_content_1}
        />


          <FooterContent
              title="browse LinkedIn"
              link={footer_content_2}
          />

          <FooterContent
              title="business solutions"
              link={footer_content_3}
          />

          <FooterContent
              title="directories"
              link={footer_content_4}
          />
    </div>
  )
}

export default Footer