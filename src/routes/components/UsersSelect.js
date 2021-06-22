import React from "react";
import "./UsersSelect.css";

function UsersSelect(props) {
  const {
    pid,
    members,
    users,
    selectUser,
    unselectUser,
    selectUserAll,
    unselectUserAll,
    popupUsersSelect,
  } = props;
  console.log("UsersSelect", users);

  return (
    <div>
      {/* 배경 눌러서 Modal 닫기 */}
      <div className="unclick" onClick={() => popupUsersSelect(-1)} />
      {/* Modal */}
      <div className="users_select">
        {members.length === users.length ? (
          <button onClick={() => unselectUserAll(pid)}>전체해제</button>
        ) : (
          <button onClick={() => selectUserAll(pid)}>전체선택</button>
        )}
        {members.map((member) =>
          users[member.id] ? (
            <button
              key={member.id}
              onClick={() => unselectUser(pid, member.id)}
            >
              선택됨
            </button>
          ) : (
            <button key={member.id} onClick={() => selectUser(pid, member.id)}>
              {member.name}
            </button>
          )
        )}
      </div>
    </div>
  );
}

export default UsersSelect;
