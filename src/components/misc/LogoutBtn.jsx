import { ImExit } from 'react-icons/im';
import { useNavigate } from 'react-router-dom';

function LogoutBtn() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // TODO: implement some logout logic
    sessionStorage.removeItem('jwt');
    navigate('/login');
  };

  return (
    <div className="relative text-center p-5">
      <button
        className="absolute top-4 right-4 btn btn-secondary text-lg"
        onClick={handleLogout}
      >
        Logout <ImExit />
      </button>
    </div>
  );
}

export default LogoutBtn;
