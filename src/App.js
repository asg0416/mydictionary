import React from "react";
import styled from "styled-components";

// 라우터
import { Route, Switch } from "react-router-dom";
import { withRouter } from "react-router";

// 리덕스
import { connect } from "react-redux";
import { loadDictFB } from "./redux/modules/dict";

// 컴포넌트
import WordList from "./WordList";
import MakeWords from "./MakeWords";
import Detail from "./Detail";
import Reposting from "./Reposting";
import NotFound from "./NotFound";
import Spinner from "./Spinner";

const mapStateToProps = (state) => ({
  dict_list: state.dict.list,
  is_loaded: state.dict.is_loaded,
});

const mapDispatchToProps = (dispatch) => {
  return {
    load: () => {
      dispatch(loadDictFB());
    },
  };
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.load();
  }

  render() {
    return (
      <div className="App">
        {!this.props.is_loaded ? (
          <Spinner />
        ) : (
          <React.Fragment>
            <Container>
              <Switch>
                <Route
                  exact
                  path="/"
                  render={(props) => (
                    <WordList
                      list={this.props.dict_list}
                      history={this.props.history}
                    />
                  )}
                />
                <Route path="/detail/:ind" component={Detail} />
                <Route path="/reposting/:ind" component={Reposting} />
                <Route path="/makewords" component={MakeWords} />
                <Route
                  render={(props) => <NotFound history={this.props.history} />}
                />
              </Switch>
            </Container>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export const Container = styled.div`
  position: relative;
  min-width: 145px;
  max-width: 80vw;
  min-height: 80vh;
  background-color: #8AAAE5;
  margin: 20px auto;
  border-radius: 5px;
  border: 1px solid #ddd;
  @media screen and (min-width: 1000px) {
    max-width: 800px
`;

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
