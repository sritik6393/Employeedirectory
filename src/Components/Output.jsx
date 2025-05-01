import React from 'react';

function Output({ users }) {
  return (
    <div className="mt-6">
      {users.length > 0 ? (
        users.map((user) => (
          <div key={user.id} className="border-b py-2 px-4">
            <p>{user.firstName} {user.lastName}</p>
          </div>
        ))
      ) : (
        <p className="text-center">No users found</p>
      )}
    </div>
  );
}

export default Output;
