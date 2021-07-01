import React from "react";
import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Title } from "./WordList";
import { ListStyle, ItemStyle, Button } from "./MakeWords";
import { IndTitle } from "./WordList";
import styled from "styled-components";
import HomeIcon from "@material-ui/icons/Home";
import { updateDictFB } from "./redux/modules/dict";

const Reposting = (props) => {
  const dispatch = useDispatch();

  const nameInput = useRef();
  const descInput = useRef();
  const exInput = useRef();

  const dict_list = useSelector((state) => state.dict.list);
  let dict_index = parseInt(props.match.params.ind);

  const name = dict_list[dict_index] && dict_list[dict_index].word_name;
  const desc = dict_list[dict_index] && dict_list[dict_index].word_desc;
  const ex = dict_list[dict_index] && dict_list[dict_index].word_ex;

  const re_item = () => {
    const name = nameInput.current.value;
    const desc = descInput.current.value;
    const ex = exInput.current.value;

    const re_dict_item = { word_name: name, word_desc: desc, word_ex: ex };
    console.log(re_dict_item);
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
