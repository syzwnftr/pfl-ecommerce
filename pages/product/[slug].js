import React from 'react';
import { client, urlFor } from '../../lib/client';

const ProductDetail = ({ product, products }) => {
    const { image, name, details, price } = product;
    return (
        <div>
            <div className='product-detail-container'>
                <div className='image-container'>
                    <img src={urlFor(image && image[0])}/>
                </div>
            </div> 
        </div>
    )
}

export const getStaticPaths = async () => {
    const query = `*[_type == "product"] {
        slug {
            current
        }
    }`;

    const products = await client.fetch(query);
    
    const paths = products.map(product => {
        return (
            {
                params: {
                    slug: product.slug.current
                }
            }
        )
    });

    return {
        paths,
        fallback: 'blocking'
    }
}

export const getStaticProps = async ({ params: { slug } }) => {
    const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
    const productQuery = '*[_type == "product"]';
    const product = await client.fetch(query);
    const products = await client.fetch(productQuery);
    
    return {
        props: { product, products }
    }
}

export default ProductDetail;