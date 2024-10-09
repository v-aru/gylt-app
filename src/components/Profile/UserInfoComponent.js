
// // UserInfoComponent.js
// import React from 'react';
// import { UserInfo } from '../../../styles/ProfileStyles';

// const UserInfoComponent = ({ username, age, gender, dob, city, isEditing, handleInputChange }) => {
//   return !isEditing ? (
//     <UserInfo>
//       <p><strong>Username:</strong> {username || "Not set"}</p>
//       <p><strong>Age:</strong> {age || "Not set"}</p>
//       <p><strong>Gender:</strong> {gender || "Not set"}</p>
//       <p><strong>Date of Birth:</strong> {dob || "Not set"}</p>
//       <p><strong>City:</strong> {city || "Not set"}</p>
//     </UserInfo>
//   ) : (
//     <>
//       <input type="text" placeholder="Enter username" value={username} onChange={e => handleInputChange('username', e.target.value)} />
//       <input type="number" placeholder="Enter your age" value={age} onChange={e => handleInputChange('age', e.target.value)} />
//       <input type="text" placeholder="Enter your gender" value={gender} onChange={e => handleInputChange('gender', e.target.value)} />
//       <input type="date" placeholder="Enter your date of birth" value={dob} onChange={e => handleInputChange('dob', e.target.value)} />
//       <input type="text" placeholder="Enter your city" value={city} onChange={e => handleInputChange('city', e.target.value)} />
//     </>
//   );
// };

// export default UserInfoComponent;
