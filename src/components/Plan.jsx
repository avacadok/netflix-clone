import async from 'filer/lib/async';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { db } from '../firebase';
import { loadStripe } from '@stripe/stripe-js'

function Plan() {
  const [products, setProducts] = useState([]);
  const user = useSelector(selectUser);
  const [subscription, setSubscription] = useState('');

  useEffect(() => {
    db.collection('customers')
      .doc(user.uid)
      .collection('subscriptions')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(async subscription => {
          setSubscription({
            role: subscription.data().role,
            current_period_start: subscription.data().current_period_start.seconds,
            current_period_end: subscription.data().current_period_end.seconds,
          })
        })
      })
  }, [user.uid])

  console.log("sub", subscription)

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
      {subscription && <p className='renewal-date'>Renewal Date: {new Date(subscription?.current_period_end * 1000).toLocaleDateString()}</p>}
      {Object.entries(products).map(([productId, productData]) => {
        const currentPackage = productData.name.toLowerCase().includes(subscription?.role)
        return (
          <div key={productId} 
          className={` ${currentPackage && 'current-plan'} plan-detail`}>
            <div className='plan-info'>
              <h3>{productData.name}</h3>
              <p>{productData.description}</p>
            </div>

            <div>
              <button onClick={() => !currentPackage && handleCheckout(productData.prices.priceId)}
                className="plan-button">
                {currentPackage ? 'Current Package' : 'Subscribe'}
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Plan;