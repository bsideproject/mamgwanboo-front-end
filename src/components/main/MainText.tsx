import React from "react";

interface PropsType{
    isEmptyList: boolean,
    length?: string,
    count?: any
}

const MainText = ({ isEmptyList, length, count }:PropsType) => {

    return(
        <div className="MainText">
            {isEmptyList ?
                    <p className="main-text">친구를 등록하고<br/>주고 받은 마음을 기록해보세요.</p> :
                    <p className="main-text">[닉네임]님은 <em className="color">{length ? length : "0"}명</em>과<br/>총 <em className="color">{count ? count.total : "0"}번</em>의 마음을 나눴어요.</p>
            }
        </div>
    )
}

export default MainText;
