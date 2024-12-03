import { FaMapMarkedAlt, FaPersonBooth, FaUsers, FaUserTie, FaKey } from 'react-icons/fa';
import HomeBtn from '../../components/misc/HomeBtn';
import { MdHowToVote, MdOutlineMapsHomeWork } from 'react-icons/md';
import LogoutBtn from '../../components/misc/LogoutBtn';

function HomeScreen() {
  return (
    <div className="text-center p-5">
      <LogoutBtn />
      <h1 className='flex justify-center text-4xl mt-5'>Admin Dashboard</h1>
      <h2 className='flex text-2xl justify-center'>Manage</h2>
      <div className="flex justify-center mt-2">
        <div className='grid grid-cols-3 gap-4'>
          <HomeBtn title='Candidates' path='/candidate' icon={FaUserTie} />
          <HomeBtn title='Parties' path='/party' icon={FaUsers} />
          <HomeBtn title='Nomination Districts' path='/nomination-district' icon={MdOutlineMapsHomeWork} />
          <HomeBtn title='Constituencies' path='/constituency' icon={FaMapMarkedAlt} />
          <HomeBtn title='Polling Stations' path='/polling-station' icon={FaPersonBooth} />
        </div>
      </div>
      <h2 className='flex justify-center text-2xl mt-5'>Election</h2>
      <div className="flex justify-center mt-2">
        <div className='grid grid-cols-3 gap-4'>
          <HomeBtn title='Election Status' path='/election' icon={MdHowToVote} />
          <HomeBtn title='Key Generation' path='/key-generation' icon={FaKey} />
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
