import IcCheckOn from '../../assets/images/icon/ic_check_on_og.svg'
import IcCheckOff from '../../assets/images/icon/ic_check_off.svg'
import { FriendCheck } from '../../models/FriendCheck';

interface PropTypes {
    friendCheck : FriendCheck
    updateCheckCount : (arg0 : boolean) => void
}

const FriendInfo = ({friendCheck, updateCheckCount} : PropTypes) => {

    const check = () => {
        friendCheck.check = !friendCheck.check;
        updateCheckCount(friendCheck.check);
    }

    return friendCheck.display ? (
        <div className='select-friend' onClick={() => check()}>
            <div style={{width : '6vw', float : 'left'}}>
                <img src={friendCheck.check ? IcCheckOn : IcCheckOff} alt='check' />
            </div>
            <div className='friend-info'>
                <p>{friendCheck.friend.name}</p>
                <p>{friendCheck.friend.relation}</p>
            </div>
        </div>
    ) : (<></>);
};

export default FriendInfo;
