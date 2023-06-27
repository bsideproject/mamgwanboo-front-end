import React, { Fragment, useEffect, useRef, useState } from 'react';
import TitleWrap from '../../components/common/TitleWrap';
import InputTextBoxWithArrow from '../../components/common/InputTextBoxWithArrow';
import FriendList from './FriendList';
import { FriendCheck } from '../../models/FriendCheck';
import DateUtil from '../../utils/DateUtil';
import Calendar from '../../components/common/Calendar';
import Event from './Event';
import EventType from './EventType';
import MindType from './MindType';
import MoneyOption from './MoneyOption';
import InputTextBox from '../../components/common/InputTextBox';
import { useNavigate } from 'react-router-dom';
import RootStore from '../../store/RootStore';
import { RelationshipRequestProto } from '../../prototypes/common/RelationshipProto';
import { Friend } from '../../models/Friend';
import IcPhotoUploadBtn from '../../assets/images/icon/ic_photo_upload_btn.png';

const Mind = () => {

  const [openModal, setOpenModal] = useState<boolean[]>([false, false, false]);
  const [inputArray, setInputArray] = useState<string[]>(['','','']);

  const [eventType, setEventType] = useState<string>('give');
  const [mindType, setMindType] = useState<string>('');
  const [money, setMoney] = useState<number>(0);
  const [memo, setMemo] = useState<string>('');

  const moneyInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const todayString : string = DateUtil.getTodayString();

    let list : string[] = [...inputArray];

    list[1] = todayString;

    setInputArray(list);

    RootStore.friendStore.setFriendList();
  }, []);

  const handleInputClick = (index : number) => {
    console.log("handleInputClick ", index);
    let list : boolean[] = [...openModal];
    list[index] = true;
    setOpenModal(list);
  }

  const handleClose = (index : number) => {
    let list : boolean[] = [...openModal];
    list[index] = false;
    setOpenModal(list);
  }

  const setContainerHeight = (ref : any, height : string) => {
    if (ref.current) {
      ref.current.style.height = `${height}`;
    }
  }

  const appendFriendList = (friendList : FriendCheck[]) => {

    let text = '';

    friendList.forEach(obj => {
      if (obj.check) {
        text+=`${obj.friend.name}, `
      }
    })

    // 마지막 comma 제거
    text = text.trim();
    text = text.slice(0, -1);

    let list : string[] = [...inputArray];
    list[0] = text;

    setInputArray(list);
  }

  const addMoney = (add : number) => {
    let sum = add + money;

    setMoney(sum);

    if (moneyInputRef.current) {
      moneyInputRef.current.valueAsNumber = sum;
    }
  }

  const memoHandler = (e : React.ChangeEvent<HTMLInputElement>) : void => {
    const text = e.target.value;
    setMemo(text);

  }

  const save = async() => {

    /*
      API 로 작성된 데이터 전송.
    */

    

    let saveList : RelationshipRequestProto[] = [];



    navigate("/main");
  }

  const handleFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  const handleUploadPhoto = async(e : React.ChangeEvent<HTMLInputElement>) => {
    let file = undefined;
    const reader : FileReader = new FileReader();

    if (e.target.files) {
      file = e.target.files[0];

      reader.onloadend = () => {
        if (imageRef.current) {
          imageRef.current.src = reader.result as string;
        }
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    }

  }

  return (
    <div className="Mind inner">
      <TitleWrap title="마음 기록하기" />
      <form className='mind-register-wrap'>
        <EventType 
          selected={eventType}
          setEventType={setEventType}
        />
        <InputTextBoxWithArrow
          inputTitle='이름 (필수)'
          placeholder='기록할 친구들을 선택하세요.'
          id='friends'
          onClick={() => handleInputClick(0)}
          value={inputArray[0]}
        />
        <InputTextBoxWithArrow
          inputTitle='날짜 (필수)'
          id='date'
          onClick={() => handleInputClick(1)}
          value={inputArray[1]}
        />
        <InputTextBoxWithArrow 
          inputTitle='이벤트 (필수)'
          id='event'
          onClick={() => handleInputClick(2)}
          value={inputArray[2]}
          placeholder={`${eventType === 'give' ? '준' : '받은'} 이유를 선택하세요.`}
        />
        <MindType 
          onSelect={setMindType}
        />
        { mindType === 'cash' &&
          <Fragment>
            <div className="InputTextBox">
              <input
                type="number"
                className="input-text-box"
                id='cash-input'
                placeholder='금액을 입력하세요'
                ref={moneyInputRef}
              />
            </div>
            <MoneyOption 
              options={['1', '5', '10']}
              onSelect={addMoney}
            />
          </Fragment>
        }
        {
          mindType === 'gift' &&
          <Fragment>
            <div className="gift-InputTextBox">
              <input
                type="text"
                className="input-text-box"
                id='gift-input'
                placeholder='선물을 입력하세요'
              />
            </div>
            <div>
              <button id="save-photo-button"
                onClick={(e) => {e.preventDefault();handleFileInput();}}
              >
                <img src={IcPhotoUploadBtn} alt='photo upload' />
              </button>
              <input 
                type="file"
                accept='image/*'
                ref={fileInputRef}
                style={{display : 'none'}}
                onChange={handleUploadPhoto}
              />
              <img ref={imageRef} alt="Preview" />
            </div>
          </Fragment>
        }
        <InputTextBox 
          inputTitle='메모(선택)'
          placeholder='입력하세요. (최대 50자)'
          value={memo}
          onChange={memoHandler}
          id="memo"
        />
        <div className="register-btn-wrap">
          <button type="button" 
            className="register-btn"
            onClick={() => save()}>등록하기</button>
        </div>
      </form>
      <FriendList 
        isOpen={openModal[0]}
        onClose={() => handleClose(0)}
        setContainerHeight={setContainerHeight}
        appendFriendList={appendFriendList}
      />
      <Calendar 
        isOpen={openModal[1]}
        onClose={() => handleClose(1)}
        title={"날짜"}
        inputArray={inputArray}
        setInputArray={setInputArray}
        setContainerHeight={setContainerHeight}
      />
      <Event 
        isOpen={openModal[2]}
        onClose={() => handleClose(2)}
        inputArray={inputArray}
        setInputArray={setInputArray}
        setContainerHeight={setContainerHeight}
      />
    </div>
  );
};

export default Mind;