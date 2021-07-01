// 수정하기
// 단어 추가할때 사용한 컴포넌트 그대로 쓰는 방식도 생각해봤지만 생각하기 쉽도록 그냥 새로 수정 컴포넌트를 만들었습니다.

// 리덕스, 리액트 활용할 것 임포트
import React from "react";
import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateDictFB } from "./redux/modules/dict";

// 디자인적인 요소들
import { Title } from "./WordList";
import { ListStyle, ItemStyle, Button } from "./MakeWords";
import { IndTitle } from "./WordList";
import styled from "styled-components";
import HomeIcon from "@material-ui/icons/Home";

const Reposting = (props) => {
  const dispatch = useDispatch();

  // 사용자 입력값 연결해서 받아옴
  const nameInput = useRef();
  const descInput = useRef();
  const exInput = useRef();

  const dict_list = useSelector((state) => state.dict.list);
  let dict_index = parseInt(props.match.params.ind);

  // defaultValue에 들어가는 기존에 저장되었있던 입력값 (수정 전)
  const name = dict_list[dict_index] && dict_list[dict_index].word_name;
  const desc = dict_list[dict_index] && dict_list[dict_index].word_desc;
  const ex = dict_list[dict_index] && dict_list[dict_index].word_ex;

  // 수정된 내용을 디스패치해서 모듈의 미들웨어 (함수반환 함수)로 값 넘겨주는 함수
  const re_item = () => {
    // 수정 후 입력값
    const name = nameInput.current.value;
    const desc = descInput.current.value;
    const ex = exInput.current.value;

    // 새로 수정시키고 싶은 내용을 딕셔너리 형태로 저장
    const re_dict_item = { word_name: name, word_desc: desc, word_ex: ex };
    console.log(re_dict_item);

    // 수정시 빈칸 방지 용
    if (name && desc && ex) {
      dispatch(updateDictFB(re_dict_item, dict_index));
      props.history.push("/");
    } else {
      alert("빈칸을 입력해주세요");
    }
  };

  return (
    <div>
      <Title style={{ paddingBottom: 18 }}>My Dict 수정</Title>
      <HomeBtn
        onClick={() => {
          props.history.push("/");
        }}
      >
        <HomeIcon style={{ fontSize: 30 }} />
      </HomeBtn>
      <ListStyle>
        <ItemStyle>
          <IndTitle>단어</IndTitle>
          {/* ref는 input입력값을 연결시켜서 사용자가 수정한 값을 받고 */}
          {/*  defaultValue는 수정 전 저장되어있던 값을 input box에 넣어서 보여주는 용도 */}
          {/* 일반적으로 input에 값을 넣어준 상태로 보여주고 싶을때 value를 이용했었는데 리액트에서 그냥 value쓰면 에러생김 */}
          <input ref={nameInput} defaultValue={name}></input>
        </ItemStyle>

        <ItemStyle>
          <IndTitle>설명</IndTitle>
          <input ref={descInput} defaultValue={desc}></input>
        </ItemStyle>

        <ItemStyle>
          <IndTitle>예시</IndTitle>
          <input ref={exInput} defaultValue={ex}></input>
        </ItemStyle>

        <Button
          style={{ marginTop: 15, padding: 14 }}
          onClick={() => {
            // 위에서 만든 수정 함수 바로 적용시킨 것
            re_item();
          }}
        >
          수정하기
        </Button>

        <Button
          style={{ marginTop: 0, padding: 14 }}
          onClick={() => {
            props.history.goBack();
          }}
        >
          뒤로가기
        </Button>
      </ListStyle>
    </div>
  );
};

export const HomeBtn = styled.div`
  width: 45px;
  height: 45px;
  background-color: #fefefe;
  color: #8aaae5;
  position: absolute;
  top: 17px;
  right: 10px;
  cursor: pointer;
`;

export default Reposting;
