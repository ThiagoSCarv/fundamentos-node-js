import http from "node:http"

const users = []

const server = http.createServer(async (req, res) => {
  const { method, url } = req

  const buffers = []

  for await (const chunk of req) {
    buffers.push(chunk)
  }

  try {
    req.body = JSON.parse(Buffer.concat(buffers).toString())
  } catch {
    req.body = null
  }

  if (method === "POST" && url === "/users"){

    const {name, email} = req.body

    users.push({
      id: 1,
      name,
      email, 
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