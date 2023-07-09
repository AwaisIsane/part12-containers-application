describe("Blog App", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "Matti Luukkainen",
      username: "mluukkai",
      password: "salainen",
    };
    // cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.createUser(user);
  });

  it("Login form is shown", function () {
    cy.get("[type='submit']").contains("login");
    cy.contains("password");
    cy.contains("username");
  });

  describe("Login test", function () {
    it("succeeds with correct credentials", function () {
      cy.get("input:first").type("mluukkai");
      cy.get("input:last").type("salainen");
      cy.get("[type='submit']").contains("login").click();
      cy.contains("mluukkai");
    });

    it("fails with wrong credentials", function () {
      cy.get("input:first").type("mluukkai");
      cy.get("input:last").type("salainn");
      cy.get("[type='submit']").contains("login").click();
      cy.contains("youre logged in as mluukkai").should("not.exist");
      cy.contains("invalid username or password");
    });
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.login({ username: "mluukkai", password: "salainen" });
    });
    it("A blog can be created", function () {
      cy.contains("addBlog").click();
      cy.get("[name='author']").type("test");
      cy.get("[name='title']").type("adding a blog with cypress");
      cy.get("[name='url']").type("https://fullstackopen.com/");
      cy.contains("create").click();
      cy.contains("adding a blog with cypress");
    });

    // describe("after a single blog is created", function () {
    //   beforeEach(function () {
    //     cy.createBlog({
    //       title: "adding a block with cypress before test",
    //       author: "test1",
    //       url: "https://fullstackopen.com/",
    //       likes: 0,
    //     });
    //   });

    //   it("Users can like a blog", function () {
    //     cy.contains("view").click();
    //     cy.contains("like").click();
    //     cy.contains("Likes:1");
    //   });

    //   it("users who created a blog can delete it", function () {
    //     cy.contains("view").click();
    //     cy.contains("remove").click();
    //     cy.on("window:confirm", (text) => {
    //       expect(text).to.contains("you want to delete blog");
    //       return true;
    //     });
    //     cy.contains("adding a block with cypress before test test1").should(
    //       "not.exist"
    //     );
    //   });

    //   it("other users cant delete blogs", function () {
    //     const user = {
    //       name: "Test User",
    //       username: "testuser",
    //       password: "testuser",
    //     };
    //     cy.createUser(user);
    //     localStorage.removeItem("creds");
    //     cy.login({ username: user.username, password: user.password });
    //     cy.contains("view").click();
    //     cy.contains("remove").should("not.exist");
    //   });
    // });

    // describe("after multiple blogs are created", function () {
    //   beforeEach(function () {
    //     cy.createBlog({
    //       title: "blog with 1 like",
    //       author: "test1",
    //       url: "https://fullstackopen.com/",
    //       likes: 1,
    //     });

    //     cy.createBlog({
    //       title: "blog with 2 likes",
    //       author: "test1",
    //       url: "https://fullstackopen.com/",
    //       likes: 2,
    //     });

    //     cy.createBlog({
    //       title: "blog with 3 likes",
    //       author: "test1",
    //       url: "https://fullstackopen.com/",
    //       likes: 3,
    //     });
    //   });

    //   it("blogs should be sorted b likes", function () {
    //     cy.get(".blog").eq(2).should("contain", "blog with 1 like test1");
    //     cy.get(".blog").eq(1).should("contain", "blog with 2 likes test1");
    //     cy.get(".blog").eq(0).should("contain", "blog with 3 likes test1");
    //   });
    // });
  });
});
