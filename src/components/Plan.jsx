import async from 'filer/lib/async';
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';

function Plan() {
  const [products, setProducts] = useState([]);

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
  console.log(products)
  return (
    <div className='plan'>
      {Object.entries(products).map((product, index) => {
        console.log("product", product[1].name)
        console.log("productdata", index)
        return (
          <div className='plan-detail'>
            <div className='plan-info'>
              <h3>{product[1].name}</h3>
              <p>{product[1].description}</p>
            </div>

            <button>
              Subscribe
            </button>
          </div>
        )
      })}
    </div>
  )
}

export default Plan;