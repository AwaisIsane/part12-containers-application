const sortByLikes = (a, b) => (a.likes > b.likes ? -1 : 1);

const getToken = () => JSON.parse(localStorage.getItem("creds"));

export { sortByLikes, getToken };
