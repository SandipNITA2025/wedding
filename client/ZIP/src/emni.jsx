import React, {useState} from "react";

const BotRegisterForm = () => {

    const [guestName, setGuestName]= useState("")
    const [guestEmail, setGuestEmail]= useState("")

    const formSubmit = (e)=>{
        e.preventDefault();

    }
  return (
    <div>
      <form onSubmit={formSubmit}>
        <input value={guestName} onChange={(e)=>setGuestName(e.target.value)} type="text" placeholder="Name" />
        <input value={guestEmail} onChange={(e)=> setGuestEmail(e.target.value)} type="email" placeholder="Email" />
      </form>
    </div>
  );
};

export default BotRegisterForm;











// import React, { useState, useEffect } from 'react';

// const UserList = () => {
//   const [userList, setUserList] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchUserList();
//   }, []);

//   const fetchUserList = () => {
//     fetch('http://localhost:8500/api/adduser')
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error('Failed to fetch user list');
//         }
//         return response.json();
//       })
//       .then((data) => {
//         setUserList(data.userDetails);
//       })
//       .catch((error) => {
//         setError(error.message);
//       });
//   };

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div className='getbox'>
//       <h2>User List</h2>
//       <ul className='lists'>
//         {userList.map((user) => (
//           <div key={user._id} className="list">
//             <p>Email: {user.guestEmail}</p>
//             <p>Name: {user.guestName}</p>
//             <p>Status: {user.guestStatus ? user.guestStatus : 'not defined'}</p>
//             <p>Invite: {user.inviteType}</p>
//           </div>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default UserList;




// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const App = () => {
//   const [welcomeData, setWelcomeData] = useState(null);
//   const [eventData, setEventData] = useState(null);

//   useEffect(() => {
//     const fetchAPIs = async () => {
//       try {
//         const [welcomeResponse, eventResponse] = await Promise.all([
//           axios.get("http://localhost:8500/api/welcomemessages"),
//           axios.get("http://localhost:8500/api/weddingeventdetails"),
//         ]);

//         console.log("Welcome Data:", welcomeResponse.data);
//         console.log("Event Data:", eventResponse.data);

//         setWelcomeData(welcomeResponse.data);
//         setEventData(eventResponse.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchAPIs();
//   }, []);

//   return (
//     <div>

//     </div>
//   );
// };

// export default App;

