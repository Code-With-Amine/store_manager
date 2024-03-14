import React from "react";
import { useSelector } from "react-redux";
import { TiDelete } from "react-icons/ti";
import { FaRegEdit } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";

function Products({ setPage, page, totalProduct }) {
  const products = useSelector((state) => state.storeReducer.products);
  const iconStyle = {
    width: "33px",
    height: "33px",
  };
  const paginationLimite = Math.round(totalProduct / 3 );
  const paginationContent = [ page + 1 , '...' ,paginationLimite]
  const next = () => setPage((oldVal) => oldVal + 1);
  const prevouis = () => setPage((oldVal) => oldVal != 0 && oldVal - 1);
  return (
    <div>
      {products.length > 0 ? (
        <div>
          <table className="table table-striped table-dark">
            <thead>
              <tr>
                <th>Reference</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.ref}>
                  <td>{product.ref}</td>
                  <td>{product.ProdName}</td>
                  <td>{product.price}</td>
                  <td>{product.Qte}</td>
                  <td>
                    <FaEye style={iconStyle} />
                  </td>
                  <td>
                    <FaRegEdit style={iconStyle} />
                  </td>
                  <td>
                    <TiDelete style={{ color: "red", ...iconStyle }} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p> no products </p>
      )}

    <div className="d-flex gap-2 w-25">
        <button className="btn btn-light" disabled={page === 0} onClick={prevouis} >
        <FaAngleLeft />
        </button>
          <>
              {paginationContent.map((content, key) => (
                          <span className="bg-warning p-3 text-dark"> {content} </span>  
              ) )}
          </>      
        <button className="btn btn-light" onClick={next} disabled={page + 1 === paginationLimite}>
        <FaAngleRight />
        </button>
      </div>
    </div>
  );
}

export default Products;
