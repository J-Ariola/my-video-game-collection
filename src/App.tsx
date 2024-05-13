import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';

const BASE_URL: string | null = import.meta.env.VITE_BASE_URL;

type Props = {
  title:string;
  onClick():void;
}

const ClickCountButton = ({ title, onClick }: Props): React.JSX.Element => {
  return (
    <button onClick={onClick}>
    {title}
    </button>
  )
}

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    handleOnMount();
  }, []);

  async function handleOnMount(): Promise<void> {
    const response = await fetch(`${BASE_URL}`, {
      method: "GET",
    });
    const data = await response.json();
    console.log(data);
  }

  return (
    <div>
      <Header/>
      <ClickCountButton title={"Click button: " + count} onClick={() => setCount(count + 1)}/>
    </div>
  )
}

export default App
