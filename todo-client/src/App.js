import './App.css';
import Todo from './components/todo'
import makinLogo from './logo-sticky.png'

function App() {
  return (
    <div className="App">
      <h1>todos</h1>
      <Todo />
      <div>
          Double click to edit a todo<br/>
          Created by Wade Girard<br/>
          As part of the interview process with<br/>
            <img alt='Mackin Logo' src={makinLogo} />
      </div>
    </div>
  );
}

export default App;
