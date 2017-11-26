var React = require('react');
var TimerForm = require('TimerForm');
var Clock = require('Clock');
var Controls = require('Controls');

var Timer = React.createClass({
  getInitialState: function() {
    return {
      count: 0,
      timerStatus: 'stopped'

    };
  },
 
  componentDidUpdate: function(prevProps, prevState){
    if (this.state.timerStatus !== prevState.timerStatus) {
      switch (this.state.timerStatus) {
        case 'started' :
          if (prevState.timerStatus === 'paused') {
            this.startTimer(true)
          }else {
          this.startTimer(false);}
          break;
        case 'stopped' :
        this.setState({
          count: 0
        })
        case 'paused' :
        clearInterval(this.timer);
        this.timer = undefined;
        break;
      }
    }
  },
  startTimer: function(waspaused){
      if (waspaused) { 

      } else {
        this.setState({
          limit: this.state.count,
          count: 0
        })
      }
    
    this.timer = setInterval( () => {
      //start at 0
      //use the amount entered as a limit
      //update every second until the limit is reached
      var newCount = this.state.count + 1;
      this.setState ({
        count: newCount <= this.state.limit ? newCount : this.state.limit
      });
      if (newCount === this.state.limit) {
        alert("Time's Up!");
        this.setState({ timeStatus: 'stopped'});
      }
    },1000);
  },
  handleSetTimer: function(seconds){
    this.setState({
      count: seconds,
      timerStatus: 'started'
    })
  },
  handleStatusChange: function(newStatus){
    this.setState({
      timerStatus: newStatus
    });
  },
  ////Begin Render Method
  render: function() {
    var {count, timerStatus} = this.state;
    var renderControlArea = () =>{
      var temp = false;
      if (timerStatus !== "stopped") {
      return (<Controls countdownStatus={timerStatus} onStatusChange={this.handleStatusChange}/>);
      } 
      else {
      return (<TimerForm onSetTimer={this.handleSetTimer}/>);
      }
    }
    var renderlimit = () =>{
      if(timerStatus !== "stopped") {
        return(<p className="limit">Timer set to: {this.state.limit}</p>);
      }
    }
    
    return (
      
      <div className="timer">
        <h1 className="timer-title">Timer App</h1>
        <Clock totalSeconds={count}/>
        {renderlimit()}
        {renderControlArea()}
      </div>
    )
  }
});

module.exports = Timer;
