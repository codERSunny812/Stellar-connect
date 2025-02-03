import PropTypes from "prop-types";

const FooterContent = ({ title, link }) => {
  return (
    <div className="FooterContent">
      <h4>{title}</h4>

      <div className="footer_list">
        {link.map((data) => {
          return (
            <div className="footer_end_list" key={data}>
              <p className="footer_end">{data}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

FooterContent.propTypes = {
  title: PropTypes.string,
  link: PropTypes.array,
};

export default FooterContent;
