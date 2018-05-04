import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import {
  Button,
  Divider,
  Form,
  List,
  Header,
  Grid,
  Segment
} from "semantic-ui-react";
import CreateNewPlayerForm from "./CreateNewPlayerForm";
import GolfFriendObject from "../GolfFriendObject";
import { getFriends } from "../../../../actions/users";

class StepThree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCreatePlayer: false,
      loading: false,
      error: ""
    };
  }
  componentDidMount() {
    this.props.dispatch(getFriends(this.props.user)).catch(err => {
      console.log(err);
      this.setState({ errors: err.response.data.errors });
    });
  }
  FriendPicker = ({ input, players }) => {
    const list = [];
    players.forEach(p => {
      list.push(
        <List.Item
          onClick={input.onChange}
          name={input.name}
          value={input.value}
        >
          <List.Content>
            <List.Header>{p.playerName}</List.Header>
          </List.Content>
        </List.Item>
      );
    });
    return list;
  };

  validate = data => {
    if (!data.selectedPlayers) {
      return "You need more players";
    }
    return undefined;
  };

  render() {
    const {
      handleSubmit,
      loading,
      previousPage,
      invalid,
      submitting,
      players,
      friendData,
      errors
    } = this.props;

    if (players) {
      console.log(players);
    }
    if (friendData) {
      console.log(JSON.stringify(friendData));
    }

    return (
      <div>
        <Header>Add players</Header>
        <Form onSubmit={handleSubmit}>
          <Grid columns={3}>
            <Grid.Column>
              <Segment.Group raised>
                <Segment inverted color="orange">
                  Mulligan Friends
                </Segment>
                {friendData
                  ? friendData.map(friend => (
                      <Segment>
                        <GolfFriendObject friend={friend} />
                      </Segment>
                    ))
                  : "HEJ"}
              </Segment.Group>
              <CreateNewPlayerForm />
            </Grid.Column>
            <Grid.Column>
              {/* <List selection>
                {players.length > 0 && (
                  <Field
                    name="selectedPlayers"
                    component={this.FriendPicker}
                    players={players}
                  />
                )
                // This doesn't get selected atm...
                }
              </List> */}
            </Grid.Column>
          </Grid>
          <Divider />
          <Button onClick={previousPage}>Previous</Button>
          <Button disabled={invalid || submitting || loading}>Next</Button>
        </Form>
      </div>
    );
  }
}

StepThree.propTypes = {
  dispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  previousPage: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  players: PropTypes.arrayOf(PropTypes.object).isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user,
    players: state.players.players,
    friendData: state.user.friends,
    errors: state.user.errors
  };
}
StepThree = reduxForm({
  form: "golfroundwizard", //       <------ same form name
  destroyOnUnmount: false, //       <------ preserve form data
  forceUnregisterOnUnmount: true // <------ unregister fields on unmount
})(StepThree);
StepThree = connect(mapStateToProps)(StepThree);

export default StepThree;
