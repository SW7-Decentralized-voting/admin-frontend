import { FaMapMarkedAlt, FaPersonBooth, FaUsers, FaUserTie } from 'react-icons/fa';
import HomeBtn from '../Components/HomeBtn';
import { MdHowToVote, MdOutlineMapsHomeWork } from 'react-icons/md';
import LogoutBtn from '../Components/LogoutBtn';

function HomeScreen() {
  return (
    <div className="text-center p-5">
      <LogoutBtn />
      <h1 className='text-4xl'>Admin Dashboard</h1>
      <div className="flex justify-center mt-5">
        <div className='grid grid-cols-3 gap-4'>
          <HomeBtn title='Candidates' path='/candidate' icon={FaUserTie} />
          <HomeBtn title='Election Status' path='/election' icon={MdHowToVote} />
          <HomeBtn title='Parties' path='/party' icon={FaUsers} />
          <HomeBtn title='Nomination Districts' path='/nomination-district' icon={MdOutlineMapsHomeWork} />
          <HomeBtn title='Constituencies' path='/constituency' icon={FaMapMarkedAlt} />
          <HomeBtn title='Polling Stations' path='/polling-station' icon={FaPersonBooth} />
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
