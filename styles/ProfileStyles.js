import styled from "styled-components";

export const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f4;
`;

export const ProfileCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 350px;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  }
`;

export const ProfileImageWrapper = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 2px solid #e0e0e0;
  overflow: hidden;
  position: relative;
`;

export const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  overflow: hidden;
  transform: scale(1.9); 
  // transition: transform 0.3s ease;
`;

export const ProfileDetails = styled.div`
  text-align: center;
  margin-top: 10px;
  width: 80%;
  display: flex;
  align-self: center;
  flex-direction: column;
`;

export const ProfileName = styled.h2`
  margin: 10px 0;
  font-size: 24px;
  color: #333;
`;

export const ProfileEmail = styled.p`
  font-size: 16px;
  color: gray;
`;

export const SignInOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
`;

export const SignInButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 12px;
  background-color: #F5F5F7;
  color: black;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #BED7DC;
  }
`;

export const Icon = styled.img`
  width: 20px;
  height: 20px;
`;

export const SignOutButton = styled.button`
  padding: 12px;
  background-color: #ff0000;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;

  &:hover {
    background-color: #cc0000;
  }
`;

export const UserInfo = styled.div`
  text-align: center;
  margin-top: 10px;

  p {
    margin: 5px 0;
    color: #666;
  }

  strong {
    color: #333;
  }
`;

export const EditButton = styled.button`
  background-color: #1d267d;
  color: white;
  border: none;
  font-size: 16px;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  margin-right: 5px;
`;

export const SaveButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
`;

export const InputField = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  position: relative;
  left: -10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  transition: border 0.3s;

  &:focus {
    border: 1px solid #1d267d;
  }
`;

export const LoginButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
  padding: 8px 16px;
  background-color: #F5F5F7;
  color: black;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #BED7DC;
  }
`;

export const EyeButton = styled.button`
  position: absolute;
  right: -5px;
  top: 60%;
  padding: 0;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: gray;
  display: flex;
  align-content: center;
  justify-content: center;
`;

export const NewAccount = styled.div`
  text-align: center;
  margin-top: 20px;
  font-size: 16px;

  a {
    cursor: pointer;
    color: #007bff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;