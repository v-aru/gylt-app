// // SignUpForm.js
// import React from 'react';
// import { InputField, EyeButton, LoginButton } from '../../../styles/ProfileStyles';
// import OpenEye from '../../../public/assets/OpenEye';
// import CloseEye from '../../../public/assets/CloseEye';

// const SignUpForm = ({ username, email, password, showPassword, handleInputChange, togglePasswordVisibility, handleSubmit }) => (
//   <form onSubmit={handleSubmit}>
//     <InputField
//       type="text"
//       placeholder="Username"
//       value={username}
//       onChange={(e) => handleInputChange('username', e.target.value)}
//       required
//     />
//     <InputField
//       type="email"
//       placeholder="Email"
//       value={email}
//       onChange={(e) => handleInputChange('email', e.target.value)}
//       required
//     />
//     <div style={{ position: 'relative', width: '100%' }}>
//       <InputField
//         type={showPassword ? "text" : "password"}
//         placeholder="Password"
//         value={password}
//         onChange={(e) => handleInputChange('password', e.target.value)}
//         required
//       />
//       <EyeButton
//         type="button"
//         onClick={togglePasswordVisibility}
//       >
//         {showPassword ? <OpenEye /> : <CloseEye />}
//       </EyeButton>
//     </div>
//     <LoginButton type="submit">Sign Up</LoginButton>
//   </form>
// );

// export default SignUpForm;
