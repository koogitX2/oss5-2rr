import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const Url = "https://6918349021a96359486f1dee.mockapi.io/api/my_data";
  const navigate = useNavigate();

  const [user, setUser] = useState({ name: "", price: "", category: ""});

  const nameRef = useRef();
  const priceRef = useRef();
  const cateRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = async () => {
    if (user.name.trim() === "") return nameRef.current.focus();
    if (user.price.trim() === "") return priceRef.current.focus();

    await fetch(Url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    navigate("/list");
  };
  return (
    <div className="container mt-5">
      <h2>상품 추가</h2>
      <input
        ref={nameRef}
        name="name"
        value={user.name}
        onChange={handleChange}
        placeholder="상품이름"
        className="form-control mb-2"
      />
      <input
        ref={priceRef}
        name="price"
        type="number"
        value={user.price}
        onChange={handleChange}
        placeholder="가격"
        className="form-control mb-2"
      />
      <input
        ref={cateRef}
        name="category"
        value={user.category}
        onChange={handleChange}
        placeholder="분류"
        className="form-control mb-2"
      />
      <button className="btn btn-primary" onClick={handleSubmit}>추가</button>
    </div>
  );
};
export default Create;
