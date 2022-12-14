import HttpService from "./HttpService";

export default class UserService {
  static baseURL_auth() {
    return "http://localhost:4000/auth";
  }

  static baseURL_user() {
    return "http://localhost:4000/user";
  }

    static baseURL_organization() {
        return "http://localhost:4000/organization";
    }

    static baseURL_interests() {
        return "http://localhost:4000/interests";
    }

    static baseURL_match() {
      return "http://localhost:4000/match";
  }

  static register(email, user, pass, isAdmin, compname, domains) {
    return new Promise((resolve, reject) => {
      HttpService.post(
        `${UserService.baseURL_auth()}/register`,
        {
          email: email,
          username: user,
          password: pass,
          isAdmin: isAdmin,
          compname: compname,
          domains: domains,
        },
        function (data) {
          resolve(data);
        },
        function (textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static confirm(id) {
    return new Promise((resolve, reject) => {
      HttpService.post(
        `${UserService.baseURL_auth()}/confirm`,
        {
          id: id,
        },
        function (data) {
          resolve(data);
        },
        function (textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static login(user, pass) {
    return new Promise((resolve, reject) => {
      HttpService.post(
        `${UserService.baseURL_auth()}/login`,
        {
          username: user,
          password: pass,
        },
        function (data) {
          resolve(data);
        },
        function (textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static logout() {
    window.localStorage.removeItem("jwtToken");
  }

  static getUser(id) {
    return new Promise(async (resolve, reject) => {
      HttpService.get(
        `${UserService.baseURL_user()}/${id}`,
        function (data) {
          if (data !== undefined || Object.keys(data).length !== 0) {
            resolve(data);
          } else {
            reject("Error while retrieving user");
          }
        },
        function (textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static deleteUser(id) {
    return new Promise((resolve, reject) => {
      HttpService.remove(
        `${UserService.baseURL_user()}/${id}`,
        function (data) {
          if (data.message !== undefined) {
            resolve(data.message);
          } else {
            reject("Error while deleting");
          }
        },
        function (textStatus) {
          reject(textStatus);
        }
      );
    });
  }


    static updateUser(user) {
        return new Promise((resolve, reject) => {
            HttpService.put(
                `${UserService.baseURL_user()}/${user._id}`,
                user,
                function (data) {
                    resolve(data);
                },
                function (textStatus) {
                    reject(textStatus);
                }
            );
        });
    }

    static updateOrganization(organization) {
        return new Promise((resolve, reject) => {
            HttpService.put(
                `${UserService.baseURL_organization()}/${organization._id}`,
                organization,
                function (data) {
                    resolve(data);
                },
                function (textStatus) {
                    reject(textStatus);
                }
            );
        });
    }

    static deleteOrganization(id) {
        return new Promise((resolve, reject) => {
            HttpService.remove(
                `${UserService.baseURL_organization()}/${id}`,
                function (data) {
                    if (data.message !== undefined) {
                        resolve(data.message);
                    } else {
                        reject("Error while deleting");
                    }
                },
                function (textStatus) {
                    reject(textStatus);
                }
            );
        });
    }

    static getOrganization(id) {
        return new Promise(async (resolve, reject) => {
            HttpService.get(
                `${UserService.baseURL_organization()}/${id}`,
                function (data) {
                    if (data !== undefined || Object.keys(data).length !== 0) {
                        resolve(data);
                    } else {
                        reject("Error while retrieving user");
                    }
                },
                function (textStatus) {
                    reject(textStatus);
                }
            );
        });
    }

    static registerOrganization(user_id, compname, domains) {
        return new Promise((resolve, reject) => {
            HttpService.post(
                `${UserService.baseURL_auth()}/registerOrganization`,
                {
                    user_id: user_id,
                    compname: compname,
                    domains: domains
                },
                function (data) {
                    resolve(data);
                },
                function (textStatus) {
                    reject(textStatus);
                }
            );
        });
    }

    static getInterests() {
        return new Promise(async (resolve, reject) => {
            HttpService.get(
                this.baseURL_interests(),
                function (data) {
                    resolve(data);
                },
                function (textStatus) {
                    reject(textStatus);
                }
            );
        });
    }

    static deleteMatch(matchId) {
      return new Promise((resolve, reject) => {
        HttpService.remove(
          `${UserService.baseURL_match()}/${matchId}`,
          function (data) {
            if (data.message !== undefined) {
              resolve(data.message);
            } else {
              reject("Error while deleting match");
            }
          },
          function (textStatus) {
            reject(textStatus);
          }
        );
      });
    }

    // Get last matches of user for Messenger View
    static getLastMatches(userId) {
      return new Promise(async (resolve, reject) => {
        HttpService.get(
          `${UserService.baseURL_match()}/last/${userId}`,
          function (data) {
            if (data !== undefined || Object.keys(data).length !== 0) {
              resolve(data);
            } else {
              reject("Error while retrieving last matches of user");
            }
          },
          function (textStatus) {
            reject(textStatus);
          }
        );
      });
    }
}
