import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories, fillProducts } from "../../feauturs/storeReducer";
import Loading from "../Loading";
import { FetchProducts } from "../../functions/products";

function Category({ page, setTotalProduct, setPage }) {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const categories = useSelector((state) => state.storeReducer.categories);

  useEffect(() => {
    if (categories.length > 0) {
      setSelectedCategory(0);
      handelFetchProducts(1, page);
    }
  }, [categories]);
    
  useEffect(() => {
    handelFetchProducts(selectedCategory + 1, page);
  }, [page]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handelFetchProducts = async (catID, p) => {
    const res = await FetchProducts(catID, p);
    setTotalProduct(res.total_product);
    dispatch(fillProducts(res.data));
  };

  const handleCategoryClick = (index) => {
    setSelectedCategory(index === selectedCategory ? null : index);
    handelFetchProducts(index + 1, page);
    setPage(0);
  };

  return (
    <div className="cateroiesContainer col-2 d-flex flex-column justify-content-center p-5">
      <h2 className="cateroiesContainer--header">Categories</h2>
      {categories.length > 0 ? (
        categories.map((category, index) => (
          <p
            key={category.CatId}
            className={
              selectedCategory === index ? "cateroiesContainer__changeBg" : ""
            }
            onClick={() => handleCategoryClick(index)}
          >
            {category.CatName}
          </p>
        ))
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default Category;
