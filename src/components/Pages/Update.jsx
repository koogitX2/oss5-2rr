import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";


const Update = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const Url = "https://6918349021a96359486f1dee.mockapi.io/api/my_data";
    const [count, ccount] = useState(0);
    const [user, setUser] = useState({ name: "", price: "", category: ""});
    const nameRef = useRef();
    const priceRef = useRef();
    const cateRef = useRef();

    useEffect(() => {
        fetch(`${Url}/${id}`)
            .then((res) => res.json())
            .then((data) => setUser(data));
            ccount(0);
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        const newUser = { ...user, [name]: value };
        setUser(newUser);

        fetch(`${Url}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUser),
        });
        ccount(cc => cc+1);
    };
    const handleSubmit = () => {
    navigate("/list");
  };

    return (
        <div className="container mt-5">
            <h2>상품 수정</h2>
            <h3>상품 수정 횟수: {count}</h3>
            <input
                ref={nameRef}
                name="name"
                value={user.name}
                onChange={handleChange}
                className="form-control mb-2"
            />
            <input
                ref={priceRef}
                name="price"
                type="number"
                value={user.price}
                onChange={handleChange}
                className="form-control mb-2"
            />
            <input
                ref={cateRef}
                name="category"
                value={user.category}
                onChange={handleChange}
                className="form-control mb-3"
            />
            <button className="btn btn-primary" onClick={handleSubmit}>완료</button>
        </div>
    );
};
export default Update;
