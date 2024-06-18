import React from 'react'
import loading from './Infinity@1x-2.1s-200px-200px.gif'

const Spinner=()=> {
  
    return (
        <div className='text-center'>
            <img style={{width: '100px', paddingTop:'25vh',paddingBottom:'25vh'}} src={loading} alt='loading'/>
        </div>
    )
  
}

export default Spinner