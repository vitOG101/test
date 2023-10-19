import Image from 'next/image'
import PropTypes from 'prop-types';
import '@/components/block-text/styles.css';

function BlockText({ title = '', children = '', imageSrc = '/fire.png' }) {
  return (
    <section className="block-text">
      <div className="block-text__content">
        <h2 className="block-text__title">{ title }</h2>
        {children ? <p className="block-text__description">{ children }</p> : ''}
      </div>
      {imageSrc ? <Image src={imageSrc} width={348} height={348} alt="fire" className="block-text__image" /> : ''}
    </section>
  )
}

BlockText.propTypes = {
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.element,
  ]).isRequired,  
  children: PropTypes.string,
  imageSrc: PropTypes.string,
};

export default BlockText;
