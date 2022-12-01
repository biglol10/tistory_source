const Login = () => {
  return (
    <div>
      <h1>This is login page</h1>

      <br />

      <label htmlFor="inputId">아이디</label>
      <input id="inputId" value={""} />

      <br />

      <label htmlFor="password">비밀번호</label>
      <input id="password" value={""} />
    </div>
  );
};

export default Login;
