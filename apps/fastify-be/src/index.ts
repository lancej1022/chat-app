import closeWithGrace from "close-with-grace";
import Fastify from "fastify";

const server = Fastify({
  logger: true,
});

server.get("/", function (_request, _reply) {
  // reply.send({ hello: "world" });
  return "hello";
});

server.get("/ping", async (_request, _reply) => {
  return "pong\n";
});
server.get("/ping2", async (_request, _reply) => {
  return "pong2\n";
});

async function init() {
  // Delay is the number of milliseconds for the graceful close to finish
  closeWithGrace(
    {
      delay: process.env.FASTIFY_CLOSE_GRACE_DELAY
        ? Number(process.env.FASTIFY_CLOSE_GRACE_DELAY)
        : 500,
    },
    async ({ err }) => {
      if (err != null) {
        server.log.error(err);
      }

      await server.close();
    },
  );

  await server.ready();

  try {
    await server.listen({
      port: process.env.PORT ? Number(process.env.PORT) : 8080,
    });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

init();
