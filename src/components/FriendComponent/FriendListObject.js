import React from "react";
import PropTypes from "prop-types";
import { Button, Feed, Message, Icon } from "semantic-ui-react";

const RenderPendingContent = ({ pending, onRespond }) => {
  if (pending.message) {
    return (
      <Message
        header={pending.message}
        info
        compact
        style={{ float: "right", marginTop: 0 }}
      />
    );
  }
  return (
    <div>
      <Button
        floated="right"
        size="tiny"
        negative
        icon="remove"
        onClick={() => onRespond(pending.username, false)}
      />
      <Button
        floated="right"
        size="tiny"
        positive
        icon="checkmark"
        onClick={() => onRespond(pending.username, true)}
      />
    </div>
  );
};

RenderPendingContent.propTypes = {
  pending: PropTypes.shape({
    username: PropTypes.string,
    message: PropTypes.string,
  }).isRequired,
  onRespond: PropTypes.func.isRequired,
}

export const PendingFriendListObject = ({ pending, onRespond }) => (
  <Feed.Event>
    <Feed.Label icon="heart" />
    <Feed.Content>
      <Feed.Summary>
        {pending.username}
        <RenderPendingContent pending={pending} onRespond={onRespond} />
      </Feed.Summary>
      <Feed.Extra>Hcp: {pending.hcp}</Feed.Extra>
    </Feed.Content>
  </Feed.Event>
);

PendingFriendListObject.propTypes = {
  pending: PropTypes.shape({
    username: PropTypes.string,
    message: PropTypes.string,
  }).isRequired,
  onRespond: PropTypes.func.isRequired
};

export const FriendListObject = ({ friend }) => (
  <Feed.Event>
    <Feed.Label icon="heart" />
    <Feed.Content>
      <Feed.Summary>
        {friend.username}
        <Button floated="right" size="tiny" inverted color="red" icon>
          <Icon name="user x" />
        </Button>
      </Feed.Summary>
      <Feed.Extra>Hcp: {friend.hcp}</Feed.Extra>
    </Feed.Content>

  </Feed.Event>
);

FriendListObject.propTypes = {
  friend: PropTypes.shape({
    username: PropTypes.string,
    hcp: PropTypes.number
  }).isRequired
};
