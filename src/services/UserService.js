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

    static baseURL_icebreakerQuestions() {
        return "http://localhost:4000/ice_questions";
    }

    static baseURL_domain() {
        return "http://localhost:4000/domain";
    }

    static baseURL_conversation() {
      return "http://localhost:4000/conversation";
    }

    static baseURL_message() {
      return "http://localhost:4000/message";
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

  static tryregister(user) {
    return new Promise((resolve, reject) => {
      HttpService.post(
        `${UserService.baseURL_auth()}/tryregister`,
        {
          email: Date.now()+"@example.com",
          username: user,
          online: true,
          confirmed: true,
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

    static switchEmployeeFilter(id) {
        return new Promise((resolve, reject) => {
            HttpService.post(
                `${UserService.baseURL_user()}/switchEmployeeFilter`,
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

  static trylogin(user) {
    return new Promise((resolve, reject) => {
      HttpService.post(
        `${UserService.baseURL_auth()}/trylogin`,
        {
          username: user
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

  static getAvailable(id, page) {
    console.log(`${UserService.baseURL_user()}/${id}/available/${page}`);
    return new Promise(async (resolve, reject) => {
      HttpService.get(
        `${UserService.baseURL_user()}/${id}/available/${page}`,
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

    static onlineUser(uID) {
        console.log(`${UserService.baseURL_user()}/${uID}/online`)
        return new Promise((resolve, reject) => {
            HttpService.put(
                `${UserService.baseURL_user()}/${uID}/online`,
                {online_until: Date.now()},
                function (data) {
                    resolve(data);
                },
                function (textStatus) {
                    reject(textStatus);
                }
            );
        });
    }

    static offlineUser(uID) {
        console.log(`${UserService.baseURL_user()}/${uID}/offline`)
        return new Promise((resolve, reject) => {
            HttpService.put(
                `${UserService.baseURL_user()}/${uID}/offline`,
                {online_until: Date.now()},
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

    static addDomain(domain) {
        return new Promise((resolve, reject) => {
            HttpService.post(
                `${UserService.baseURL_domain()}/addDomain`,
                {
                    domain: domain,
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


    static deleteDomain(id) {
        return new Promise((resolve, reject) => {
            HttpService.remove(
                `${UserService.baseURL_domain()}/${id}`,
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

    static registerOrganization(user_id, compname, domainNames) {
        return new Promise((resolve, reject) => {
            HttpService.post(
                `${UserService.baseURL_auth()}/registerOrganization`,
                {
                    user_id: user_id,
                    compname: compname,
                    domainNames: domainNames
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

    static getIcebreakerQuestions() {
        return new Promise(async (resolve, reject) => {
            HttpService.get(
                this.baseURL_icebreakerQuestions(),
                function (data) {
                    resolve(data);
                },
                function (textStatus) {
                    reject(textStatus);
                }
            );
        });
    }

    static getDomains() {
        return new Promise(async (resolve, reject) => {
            HttpService.get(
                this.baseURL_domain(),
                function (data) {
                    resolve(data);
                },
                function (textStatus) {
                    reject(textStatus);
                }
            );
        });
    }

    static getUserDomains(user_id) {
        return new Promise(async (resolve, reject) => {
            HttpService.post(
                "http://localhost:4000/domain/getUserDomains",
                {
                    user_id: user_id,
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

    static getDomain(id) {
        return new Promise(async (resolve, reject) => {
            HttpService.get(
                `${UserService.baseURL_domain()}/${id}`,
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

    static addConversation(senderId, receiverId) {
      return new Promise((resolve, reject) => {
        HttpService.post(
          `${UserService.baseURL_conversation()}`,
          {
            senderId: senderId,
            receiverId: receiverId,
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

    static getUserConversation(userId) {
      return new Promise(async (resolve, reject) => {
        HttpService.get(
          `${UserService.baseURL_conversation()}/${userId}`,
          function (data) {
            if (data !== undefined || Object.keys(data).length !== 0) {
              resolve(data);
            } else {
              reject("Error while retrieving conversation of user");
            }
          },
          function (textStatus) {
            reject(textStatus);
          }
        );
      });
    }

    static getConversation(firstUserId, secondUserId) {
      return new Promise(async (resolve, reject) => {
        HttpService.get(
          `${UserService.baseURL_conversation()}/find/${firstUserId}/${secondUserId}`,
          function (data) {
            if (data !== undefined || Object.keys(data).length !== 0) {
              resolve(data);
            } else {
              reject("Error while retrieving conversation of two user");
            }
          },
          function (textStatus) {
            reject(textStatus);
          }
        );
      });
    }

    static deleteConversation(id) {
      return new Promise((resolve, reject) => {
        HttpService.remove(
          `${UserService.baseURL_conversation()}/${id}`,
          function (data) {
            if (data.message !== undefined) {
              resolve(data.message);
            } else {
              reject("Error while deleting conversation");
            }
          },
          function (textStatus) {
            reject(textStatus);
          }
        );
      });
    }

    static addMessage(conversationId, sender, text) {
      return new Promise((resolve, reject) => {
        HttpService.post(
          `${UserService.baseURL_message()}`,
          {
            conversationId: conversationId,
            sender: sender,
            text: text,
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

    static getMessage(conversationId) {
      return new Promise(async (resolve, reject) => {
        HttpService.get(
          `${UserService.baseURL_message()}/${conversationId}`,
          function (data) {
            if (data !== undefined || Object.keys(data).length !== 0) {
              resolve(data);
            } else {
              reject("Error while retrieving messages of conversation");
            }
          },
          function (textStatus) {
            reject(textStatus);
          }
        );
      });
    }
}
