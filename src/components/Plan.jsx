import async from 'filer/lib/async';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { db } from '../firebase';
import { loadStripe } from '@stripe/stripe-js'

function Plan() {
  const [products, setProducts] = useState([]);
  const user = useSelector(selectUser);

  useEffect(() => {
    db.collection("products").where("active", "==", true)
      .get().then(querySnapshot => {
        const products = {}
        querySnapshot.forEach(async productDoc => {
          products[productDoc.id] = productDoc.data();
          const priceSnap = await productDoc.ref.collection('prices')
            .get();
          priceSnap.docs.forEach(price => {
            products[productDoc.id].prices = {
              priceId: price.id,
              priceData: price.data()
            }
          })
        })
        setProducts(products)
      })
  }, [])

  const handleCheckout = async (priceId) => {
    const docRef = await db
      .collection('customers')
      .doc(user.uid)
      .collection('checkout_sessions')
      .add({
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      })
    docRef.onSnapshot(async (snap) => {
      const { error, sessionId } = snap.data();
      if (error) {
        console.log("plan err", error)
      }

      if (sessionId) {
        const stripe = await loadStripe('pk_test_51LQ0ohBeKquJpCIYOHVFeQR22jEHa70BvOx7S7HqxVIFqHFOHl72mpQGhEL4d6doFLEoXg9rdl08ApFNy00cq6Lm00clY24t1N')
        stripe.redirectToCheckout({ sessionId })
      }

    })
  }
  return (
    <div className='plan'>
      {Object.entries(products).map(([productId, productData]) => {
        console.log("productId", productId)
        console.log("productdata", productData)
        return (
          <div className='plan-detail'>
            <div className='plan-info'>
              <h3>{productData.name}</h3>
              <p>{productData.description}</p>
            </div>

            <div>
              <button onClick={() => handleCheckout(productData.prices.priceId)}
                className="plan-button">
                Subscribe
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Plan;