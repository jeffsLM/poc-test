import Link from 'next/link'
import { useEffect } from 'react'
import pagarme from 'pagarme';



export default function Home() {

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

  return (
    <div>
      Gerador de Hash
      <form action="">
        <label htmlFor="holderName">Holder Name</label>
        <input type="text" name="holderName" placeholder="Holder Name" />
        <br />
        <label htmlFor="Cardnumber">Card Number</label>
        <input type="text" name="Cardnumber" placeholder="Card Number" />
        <br />
        <label htmlFor="Expiration">Expiration Date</label>
        <input type="text" name="Expiration" placeholder="Expiration Date" />
        <br />
        <label htmlFor="cvc">cvc</label>
        <input type="text" name="cvc" placeholder="cvc" />

      </form>
    </div>
  )
}
