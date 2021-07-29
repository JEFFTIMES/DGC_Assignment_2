import './App.css';
import InputForm from './components/InputForm/InputForm';

function App() {

  return (
    <div className="App">
      <header className="App-header">
      </header>
      <div className="App-body">
        <div className="container">
          <div className="image-container">
            <h1>Weather Finder</h1>
            <p><i>find out temperature,conditions and more...</i></p>
          </div>
          <InputForm />            
        </div>
      </div>
    </div>
  );
}

export default App;
