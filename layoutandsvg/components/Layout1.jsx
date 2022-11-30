const Layout1 = ({ children }) => {
  return (
    <>
      <div className="topnav">
        <a href="#">Link1</a>
        <a href="#">Link2</a>
        <a href="#">Link3</a>
      </div>

      <div className="content">{children}</div>

      <div className="footer">
        <p>footer</p>
      </div>
    </>
  );
};

export default Layout1;
