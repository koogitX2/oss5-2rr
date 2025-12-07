import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const List = () => {
  const Url = "https://6918349021a96359486f1dee.mockapi.io/api/my_data";
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get(Url).then((res) => setItems(res.data));
  }, []);

  const handleChange = async (id) => {
    if (!window.confirm("삭제할까요??")) return;

    await fetch(`${Url}/${id}`, { method: "DELETE" });
    setItems(items.filter((i) => i.id !== id));
  };

  return (
    <div className="container mt-5">
      <h2>상품 목록 </h2>

      <Link to="/create" className="btn btn-primary">상품 추가.</Link>

      {items.map((item) => (
        <div key={item.id} className="border p-2 mb-3">
          <div>ID: {item.id}</div>

          <div className="d-flex justify-content-between">
            <div>
              <Link to={`/detail/${item.id}`}>{item.name}</Link>
              {" / "}
              {item.price}원 / {item.category}
            </div>
            <div>
              <Link to={`/update/${item.id}`} className="btn btn-warning btn-sm">수정 </Link>
              <button className="btn btn-danger btn-sm" onClick={() => handleChange(item.id)}>삭제</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default List;
