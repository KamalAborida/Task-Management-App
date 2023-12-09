import React from "react";

const AuthContext = React.createContext({
  userData: {
    name: "",
    img: null
  },
  projectsList: [],
  activeProject: "",
  activeList: "",
  updateTasksContainer: () => {},
  updateApp: () => {}
})

export default AuthContext