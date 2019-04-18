import React, { Component } from 'react';
import './App.css';
import LineChart from './LineChart'

class App extends Component {

  state = {
    tickerSelected: "aapl",
    price: []
  }

  componentDidMount() {
    fetch (`https://api.iextrading.com/1.0/stock/${this.state.tickerSelected}/chart`)
    .then(resp => resp.json())
    .then(resp => this.setState({
        price: resp.map(elem => ({ date: new Date(elem.date), open: elem.open}))
      })
    )
  }

  render() {
    console.log(this.state.price)
    return (
      <div className="App">
        <header className="App-header">
          <LineChart data={this.state.price} size={[500,500]} />
        </header>
      </div>
    );
  }
}

export default App;
