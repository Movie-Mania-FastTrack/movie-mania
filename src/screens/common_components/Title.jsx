import React from 'react'
import Styles from './ScreenLayout.module.css'
import {Input} from 'antd';
const { Search } = Input;

function Title({Text}) {
    
  return (
    <div className={Styles.searchbar}>
    <Search className={Styles.search} placeholder={Text} size="large" />
                                
    </div>
  )
}

export default Title