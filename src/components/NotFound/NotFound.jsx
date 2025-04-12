import React from 'react'
import styles from './NotFound.module.css';
import notFound from '../../Assets/error_404.gif'
export default function NotFound() {
  return <>
<div className="parent d-flex justify-content-center">
<img src={notFound} alt="not found 404" className='w-50' style={{height : '80vh'}} />
</div>
    </>
}
