// // SignInForm.js
// import React from 'react';
// import { InputField, EyeButton, LoginButton } from '../../../styles/ProfileStyles';
// import OpenEye from '../../../public/assets/OpenEye';
// import CloseEye from '../../../public/assets/CloseEye';

// const SignInForm = ({ email, password, showPassword, handleInputChange, togglePasswordVisibility, handleSubmit }) => (
//   <form onSubmit={handleSubmit} style={{ width: '80%'}}>
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
//     <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%', position: 'relative', right: '-10px' }}>
//         <LoginButton type="submit">Sign In</LoginButton>
//     </div>
//   </form>
// );

// export default SignInForm;
