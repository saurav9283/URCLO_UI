import React, { useEffect, useState } from 'react'
import Carpenter from './Carpenter'
import { getMasterCategory } from '../../data/Api'
import axios from 'axios'
import { setCategories } from '../../slice/categorySlice';
import { useDispatch } from 'react-redux';

const MainCarpenter = () => {
  const dispatch = useDispatch();
  
  const getMasterCategoryList = async () => {
    const response = await axios.get(getMasterCategory)
      if (response.status === 200) {
        // setMasterCat(response.data)
        dispatch(setCategories(response.data))
      // setMasterCat(response.data)
    }
  }

  useEffect(() => {
    getMasterCategoryList();
  }, [dispatch]);
  
  return (
    <>
      <Carpenter />
    </>
  )
}

export default MainCarpenter