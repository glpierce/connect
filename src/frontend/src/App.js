import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      friends: [
        { name: 'Alice' },
        { name: 'Bob' },
        { name: 'Carol' },
        { name: 'Dave' },
        { name: 'Emily' }
      ],
      newFriend: ''
    };
  }

  handleRemindClick(friend) {
    alert(`Reminder: Reach out to ${friend.name}`);
  }

  handleAddClick() {
    this.setState(state => {
      const friends = state.friends.concat({ name: state.newFriend });
      return {
        friends,
        newFriend: ''
      };
    });
  }

  handleChange(event) {
    this.setState({ newFriend: event.target.value });
  }

  render() {
    return (
      <div>
        <h1>My Friends</h1>
        <ul>
          {this.state.friends.map(friend => (
            <li key={friend.name}>
              {friend.name}
              <button onClick={() => this.handleRemindClick(friend)}>
                Remind
              </button>
            </li>
          ))}
        </ul>
        <input
          type="text"
          value={this.state.newFriend}
          onChange={event => this.handleChange(event)}
        />
        <button onClick={() => this.handleAddClick()}>Add Friend</button>
      </div>
    );
  }
}

export default App;
