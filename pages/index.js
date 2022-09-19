import React from 'react';

import { client } from '../lib/client';
import { Product, FooterBanner, HeroBanner } from '../components';

const Home = ({ product, bannerData }) => {
  console.log(bannerData)
  return (
    <>
      <HeroBanner heroBanner = {bannerData.length && bannerData[0]}/>
      
      <div className='products-heading'>
          <h2>Best selling product</h2>
          <p>Speaker of many variations</p>
      </div>

      <div className='products-container'>
        {
          product?.map(product => {
            return <Product key={product.id} product={product} />;
          })
        }
      </div>

      <FooterBanner  footerBanner={bannerData && bannerData[0]}/>
    </>
  )
}

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const product = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { product, bannerData }
  }
}

export default Home;