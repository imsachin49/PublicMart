import React, { useEffect, useRef, useState } from "react";
import "./Products.css";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { publicRequest } from "../../requestMethods";
import Product from "./Product";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import SectionSubtitle from "../section-subtitle/SectionSubtitle";

const Products = () => {
  const [products, setProduts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const productsRef = useRef();

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const res = await publicRequest.get(`/products?page=${page}&limit=7`);
        setProduts(res.data.paginatedProducts);
        setTotal(res.data.total);
        console.log(res.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, [page]);

  const handleChange = (e, value) => {
    setPage(value);
    productsRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const totalPage = Math.ceil(total / 7);

  return (
    <div ref={productsRef} id="new">
      <SectionSubtitle subtitle="Our Latest Top Collections" />
      <div className="pKacategories" style={{ backgroundColor: "white" }}>
        {!loading ? (
          <div className="pKawrapper">
            {products.map((item, index) => {
              return <Product item={item} index={index} />;
            })}
          </div>
        ) : (
          <div className="pKawrapper">
            {[1, 2, 3, 4, 5, 6, 7].map((item, index) => {
              return (
                <div style={{ margin: "10px" }}>
                  <Skeleton height={200} width={250} />
                </div>
              );
            })}
          </div>
        )}
      </div>
      {!loading && (
        <div className="pagination">
          <Stack spacing={2}>
            <Pagination
              defaultPage={page}
              count={totalPage}
              variant="outlined"
              shape="rounded"
              color="secondary"
              onChange={handleChange}
            />
          </Stack>
        </div>
      )}
    </div>
  );
};

export default Products;
