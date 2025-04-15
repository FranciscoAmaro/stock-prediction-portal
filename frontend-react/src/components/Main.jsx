import React from 'react'
import Button from './Button'

const Main = () => {
  return (
    <>
    <div className='container'>
        <div className='p-5 text-center bg-light-dark rounded'>
            <h1 className='text-light'>Stock Prediction Portal</h1>
            <p className='text-light lead'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi suscipit ipsa molestias dolore officia veniam earum consequuntur possimus, minus tempora explicabo aliquid ea praesentium necessitatibus dolorem, quas repudiandae saepe sunt?
            </p>
            <Button text='Login' className='btn-outline-info' />
        </div>
    </div>
    </>
  )
}

export default Main