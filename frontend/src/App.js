import './App.css';
const tg = window.Telegram.WebApp
function App() {
  const onClose = () => {
    tg.close()
  }

  useEffect(() => {
    tg.ready()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        work
        <button onClick={onClose}>Закрыть</button>
      </header>
    </div>
  );
}

export default App;
