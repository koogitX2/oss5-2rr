import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Detail = () => {
  const { id } = useParams();
  const Url = "https://6918349021a96359486f1dee.mockapi.io/api/my_data";

  const [item, setItem] = useState(null);

  useEffect(() => {
    fetch(`${Url}/${id}`)
      .then((res) => res.json())
      .then((data) => setItem(data));
  }, [id]);

  if (!item) return <p>Loading...</p>;
  return (
    <div className="container mt-5">
      <h2>상품 상세</h2>
      <p>ID:{item.id}</p>
      <p>상품명: {item.name}</p>
      <p>가격: {item.price}</p>
      <p>카테고리: {item.category}</p>
      <Link to={`/update/${item.id}`} className="btn btn-primary">수정</Link>
      <Link to="/list" className="btn btn-danger">목록</Link>
    </div>
  );
};
export default Detail;

