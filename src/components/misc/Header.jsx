import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function Header({ title }) {
  const navigate = useNavigate();

  return (
    <div className='flex items-center justify-between w-full'>
      <div className='absolute left-0 ml-4'>
        <button className='btn btn-secondary flex items-center' onClick={() => navigate('/home')}>
          <FaArrowLeft /> Back
        </button>
      </div>
      <h1 className='text-center text-4xl mx-auto'>{title}</h1>
    </div>
  );
}
Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
