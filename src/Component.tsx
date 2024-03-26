import { useState, useEffect} from 'react';
import './Component.css'

export interface Item {
  currentCoin:Bitcoin
}

interface Bitcoin {
  currentCoinTo: number;
}

const ComponentTest = () => {

  const [value, setValue] = useState<string | number>(1);
  const [data, setData] = useState<Item | null>(null);

  const [currentCoin, setCurretCoin] = useState<string>("bitcoin");
  const [currentCoinTo, setCurretCoinTo] = useState<string>("eth");

  const answerData = data?.[`${currentCoin}`as keyof Item]?.[`${currentCoinTo}`as keyof Bitcoin];
  const now = new Date().toLocaleString([], {dateStyle: 'short', timeStyle: 'short'} ) + '';

  const calcValue = () => {
    if(data?.[`${currentCoin}`as keyof Item]){
      return value;
    }
    return 'loading...'
  }
  const calcValueTo = () => {
    if(answerData){
      let answer = +value * answerData;
      console.log(answer.toString().length);
      if(answer.toString().length > 6) {
        answer = +answer.toFixed(6)
      }
     return answer;
    }
    return 'loading...'
  }
  const reversCoin = () => {
    if(currentCoin == 'bitcoin') {
      setCurretCoinTo('btc');
    }
    if(currentCoinTo == 'eth') {
      setCurretCoin('ethereum');
    }
    if(currentCoin == 'ethereum') {
      setCurretCoinTo('eth');
    }
    if(currentCoinTo == 'btc') {
      setCurretCoin('bitcoin');
    }
    if(currentCoin == 'usd') {
      setCurretCoinTo('usd');
    }
    if(currentCoinTo == 'usd') {
      setCurretCoin('usd');
    }
   
  }

  console.log(currentCoin);
  console.log(currentCoinTo);

  useEffect(() => {
    const headers = {
      method: 'GET',
      headers: {'x-cg-demo-api-key': 'CG-Va4qRKx31hn9fZdzsZArmnSi'}};
    fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${currentCoin}&vs_currencies=${currentCoinTo}`, headers)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error(error));  
  }, [currentCoin, currentCoinTo]);

  console.log(data);

  return (
    <>      
    <h1>Выберете валюту для конвертации:</h1>
      <div className='Converter'>
        <div className="ConverterInput">
          <input name="myInput" value={calcValue()} onChange={(e) => {
            setValue(e.target.value)
          }}/>
          <select 
            value={currentCoin}
            onChange={(e) => {
              setCurretCoin(e.target.value)
            }}
          >
            <option value="bitcoin" label='BTC'>Bitcoin</option>
            <option value="ethereum" label='ETH'>Ethereum</option>
            <option value="usd" label='USD'>Usd</option>
          </select>
        </div>
            <button onClick={reversCoin}>swap coins</button>
        <div className="ConverterInput">
          <input name="myInput" value={calcValueTo()}/>
          <select
            value={currentCoinTo}
            onChange={(e) => {
              setCurretCoinTo(e.target.value)
            }}
          >
            <option value="eth" label='ETH'>Ethereum</option>
            <option value="btc" label='BTC'>Bitcoin</option>
            <option value="usd" label='USD'>Usd</option>
          </select>
        </div>
      </div>
      <div>
        <strong>1 {currentCoin} = {calcValueTo()} {currentCoinTo}</strong>
        <p>Данные носят озакомительный характер {now} МСК </p>
      </div>
    </>
  );
}
export default  ComponentTest 

