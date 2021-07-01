import React from "react";
import styled, { keyframes } from "styled-components";
import ScatterPlotIcon from '@material-ui/icons/ScatterPlot';

const Spinner = (props) => {
  return (
    <Outter>
      <Box>
        <ScatterPlotIcon style={{ fontSize: "150px" }} />
      </Box>
    </Outter>
  );
};

const Outter = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fefefe;
`;

const move = keyframes`
    0%{
        color: #8aaae5;
    }
    50%{
        color: pink;
    }
    100%{
        color: #ff6348;
    }
    from {
        transform: rotate(0);
    }
    to {
        transform: rotate(360deg);
    }
`;

const Box = styled.div`
  animation: ${move} 1.5s 0s infinite;
`;

export default Spinner;
