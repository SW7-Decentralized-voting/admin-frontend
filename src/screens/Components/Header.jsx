import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Header({ title }) {
  const navigate = useNavigate();

  return (
    <div className='flex items-center justify-between w-full p-4 h-16'>
      <button className='btn flex items-center space-x-2' onClick={() => navigate('/home')}>
        <FaArrowLeft /> Back
      </button>
      <h1 className='flex-1 text-center'>{title}</h1>
      <div className='w-8' />
    </div>
  );
}

export default Header;
