import Link from 'next/link'
import { useEffect, useState } from 'react'
import pagarme from 'pagarme';



export default function Home() {
  const [cardNumber, setCardNumber] = useState('')
  const [expirationDate, setExpirationDate] = useState('')
  const [cvc, setCvc] = useState('')
  const [holderName, setHolderName] = useState('')
  const [hash, setHash] = useState('')
  const [buttonText, setButtonText] = useState('gerar')

  // useEffect(() => {
  //   console.log('hashGerada', CCHashed(number, card_holder_name, card_expiration_date, cvc))
  //   //! card_expiration_date = segue o padão de ddmm apenas numeros
  // }, [])

  const CCHashed = async (number, card_holder_name, card_expiration_date, cvc) => {
    let client = await pagarme.client.connect({
      encryption_key: process.env.REACT_APP_ENCRYPTION_PAGARME,
    });
    let card_hash = await client.security.encrypt({
      card_number: number,
      card_holder_name: card_holder_name,
      card_expiration_date: card_expiration_date,
      card_cvv: cvc,
    });

    return card_hash
  }

  const handleCreateCard = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setButtonText('gerando...')
    CCHashed(cardNumber, holderName, expirationDate, cvc).then(e => { setHash(e), setButtonText('gerar') })
  }

  return (
    <div>
      Gerador de Hash
      <form action="" onSubmit={handleCreateCard}>
        <br />
        <label htmlFor="holderName">Holder Name</label>
        <br />
        <input type="text" name="holderName" placeholder="Holder Name" value={holderName} onChange={(e) => setHolderName(e.target.value)} />
        <br />
        <br />
        <label htmlFor="Cardnumber">Card Number</label>
        <br />
        <input type="text" name="Cardnumber" placeholder="Card Number" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
        <br />
        <br />
        <label htmlFor="Expiration">Expiration Date without /</label>
        <br />
        <input type="text" name="Expiration" placeholder="Expiration Date" value={expirationDate} onChange={(e) => setExpirationDate(e.target.value)} />
        <br />
        <br />
        <label htmlFor="cvc">cvc</label>
        <br />
        <input type="text" name="cvc" placeholder="cvc" value={cvc} onChange={(e) => setCvc(e.target.value)} />
        <br />
        <br />
        <button type="submit">{buttonText}</button>
      </form>
      <br />
      <br />
      <code>{!!hash ? hash : 'aguardando geração do hash'}</code>
    </div>
  )
}
