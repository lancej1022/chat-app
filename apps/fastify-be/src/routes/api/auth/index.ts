import {
  FastifyPluginAsyncTypebox,
  // Type,
} from "@fastify/type-provider-typebox";

// import { CredentialsSchema } from "../../../schemas/auth.js";

import { auth } from "../../../lib/auth.js"; // Your configured Better Auth instance

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  // const { usersRepository, passwordManager } = fastify;
  fastify.route({
    method: ["GET", "POST"],
    url: "/auth/*", // TODO: does this need to be `/api/auth/*`?
    async handler(request, reply) {
      try {
        // Construct request URL
        const url = new URL(request.url, `http://${request.headers.host}`);

        // Convert Fastify headers to standard Headers object
        const headers = new Headers();
        Object.entries(request.headers).forEach(([key, value]) => {
          if (value) headers.append(key, value.toString());
        });

        // Create Fetch API-compatible request
        const req = new Request(url.toString(), {
          method: request.method,
          headers,
          body: request.body ? JSON.stringify(request.body) : undefined,
        });

        // Process authentication request
        const response = await auth.handler(req);

        // Forward response to client
        reply.status(response.status);
        response.headers.forEach((value: string, key: string) =>
          reply.header(key, value),
        );
        reply.send(response.body ? await response.text() : null);
      } catch (error) {
        fastify.log.error("Authentication Error:", error);
        reply.status(500).send({
          error: "Internal authentication error",
          code: "AUTH_FAILURE",
        });
      }
    },
    // {
    //   schema: {
    //     body: CredentialsSchema,
    //     response: {
    //       200: Type.Object({
    //         success: Type.Boolean(),
    //         message: Type.Optional(Type.String()),
    //       }),
    //       401: Type.Object({
    //         message: Type.String(),
    //       }),
    //     },
    //     tags: ["Authentication"],
    //   },
    // },
    // async function (request, reply) {
    //   const { email, password } = request.body;

    //   return fastify.knex.transaction(async (trx) => {
    //     const user = await usersRepository.findByEmail(email, trx);

    //     if (user) {
    //       const isPasswordValid = await passwordManager.compare(
    //         password,
    //         user.password,
    //       );
    //       if (isPasswordValid) {
    //         const roles = await usersRepository.findUserRolesByEmail(
    //           email,
    //           trx,
    //         );

    //         request.session.user = {
    //           id: user.id,
    //           email: user.email,
    //           username: user.username,
    //           roles: roles.map((role) => role.name),
    //         };

    //         await request.session.save();

    //         return { success: true };
    //       }
    //     }

    //     reply.status(401);

    //     return { message: "Invalid email or password." };
    //   });
    // }
  });
};
// const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
//   const { usersRepository, passwordManager } = fastify
//   fastify.post(
//     '/login',
//     {
//       schema: {
//         body: CredentialsSchema,
//         response: {
//           200: Type.Object({
//             success: Type.Boolean(),
//             message: Type.Optional(Type.String())
//           }),
//           401: Type.Object({
//             message: Type.String()
//           })
//         },
//         tags: ['Authentication']
//       }
//     },
//     async function (request, reply) {
//       const { email, password } = request.body

//       return fastify.knex.transaction(async (trx) => {
//         const user = await usersRepository.findByEmail(email, trx)

//         if (user) {
//           const isPasswordValid = await passwordManager.compare(
//             password,
//             user.password
//           )
//           if (isPasswordValid) {
//             const roles = await usersRepository.findUserRolesByEmail(email, trx)

//             request.session.user = {
//               id: user.id,
//               email: user.email,
//               username: user.username,
//               roles: roles.map((role) => role.name)
//             }

//             await request.session.save()

//             return { success: true }
//           }
//         }

//         reply.status(401)

//         return { message: 'Invalid email or password.' }
//       })
//     }
//   )
// }

export default plugin;
