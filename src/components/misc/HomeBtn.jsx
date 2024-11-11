import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function HomeBtn({ title, path, icon: Icon }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(path)}
      className="btn btn-primary w-64 h-36 flex flex-col text-xl text-center"
    >
      {title} <Icon className="text-3xl" />
    </button>
  );
}

HomeBtn.propTypes = {
  title: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
};

export default HomeBtn;