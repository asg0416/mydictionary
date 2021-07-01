import React, { useRef } from "react";
import styled from "styled-components";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

import { useDispatch } from "react-redux";
import { createDictFB } from "./redux/modules/dict";
import { Title, IndTitle } from "./WordList";
import { HomeBtn } from "./Reposting";
import HomeIcon from "@material-ui/icons/Home";

const MakeWords = (props) => {
  const dispatch = useDispatch();

  const nameInput = useRef();
  const descInput = useRef();
  const exInput = useRef();

  const new_item = () => {
    const name = nameInput.current.value;
    const desc = descInput.current.value;
    const ex = exInput.current.value;

    const new_dict_item = { word_name: name, word_desc: desc, word_ex: ex };
    console.log(new_dict_item);
    if (name && desc && ex) {
      dispatch(createDictFB(new_dict_item));
      props.history.goBack();
    } else {
      alert("빈칸을 입력해주세요");
    }
  };

  return (
    <div>
      <Title style={{height: 25, paddingBottom: 18 }}>My Dict 추가</Title>
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
          <input ref={nameInput}></input>
        </ItemStyle>

        <ItemStyle>
          <IndTitle>설명</IndTitle>
          <input ref={descInput}></input>
        </ItemStyle>

        <ItemStyle>
          <IndTitle>예시</IndTitle>
          <input ref={exInput}></input>
        </ItemStyle>
        <Button
          onClick={() => {
            new_item();
          }}
        >
          <CloudUploadIcon style={{ marginRight: 10 }} />
          추가하기
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

export const ListStyle = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 80vh;
  overflow-x: hidden;
  overflow-y: auto;
  &:: -webkit-scrollbar {
    display: none;
  }
`;

export const ItemStyle = styled.div`
  border-radius: 5px;
  border: 1px solid #ddd;
  padding: 16px;
  margin: 15px 8px 15px 8px;
  background-color: #fefefe;
  & * {
    padding: 5px;
  }
  & input {
    margin-top: 10px;
    border: 1px solid #747d8c;
    border-radius: 5px;
    width: 90%;
    &:focus {
      border: 1px solid #673ab7;
    }
  }
`;

// export const IndTitle = styled.p`
//   font-weight: bold;
//   font-size: 14px;
//   margin: 0 auto 5px;
//   color: #2f3542;
//   text-align: left;
//   @media screen and (max-width: 180px) {
//     padding: 0;
//   }
// `;

export const Button = styled.button`
  margin: 20px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fefefe;
  border: none;
  border-radius: 5px;
  transition: all 0.1s;
  cursor:pointer;
  &: hover {
    box-shadow: 200vw 0 0 0 rgba(0, 0, 0, 0.05) inset,
      -200vw 0 0 0 rgba(0, 0, 0, 0.05) inset;
  }
  &: active {
    box-shadow: 200vw 0 0 0 rgba(0, 0, 0, 0.1) inset,
      -200vw 0 0 0 rgba(0, 0, 0, 0.1) inset;
  }
`;

export default MakeWords;
