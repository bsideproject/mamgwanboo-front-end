import NullChecker from '../../utils/NullChecker';
import IcFrontBtn from '../../assets/images/icon/ic_front_btn.svg';
import IcBirthCheckOff from "../../assets/images/icon/ic_check_off.svg";
import IcBirthCheckOn from "../../assets/images/icon/ic_check_on_og.svg"
import React from "react";

interface PropsType {
    id: string,
    inputTitle: string,
    name?: string,
    onClick: any,
    placeholder?: string,
    value?: string,
    onChange?: any,
    checked?: any
}

const InputTextBoxWithArrow = ({
                                   inputTitle,
                                   placeholder,
                                   onClick,
                                   id, value,
                                   onChange,
                                   checked
} : PropsType) => {

  return (
    <div className='InputTextBoxWithArrow' >
      <div className="InputTextBox" onClick={id === "birth" && checked ? null : onClick}>
        <label className="input-title">{inputTitle}</label>
        <input
          type="text"
          className={checked ? "input-text-box on" : `input-text-box ${id}`}
          id={id}
          placeholder={placeholder}
          value={NullChecker.isEmpty(value) ? '' : value}
          disabled
        />
      </div>
        {id === "birth" ?
            <div className="friend-name-add" >
                <input
                    type="checkbox"
                    id="birthCheck"
                    checked={checked}
                    onChange={({target: {checked}}) => onChange(checked)}
                />
                <label htmlFor="birthCheck">
                    {checked ? <img src={IcBirthCheckOn} alt="check-btn" /> : <img src={IcBirthCheckOff} alt="check-btn" />}
                    <span>생일 모름</span>
                </label>
            </div> : null
        }
      <div className="front-btn">
          <img src={IcFrontBtn} alt="front-btn" />
      </div>
    </div>
  );
};

export default InputTextBoxWithArrow;
