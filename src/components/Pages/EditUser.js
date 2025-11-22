import React, { useState } from "react";

const EditUser = ({ item, onClose, refreshList }) => {
  const mokaUrl = "https://6918349021a96359486f1dee.mockapi.io/api/my_data";

  const [user, setUser] = useState({ ...item });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handelInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${mokaUrl}/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      if (!response.ok) throw new Error("수정 실패!");
      if (refreshList) refreshList();
      if (onClose) onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal-body">
      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form>
        <div>
          <label className="form-label">Id</label>
          <input name="id" value={user.id} onChange={handelInput} readOnly placeholder="새로운 ID"/>
        </div>
        <div>
          <label className="form-label">상품명</label>
          <input name="name" value={user.name} onChange={handelInput} placeholder="새로운 상품명"/>
        </div>

        <div>
          <label className="form-label">가격</label>
          <input name="price" type="number" value={user.price} onChange={handelInput} placeholder="새로운 가격" />
        </div>
        <div>
          <label className="form-label">카테고리</label>
          <input name="category" value={user.category} onChange={handelInput} placeholder="새로운 카테고리"/>
        </div>
        <div>
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={onClose}> 닫기</button>
          <button type="button" className="btn btn-primary"  data-bs-dismiss="modal" onClick={handleSubmit}>수정 </button>
        </div>
      </form>
    </div>
  );
};
export default EditUser;