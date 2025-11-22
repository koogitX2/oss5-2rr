import React, { useEffect, useState } from "react";
import CreateUser from "./CreateUser";
import EditUser from "./EditUser";
import axios from "axios";
import * as bootstrap from 'bootstrap';

const ShowList = () => {
  const mokaUrl = "https://6918349021a96359486f1dee.mockapi.io/api/my_data";
  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editItem, setEditItem] = useState(null);

   const openEditModal = (item) => {
    setEditItem(item);
    setShowEditModal(true);
  };

  const handelDelete = async (id) => {
    if (!window.confirm("삭제하시겠습니까?")) return;
    setIsLoading(true);
    try {
      const response = await fetch(`${mokaUrl}/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("삭제 실패!");
      setUser(user.filter((item) => item.id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    axios
      .get(mokaUrl)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  if (user.length < 0) {
    return <h1>no item</h1>;
  } else {
     return (
    <div className="container mt-5">
      <h2>상품 목록</h2>
      <button className="btn btn-primary mb-3" data-bs-toggle="modal" data-bs-target="#addModal">
        상품 추가
      </button>

      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="row">
        {user.map((item) => (
          <div key={item.id} className="col-md-12 mb-3">
            <div> id: {item.id} </div>
            <div className="d-flex justify-content-between align-items-center">
              <div>{item.name} / {item.price}원 / {item.category}</div>
              <div>
                <button className="btn btn-warning btn-sm me-2" data-bs-toggle="modal" data-bs-target={`#editModal${item.id}`} onClick={() => openEditModal(item)}>수정</button>
                <button className="btn btn-danger btn-sm" onClick={() => handelDelete(item.id)}>삭제</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="modal fade" id="addModal"  tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">상품 추가</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <CreateUser refreshList={getUsers} onClose={() => {
                const m = document.getElementById('addModal');
                const modal = bootstrap.Modal.getOrCreateInstance(m);
                modal.hide(); 
              }} />
            </div>
          </div>
        </div>
      </div>

      {user.map(item => (
        <div key={item.id} className="modal fade" id={`editModal${item.id}`} tabIndex="-1" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">상품 수정</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <EditUser item={item} refreshList={getUsers} onClose={() => {
                  const m = document.getElementById(`editModal${item.id}`);
                  const modal = bootstrap.Modal.getOrCreateInstance(m);
                  modal.hide();
                }} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};}
export default ShowList;