import React, { useEffect } from 'react';
import Link from 'next/link';
import { BsBagCheckFill } from 'react-icons/bs';
import { useRouter } from 'next/router';

import { useStateContext } from '../context/StateContext';

import { runFireworks } from '../lib/utils';

const Success = () => {
    const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();

    useEffect(() => {
        localStorage.clear();
        setCartItems([]);
        setTotalQuantities(0);
        setTotalPrice(0);
        runFireworks();
    }, []);

    return (
        <div className='success-wrapper'>
            <div className='success'>
                <p className='icon'>
                    <BsBagCheckFill />
                </p>
                <h2>Thank you for your order!</h2>
                <p className='email-msg'>Kindly check your email for the receipt.</p>
                <p className='description'>
                    If you have anything to ask, please email
                    <a className='email' href='mailto:order@example.com'>
                        order@example.com
                    </a>
                </p>
                <Link href='/'>
                    <button type='button' width='300px' className='btn'>
                        Continue Shopping
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default Success;