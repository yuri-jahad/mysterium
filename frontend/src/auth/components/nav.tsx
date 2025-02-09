const Nav = () => {
  return (
    <>
      <header>
        <nav>
          <div className="client-username"></div>
          <input title="test" type="text" />
          <input
            title="select-avatar"
            className="avatar"
            type="file"
            name="avatar"
            id="avatar"
          />
        </nav>
      </header>
    </>
  );
};

export default Nav;
