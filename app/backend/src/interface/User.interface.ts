interface UserInterface {
  id: number;
  username: string,
  role: string,
  email: string,
  password: string,
}

interface UserVerifyToken {
  user: {
    id: number;
    username: string,
    role: string,
    email: string,
    password: string,
  };
}

export { UserInterface, UserVerifyToken };
