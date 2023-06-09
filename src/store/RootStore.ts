import AppleStore from './AppleStore';
import FriendStore from './FriendStore';
import KakaoStore from './KakaoStore';
import MindStore from './MindStore';
import UserStore from './UserStore';

class RootStore {

  mindStore : MindStore;
  kakaoStore : KakaoStore;
  userStore : UserStore;
  friendStore : FriendStore;
  appleStore : AppleStore;

  constructor() {
    this.mindStore = new MindStore(this);
    this.kakaoStore = new KakaoStore(this);
    this.userStore = new UserStore(this);
    this.friendStore = new FriendStore(this);
    this.appleStore = new AppleStore(this);
  }
}

export default new RootStore();