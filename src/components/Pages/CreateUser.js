import React, { useState } from 'react'

const CreateUser = ({ onClose, refreshList}) => {

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState({ name: "", price: "", category: "" });

    const hande1Input = (event) => {
        const { name, value } = event.target;
        console.log(name, value)
        setUser({ ...user, [name]: value });
    }

    const handelSubmit = async () => {
        console.log(user)
        try {
            setIsLoading(true);
            const response = await fetch("https://6918349021a96359486f1dee.mockapi.io/api/my_data", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            if (response.ok) {
                console.log('성공!');
                setUser({ name: "", price: "", category: "" })
                if (refreshList) refreshList();
                if (onClose) onClose();
            } else {
                console.error('실패!');
            }

        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <div className="modal-body">
            {isLoading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            <div>
            <input
                name="name" value={user.name} onChange={hande1Input} placeholder="상품명" />
                </div>
                <div>
            <input
                name="price" type="number" value={user.price} onChange={hande1Input} placeholder="가격"/>
                 </div>
                    <div>
            <input name="category" value={user.category} onChange={hande1Input} placeholder="카테고리" />
            </div>
            <button type="button" className="btn btn-primary"  data-bs-dismiss="modal"onClick={handelSubmit}>추가</button>
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={onClose}>닫기</button>
        </div>
    );
}
export default CreateUser