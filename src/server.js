import http from "node:http"

const users = []

const server = http.createServer((req, res) => {
  const { method, url } = req

  if (method === "POST" && url === "/users"){
    users.push({
      id: 1,
      name: "Thiago",
      email: "thiagocarv4@gmail.com"
    })
    return res.writeHead(201).end()
  }

  if (method === "GET" && url === "/users") {
    res.setHeader("Content-Type", "application/json")
    return res.end(JSON.stringify(users))
  }

  return res.writeHead(404).end()
})

server.listen(3333)