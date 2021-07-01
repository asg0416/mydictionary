import React from "react";
import { ListStyle, Title, ItemStyle } from "./WordList";
import { Button } from "./MakeWords";

const NotFound = (props) => {
  return (
    <ListStyle>
      <Title>My Dict</Title>
      <ItemStyle 
      onClick={() => {
        alert('홈으로 갑시다잉');
      }}
      style={{ textAlign: "center", marginTop: 20 }}>
        주소가 올바르지 않습니다.
      </ItemStyle>
      <Button
        onClick={() => {
          props.history.push('/');
        }}
      >
        홈으로
      </Button>
    </ListStyle>
  );
};

export default NotFound;
