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
      ]
    };
  }

  handleRemindClick(friend) {
    alert(`Reminder: Reach out to ${friend.name}`);
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
      </div>
    );
  }
}

export default App;
